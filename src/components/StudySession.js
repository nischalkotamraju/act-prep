import React, { useState, useEffect } from 'react';
import { auth, db } from "../firebase/firebase-config";
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const StudySession = () => {
    const [sessionName, setSessionName] = useState("");
    const [section, setSection] = useState("Select ACT Section");
    const [duration, setDuration] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sessionsList, setSessionsList] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const sections = ["Math", "Reading", "English", "Science", "All"];

    useEffect(() => {
        const fetchSessions = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                setSessionsList(userDoc.data().studySessions.sessionsList || []);
            }
        };
        fetchSessions();
    }, []);

    const startTimer = () => {
        if (!sessionName || section === "Select ACT Section" || !duration) {
            setError("Please fill out all fields before starting the session.");
            return;
        }

        setIsRunning(true);
        setIsPaused(false);
        setTimeRemaining(duration * 60);
        const id = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setIntervalId(id);
        setTimeout(saveSession, duration * 60 * 1000);
    };

    const pauseTimer = () => {
        setIsRunning(false);
        setIsPaused(true);
        clearInterval(intervalId);
    };

    const continueTimer = () => {
        setIsRunning(true);
        setIsPaused(false);
        const id = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setIntervalId(id);
        setTimeout(saveSession, timeRemaining * 1000);
    };

    const stopTimer = () => {
        setIsRunning(false);
        setIsPaused(false);
        clearInterval(intervalId);
        saveSession();
    };

    const saveSession = async () => {
        const user = auth.currentUser;
        if (user) {
            const sessionData = {
                sessionName,
                section: section.charAt(0).toUpperCase() + section.slice(1),
                duration,
                timeSpent: duration * 60 - timeRemaining,
                createdAt: new Date().toISOString(),
            };
            await updateDoc(doc(db, "users", user.uid), {
                "studySessions.sessionsList": arrayUnion(sessionData),
            });
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const sessionsList = userDoc.data().studySessions.sessionsList;
            setSessionsList(sessionsList);
            await updateDoc(doc(db, "users", user.uid), {
                "studySessions.totalSessions": sessionsList.length,
            });
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const selectSection = (section) => {
        setSection(section);
        setDropdownOpen(false);
    };

    const handleDelete = async () => {
        const user = auth.currentUser;
        if (user && sessionToDelete) {
            await updateDoc(doc(db, "users", user.uid), {
                "studySessions.sessionsList": arrayRemove(sessionToDelete),
                "studySessions.totalSessions": sessionsList.length - 1,
            });
            const userDoc = await getDoc(doc(db, "users", user.uid));
            setSessionsList(userDoc.data().studySessions.sessionsList);
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (sessionName.split(" ").length > 15) {
            setSessionName(sessionName.split(" ").slice(0, 15).join(" "));
        }
    }, [sessionName]);

    return (
        <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center p-4">
            <div className="max-w-7xl w-full px-4 sm:px-6 py-6 sm:py-8 rounded-2xl shadow-xl flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                        <span className="text-emerald-500">Create Study Session</span>
                    </h2>
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                    <form className="space-y-4 sm:space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                value={sessionName}
                                onChange={(e) => setSessionName(e.target.value)}
                                className="w-full pl-4 pr-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Session Name"
                                required
                            />
                        </div>
                        <div className="relative">
                            <div
                                className="w-full pl-4 pr-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer flex items-center justify-between"
                                onClick={toggleDropdown}
                            >
                                {section}
                                <ChevronDownIcon
                                    className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                                />
                            </div>
                            {dropdownOpen && (
                                <ul className="absolute w-full bg-neutral-700 rounded-lg mt-1 z-10">
                                    {sections.map((sec) => (
                                        <li
                                            key={sec}
                                            className="pl-4 pr-4 py-2 hover:bg-neutral-600 cursor-pointer"
                                            onClick={() => selectSection(sec)}
                                        >
                                            {sec}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full pl-4 pr-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Duration (minutes)"
                                required
                            />
                        </div>
                        <div className="relative">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full pl-4 pr-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Brief Description (Optional)"
                                rows="4"
                            />
                        </div>
                        {!isRunning && !isPaused ? (
                            <button
                                type="button"
                                onClick={startTimer}
                                className="w-full bg-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-emerald-600 transition"
                            >
                                Start Session
                            </button>
                        ) : isPaused ? (
                            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={continueTimer}
                                    className="w-full bg-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-emerald-600 transition"
                                >
                                    Continue
                                </button>
                                <button
                                    type="button"
                                    onClick={stopTimer}
                                    className="w-full bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-red-600 transition"
                                >
                                    Stop
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={pauseTimer}
                                    className="w-full bg-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-yellow-600 transition"
                                >
                                    Pause
                                </button>
                                <button
                                    type="button"
                                    onClick={stopTimer}
                                    className="w-full bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-red-600 transition"
                                >
                                    Stop
                                </button>
                            </div>
                        )}
                    </form>
                    {isRunning && (
                        <div className="mt-4 sm:mt-6 text-center">
                            <p className="text-lg sm:text-xl">
                                Time Remaining: {Math.floor(timeRemaining / 60)}:
                                {String(timeRemaining % 60).padStart(2, "0")}
                            </p>
                        </div>
                    )}
                </div>
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                        <span className="text-emerald-500">Study Sessions</span>
                    </h2>
                    <ul className="space-y-3 sm:space-y-4">
                        {sessionsList.slice(0, showMore ? sessionsList.length : 5).map((session, index) => (
                            <li key={index} className="bg-neutral-700 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div>
                                    <p className="font-bold">{session.sessionName}</p>
                                    <p>Section: {session.section}</p>
                                    <p>Amt. Time: {session.duration} minute(s)</p>
                                    <p className="text-sm">Time Started: {new Date(session.createdAt).toLocaleString()}</p>
                                </div>
                                <button
                                    className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                    onClick={() => {
                                        setSessionToDelete(session);
                                        setShowModal(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    {sessionsList.length > 5 && (
                        <button
                            className="w-full bg-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-emerald-600 transition mt-4"
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Show Less" : "See More"}
                        </button>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-neutral-800 p-4 sm:p-6 rounded-lg w-full max-w-sm">
                        <p className="text-white mb-4">Are you sure you want to delete this session?</p>
                        <div className="flex justify-end gap-2 sm:gap-4">
                            <button
                                className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                onClick={handleDelete}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-600 transition"
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

export default StudySession;