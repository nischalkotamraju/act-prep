import React from "react";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";

const Analytics = () => {
  const [practiceTests, setPracticeTests] = useState([]);
  const [studySessions, setStudySessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        setPracticeTests(userData.practiceSessions.practiceSessionList || []);
        setPracticeTests(userData.practiceSessions.practiceSessionList || []);
        setStudySessions(userData.studySessions.sessionsList || []);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scoreData = {
    labels: practiceTests.map((test) =>
      new Date(test.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Math",
        data: practiceTests.map((test) => test.math),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "English",
        data: practiceTests.map((test) => test.english),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Reading",
        data: practiceTests.map((test) => test.reading),
        borderColor: "rgb(255, 205, 86)",
        tension: 0.1,
      },
    ],
  };

  const studyTimeData = {
    labels: ["Math", "English", "Reading", "Science"],
    datasets: [
      {
        label: "Hours Studied",
        data: ["math", "english", "reading", "science"].map(
          (subject) =>
            studySessions
              .filter((session) => session.section.toLowerCase() === subject)
              .reduce((total, session) => total + session.duration, 0) / 60
        ),
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  };

  if (loading) {
    return (
      <main className="bg-neutral-900 min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-emerald-500">Loading Analytics...</span>
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-900 min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          <span className="text-emerald-500">Your Progress Analytics</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Score Progress</h3>
            <Line data={scoreData} options={{ responsive: true }} />
          </div>

          <div className="bg-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Study Time by Subject</h3>
            <Bar data={studyTimeData} options={{ responsive: true }} />
          </div>

          <div className="bg-neutral-800 p-6 rounded-xl md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Key Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-neutral-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Total Practice Tests</p>
                <p className="text-2xl font-bold text-emerald-500">
                  {practiceTests.length}
                </p>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Study Sessions</p>
                <p className="text-2xl font-bold text-emerald-500">
                  {studySessions.length}
                </p>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Total Study Hours</p>
                <p className="text-2xl font-bold text-emerald-500">
                  {(
                    studySessions.reduce(
                      (total, session) => total + session.duration,
                      0
                    ) / 60
                  ).toFixed(1)}
                </p>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Latest Score</p>
                <p className="text-2xl font-bold text-emerald-500">
                  {practiceTests[practiceTests.length - 1]?.overall || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;
