import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase-config';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore';

const RecordPracticeTests = () => {
    const [math, setMath] = useState("");
    const [english, setEnglish] = useState("");
    const [reading, setReading] = useState("");
    const [writing, setWriting] = useState("");
    const [overall, setOverall] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [practiceTestsList, setPracticeTestsList] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [testToDelete, setTestToDelete] = useState(null);

    useEffect(() => {
        const fetchPracticeTests = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                setPracticeTestsList(userDoc.data().practiceSessions.practiceSessionList || []);
            }
        };
        fetchPracticeTests();
    }, []);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (math < 0 || math > 36 || english < 0 || english > 36 || reading < 0 || reading > 36 || writing < 0 || writing > 36 || overall < 0 || overall > 36) {
            setError("Scores must be between 0 and 36");
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                const totalPracticeTests = userDoc.data().practiceSessions.totalPracticeSessions || 0;
                await updateDoc(userRef, {
                    "practiceSessions.practiceSessionList": arrayUnion({
                        math,
                        english,
                        reading,
                        writing,
                        overall,
                        date: new Date().toISOString(),
                    }),
                    "practiceSessions.totalPracticeSessions": totalPracticeTests + 1,
                });
                const updatedUserDoc = await getDoc(userRef);
                setPracticeTestsList(updatedUserDoc.data().practiceSessions.practiceSessionList);
                setSuccess("Practice test recorded successfully!");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        const user = auth.currentUser;
        if (user && testToDelete) {
            await updateDoc(doc(db, "users", user.uid), {
                "practiceSessions.practiceSessionList": arrayRemove(testToDelete),
                "practiceSessions.totalPracticeSessions": practiceTestsList.length - 1,
            });
            const userDoc = await getDoc(doc(db, "users", user.uid));
            setPracticeTestsList(userDoc.data().practiceSessions.practiceSessionList);
            setShowModal(false);
        }
    };

    return (
        <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center p-4">
            <div className="max-w-7xl w-full px-4 md:px-6 py-6 md:py-8 rounded-2xl shadow-xl flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                        <span className="text-emerald-500">Record Practice Test</span>
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                            <input
                                type="number"
                                value={math}
                                onChange={(e) => setMath(e.target.value)}
                                className="w-full px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Math"
                                min="0"
                                max="36"
                                required
                            />
                            <input
                                type="number"
                                value={english}
                                onChange={(e) => setEnglish(e.target.value)}
                                className="w-full px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="English"
                                min="0"
                                max="36"
                                required
                            />
                            <input
                                type="number"
                                value={reading}
                                onChange={(e) => setReading(e.target.value)}
                                className="w-full px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Reading"
                                min="0"
                                max="36"
                                required
                            />
                            <input
                                type="number"
                                value={writing}
                                onChange={(e) => setWriting(e.target.value)}
                                className="w-full px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Writing (optional)"
                                min="0"
                                max="12"
                            />
                            <input
                                type="number"
                                value={overall}
                                onChange={(e) => setOverall(e.target.value)}
                                className="w-full px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Overall"
                                min="0"
                                max="36"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="w-full lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                    <span className="text-emerald-500">Practice Tests</span>
                </h2>
                    <ul className="space-y-4">
                        {practiceTestsList.slice(0, showMore ? practiceTestsList.length : 5).map((test, index) => (
                            <li key={index} className="bg-neutral-700 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold">Test Date: {new Date(test.date).toLocaleString()}</p>
                                    <p>Math: {test.math}</p>
                                    <p>English: {test.english}</p>
                                    <p>Reading: {test.reading}</p>
                                    <p>Writing: {test.writing}</p>
                                    <p>Overall: {test.overall}</p>
                                </div>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                    onClick={() => {
                                        setTestToDelete(test);
                                        setShowModal(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    {practiceTestsList.length > 5 && (
                        <button
                            className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition mt-4"
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Show Less" : "See More"}
                        </button>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-neutral-800 p-6 rounded-lg">
                        <p className="text-white mb-4">Are you sure you want to delete this practice test?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                onClick={handleDelete}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                                onClick={() => setShowModal(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default RecordPracticeTests;