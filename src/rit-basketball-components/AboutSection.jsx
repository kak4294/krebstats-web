import React from "react";
import { Target, Users, TrendingUp, Award } from "lucide-react";

export default function AboutSection() {
  const values = [
    { icon: Users, title: "Open to All Students", description: "A home for players and non-players who want to study basketball through data." },
    { icon: Target, title: "Real Impact for RIT Teams", description: "We provide opponent scouting, player evaluations, and performance reports for the men's and women's programs." },
    { icon: TrendingUp, title: "Practical Skill Building", description: "Learn analysis, coding, and communication by working on real projects." },
    { icon: Award, title: "Portfolio and Career Growth", description: "Showcase finished work online to strengthen resumes and professional profiles." },
  ];
  

  return (
    <section className="relative py-24 bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-300/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-l from-amber-400/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">About Our Club</h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              The Basketball Analytics Club at RIT brings together students, including both players and non-players, who want to study the game through data. We turn statistics into clear, useful insights for coaches and athletes, while members build practical skills in analysis, coding, and communication.            </p>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We partner with RIT's men's and women's teams to deliver opponent scouting, player evaluations, and performance reports that support decision making in the Liberty League. Members complete real projects they can showcase in a portfolio, gaining experience that applies to sports analytics and other fields.            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-extrabold text-orange-600">40+</div>
                <div className="text-slate-600">Active Members</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-extrabold text-orange-600">6</div>
                <div className="text-slate-600">Months Running</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-extrabold text-orange-600">5+</div>
                <div className="text-slate-600">Different Majors</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-8 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                </div>
                <p className="text-slate-600 text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}