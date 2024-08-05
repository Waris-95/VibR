import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
// import { Toaster } from "react-hot-toast";
import SplashPage from "./components/splashpage/SplashPage";

function App() {
  const { authUser, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return null;

  const isSplashPage = location.pathname === "/" && !authUser;

  return (
    <>
      {!isSplashPage && (
        <video
          autoPlay
          loop
          muted
          className="fixed inset-0 z-0 object-cover w-full h-full"
        >
          <source src="https://pernchatter.s3.us-east-2.amazonaws.com/Dark%20Background%20Web.mp4" type="video/mp4" />
        </video>
      )}
      <div className={`relative z-10 p-4 h-screen flex items-center justify-center ${isSplashPage ? 'bg-black' : ''}`}>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <SplashPage />} />
          <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to={"/"} />} />
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/"} />} />
        </Routes>
        {/* <Toaster /> */}
      </div>
    </>
  );
}

export default App;
