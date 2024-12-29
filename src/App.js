import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Header from "./components/Header";
import Login from "./views/Login";
import Register from "./views/Register";
import Practice from "./views/Practice";
import Error from "./views/Error";
import DescriptionACT from "./views/DescriptionACT";
import ForgotPassword from "./views/ForgotPassword";
import Profile from "./views/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="bg-neutral-900">
        <Header />

        <Routes>
          <Route index element={<Home />} />
          <Route 
            path='/login' 
            element={user ? <Navigate to="/practice" /> : <Login />} 
          />
          <Route 
            path='/register' 
            element={user ? <Navigate to="/practice" /> : <Register />} 
          />
          <Route 
            path='/forgot-password' 
            element={user ? <Navigate to="/practice" /> : <ForgotPassword />} 
          />
          <Route 
            path='/practice' 
            element={user ? <Practice /> : <Navigate to="/login" />} 
          />
          <Route 
            path='/profile' 
            element={user ? <Profile /> : <Navigate to="/login" />} 
          />
          <Route 
            path='/act-description'
            element={<DescriptionACT />}
          />
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
