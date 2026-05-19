import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import * as LucideIcons from 'lucide-react';
import { Button } from './ui/button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const hasGallery = project.gallery && project.gallery.length > 0;

  const nextImage = () => {
    if (hasGallery) {
      setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
    }
  };

  const prevImage = () => {
    if (hasGallery) {
      setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  const isCurrentImageGif = () => {
    if (!hasGallery) return false;
    return project.gallery[currentImageIndex]?.toLowerCase().endsWith('.gif');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white mb-4">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image/GIF Gallery */}
          {hasGallery && (
            <div className="relative">
              <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden">
                {isCurrentImageGif() ? (
                  <img
                    src={project.gallery[currentImageIndex]}
                    alt={`${project.title} demo`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={project.gallery[currentImageIndex]}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                )}
                
                {/* Navigation Arrows */}
                {project.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-pink-500/80 flex items-center justify-center transition-all backdrop-blur-sm hover:scale-110"
                    >
                      <LucideIcons.ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-pink-500/80 flex items-center justify-center transition-all backdrop-blur-sm hover:scale-110"
                    >
                      <LucideIcons.ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
                
                {/* Image Counter & Type Badge */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {isCurrentImageGif() && (
                    <span className="px-3 py-1 bg-pink-500/90 text-white rounded-full text-sm font-semibold backdrop-blur-sm">
                      GIF Demo
                    </span>
                  )}
                  <span className="px-3 py-1 bg-black/70 rounded-full text-sm backdrop-blur-sm">
                    {currentImageIndex + 1} / {project.gallery.length}
                  </span>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {project.gallery.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {project.gallery.map((img, index) => {
                    const isGif = img.toLowerCase().endsWith('.gif');
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? 'border-pink-500 opacity-100 scale-105'
                            : 'border-zinc-700 opacity-50 hover:opacity-75'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {isGif && (
                          <span className="absolute top-1 right-1 bg-pink-500 text-white text-xs px-1 rounded font-semibold">
                            GIF
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Project Details */}
          <div>
            <h3 className="text-pink-500 font-semibold mb-2">Project Overview</h3>
            <p className="text-zinc-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-pink-500 font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Year */}
          <div>
            <h3 className="text-pink-500 font-semibold mb-2">Development Year</h3>
            <p className="text-zinc-300">{project.year}</p>
          </div>

          {/* GitHub Link */}
          <div className="pt-4 border-t border-zinc-800">
            <Button
              onClick={() => window.open(project.github, '_blank')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold"
            >
              <LucideIcons.Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
