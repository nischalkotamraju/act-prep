import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../firebase/firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/practice");
    } catch (err) {
      setError(err.message);
    }
  };

const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const displayName = result.user.displayName || '';
        const [firstName = '', lastName = ''] = displayName.split(' ');
        
        if (
            result.user.metadata.creationTime ===
            result.user.metadata.lastSignInTime
        ) {
            await setDoc(doc(db, "users", result.user.uid), {
              firstName,
              lastName,
              email: result.user.email,
              createdAt: new Date().toISOString(),
              diagnosticTests: [
                {
                  totalQuestionsAnswered: 0,
                  totalQuestionsCorrect: 0,
                  totalQuestionsWrong: 0,
                  totalQuestionsUnanswered: 0,
                  diagnosticTestSessions: []
                },
              ],
              studySessions: [
                {
                  totalSessions: 0,
                  sessionsList: [],
                  averageSessionTime: 0,
                },
              ],
              practiceSessions: [],
              goalScore: {
                reading: 0,
                math: 0,
                science: 0,
                english: 0,
                writing: 0,
                total: 0,
              },
              weakAreas: [],
              strengths: [],
            });
        }
        navigate("/practice");
    } catch (err) {
        setError(err.message);
    }
};

  return (
    <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="text-emerald-500">Welcome Back!</span>
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-900 text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-neutral-700 px-6 py-3 rounded-lg hover:bg-neutral-600 transition"
          >
            <FcGoogle className="w-5 h-5" />
            Login Through Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-500 hover:text-emerald-400"
          >
            Sign up.
          </Link>
        </p>
        <p className="mt-2 text-center text-gray-400">
          Forgot your password?{" "}
          <Link
            to="/forgot-password"
            className="text-emerald-500 hover:text-emerald-400"
          >
            Reset password.
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
