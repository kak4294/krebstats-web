import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button.jsx";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-orange-400/20 via-orange-300/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-orange-500/15 via-amber-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-300/20 to-amber-200/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-l from-orange-400/25 to-orange-200/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center animate-[fadeInUp_1.2s_ease-out]">
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 bg-orange-500/10 text-orange-600 px-6 py-3 rounded-full mb-8 animate-[fadeInUp_1.2s_ease-out_0.2s_both]">
            <TrendingUp className="w-5 h-5" />
            <span className="text-base md:text-lg font-medium">Data-Driven Basketball Analytics</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-slate-900 mb-8 tracking-tight leading-none animate-[fadeInUp_1.2s_ease-out_0.4s_both]">
            RIT Basketball
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500"> Analytics</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-[fadeInUp_1.2s_ease-out_0.6s_both]">
            Led by the Basketball Analytics Club at RIT, we are a group of students who are passionate about helping RIT basketball win more games using the power of data.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-[fadeInUp_1.2s_ease-out_0.8s_both]">

          <Button 
            variant="outline" size="lg" className="px-10 py-4 text-xl"
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}