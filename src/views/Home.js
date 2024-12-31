import {
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 md:py-20 gap-24 md:gap-48">
          {/* Icon */}
          <div className="mt-10 md:mt-0">
            <h1 className="font-bold text-emerald-500 text-9xl">36</h1>
          </div>

          <div className="max-w-md text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-white">Achieve Your</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3072D6] to-[#27C877]">
                Dream Score.
              </span>
            </h1>
            <p className="mt-4 text-gray-300">
              Personalized ACT prep tools crafted to help you unlock your full
              potential. Start your journey to excellence with 36.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
              <Link
                to="/login"
                className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition text-center"
              >
                Get Started
              </Link>
              <Link
                to="/act-description"
                className="bg-transparent border-2 border-gray-300 text-gray-300 px-6 py-3 rounded-xl hover:border-white hover:text-white transition text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Perks Section */}
      <section className="bg-neutral-900 py-16 px-6 md:px-20 text-white mb-32">
        <h2 className="text-3xl font-bold text-center mb-12 text-emerald-500">Why Choose 36?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full">
              <ChartBarIcon className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold">Personalized Practice</h3>
            <p className="text-gray-300 text-sm">
              Custom practice tests and questions tailored to your skill level
              and target score.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full">
              <ClockIcon className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold">Time Management</h3>
            <p className="text-gray-300 text-sm">
              Learn effective strategies to manage your time during each section
              of the ACT.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full">
              <ChartBarIcon className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold">Analytics</h3>
            <p className="text-gray-300 text-sm">
              Track your progress over time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
