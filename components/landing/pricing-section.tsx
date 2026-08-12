"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Basic",
    description: "For the firm that just needs to stop missing calls.",
    price: { monthly: 397, annual: 397 },
    setupFee: 1500,
    roi: "Hypothetically, even 1 extra case a year covers this. 2 extra cases could mean $10K+ more revenue.",
    features: [
      "AI chatbot — 24/7 lead capture",
      "Basic CRM (GoHighLevel) setup",
      "Calendly integration",
      "1 automated email sequence",
      "Email support (48h)",
    ],
    cta: "Start with Basic",
    highlight: false,
  },
  {
    name: "Recommended",
    description: "The complete client capture system — every lead, every time.",
    price: { monthly: 797, annual: 797 },
    setupFee: 2500,
    roi: "The most popular choice. Hypothetically, 40–60% more consultations from your existing call volume can translate into $50K–$150K+ in recovered revenue a year.",
    features: [
      "AI voice receptionist — 24/7",
      "AI client intake + qualification",
      "AI chatbot (website + SMS)",
      "Follow-up sequence automation",
      "Full legal CRM + pipeline",
      "Email + SMS automation",
      "Missed-call text-back",
      "Real-time dashboard",
      "Monthly check-in call",
    ],
    cta: "Get Recommended",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Premium",
    description: "The full-stack growth engine — we build, run, and optimize everything.",
    price: { monthly: 2797, annual: 2797 },
    setupFee: 4000,
    roi: "For firms ready to dominate. Hypothetically, a 3-pack ranking + review engine can bring 5–15 new qualified leads a month — each worth $3K–$15K.",
    features: [
      "Everything in Recommended",
      "Custom high-converting website",
      "Premium AI voice (ElevenLabs)",
      "Local SEO + review generation",
      "Citation management (30+ dirs)",
      "Practice-area pages",
      "Monthly SEO reporting",
      "Weekly check-in + priority support",
    ],
    cta: "Go Premium",
    highlight: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
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
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Dramatic offset */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Pricing
            </span>
            <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Recover
              <br />
              <span className="text-stroke">revenue.</span>
            </h2>
          </div>
          
          <div className="lg:col-span-5 relative p-0 h-96 lg:h-auto">
            {/* Whale image */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              <img
                src="/images/whale.webp"
                alt="Organic whale"
                className="w-full h-full object-contain object-center"
              />
            </div>

          </div>
        </div>

        {/* Pricing cards - Horizontal layout with overlap */}
        <div className="relative">
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-0">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-background border transition-all duration-700 ${
                  plan.highlight 
                    ? "border-foreground lg:-mx-2 lg:z-10 lg:scale-105" 
                    : "border-foreground/10 lg:first:-mr-2 lg:last:-ml-2"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-8 right-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-widest">
                      <Zap className="w-3 h-3" />
                      {plan.badge ?? "Most Popular"}
                    </span>
                  </div>
                )}

                <div className="p-8 lg:p-10">
                  {/* Plan header */}
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-display mt-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.price.monthly !== null ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl lg:text-6xl font-display">
                          ${isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-muted-foreground text-sm">/month</span>
                      </div>
                    ) : (
                      <span className="text-4xl font-display">Custom</span>
                    )}
                    {plan.price.monthly !== null && plan.price.monthly > 0 && (
                      <p className="text-xs text-muted-foreground mt-2 font-mono">
                        + ${plan.setupFee?.toLocaleString() ?? 0} one-time setup
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#eca8d6] mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hypothetical ROI line */}
                  {plan.roi && (
                    <div className="mb-8 p-4 border border-[#eca8d6]/25 bg-[#eca8d6]/[0.05]">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="text-[#eca8d6] font-mono uppercase tracking-wider text-[10px] block mb-1">
                          Hypothetical ROI
                        </span>
                        {plan.roi}
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                      plan.highlight
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note with icons */}
        <div className={`mt-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              24/7 call answering
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              No long-term contracts
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Cancel anytime
            </span>
          </div>
          <a href="#" className="text-sm underline underline-offset-4 hover:text-foreground transition-colors">
            Book a free intake audit
          </a>
        </div>
      </div>

      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 1.5px currentColor;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
}
