import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type AuthUserType = {
    id: string;
    fullName: string;
    email: string;
    profilePic: string;
    gender: string;
};

const AuthContext = createContext<{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// Function to get cookie by name
const getCookieValue = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
};

// Function to log JWT token from cookies

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAuthUser = async () => {
			try {
				// console.log("Fetching auth user..."); // Log for debugging
				const res = await fetch("/api/auth/me", {
					method: 'GET',
					credentials: 'include', // Include credentials with request
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error);
				}
				setAuthUser(data);
			} catch (error: any) {
				console.error(error);
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		};
	
		fetchAuthUser();
		logJwtToken(); // Log JWT token after fetching auth user
	}, []); // Ensure empty dependency array to only run once
	
	// Function to log JWT token from cookies
	const logJwtToken = () => {
		const jwtToken = getCookieValue('jwt');
		// console.log('JWT Token from cookies:', jwtToken);
	};
	
	

    return (
        <AuthContext.Provider
            value={{
                authUser,
                isLoading,
                setAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
