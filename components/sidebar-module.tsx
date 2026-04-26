import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, CheckCircle2 } from 'lucide-react';

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

interface SidebarModuleProps {
  module: Module;
  isActive: boolean;
  onToggle: () => void;
  activeLessonId: string | null;
  onLessonSelect: (lessonId: string) => void;
  isLast: boolean;
}

export const SidebarModule: React.FC<SidebarModuleProps> = ({ 
  module, 
  isActive, 
  onToggle, 
  activeLessonId, 
  onLessonSelect,
  isLast
}) => {
  return (
    <div className="relative group">
      {/* Dynamic Connector - Unbroken squiggly effect */}
      {!isLast && (
        <div 
          className={`absolute left-[26px] top-7 bottom-[-34px] transition-all duration-700 z-0 ${
            isActive ? 'bg-olive w-[3px] translate-x-[-0.5px]' : 'w-6 translate-x-[-9px]'
          }`}
          style={!isActive ? {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='24' viewBox='0 0 12 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 0V1C6 1 10 5 6 12C2 19 6 23 6 23V24' stroke='%235A5A40' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'center top'
          } : {}}
        />
      )}

        <div 
          onClick={onToggle}
          className={`w-full flex items-start gap-4 p-4 rounded-xl transition-all text-left relative z-10 cursor-pointer ${
            isActive ? 'bg-sage/10' : 'hover:bg-gray-50'
          }`}
        >
        <div className="shrink-0 mt-1">
          <motion.div
            animate={{ 
              rotate: isActive ? 360 : 0,
              scale: isActive ? 1.15 : 1
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center transition-all bg-white relative z-20 overflow-hidden ${
              isActive ? 'border-olive shadow-lg shadow-sage/30' : 'border-sage/30'
            }`}
          >
             {/* Thread ball texture */}
             <div className="absolute inset-0 opacity-40">
                <svg viewBox="0 0 24 24" className={`w-full h-full ${isActive ? 'text-olive' : 'text-sage/30'}`}>
                   <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" fill="currentColor" opacity="0.3" />
                   <path d="M12 2c0 0 4 4 4 10s-4 10-4 10" stroke="currentColor" strokeWidth="1" fill="none" />
                   <path d="M12 2c0 0-4 4-4 10s4 10 4 10" stroke="currentColor" strokeWidth="1" fill="none" />
                   <path d="M2 12c0 0 4-4 10-4s10 4 10 4" stroke="currentColor" strokeWidth="1" fill="none" />
                   <path d="M2 12c0 0 4 4 10 4s10-4 10-4" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
             </div>
             
             {isActive ? (
               <CheckCircle2 size={14} strokeWidth={3} className="text-olive relative z-10" />
             ) : (
               <div className="w-2 h-2 rounded-full bg-sage/20 z-10 group-hover:bg-sage/40 transition-colors" />
             )}
          </motion.div>
        </div>
        
        <div className="flex-1">
          <h3 className={`text-sm font-medium leading-tight transition-colors ${
            isActive ? 'text-gray-900 font-bold' : 'text-gray-500 group-hover:text-gray-900'
          }`}>
            {module.title}
          </h3>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden ml-[34px] pl-4 relative z-10"
          >
            <div className="py-2 space-y-1">
              {module.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onLessonSelect(lesson.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-xs transition-all ${
                    activeLessonId === lesson.id 
                      ? 'bg-sage/10 text-olive font-bold' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Play size={14} className={activeLessonId === lesson.id ? 'text-sage' : 'text-gray-400'} />
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60">{lesson.duration}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
