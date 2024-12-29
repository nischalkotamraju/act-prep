import React from 'react';
import { 
  BookOpenIcon, 
  ClockIcon, 
  LightBulbIcon,
  DocumentCheckIcon,
  CalendarIcon
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';

const DescriptionACT = () => {
  return (
    <main className="bg-neutral-900 min-h-screen text-white">
      {/* Hero Section */}
      <div className="bg-emerald-900 bg-opacity-20 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Master the <span className="text-emerald-500">ACT</span>
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Your comprehensive guide to understanding and succeeding in one of the most important standardized tests for college admissions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-neutral-800 rounded-xl p-8 shadow-lg hover:shadow-emerald-500/10 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <BookOpenIcon className="w-10 h-10 text-emerald-500" />
              <h2 className="text-2xl font-bold">What is the ACT?</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              The ACT is a standardized test used for college admissions in the United States. 
              It measures a student's readiness for college across four main sections: English, 
              Mathematics, Reading, and Science, with an optional Writing section.
            </p>
          </div>

          <div className="bg-neutral-800 rounded-xl p-8 shadow-lg hover:shadow-emerald-500/10 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <ClockIcon className="w-10 h-10 text-emerald-500" />
              <h2 className="text-2xl font-bold">Test Format</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                English: 75 questions in 45 minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                Mathematics: 60 questions in 60 minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                Reading: 40 questions in 35 minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                Science: 40 questions in 35 minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                Writing (Optional): 1 essay in 40 minutes
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-neutral-800 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-emerald-500 mb-2">36</div>
            <div className="text-gray-300">Maximum Score</div>
          </div>
          <div className="bg-neutral-800 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-emerald-500 mb-2">215</div>
            <div className="text-gray-300">Total Questions</div>
          </div>
          <div className="bg-neutral-800 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-emerald-500 mb-2">175</div>
            <div className="text-gray-300">Minutes</div>
          </div>
          <div className="bg-neutral-800 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-emerald-500 mb-2">5</div>
            <div className="text-gray-300">Test Sections</div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/10 transition-all">
            <LightBulbIcon className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-4">Study Tips</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Start preparation early</li>
              <li>• Take practice tests regularly</li>
              <li>• Focus on weak areas</li>
              <li>• Learn test-taking strategies</li>
              <li>• Maintain a study schedule</li>
            </ul>
          </div>

          <div className="bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/10 transition-all">
            <DocumentCheckIcon className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-4">Test Day Checklist</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Admission ticket</li>
              <li>• Valid photo ID</li>
              <li>• Several #2 pencils</li>
              <li>• Approved calculator</li>
              <li>• Watch (without smart features)</li>
            </ul>
          </div>

          <div className="bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/10 transition-all">
            <CalendarIcon className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-4">Important Dates</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Registration deadlines</li>
              <li>• Late registration period</li>
              <li>• Test dates</li>
              <li>• Score release dates</li>
              <li>• College application deadlines</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-emerald-900 bg-opacity-20 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Preparing?</h2>
          <p className="text-gray-300 mb-6">Use this amazing tool to help you get more productive and score that 36 on the ACT!</p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-8 rounded-lg transition-colors">
            <Link to="/practice" className="text-white">
              Start Now
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default DescriptionACT;