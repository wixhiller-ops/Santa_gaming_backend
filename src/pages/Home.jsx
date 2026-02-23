import React from "react";
import { AGENT_LINKS } from "../data/agentLinks";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col py-6 px-4 pb-8 max-w-[1120px] mx-auto">
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 bg-slate-900/90 text-gray-200 text-[11px] font-medium uppercase tracking-wider">
          Agent Portal
        </div>
        <h1 className="mt-2.5 mb-1.5 text-3xl md:text-4xl font-black tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Santa Gaming Agents
        </h1>
        <p className="m-0 text-gray-400 text-sm">
          All your agent dashboards in one clean, fast launcher.
        </p>
      </header>

      <main className="flex-1">
        <section className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4" aria-label="Agent game links">
          {AGENT_LINKS.map((link) => {
            const bg = link.imageKey;

            return (
              <article
                key={link.name}
                className="relative p-4 rounded-xl bg-slate-900/90 border border-slate-400/40 shadow-xl flex flex-col gap-2 transition-all duration-150 hover:-translate-y-1 hover:border-slate-300/50 hover:shadow-2xl group bg-cover bg-center bg-no-repeat"
                style={
                  bg
                    ? {
                        backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.75)), url(${bg})`,
                      }
                    : undefined
                }
              >
                <div className="relative z-10">
                  <h2 className="m-0 text-base font-semibold bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
                    {link.name}
                  </h2>
                  <p className="m-0 text-sm text-gray-400">
                    Open the {link.name} agent panel.
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2.5 self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-400/60 bg-slate-900/95 text-gray-200 text-xs font-medium uppercase tracking-wider no-underline transition-all duration-150 hover:-translate-y-0.5 hover:border-white/70 hover:bg-slate-800/98"
                  >
                    Open Agent
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <footer className="mt-7 text-center text-[11px] text-gray-500 opacity-90">
        Tip: Pin this tab for faster access.
      </footer>
    </div>
  );
}