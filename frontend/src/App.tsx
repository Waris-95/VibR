import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
	const { authUser, isLoading } = useAuthContext();

	if (isLoading) return null;

	return (
		<>
		<video
		  autoPlay
		  loop
		  muted
		  className="background-video"
		>
		  <source src="https://pernchatter.s3.us-east-2.amazonaws.com/Dark%20Background%20Web.mp4" type="video/mp4" />
		</video>
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to={"/"} />} />
				<Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/"} />} />
			</Routes>
			<Toaster />
		</div>
		</>
	);
}

export default App;
