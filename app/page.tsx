'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Play, 
  CheckCircle2,
  Sun, 
  User, 
  Maximize2, 
  Settings,
} from 'lucide-react';

// shadcn components
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Custom components
import { SidebarModule } from "@/components/sidebar-module";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  level: number;
}

const MODULES: Module[] = [
  {
    id: 'm1',
    level: 1,
    title: 'Akad bakad Bambe Bo',
    lessons: [
      { id: 'l1', title: 'The Sound of Rhythm', duration: '12:00', completed: true },
      { id: 'l2', title: 'Ancient Play Lyrics', duration: '08:45' },
    ]
  },
  {
    id: 'm2',
    level: 2,
    title: 'Bakad Akad Bo Bambe',
    lessons: [
      { id: 'l3', title: 'Metric Patterns', duration: '15:20' },
      { id: 'l4', title: 'Cultural Heritage', duration: '10:10' },
    ]
  },
  {
    id: 'm3',
    level: 3,
    title: 'What is NLP, Data Science',
    lessons: [
      { id: 'l5', title: 'Foundational Concepts', duration: '12:00' },
      { id: 'l6', title: 'Language Processing', duration: '12:00' },
      { id: 'l7', title: 'Transformer Models', duration: '12:00' },
      { id: 'l8', title: 'Neural Networks', duration: '12:00' },
      { id: 'l9', title: 'Python for Science', duration: '12:00' },
      { id: 'la', title: 'Visualization Techniques', duration: '12:00' },
    ]
  },
  {
    id: 'm4',
    level: 4,
    title: 'There are some title which is now disclosed here',
    lessons: [
      { id: 'lb', title: 'Video 1', duration: '12:00' },
      { id: 'lc', title: 'Video 2', duration: '12:00' },
    ]
  },
  {
    id: 'm5',
    level: 5,
    title: 'Advanced Machine Learning',
    lessons: [
      { id: 'ld', title: 'Gradient Boosting', duration: '15:00' },
      { id: 'le', title: 'Ensemble Methods', duration: '11:00' },
    ]
  },
  {
    id: 'm6',
    level: 6,
    title: 'Deep Learning Roots',
    lessons: [
      { id: 'lg', title: 'CNN Architecture', duration: '25:00' },
    ]
  },
  {
    id: 'm7',
    level: 7,
    title: 'Natural Language Processing',
    lessons: [
      { id: 'lh', title: 'Tokenization', duration: '19:00' },
    ]
  }
];

