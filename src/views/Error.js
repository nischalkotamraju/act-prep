import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Error = () => {
    return (
        <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
            <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <ExclamationTriangleIcon className="h-16 w-16 text-emerald-500" />
                    <h1 className="text-6xl font-bold text-emerald-500">Oops.</h1>
                </div>
                <p className="text-2xl mb-8">It seems like this page doesn't exist.</p>
                <Link 
                    to="/" 
                    className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition"
                >
                    Return Home
                </Link>
            </div>
        </main>
    );
};

export default Error;