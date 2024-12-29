import DiagnosticTest from "../components/DiagnosticTest";
import StudySession from "../components/StudySession";
import Strategies from "../components/Strategies";
import RecordPracticeTests from "../components/RecordPracticeTests";
import PracticeEssay from "../components/PracticeEssay";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Analytics from "../components/Analytics";

const Practice = () => {
  const [firstName, setFirstName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setFirstName(userDoc.data()?.firstName || "");
      }
    };
    fetchUserName();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "diagnostic":
        return <DiagnosticTest />;
      case "study":
        return <StudySession />;
      case "strategies":
        return <Strategies />;
      case "essay":
        return <PracticeEssay />;
      case "record practice test":
        return <RecordPracticeTests />;
      case "analytics":
        return <Analytics />;
      default:
        return (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="text-emerald-500">
          {getGreeting()}, {firstName}!
              </span>
              <br />
              <span className="text-white mt-2">
          What would you like to do today?
              </span>
            </h2>

            <div className="mt-12 mb-12 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-emerald-500 text-center">
          Additional Practice Resources
              </h3>
              <ul className="space-y-6">
          {[
            {
              name: "Official ACT Practice Tests",
              link: "https://www.act.org/content/act/en/products-and-services/the-act/test-preparation/free-act-test-prep.html",
            },
            {
              name: "CrackAB - Free", 
              link: "https://www.crackab.com",
            },
            {
              name: "Kaplan - Free",
              link: "https://www.kaptest.com/act/free/act-free-practice-test?srsltid=AfmBOopuF5PGQR46W7lQByinD8Ny1FAQMudH7sxa4SJQE1xdcGbUE8RK",
            },
            {
              name: "Study.com - Paid",
              link: "https://study.com/buy/course/act.html?src=ppc_adwords_nonbrand&rcntxt=aws&crt=528129433409&kwd=act%20practice%20tests&kwid=kwd-92050098&agid=25888612868&mt=b&device=c&network=g&--&gad_source=1&gbraid=0AAAAADjpCfSfRhapCLunyEYU5QPxOtmJE&gclid=CjwKCAiAg8S7BhATEiwAO2-R6pxI_SBMYebS_R8Il5STu25Gnp9yqoFfTeXmAbB7LHcfyCH-PVaQNhoCLhQQAvD_BwE",
            },
            {
              name: "Mometrix Test Prep - Free",
              link: "https://www.mometrix.com/academy/act-practice-test/",
            },
            {
              name: "Barron's 6 Act Practice Tests - Free",
              link: "https://www.amazon.com/Barrons-6-ACT-Practice-Tests/dp/0764147226",
            },
          ].map((resource, index) => (
            <li key={index} className="flex items-center gap-4">
              <img 
                src={require(`../images/resource-${index + 1}.png`)}
                alt=""
                className="h-8 w-8 rounded-lg"
              />
              <div className="flex-1">
                <a
            href={resource.link}
            className="text-white hover:text-emerald-500 transition"
            target="_blank"
            rel="noopener noreferrer"
                >
            {resource.name}
                </a>
              </div>
              <a
                href={resource.link}
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go Now
              </a>
            </li>
          ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button
          onClick={() => setSelectedOption("diagnostic")}
          className="bg-neutral-800 p-6 rounded-xl hover:bg-neutral-700 transition"
              >
          <h3 className="text-xl font-bold mb-2 text-emerald-500">
            Diagnostic Test
          </h3>
          <p className="text-gray-300">
            Take a practice test to assess your current level.
          </p>
              </button>

              <button
          onClick={() => setSelectedOption("study")}
          className="bg-neutral-800 p-6 rounded-xl hover:bg-neutral-700 transition"
              >
          <h3 className="text-xl font-bold mb-2 text-emerald-500">
            Study Session
          </h3>
          <p className="text-gray-300">
            Create a timed study session for focused practice.
          </p>
              </button>

              <button
          onClick={() => setSelectedOption("strategies")}
          className="bg-neutral-800 p-6 rounded-xl hover:bg-neutral-700 transition"
              >
          <h3 className="text-xl font-bold mb-2 text-emerald-500">
            Tips & Strategies
          </h3>
          <p className="text-gray-300">
            Learn proven strategies for each section.
          </p>
              </button>

              <button
          onClick={() => setSelectedOption("essay")}
          className="bg-neutral-800 p-6 rounded-xl hover:bg-neutral-700 transition"
              >
          <h3 className="text-xl font-bold mb-2 text-emerald-500">
            Practice Essay
          </h3>
          <p className="text-gray-300">
            Write a timed essay with automated grading.
          </p>
              </button>

              <button
          onClick={() => setSelectedOption("record practice test")}
          className="bg-neutral-800 p-6 rounded-xl hover:bg-neutral-700 transition"
              >
          <h3 className="text-xl font-bold mb-2 text-emerald-500">
            Record Practice Tests
          </h3>
          <p className="text-gray-300">
            Keep track of your practice test scores and progress.
          </p>
              </button>

              <button
          onClick={() => setSelectedOption("analytics")}
          className="bg-neutral-800 p-6 rounded-xl hover:bg-neutral-700 transition"
              >
          <h3 className="text-xl font-bold mb-2 text-emerald-500">
            Analytics
          </h3>
          <p className="text-gray-300">
            View detailed analytics of your preparation for the ACT.
          </p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="bg-neutral-900 min-h-screen text-white">
      {selectedOption && (
        <button
          onClick={() => setSelectedOption(null)}
          className="ml-5 mt-5 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}

      {renderContent()}
    </main>
  );
};

export default Practice;
