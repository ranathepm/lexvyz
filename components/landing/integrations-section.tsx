"use client";

import { useEffect, useState, useRef } from "react";

const integrations = [
  { name: "GoHighLevel", category: "CRM", logo: "/images/logos/gohighlevel.png" },
  { name: "VAPI", category: "Voice", logo: "/images/logos/vapi.png" },
  {
    name: "LLMs",
    category: "LLM",
    logos: [
      { name: "OpenAI", logo: "/images/logos/openai.png" },
      { name: "Anthropic", logo: "/images/logos/anthropic.png" },
      { name: "Gemini", logo: "/images/logos/gemini.png" },
      { name: "Llama", logo: "/images/logos/llama.png" },
      { name: "Mistral", logo: "/images/logos/mistral.png" },
      { name: "Grok", logo: "/images/logos/grok.png" },
      { name: "DeepSeek", logo: "/images/logos/deepseek.png" },
      { name: "Claude", logo: "/images/logos/claude.png" },
    ],
  },
  { name: "ElevenLabs", category: "Voice", logo: "/images/logos/elevenlabs.png" },
  { name: "Twilio", category: "SMS", logo: "/images/logos/twilio.png" },
  { name: "Calendly", category: "Calendar", logo: "/images/logos/calendly.png" },
  { name: "Zapier", category: "Auto", logo: "/images/logos/zapier.png" },
  { name: "Google", category: "SEO", logo: "/images/logos/google.png" },
  { name: "Clio", category: "Legal", logo: "/images/logos/clio.png" },
  { name: "MyCase", category: "Legal", logo: "/images/logos/mycase.png" },
  { name: "LawPay", category: "Payments", logo: "/images/logos/lawpay.png" },
  { name: "Avvo", category: "Directories", logo: "/images/logos/avvo.png" },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
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
    <section id="integrations" ref={sectionRef} className="relative overflow-hidden">

      {/* Header — centré verticalement sur l'image */}
      <div className="relative z-10 pt-16 lg:pt-20 text-center">
        <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="w-12 h-px bg-foreground/20" />
          Integrations
          <span className="w-12 h-px bg-foreground/20" />
        </span>

        {/* Meta description — on top */}
        <p className={`mt-0 mb-8 text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          Your AI system plugs into the tools your firm already uses — legal CRMs, calendars, phone lines, and directories.
        </p>

        {/* H1 — one line, directly above the hands image */}
        <h2 className={`text-5xl md:text-7xl lg:text-[96px] font-display tracking-tight leading-[1] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Connect your stack.
        </h2>
      </div>

      {/* Full-width image */}
      <div className={`relative left-1/2 -translate-x-1/2 w-screen -mt-16 transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Integration grid — remonte sur l'image avec spacing mobile approprié */}
      <div className="relative z-10 mt-0 lg:-mt-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className={`group relative overflow-hidden p-6 lg:p-8 border transition-all duration-500 cursor-default ${
                hoveredIndex === index
                  ? "border-foreground bg-foreground/[0.04] scale-[1.02]"
                  : "border-foreground/10 hover:border-foreground/30"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${index * 30 + 300}ms`,
              }}
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setMousePos(null);
              }}
            >
              {/* Cursor-following halo */}
              {hoveredIndex === index && mousePos && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                  }}
                />
              )}
              {/* Category tag */}
              <span className={`absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 transition-colors ${
                hoveredIndex === index
                  ? "bg-foreground text-background"
                  : "bg-foreground/10 text-muted-foreground"
              }`}>
                {integration.category}
              </span>

              {/* Logo — white monochrome, uniform size, centered */}
              <div className="h-16 mb-6 flex items-center justify-center">
                {integration.logos ? (
                  <div className="grid grid-cols-4 gap-x-3 gap-y-3 w-full max-w-[220px]">
                    {integration.logos.map((llm) => (
                      <div key={llm.name} className="flex items-center justify-center" title={llm.name}>
                        <img
                          src={llm.logo}
                          alt={`${llm.name} logo`}
                          className="w-8 h-8 object-contain brightness-0 invert"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <img
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    className="w-10 h-10 object-contain brightness-0 invert"
                  />
                )}
              </div>

              <span className="font-medium block">{integration.name}</span>

              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20 overflow-hidden">
                <div className={`h-full bg-foreground transition-all duration-500 ${
                  hoveredIndex === index ? "w-full" : "w-0"
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats row */}
        <div className={`flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 pb-32 lg:pb-40 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-12">
            {[
              { value: "12+", label: "Integrations" },
              { value: "OAuth", label: "Secure by default" },
              { value: "24/7", label: "Always on" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-3xl font-display">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          <a href="#" className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
            View all integrations
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
