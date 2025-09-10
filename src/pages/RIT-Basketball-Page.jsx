import React from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Trophy, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  Github,
  Linkedin,
  Mail
} from "lucide-react";

import HeroSection from "../rit-basketball-components/HeroSection.jsx";
import ProjectsSection from "../rit-basketball-components/ProjectsSection.jsx";
import AboutSection from "../rit-basketball-components/AboutSection.jsx";
import MembersSection from "../rit-basketball-components/MembersSection.jsx";
import EventsSection from "../rit-basketball-components/EventsSection.jsx";
import StatsSection from "../rit-basketball-components/StatsSection.jsx";

export default function RITBasketballPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="space-y-0">
        <section id="stats">
          <StatsSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="members">
          <MembersSection />
        </section>
        <section id="events">
          <EventsSection />
        </section>
      </div>
      <footer className="bg-slate-900 text-white py-16 mt-0">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg" />
                <h3 className="text-xl font-bold">RIT Basketball Analytics</h3>
              </div>
              <p className="text-gray-300 mb-6">Empowering student athletes and advancing basketball analytics through data-driven insights.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#projects" className="block text-gray-300 hover:text-orange-400 transition-colors">Our Projects</a>
                <a href="#about" className="block text-gray-300 hover:text-orange-400 transition-colors">About Us</a>
                <a href="#members" className="block text-gray-300 hover:text-orange-400 transition-colors">Meet the Team</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RIT Basketball Analytics Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}