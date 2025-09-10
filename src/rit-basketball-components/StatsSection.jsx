import React from "react";
import { Users, Trophy, BarChart3, Target } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { icon: Users, number: "40+", label: "Active Members", gradient: "from-slate-700 to-black" },
    { icon: Trophy, number: "2", label: "Projects Completed", gradient: "from-orange-500 to-amber-500" },
    { icon: BarChart3, number: "20+", label: "Total Meetings", gradient: "from-slate-600 to-slate-800" },
    { icon: Target, number: "5 Months", label: "Club Lifetime", gradient: "from-orange-400 to-orange-600" },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-300/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-l from-amber-400/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-2">{stat.number}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}