import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimulationWrapper from './SimulationWrapper';

const HIRAGANA_DATA = [
    { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' },
    { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' }, { char: 'か', romaji: 'ka' },
    { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' },
    { char: 'こ', romaji: 'ko' }, { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' },
    { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
    { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' },
    { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' }
];

const KursusJepangSimulation = ({ onClose }) => {
    const [step, setStep] = useState('intro'); // intro, quiz, result
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const startQuiz = () => {
        // Shuffle and pick 5 random characters
        const shuffled = [...HIRAGANA_DATA].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5).map(q => {
            // Generate 3 wrong options
            const distractorPool = HIRAGANA_DATA.filter(h => h.romaji !== q.romaji);
            const distractors = distractorPool.sort(() => 0.5 - Math.random()).slice(0, 3);
            const options = [...distractors, q].sort(() => 0.5 - Math.random());
            return { ...q, options };
        });
        setQuestions(selected);
        setCurrentIndex(0);
        setScore(0);
        setStep('quiz');
    };

    const handleAnswer = (option) => {
        if (selectedOption !== null) return; // Prevent double click

        setSelectedOption(option.romaji);
        const correct = option.romaji === questions[currentIndex].romaji;
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setStep('result');
            }
        }, 1200);
    };

    return (
        <SimulationWrapper title="Kursus Jepang Demo" onClose={onClose}>
            <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[500px] p-8 md:p-12 relative overflow-hidden bg-[#fcfcfc]">

                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>


                <AnimatePresence mode="wait">
                    {step === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center relative z-10"
                        >
                            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-100">
                                <span className="text-4xl">🇯🇵</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">HIRAGANA QUIZ</h3>
                            <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Tes kemampuan dasar bahasa Jepangmu dalam hitungan detik. Coba fitur interaktif platform kami.</p>
                            <button
                                onClick={startQuiz}
                                className="bg-[#E60012] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-red-500/20"
                            >
                                Mulai Simulasi
                            </button>
                        </motion.div>
                    )}

                    {step === 'quiz' && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full text-center relative z-10"
                        >
                            <div className="flex justify-between items-center mb-8 w-full max-w-xs mx-auto">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Question {currentIndex + 1}/5</span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 w-8 rounded-full transition-colors ${i <= currentIndex ? 'bg-red-500' : 'bg-slate-100'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mb-12">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-8xl md:text-9xl font-black text-slate-900"
                                >
                                    {questions[currentIndex].char}
                                </motion.div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-4">Apa Romaji dari karakter ini?</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
                                {questions[currentIndex].options.map((option, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(option)}
                                        className={`
                                            py-5 rounded-2xl text-xl font-black transition-all duration-300 transform
                                            ${selectedOption === option.romaji
                                                ? (isCorrect ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-red-500 text-white shadow-lg shadow-red-500/20')
                                                : 'bg-white border-2 border-slate-100 text-slate-700 hover:border-red-200 hover:bg-red-50/30'
                                            }
                                            ${selectedOption !== null && option.romaji === questions[currentIndex].romaji && !isCorrect ? 'border-green-500 bg-green-50 text-green-600' : ''}
                                        `}
                                    >
                                        {option.romaji}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center relative z-10"
                        >
                            <div className="mb-8">
                                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Simulasi Selesai</h4>
                                <div className="text-7xl font-black text-slate-900 leading-none">
                                    {score}/5
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-3xl mb-10 text-left border border-slate-100 max-w-sm mx-auto">
                                <h5 className="font-black text-slate-800 text-sm mb-2 uppercase italic tracking-tighter">Analisa Sensei:</h5>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {score === 5 ? "Luar biasa! Kamu memiliki dasar yang kuat. Kamu siap untuk lanjut ke tahap Grammar (Bunpou)!" :
                                        score >= 3 ? "Bagus! Kamu sudah mengenal beberapa karakter dasar. Sedikit latihan lagi kamu akan mahir." :
                                            "Jangan menyerah! Belajar Hiragana adalah langkah pertama menuju Jepang. Kami siap membantumu."}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={onClose}
                                    className="bg-[#E60012] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-red-500/20"
                                >
                                    Daftar Kursus Sekarang
                                </button>
                                <button
                                    onClick={startQuiz}
                                    className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-red-500 transition-colors py-4 px-10"
                                >
                                    Ulangi Simulasi
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SimulationWrapper>
    );
};

export default KursusJepangSimulation;
