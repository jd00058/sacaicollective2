"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Network, Lightbulb, Code2, X } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';
import Script from 'next/script';

export default function App() {
  const [showForm, setShowForm] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]); // Slowed down by 40%
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.2]); // Doesn't fade out as abruptly
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]); // Slowed down by 40%

  return (
    <main className="bg-[#050505] text-white overflow-x-hidden flex flex-col min-h-screen w-full">
      <div className="min-h-screen relative flex flex-col overflow-hidden w-full">
        {/* Mux Video Background */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{ opacity: videoOpacity, scale: videoScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/20 to-[#050505] z-10" />
          <MuxPlayer
            playbackId="Jwr2RhmsNrd6GEspBNgm02vJsRZAGlaoQIh4AucGdASw"
            autoPlay="muted"
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>

        {/* Background Ambient Glows (Luma inspired) */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-zinc-800/30 blur-[120px] pointer-events-none mix-blend-screen z-10" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-neutral-800/20 blur-[120px] pointer-events-none mix-blend-screen z-10" />

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-tight text-lg">AI Collective <span className="text-white/50 font-normal">Sacramento</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
            <a href="#mission" className="hover:text-white transition-colors">Mission</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </div>
        </nav>

        {/* Main Content */}
        <motion.main
          ref={heroRef as any}
          style={{ opacity: heroOpacity, y: heroY }}
          className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-20 w-full max-w-4xl mx-auto text-center min-h-[80vh]"
        >

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-white/60" />
            <span>Sacramento and Surrounding Areas</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Shape the future of AI <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              in Sacramento.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join a community of builders, researchers, and enthusiasts. We are democratizing AI knowledge, fostering collaboration, and building a thriving local ecosystem for innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mx-auto"
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setShowForm(true)}
                className="group flex overflow-hidden uppercase transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] focus:outline-none text-sm font-bold text-slate-900 tracking-widest rounded-full pt-5 pr-12 pb-5 pl-12 relative items-center justify-center w-full bg-gradient-to-r from-slate-100 to-slate-300 ring-1 ring-white/50"
              >
                <span className="relative z-10">
                  Join the Collective
                </span>
                <ArrowRight className="relative z-10 ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <p className="text-xs text-white/40 mt-4">
              By joining, you agree to receive updates about AI Collective Sacramento events.
            </p>
          </motion.div>
        </motion.main>
      </div>

      {/* Features / Mission Section */}
      <section id="mission" className="overflow-hidden lg:py-24 bg-[url(https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/72c90007-7638-4902-8dda-5a6c20e92741_3840w.jpg)] bg-cover pt-16 pb-16 relative border-t border-white/10">
        {/* Decorative grid lines */}
        <div className="pointer-events-none z-0 absolute inset-0">
          <div className="absolute inset-y-0 left-[12.5%] w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-y-0 left-[37.5%] w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent"></div>
          <div className="absolute inset-y-0 left-[62.5%] w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="max-w-3xl">
            <div className="inline-flex text-[11px] ring-1 ring-white/10 font-medium text-white/70 bg-white/5 rounded-full pt-1.5 pr-3 pb-1.5 pl-3 gap-x-2 gap-y-2 items-center">Our Mission</div>
            <h2 className="mt-4 sm:text-5xl md:text-6xl text-4xl font-normal tracking-tighter">
              Experience AI-Powered Community
            </h2>
            <p className="md:mt-4 mt-3 md:text-lg text-base text-white/70 leading-relaxed">
              Join a thriving ecosystem of innovators. We provide the connections, knowledge, and resources to help you build the future of AI in Sacramento.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10 gap-x-6 gap-y-6">
            {/* Card 1 */}
            <div className="md:p-6 overflow-hidden bg-slate-900/50 ring-white/10 ring-1 rounded-3xl pt-5 pr-5 pb-5 pl-5 backdrop-blur-md">
              <h3 className="text-xl md:text-2xl font-normal tracking-tighter">Connect & Collaborate</h3>
              <p className="mt-2 text-sm text-slate-400">
                Meet local AI founders, engineers, and creatives. Build meaningful relationships that lead to the next generation of AI products.
              </p>

              {/* Mini UI */}
              <div className="mt-5 rounded-2xl bg-black/30 ring-1 ring-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs text-slate-300">
                    <Network className="w-4 h-4 opacity-80" />
                    Network
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/5 ring-1 ring-white/10 px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span className="text-[10px] text-slate-200">Active</span>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="text-[11px] text-slate-300/90 flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-white/20"></div> Sarah joined the community</div>
                  <div className="text-[11px] text-slate-300/90 flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-white/20"></div> New meetup scheduled</div>
                  <div className="text-[11px] text-slate-300/90 flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-white/20"></div> Project collaboration started</div>
                </div>
              </div>
            </div>

            {/* Card 2 (highlight) */}
            <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/15 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md flex flex-col min-h-[300px]">
              <div className="absolute inset-0">
                <div className="bg-gradient-to-t from-[#050505]/90 via-[#050505]/40 to-transparent absolute top-0 right-0 bottom-0 left-0"></div>
              </div>
              <div className="relative p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-normal tracking-tighter">Learn & Grow</h3>
                <p className="mt-2 text-sm text-slate-200/80">
                  Stay at the bleeding edge of AI. Participate in workshops, tech talks, and hackathons designed to elevate your skills.
                </p>
              </div>
              <div className="relative p-5 md:p-6 pt-0 mt-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/80 ring-1 ring-white/15 backdrop-blur-md">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Workshops & Tech Talks
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="md:p-6 overflow-hidden bg-slate-900/50 ring-white/10 ring-1 rounded-3xl pt-5 pr-5 pb-5 pl-5 backdrop-blur-md">
              <h3 className="text-xl md:text-2xl font-normal tracking-tighter">Build the Future</h3>
              <p className="mt-2 text-sm text-slate-400">
                Turn ideas into reality. We provide the community, resources, and feedback you need to build impactful AI solutions.
              </p>

              {/* Template preview */}
              <div className="mt-5 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),rgba(2,6,23,0.6))] ring-1 ring-white/10 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-slate-200" />
                  </div>
                  <div>
                    <p className="text-sm font-normal text-slate-200">Project Launchpad</p>
                    <p className="text-[11px] text-slate-400">From concept to deployment</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span>Ideation Phase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span>Prototyping</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 w-[60%]"></div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-right">60% to MVP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center">
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} AI Collective Sacramento. All rights reserved.
        </p>
      </footer>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#050505] border border-white/10 rounded-2xl overflow-hidden h-[85vh] shadow-[0_0_100px_-20px_rgba(234,88,12,0.3)] flex flex-col"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white bg-black/50 hover:bg-white/10 rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-full overflow-y-auto pt-16 px-4 pb-4 bg-zinc-950">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/oMXF7bIGVIB75TA29WGx"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
                  id="inline-oMXF7bIGVIB75TA29WGx"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="LP Signup"
                  data-height="763"
                  data-layout-iframe-id="inline-oMXF7bIGVIB75TA29WGx"
                  data-form-id="oMXF7bIGVIB75TA29WGx"
                  title="LP Signup"
                />
                <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