export default function NaturaApp() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(MODULES[2].id);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(MODULES[2].lessons[0].id);

  const activeModule = MODULES.find(m => m.id === activeModuleId);
  const activeLesson = activeModule?.lessons.find(l => l.id === activeLessonId);

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      {/* Top Navigation */}
      <nav className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-100 shrink-0 z-50">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-olive rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-full" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-800 font-serif">KNOTLOOP</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-sage transition-colors">Home</a>
            <a href="#" className="hover:text-sage transition-colors">Explore</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button variant="ghost" size="sm" className="bg-white shadow-sm h-8 px-3">En</Button>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
              <Sun size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 bg-white rounded-md shadow-sm">
                <Settings size={18} />
            </Button>
          </div>
          <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center border-2 border-sage/20">
            <User size={20} className="text-olive" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-[360px] bg-cream/30 border-r border-gray-100 flex flex-col h-full shrink-0">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-olive mb-6 flex items-center gap-2 font-serif">
               Loop Content
            </h2>
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-olive">Course Progress</span>
                  <span className="text-xs font-bold text-olive">12%</span>
               </div>
               <Progress value={12} className="h-2 bg-sage/20" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-12 pt-6 space-y-2 relative">
            {MODULES.map((module, index) => (
              <SidebarModule 
                key={module.id}
                module={module}
                isActive={activeModuleId === module.id}
                onToggle={() => setActiveModuleId(activeModuleId === module.id ? null : module.id)}
                activeLessonId={activeLessonId}
                onLessonSelect={(id) => setActiveLessonId(id)}
                isLast={index === MODULES.length - 1}
              />
            ))}
          </div>
        </aside>

        {/* Major Content - Video Player/Info */}
        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          <div className="max-w-4xl mx-auto py-10 px-12">
            
            {/* Context Navigation Tabs */}
            <Tabs defaultValue="Knot 2" className="mb-10">
               <TabsList className="bg-transparent h-auto p-0 gap-12 border-b rounded-none w-full justify-start">
                  {['Psychology', 'Loop 2', 'Knot 2'].map((tab) => (
                    <TabsTrigger 
                      key={tab} 
                      value={tab}
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-sage rounded-none pb-4 px-0 text-sm font-medium transition-all text-gray-400 hover:text-gray-600 data-[state=active]:text-olive"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
               </TabsList>
            </Tabs>

            {/* Video Player Card */}
            <Card className="relative aspect-video bg-stone-900 rounded-[40px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] group mb-10 border-4 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2000&auto=format&fit=crop" 
                alt="Teacher explaining at chalkboard"
                 className="w-full h-full object-cover opacity-80"
                 fill
                 referrerPolicy="no-referrer"
              />
              
              {/* Media Controls Layout */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-x-0 bottom-0 p-10">
                  <div className="w-full mb-8">
                     <Progress value={42} className="h-1 bg-white/30" />
                  </div>
                  
                  <div className="flex items-center justify-between text-white/90">
                    <div className="flex items-center gap-8">
                       <Play className="fill-white" size={24} />
                       <span className="text-sm font-mono tracking-wider opacity-80">5:00 / 12:00</span>
                    </div>
                    <div className="flex items-center gap-8">
                       <Settings size={20} className="hover:text-sage cursor-pointer" />
                       <Maximize2 size={20} className="hover:text-sage cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Center Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <motion.button 
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl group-hover:bg-olive group-hover:border-sage transition-all cursor-pointer"
                 >
                   <Play size={36} fill="currentColor" className="text-white ml-1" />
                 </motion.button>
              </div>
            </Card>

            {/* Lesson Title & Global Action */}
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight font-serif">
                    {activeModule?.level}: {activeLesson?.title || activeModule?.title}
                  </h1>
                  <p className="text-gray-400 font-medium">Topic: Artificial Intelligence & Data Architecture</p>
               </div>
               <button className="w-16 h-16 bg-olive rounded-full flex items-center justify-center text-white shadow-2xl shadow-olive/40 hover:translate-y-[-4px] active:translate-y-[0px] transition-all">
                  <Play size={28} fill="white" />
               </button>
            </div>

            {/* Feature Tabs section */}
            <Tabs defaultValue="Overview">
              <TabsList className="bg-transparent h-auto p-0 gap-10 border-b rounded-none w-full justify-start mb-10 overflow-x-auto no-scrollbar">
                {['Overview', 'Notes', 'QnA', 'Announcements', 'Reviews'].map((tab) => (
                  <TabsTrigger 
                    key={tab} 
                    value={tab}
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-sage rounded-none pb-4 px-0 text-sm font-bold transition-all text-gray-400 data-[state=active]:text-olive"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="Overview" className="mt-0">
                <div className="flex flex-col xl:flex-row gap-10 items-start">
                   <div className="flex-1 bg-cream/50 rounded-[40px] p-10 border border-sage/10">
                      <div className="prose prose-stone max-w-none">
                        <p className="text-gray-700 leading-[1.8]">
                          Are you looking to master Data Science, Machine Learning (ML), Deep Learning (DL) and Natural Language Processing (NLP) from the ground up?
                          This comprehensive course is designed to take you on a journey from understanding the basics to mastering advanced concepts, all while
                          providing practical insights and hands-on experience.
                        </p>
                        <h4 className="text-lg font-bold text-gray-900 mt-8 mb-4">What You'll Learn:</h4>
                        <ul className="space-y-4 list-none p-0">
                          {[
                            'Foundational Concepts: Start with the basics of ML and NLP, including algorithms, models, and techniques.',
                            'Advanced Topics: Dive deeper into models like transformers and attention mechanisms.',
                            'Industry-standard Tools: Familiarize yourself with PyTorch, Scikit-learn, and more.',
                          ].map((item, i) => (
                            <li key={i} className="flex gap-3">
                               <div className="w-2 h-2 rounded-full bg-sage mt-2.5 shrink-0" />
                               <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                   </div>

                   {/* Sticky Notes Card like in inspiration */}
                   <Card className="w-full xl:w-80 bg-cream/80 rounded-[32px] p-8 border border-white relative overflow-hidden shrink-0 shadow-lg shadow-olive/5">
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center text-sage">
                        <CheckCircle2 size={18} />
                      </div>
                      <CardHeader className="p-0 mb-6 font-serif">
                        <CardTitle className="text-lg font-bold text-gray-900">Weekly Reflection</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-xs text-gray-500 leading-loose italic">
                          "Growth happens at the roots. Always cross-reference the transformer architecture with the underlying attention matrices..."
                        </p>
                        <p className="text-xs text-gray-500 leading-loose mt-4">
                          Machine learning is best understood through iterative practice. Don't skip the Capstone!
                        </p>
                      </CardContent>
                   </Card>
                </div>
              </TabsContent>
              {/* Other contents would go here */}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
