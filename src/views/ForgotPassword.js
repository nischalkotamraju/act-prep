import { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { auth } from "../firebase/firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent. Check your inbox.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
            <div className="max-w-md w-full px-6 py-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-4">
                    <span className="text-emerald-500">Reset Password</span>
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-sm">
                        {message}
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

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Remember your password?{" "}
                    <Link to="/login" className="text-emerald-500 hover:text-emerald-400">
                        Login.
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default ForgotPassword;