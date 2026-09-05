"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Loader2,
  ArrowRight,
  RefreshCcw,
  Check,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const QUESTIONS = [
  {
    id: "faceShape",
    title: "What is your face shape?",
    options: ["Oval", "Square", "Round", "Heart", "Long"],
  },
  {
    id: "hairType",
    title: "What is your hair type?",
    options: ["Straight", "Wavy", "Curly", "Coily", "Thinning"],
  },
  {
    id: "lifestyle",
    title: "Which best describes your lifestyle?",
    options: [
      "Office / corporate",
      "Creative / artistic",
      "Active / outdoors",
      "Casual",
    ],
  },
  {
    id: "maintenance",
    title:
      "How much time do you want to spend styling each morning?",
    options: ["Almost none", "About 5 minutes", "About 10 minutes", "Whatever it takes"],
  },
];

const NOTES_STEP_INDEX = QUESTIONS.length;
const TOTAL_STEPS = QUESTIONS.length + 1;

export default function StyleQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSelect = (qid, value) => {
    setAnswers((a) => ({ ...a, [qid]: value }));
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/ai/recommend", { ...answers, notes });
      setResult(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setNotes("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-6 py-10 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-semibold text-red-500 uppercase tracking-wider">
              <Sparkles size={14} />
              AI Style Quiz
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
              Find Your Signature Look
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Four quick questions. One personalized recommendation.
            </p>
          </div>

          {/* Result view */}
          {result ? (
            <ResultCard
              result={result}
              onReset={handleReset}
            />
          ) : loading ? (
            <LoadingCard />
          ) : error && step === NOTES_STEP_INDEX + 1 ? (
            <ErrorCard message={error} onRetry={handleReset} />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-10">
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i < step
                        ? "w-8 bg-red-500"
                        : i === step
                          ? "w-8 bg-red-300 dark:bg-red-700"
                          : "w-2 bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>

              {step < QUESTIONS.length ? (
                <QuestionStep
                  question={QUESTIONS[step]}
                  stepNumber={step + 1}
                  totalSteps={TOTAL_STEPS}
                  onSelect={(value) =>
                    handleSelect(QUESTIONS[step].id, value)
                  }
                  onBack={step > 0 ? handleBack : null}
                />
              ) : (
                <NotesStep
                  notes={notes}
                  setNotes={setNotes}
                  onSubmit={handleSubmit}
                  onBack={handleBack}
                />
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

const QuestionStep = ({
  question,
  stepNumber,
  totalSteps,
  onSelect,
  onBack,
}) => (
  <div>
    <div className="text-center mb-6">
      <p className="text-xs uppercase tracking-wider font-semibold text-red-500">
        Question {stepNumber} of {totalSteps}
      </p>
      <h2 className="mt-2 text-xl md:text-2xl font-bold">{question.title}</h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {question.options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="group text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{option}</span>
            <ArrowRight
              size={16}
              className="text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all"
            />
          </div>
        </button>
      ))}
    </div>

    {onBack && (
      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>
    )}
  </div>
);

const NotesStep = ({ notes, setNotes, onSubmit, onBack }) => (
  <div>
    <div className="text-center mb-6">
      <p className="text-xs uppercase tracking-wider font-semibold text-red-500">
        Last step
      </p>
      <h2 className="mt-2 text-xl md:text-2xl font-bold">
        Anything else we should know?
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Optional. Tell us about preferences, allergies, or past cuts.
      </p>
    </div>

    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      rows={4}
      placeholder="e.g. I prefer a clean side part, no products..."
      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
    />

    <button
      onClick={onSubmit}
      className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-red-500/20 transition-all"
    >
      <Sparkles size={18} />
      Get my recommendation
      <ArrowRight size={18} />
    </button>

    {onBack && (
      <div className="mt-4 text-center">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>
    )}
  </div>
);

const LoadingCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 md:p-16 text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 ring-1 ring-red-500/20 mb-5">
      <Loader2 size={28} className="text-red-500 animate-spin" />
    </div>
    <h2 className="text-xl font-bold mb-1">Curating your style…</h2>
    <p className="text-sm text-gray-500">
      Matching your answers with our menu of services.
    </p>
  </div>
);

const ErrorCard = ({ message, onRetry }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 md:p-16 text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 ring-1 ring-red-500/20 mb-5">
      <AlertCircle size={28} className="text-red-500" />
    </div>
    <h2 className="text-xl font-bold mb-1">Something went wrong</h2>
    <p className="text-sm text-gray-500 mb-6">{message}</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
    >
      <RefreshCcw size={16} />
      Try again
    </button>
  </div>
);

const ResultCard = ({ result, onReset }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
    <div className="bg-gradient-to-br from-red-500 to-orange-500 p-6 md:p-8 text-white">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
        <Sparkles size={14} />
        Your Match
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
        {result.recommendation}
      </h2>
    </div>

    <div className="p-6 md:p-8 space-y-6">
      {result.reasoning && (
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {result.reasoning}
        </p>
      )}

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
          Recommended services
        </h3>
        <ul className="space-y-3">
          {result.services.map((service, i) => (
            <li
              key={service.id}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700"
            >
              <div className="shrink-0 w-9 h-9 rounded-xl bg-red-500/10 ring-1 ring-red-500/20 flex items-center justify-center text-red-500">
                {i === 0 ? <Sparkles size={16} /> : <Check size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{service.name}</p>
                <p className="text-xs text-gray-500">
                  {service.category} · {service.duration} mins
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-500">₹{service.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-900 text-white">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Total time
          </p>
          <p className="text-lg font-bold mt-0.5">
            {result.estimatedMinutes} mins
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Total price
          </p>
          <p className="text-lg font-bold mt-0.5 text-red-400">
            ₹{result.estimatedPrice}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/book?service=${result.recommendedServiceId}`}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-red-500/20 transition-all"
        >
          Book this look
          <ArrowRight size={18} />
        </Link>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
        >
          <RefreshCcw size={16} />
          Retake quiz
        </button>
      </div>
    </div>
  </div>
);
