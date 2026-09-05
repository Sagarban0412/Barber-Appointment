"use client";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function StyleQuizCard({ variant = "card" }) {
  if (variant === "banner") {
    return (
      <section className="px-4 md:px-6 lg:px-10 xl:px-20 py-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-red-950 ring-1 ring-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-[url('/barbershop.jpg')] bg-cover bg-center opacity-15" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8 md:p-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-semibold text-red-400 uppercase tracking-wider">
                <Sparkles size={14} />
                AI-Powered
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Not sure what suits you?
              </h2>
              <p className="text-gray-400 max-w-md">
                Answer 4 quick questions and our AI barber will recommend a style
                from our menu that fits your face, hair, and lifestyle.
              </p>
            </div>

            <div className="flex md:justify-end">
              <Link
                href="/style-quiz"
                className="group inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <Sparkles size={18} />
                Take the 60-second quiz
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 ring-1 ring-white/10 shadow-lg">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-2xl" />
      <div className="relative p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-xl bg-red-500/15 ring-1 ring-red-500/30 p-3 text-red-400">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Not sure which service to pick?
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Let our AI barber suggest a style that fits you — 60 seconds.
            </p>
          </div>
        </div>
        <Link
          href="/style-quiz"
          className="group inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-red-500/20 transition-all"
        >
          Take the quiz
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
