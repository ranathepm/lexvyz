"use client";

import { useEffect, useState, useRef } from "react";

const integrations = [
  // Voice AI — AI receptionist core
  { name: "VAPI", category: "Voice AI", logo: "/images/logos/vapi.png" },
  { name: "Retell AI", category: "Voice AI", logo: "/images/logos/retell.png" },
  { name: "Bland AI", category: "Voice AI", logo: "/images/logos/bland.png" },
  { name: "ElevenLabs", category: "Voice AI", logo: "/images/logos/elevenlabs.png" },
  { name: "PlayAI", category: "Voice AI", logo: "/images/logos/play.png" },
  { name: "Synthflow", category: "Voice AI", logo: "/images/logos/synthflow.png" },
  // LLMs
  { name: "OpenAI", category: "LLM", logo: "/images/logos/openai.png" },
  { name: "Anthropic", category: "LLM", logo: "/images/logos/anthropic.png" },
  { name: "Gemini", category: "LLM", logo: "/images/logos/gemini.png" },
  { name: "Llama", category: "LLM", logo: "/images/logos/llama.png" },
  { name: "Mistral", category: "LLM", logo: "/images/logos/mistral.png" },
  { name: "Grok", category: "LLM", logo: "/images/logos/grok.png" },
  // Automation & CRM
  { name: "GoHighLevel", category: "CRM", logo: "/images/logos/gohighlevel.png" },
  { name: "HubSpot", category: "CRM", logo: "/images/logos/hubspot.png" },
  { name: "Zapier", category: "Automation", logo: "/images/logos/zapier.png" },
  { name: "Make", category: "Automation", logo: "/images/logos/make.png" },
  { name: "n8n", category: "Automation", logo: "/images/logos/n8n.png" },
  { name: "Voiceflow", category: "Chatbot", logo: "/images/logos/voiceflow.png" },
  { name: "Botpress", category: "Chatbot", logo: "/images/logos/botpress.png" },
  // Comms & scheduling
  { name: "Twilio", category: "SMS", logo: "/images/logos/twilio.png" },
  { name: "Calendly", category: "Calendar", logo: "/images/logos/calendly.png" },
  { name: "Airtable", category: "Database", logo: "/images/logos/airtable.png" },
  { name: "Slack", category: "Comms", logo: "/images/logos/slack.png" },
  { name: "Google", category: "SEO", logo: "/images/logos/google.png" },
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
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-16">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className={`group relative overflow-hidden p-4 lg:p-5 border transition-all duration-500 cursor-default ${
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

              {/* Logo — official brand color, uniform size, centered */}
              <div className="h-10 mb-4 flex items-center justify-center">
                <img
                  src={integration.logo}
                  alt={`${integration.name} logo`}
                  className="w-8 h-8 object-contain"
                />
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
              { value: "24+", label: "Integrations" },
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
