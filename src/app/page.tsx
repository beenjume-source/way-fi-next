import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import WorkflowVisualizer from "@/components/WorkflowVisualizer";
import ConciergeBot from "@/components/ConciergeBot";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TerminalLeadMagnet from "@/components/TerminalLeadMagnet";
import AIAgents from "@/components/AIAgents";
import { Instagram, Linkedin, Twitter, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />

      {/* SECCIÓN CLAVE: El Motor de Inteligencia (Live Agent Demo) */}
      <section id="demo" className="py-24 bg-app relative overflow-hidden">
        {/* sol.png background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-[0.05] pointer-events-none select-none">
          <Image src="/images/way-fi/sol.png" alt="" fill className="object-contain grayscale" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">El Motor de Inteligencia</h2>
            <p className="text-muted">Visualiza en tiempo real cómo nuestros agentes orquestan sus procesos.</p>
          </div>

          <div className="h-[600px] glass rounded-3xl overflow-hidden relative">
            <WorkflowVisualizer />
          </div>
        </div>
      </section>

      <ServicesSection />

      <AIAgents />

      <PricingSection />

      <TerminalLeadMagnet />

      <ConciergeBot />

      {/* Footer Premium & Minimalist */}
      <footer className="py-24 border-t border-app bg-app relative overflow-hidden">
        {/* Wall of logos: multi-theme subtle texture */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.02] grayscale pointer-events-none select-none flex flex-wrap justify-between items-center gap-24 p-24">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="relative w-40 h-40">
              <Image src="/images/way-fi/logo.png" alt="" fill className="object-contain" />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">

            {/* Top Branding Section */}
            <div className="mb-16 text-center">
              <div className="relative w-16 h-16 mx-auto mb-8 grayscale hover:grayscale-0 transition-all duration-1000 cursor-help">
                <Image src="/images/way-fi/logo.png" alt="WayFi Logo Icon" fill className="object-contain" />
              </div>
              <h3 className="text-3xl font-black tracking-[-0.05em] text-foreground mb-4">WAY-FI</h3>
              <p className="text-muted text-[11px] uppercase tracking-[0.5em] font-medium opacity-60">
                Agencia de Ecosistemas Digitales
              </p>
            </div>

            {/* Middle: Links & Socials Grid */}
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-12 border-y border-app py-12 mb-12">
              <div className="flex flex-col items-center md:items-start gap-4">
                <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2">Conecta con nosotros</span>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-11 h-11 glass rounded-full flex items-center justify-center text-muted hover:text-cyan-400 hover:border-cyan-500/30 transition-all shadow-xl">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-11 h-11 glass rounded-full flex items-center justify-center text-muted hover:text-cyan-400 hover:border-cyan-500/30 transition-all shadow-xl">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-11 h-11 glass rounded-full flex items-center justify-center text-muted hover:text-cyan-400 hover:border-cyan-500/30 transition-all shadow-xl">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-4">
                <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2">Canal Directo</span>
                <a
                  href="https://wa.me/522271009744"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 glass rounded-2xl text-cyan-400 hover:bg-cyan-500/10 transition-all group border border-cyan-500/20 shadow-lg shadow-cyan-500/5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest">+52 227 100 9744</span>
                </a>
              </div>
            </div>

            {/* Bottom: Legal & Small Branding */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
              <p className="text-[9px] font-medium tracking-widest uppercase text-foreground">&copy; 2026 Way-FI Collective.</p>
              <div className="flex gap-8 text-[9px] font-medium tracking-widest uppercase">
                <a href="#" className="hover:text-foreground transition-colors text-muted">Privacy Ops</a>
                <a href="#" className="hover:text-foreground transition-colors text-muted">Terms of Service</a>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Glows */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
      </footer>
    </main>
  );
}
