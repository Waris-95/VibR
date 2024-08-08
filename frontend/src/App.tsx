import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import SplashPage from "./components/splashpage/SplashPage";

function App() {
  const { authUser, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return null;

  const isSplashPage = location.pathname === "/" && !authUser;

  return (
    <>
      {!isSplashPage && (
        <img
          src="https://i.pinimg.com/originals/43/e5/12/43e512bbc5f614ac72f60aa26a33b18d.gif"
          alt="Background"
          className="fixed inset-0 z-0 object-cover w-full h-full"
        />
      )}
      <div className={`relative z-10 p-4 h-screen flex items-center justify-center ${isSplashPage ? 'bg-black' : ''}`}>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <SplashPage />} />
          <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to={"/"} />} />
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/"} />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
