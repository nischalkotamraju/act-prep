import React from 'react';
import { MagnifyingGlassIcon, PlusIcon, BookOpenIcon, ClipboardDocumentListIcon, PencilIcon } from "@heroicons/react/24/solid";
import tipsData from '../data/tips-and-strategies.json';

const Strategies = () => {
    return (
        <main className="bg-neutral-900 min-h-screen text-white py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12">
                    <span className="text-emerald-500">ACT Study Tips</span>
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-neutral-800 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <PlusIcon className="w-8 h-8 text-emerald-500" />
                            <h2 className="text-2xl font-bold">Math Tips</h2>
                        </div>
                        <ul className="space-y-3">
                            {tipsData.tips.math.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-neutral-800 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <MagnifyingGlassIcon className="w-8 h-8 text-emerald-500" />
                            <h2 className="text-2xl font-bold">English Tips</h2>
                        </div>
                        <ul className="space-y-3">
                            {tipsData.tips.english.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-neutral-800 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <BookOpenIcon className="w-8 h-8 text-emerald-500" />
                            <h2 className="text-2xl font-bold">Reading Tips</h2>
                        </div>
                        <ul className="space-y-3">
                            {tipsData.tips.reading.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-neutral-800 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <PencilIcon className="w-8 h-8 text-emerald-500" />
                            <h2 className="text-2xl font-bold">Writing Tips</h2>
                        </div>
                        <ul className="space-y-3">
                            {tipsData.tips.writing.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-neutral-800 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <ClipboardDocumentListIcon className="w-8 h-8 text-emerald-500" />
                            <h2 className="text-2xl font-bold">General Tips</h2>
                        </div>
                        <ul className="space-y-3">
                            {tipsData.tips.general.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Strategies;