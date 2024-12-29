import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { auth, db } from "../firebase/firebase-config";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

const DiagnosticTest = () => {
    const [subject, setSubject] = useState('');
    const [questionCount, setQuestionCount] = useState(0);
    const [timeLimit, setTimeLimit] = useState(0);
    const [showTest, setShowTest] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [testCompleted, setTestCompleted] = useState(false);
    const [showQuestionNav, setShowQuestionNav] = useState(false);
    const [eliminatedChoices, setEliminatedChoices] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (timeRemaining > 0 && showTest && !testCompleted) {
            const timer = setInterval(() => {
                setTimeRemaining(time => time - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0 && showTest && !testCompleted) {
            setTestCompleted(true);
        }
    }, [timeRemaining, showTest, testCompleted]);

    const handleSubjectSelect = (selectedSubject) => {
        setSubject(selectedSubject);
    };

    const handleQuestionCountSelect = (count) => {
        setQuestionCount(count);
        const minutes = subject === 'math' ? count : 
            count === 10 ? 6 : 
            count === 25 ? 15 : 
            count === 50 ? 35 : 42;
        setTimeLimit(minutes * 60);
    };

    const startTest = async () => {
        try {
            const data = require('../data/diagnostic-questions.json');
            let allQuestions = data[subject.toLowerCase()];
            
            if (!allQuestions || !Array.isArray(allQuestions)) {
                throw new Error('Questions data is not in the expected format');
            }
            
            if (subject.toLowerCase() === 'english') {
                allQuestions = allQuestions[0];
            }

            const validQuestions = allQuestions.filter(q => 
                q && q.question && q.choices && Array.isArray(q.choices) && 
                q.choices.length > 0 && q.answer
            );

            const selectedQuestions = validQuestions
                .sort(() => Math.random() - 0.5)
                .slice(0, questionCount);

            setQuestions(selectedQuestions);
            setTimeRemaining(timeLimit);
            setShowTest(true);
        } catch (error) {
            console.error('Error loading questions:', error);
            alert('Failed to load questions. Please try again.');
        }
    };

    const handleAnswerSelect = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(curr => curr + 1);
        } else {
            setTestCompleted(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(curr => curr - 1);
        }
    };

    const jumpToQuestion = (index) => {
        setCurrentQuestion(index);
        setShowQuestionNav(false);
    };

    const calculateScore = useCallback(() => {
        let correct = 0;
        questions.forEach(question => {
            if (answers[question.id] === question.answer) {
                correct++;
            }
        });
        return Math.round((correct / questions.length) * 100);
    }, [questions, answers]);

    const handleEliminateChoice = (questionId, choice) => {
        setEliminatedChoices(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                [choice]: !prev[questionId]?.[choice]
            }
        }));
    };

    const saveTestResults = useCallback(async (score, correctAnswers, wrongAnswers) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            const diagnosticTests = userDoc.data().diagnosticTests || [];
            const testId = `${subject}-${questionCount}-${new Date().toISOString()}`;
    
            const alreadySaved = diagnosticTests.some(test => test.id === testId);
    
            if (!alreadySaved) {
                await updateDoc(userRef, {
                    "diagnosticTests": arrayUnion({
                        id: testId,
                        subject,
                        questionCount,
                        score,
                        correctAnswers,
                        wrongAnswers,
                        date: new Date().toISOString()
                    })
                });
            }
        }
    }, [subject, questionCount]);

    useEffect(() => {
        if (testCompleted) {
            const score = calculateScore();
            const correctAnswers = questions.filter(q => answers[q.id] === q.answer).length;
            const wrongAnswers = questions.filter(q => answers[q.id] && answers[q.id] !== q.answer).length;

            saveTestResults(score, correctAnswers, wrongAnswers);
        }
    }, [testCompleted, answers, calculateScore, questions, saveTestResults]);

    if (testCompleted) {
        const score = calculateScore();
        const correctAnswers = questions.filter(q => answers[q.id] === q.answer).length;
        const wrongAnswers = questions.filter(q => answers[q.id] && answers[q.id] !== q.answer).length;
        const unanswered = questions.length - correctAnswers - wrongAnswers;

        return (
            <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
                <div className="max-w-3xl w-full px-6 py-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        <span className="text-emerald-500">Test Completed!</span>
                    </h2>
                    <p className="text-2xl text-center mb-4">Your Score: {score}%</p>
                    <p className="text-xl text-center mb-8">
                        Correct: {correctAnswers} | Wrong: {wrongAnswers} | Unanswered: {unanswered}
                    </p>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition mb-8"
                    >
                        Return Home
                    </button>
                    <div className="space-y-6">
                        {questions.map((question, index) => (
                            <div key={question.id} className="bg-neutral-800 rounded-xl p-6">
                                <p className="text-xl mb-4">{index + 1}. {question.question}</p>
                                <div className="space-y-3">
                                    {question.choices.map(choice => (
                                        <div key={choice.option} className="flex items-center gap-2">
                                            <div className={`w-full text-left p-4 rounded-lg transition ${
                                                !answers[question.id] 
                                                ? choice.option === question.answer
                                                    ? 'bg-emerald-700 text-white'
                                                    : 'bg-neutral-700'
                                                : answers[question.id] === choice.option 
                                                    ? answers[question.id] === question.answer 
                                                        ? 'bg-emerald-500 text-white' 
                                                        : 'bg-red-500 text-white' 
                                                    : choice.option === question.answer
                                                        ? 'bg-emerald-700 text-white'
                                                        : 'bg-neutral-700'
                                            }`}>
                                                {choice.option}. {choice.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {!answers[question.id] && (
                                    <p className="mt-4 text-yellow-500">Question Unanswered</p>
                                )}
                                <p className="mt-4 text-gray-400">Explanation: {question.explanation}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    if (!showTest) {
        return (
            <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
                <div className="max-w-md w-full px-6 py-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        <span className="text-emerald-500">Diagnostic Test Setup</span>
                    </h2>
                    {!subject ? (
                        <div className="space-y-6">
                            <p className="text-center text-gray-300">Select a subject:</p>
                            <div className="flex gap-4 justify-center">
                                <button 
                                    onClick={() => handleSubjectSelect('math')}
                                    className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition flex-1"
                                >
                                    Math
                                </button>
                                <button 
                                    onClick={() => handleSubjectSelect('english')}
                                    className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition flex-1"
                                >
                                    English
                                </button>
                            </div>
                        </div>
                    ) : !questionCount ? (
                        <div className="space-y-6">
                            <p className="text-center text-gray-300">How many questions would you like?</p>
                            <div className="grid grid-cols-2 gap-4">
                                {[10, 25, 50, 70].map(count => (
                                    <button 
                                        key={count}
                                        onClick={() => handleQuestionCountSelect(count)}
                                        className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
                                    >
                                        {count}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <p className="text-center text-gray-300">
                                You have selected {questionCount} questions of {subject}.<br/>
                                Time limit: {timeLimit / 60} minutes.
                            </p>
                            <button 
                                onClick={startTest}
                                className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
                            >
                                Start Test
                            </button>
                        </div>
                    )}
                </div>
            </main>
        );
    }

    const currentQ = questions[currentQuestion];
    return (
        <main className="bg-neutral-900 min-h-screen text-white py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-6 h-6 text-emerald-500" />
                        <span className="text-xl">
                            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
                        </span>
                    </div>
                    <button
                        onClick={() => setShowQuestionNav(!showQuestionNav)}
                        className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
                    >
                        Question Navigator
                    </button>
                </div>

                {showQuestionNav && (
                    <div className="fixed right-4 top-20 bg-neutral-800 p-4 rounded-lg shadow-xl">
                        <h3 className="text-lg font-bold mb-4">Jump to Question</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => jumpToQuestion(index)}
                                    className={`p-2 rounded ${
                                        currentQuestion === index 
                                        ? 'bg-emerald-500' 
                                        : answers[questions[index].id] 
                                        ? 'bg-emerald-700' 
                                        : 'bg-neutral-700'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-neutral-800 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-start mb-6">
                        <p className="text-xl">{currentQ.question}</p>
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-md text-sm ml-4">
                            ID: {currentQ.id}
                        </span>
                    </div>
                    <div className="space-y-3">
                        {currentQ.choices.map(choice => (
                            <div key={choice.option} className="flex items-center gap-2">
                                <button
                                    onClick={() => handleAnswerSelect(currentQ.id, choice.option)}
                                    className={`w-full text-left p-4 rounded-lg transition ${
                                        answers[currentQ.id] === choice.option 
                                        ? 'bg-emerald-500 text-white' 
                                        : 'bg-neutral-700 hover:bg-neutral-600'
                                    } ${eliminatedChoices[currentQ.id]?.[choice.option] ? 'line-through cursor-not-allowed' : ''}`}
                                    disabled={eliminatedChoices[currentQ.id]?.[choice.option]}
                                >
                                    {choice.option}. {choice.text}
                                </button>
                                <button
                                    onClick={() => handleEliminateChoice(currentQ.id, choice.option)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={handlePreviousQuestion}
                        className={`bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition ${
                            currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={currentQuestion === 0}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
                    >
                        {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
                    </button>
                </div>
            </div>
        </main>
    );
};

export default DiagnosticTest;