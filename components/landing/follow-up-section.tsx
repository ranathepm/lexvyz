"use client";

import { useEffect, useState, useRef } from "react";
import { GradientText } from "./gradient-text";

// Follow-up sequence automation — the money is in the follow-up.
// ChatGPT-sourced stats on response time & follow-up impact.
const followUpStats = [
  {
    value: "5 min",
    label: "Response time = 100x more likely to connect with a lead",
  },
  {
    value: "78%",
    label: "of people hire the firm that responds to them first",
  },
  {
    value: "80%",
    label: "of sales need 5+ follow-up touches to close — most firms give up after 1",
  },
  {
    value: "48h",
    label: "— a lead that waits that long is 21x less likely to convert",
  },
];

// Won vs lost lead timeline (in minutes from the call)
const wonTimeline = [
  { t: "0m", label: "Lead calls in", note: "AI answers instantly" },
  { t: "2m", label: "Conversation captured", note: "Details, intent, urgency" },
  { t: "3m", label: "Consultation booked", note: "On the calendar, confirmed" },
  { t: "5m", label: "Lead confirmed", note: "SMS + email reminder sent" },
];

const lostTimeline = [
  { t: "0m", label: "Lead calls in", note: "No answer. No voicemail." },
  { t: "2m", label: "Lead calls the next firm", note: "They answer. They win." },
  { t: "3m", label: "Lead is gone", note: "Your case walks out the door" },
  { t: "5m", label: "Revenue lost", note: "$0 booked. $0 closed." },
];

export function FollowUpSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="follow-up"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[oklch(0.09_0.01_260)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/30" />
            Follow-Up Sequence Automation
          </span>
          <h2 className={`text-5xl md:text-6xl lg:text-[96px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            The money is in
            <br />
            <GradientText text="the follow-up." />
          </h2>
          <p className={`mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            Most firms capture a lead once and never call back. We automate a sequence of SMS + email touches that keeps you first in their mind — until the consultation is booked and the retainer is signed.
          </p>
        </div>

        {/* Follow-up stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 lg:mb-28">
          {followUpStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`p-8 border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="text-4xl lg:text-5xl font-display text-white block mb-3">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Flowchart: won vs lost lead — same card style as the 01/02/03 boxes */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Won timeline — black card with animated pink underline (like step cards) */}
          <div className={`relative bg-[#000000] border border-white/25 p-8 lg:p-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-display text-[#eca8d6]">01</span>
              <div className="flex-1 h-px bg-white/10 overflow-hidden">
                <div className="h-full bg-[#eca8d6]/50 animate-progress" />
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-display text-white mb-8">
              Lead captured — revenue won
            </h3>
            <div className="space-y-0">
              {wonTimeline.map((step, i) => (
                <div key={step.t} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="shrink-0 w-10 h-10 rounded-full border border-white/30 bg-white/5 flex items-center justify-center text-sm font-mono text-white">
                      {step.t}
                    </span>
                    {i < wonTimeline.length - 1 && (
                      <span className="w-px flex-1 bg-white/15 my-1" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-white font-medium">{step.label}</p>
                    <p className="text-sm text-white/50">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-6 border-t border-white/15 flex items-baseline gap-3">
              <span className="text-4xl lg:text-5xl font-display text-white">+$</span>
              <span className="text-white/50 text-sm">
                Case value captured — booked, confirmed, and on the calendar within 5 minutes.
              </span>
            </div>
            {/* Animated pink underline, same as the 01/02/03 cards */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#eca8d6]" />
          </div>

          {/* Lost timeline — same card style */}
          <div className={`relative bg-[#000000] border border-white/25 p-8 lg:p-10 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-display text-white/40">02</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-display text-white mb-8">
              Lead missed — revenue lost
            </h3>
            <div className="space-y-0">
              {lostTimeline.map((step, i) => (
                <div key={step.t} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="shrink-0 w-10 h-10 rounded-full border border-white/30 bg-white/5 flex items-center justify-center text-sm font-mono text-white">
                      {step.t}
                    </span>
                    {i < lostTimeline.length - 1 && (
                      <span className="w-px flex-1 bg-white/15 my-1" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-white font-medium">{step.label}</p>
                    <p className="text-sm text-white/50">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-6 border-t border-white/15 flex items-baseline gap-3">
              <span className="text-4xl lg:text-5xl font-display text-white">$0</span>
              <span className="text-white/50 text-sm">
                No follow-up, no second chance. The firm that responds first takes the case.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
