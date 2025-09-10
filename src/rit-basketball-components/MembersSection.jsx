import React from "react";
import { Linkedin, Github, Mail } from "lucide-react";
import { Card, CardContent } from "../components/ui/card.jsx";

export default function MembersSection() {
  const members = [
    {
      name: "Kyle Krebs",
      role: "Founder & President",
      bio: "As a four-year high school and one-year collegiate basketball player, I have a deep appreciation for the game. I founded the club to provide a collaborative space for students to apply their skills to a shared passion. My long-term goal is to work as a data scientist for the NBA, using analytics to help coaches and players improve performance.",
      favorite: "Favorite NBA Player: Kyle Korver",
      image: "/imgs/Kyle-PFP.png",
      social: { linkedin: "https://www.linkedin.com/in/kyle-krebs-48a62929a/", github: "https://www.github.com/kak4294", email: "mailto:kak4294@rit.edu" },
    },
    {
      name: "Nick Creeley",
      role: "Vice President",
      bio: "I am a fourth-year Computer Science student who believes in the power of combining technology with passion. As a lifelong basketball player, I see the club as a unique opportunity to demonstrate that data science can be both impactful and engaging. My goal is to apply my problem-solving skills to unlock new strategies and insights for the game.",
      favorite: "Favorite NBA Player: Kevin Durant",
      image: "/imgs/Nick-PFP.png",
      social: { linkedin: "https://www.linkedin.com/in/nc8004/", github: "https://www.github.com/nc8004", email: "mailto:nc8004@rit.edu" },
    },
    {
      name: "Lorenzo Tantalo",
      role: "Technical Chair",
      bio: "I joined the club to gain hands-on experience in data science and machine learning, with a particular focus on sports data. My passion lies in using data to provide impactful insights for the RIT Basketball program. While I have a background in soccer and baseball, I am committed to leveraging my skills to elevate the analytics capabilities of our club.",
      favorite: "Favorite Basketball Team: Notre Dame",
      image: "/imgs/Lorenzo-PFP.png",
      social: { linkedin: "#", github: "https://www.github.com/ljt6687", email: "mailto:ljt6687@rit.edu" },
    },
    {
      name: "Michael Grant",
      role: "Data Science Chair",
      bio: "I am a fourth-year PhD student in Microsystems Engineering and a three-year high school varsity point guard. My background includes five years of service in the Marine Corps as a Reconnaissance Man. My expertise in math and statistics is currently focused on NBA data analytics for sports betting, and I'm excited to apply this passion to developing innovative strategies for RIT's basketball teams.",
      favorite: "Favorite NBA Player: Steve Nash",
      image: "/imgs/Mike-PFP.png",
      social: { linkedin: "https://www.linkedin.com/in/mgrant11/", github: "https://github.com/grantmichaelj11", email: "mailto:mg4131@rit.edu" },
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">The passionate individuals driving innovation in basketball analytics at RIT.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {members.map((member, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-white shadow-md group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-semibold text-base mb-2">{member.role}</p>
                  <p className="text-slate-600 text-base mb-1">{member.favorite}</p>
                  <p className="text-slate-600 text-base mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <a href={member.social.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin className="w-4 h-4" /></a>
                    <a href={member.social.github} className="text-slate-400 hover:text-slate-800 transition-colors"><Github className="w-4 h-4" /></a>
                    <a href={member.social.email} className="text-slate-400 hover:text-orange-600 transition-colors"><Mail className="w-4 h-4" /></a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}