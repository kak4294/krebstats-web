import React from "react";
import { ExternalLink, Github, TrendingUp, Users, Target, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";

export default function ProjectsSection() {
  const projects = [
    { 
      title: "Post Season Player Reports", 
      description: "Advanced analytics dashboard tracking individual player statistics, shooting efficiency, and performance trends across multiple games.", 
      tech: ["Python", "React", "D3.js"], 
      icon: TrendingUp, 
      color: "from-orange-500 to-amber-500", 
      status: "Completed",
      developers: ["Kyle Krebs"],
      githubUrl: "https://github.com/your-org/player-performance-tracker",
      liveUrl: "https://player-tracker-demo.netlify.app"
    },
    { 
      title: "Comparison of Liberty League Play Action Frequency", 
      description: "Machine learning model that analyzes opponent play patterns to suggest optimal defensive and offensive strategies.", 
      tech: ["Python", "TensorFlow", "Flask"], 
      icon: Target, 
      color: "from-slate-700 to-black", 
      status: "In Progress",
      developers: ["Kyle Krebs"],
      githubUrl: "https://github.com/your-org/team-strategy-analyzer",
      liveUrl: "https://strategy-analyzer-demo.herokuapp.com"
    },
];

  return (
    <section className="relative py-24 bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-amber-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-300/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Projects</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Includes projects developed by club members that were either personal projects or for the aid of RIT Basketball.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group transition-all duration-300 border-slate-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-slate-900">{project.title}</CardTitle>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {project.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900">Developers:</h4>
                  {project.developers.map((developer, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-700 rounded-full text-base font-medium border border-slate-200">{developer}</span>
                  ))}
                </div>

                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900">Tech Stack:</h4>
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-base font-medium border border-slate-200">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}