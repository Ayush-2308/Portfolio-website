import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Progress } from './ui/progress';
import * as LucideIcons from 'lucide-react';

const SkillModal = ({ skill, isOpen, onClose }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (isOpen && skill) {
      // Reset to 0 when modal opens
      setAnimatedProgress(0);
      
      // Start animation after a short delay
      const timer = setTimeout(() => {
        setAnimatedProgress(skill.proficiency);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen, skill]);

  if (!skill) return null;

  const Icon = LucideIcons[skill.icon.split('-').map((word, i) => 
    i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')] || LucideIcons.Code;

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference * (1 - animatedProgress / 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-600 to-pink-500 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            {skill.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Circular Progress */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40">
              {/* Background circle */}
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#27272a"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#ff5c9a"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 92, 154, 0.5))'
                  }}
                />
              </svg>
              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-pink-500">{Math.round(animatedProgress)}%</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
            <p className="text-sm text-zinc-400 mb-1">Experience</p>
            <p className="text-lg font-semibold text-white">{skill.experience}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-zinc-400 mb-2">What I've Built</p>
            <p className="text-zinc-200 leading-relaxed">{skill.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillModal;
