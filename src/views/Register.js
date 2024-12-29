import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { FcGoogle } from "react-icons/fc";
import { auth, db, googleProvider } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName,
        lastName,
        email,
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
      navigate("/practice");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await setDoc(doc(db, "users", result.user.uid), {
        firstName: result.user.displayName?.split(" ")[0] || "",
        lastName: result.user.displayName?.split(" ")[1] || "",
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
      navigate("/practice");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="text-emerald-500">Create Account</span>
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
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter First Name"
              required
            />
          </div>

          <div className="relative">
            <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter Last Name"
              required
            />
          </div>

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

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
          >
            Register
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
            onClick={handleGoogleSignUp}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-neutral-700 px-6 py-3 rounded-lg hover:bg-neutral-600 transition"
          >
            <FcGoogle className="w-5 h-5" />
            Register Through Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-500 hover:text-emerald-400">
            Log in.
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
