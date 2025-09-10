import React, { useState } from "react";
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";

export default function EventsSection() {
  const [expandedMonths, setExpandedMonths] = useState({
    september: true
  });

  const toggleMonth = (month) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  const eventsByMonth = {
    september: [
      { 
        title: "Information & General Meeting", 
        date: "September 3, 2025", 
        time: "5:00 PM - 6:30 PM", 
        location: "On Campus - TBD", 
        type: "Meeting", 
        description: "1st In-Person BA Club Meeting! Get introduced to the e-board members and learn about our vision, club structure as a 'mini-company', and how we'll assist the RIT Men's & Women's Basketball Teams.", 
        status: "Upcoming",
      },
      { 
        title: "Club-Wide BBQ", 
        date: "September 6, 2025", 
        time: "1:00 PM - 4:00 PM", 
        location: "TBD", 
        type: "Social", 
        description: "1st BBQ for Basketball Analytics Club! A time for members to get to know each other, play yard games, and eat good food. Feel free to bring friends to introduce them to the club!", 
        status: "Upcoming"
      },
      { 
        title: "Team Interest Meeting", 
        date: "September 10, 2025", 
        time: "5:00 PM - 6:30 PM", 
        location: "On Campus - TBD", 
        type: "Meeting", 
        description: "2nd In-Person BA Club Meeting! Go more in-depth about each club sector, allowing members to find their place and choose the teams they'd like to be part of.", 
        status: "Upcoming",
      },
      { 
        title: "Basketball Competitions & Open Runs", 
        date: "September 13, 2025", 
        time: "1:00 PM - 3:00 PM", 
        location: "TBD", 
        type: "Sports", 
        description: "Another time for members to get to know each other better! Hosted on an outdoor court where we'll all hoop together. Includes knockout, HORSE, and pickup games.", 
        status: "Upcoming",
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Recurring":
        return "bg-slate-100 text-slate-800";
      case "Upcoming":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-300/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-l from-amber-400/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Upcoming Club Events</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Join us for club meetings, social events, basketball activities, and networking opportunities as we kick off our first semester!</p>
        </div>

        {Object.entries(eventsByMonth).map(([month, events]) => (
          <div key={month} className="mb-12">
            <button
              onClick={() => toggleMonth(month)}
              className="w-full flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/30 hover:bg-white/60 transition-all"
            >
              <h3 className="text-2xl font-bold text-slate-900 capitalize">{month} 2025</h3>
              {expandedMonths[month] ? 
                <ChevronUp className="w-6 h-6 text-slate-600" /> : 
                <ChevronDown className="w-6 h-6 text-slate-600" />
              }
            </button>
            
            {expandedMonths[month] && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-slate-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-base font-bold text-slate-900">{event.title}</CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-3 text-slate-600 text-sm">
                        <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /><span>{event.date}</span></div>
                        <div className="flex items-center gap-2"><Clock className="w-3 h-3" /><span>{event.time}</span></div>
                        <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /><span>{event.location}</span></div>
                      </div>
                      <p className="text-slate-600 mb-3 leading-relaxed text-sm">{event.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium border border-slate-200">{event.type}</span>
                        <Badge className={`text-xs ${getStatusColor(event.status)}`}>{event.status}</Badge>
                      </div>
                      <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg font-medium text-sm hover:from-orange-600 hover:to-amber-600 transition-all">
                        RSVP
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
            <p className="text-lg mb-6 opacity-90">Attend our next workshop and discover how you can contribute to basketball analytics at RIT.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://discord.gg/mWRA8dBj" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all">
                Join Discord
              </a>
              <a href="https://campusgroups.rit.edu/BAClub/club_signup" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Club
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}