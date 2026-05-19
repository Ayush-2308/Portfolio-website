import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import SkillModal from './SkillModal';
import ProjectModal from './ProjectModal';
import * as LucideIcons from 'lucide-react';
import { personalInfo, skills, projects, experience, education, certifications } from '../data/mockData';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [isDegreeModalOpen, setIsDegreeModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsSkillModalOpen(true);
  };

  const handleProjectClick = (project) => {
    // If project has gallery, open modal; otherwise open GitHub
    if (project.gallery && project.gallery.length > 0) {
      setSelectedProject(project);
      setIsProjectModalOpen(true);
    } else {
      window.open(project.github, '_blank');
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadCV = async () => {
    try {
      const response = await fetch(personalInfo.resumeLink);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Ayush_Gupta_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab if download fails
      window.open(personalInfo.resumeLink, '_blank');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formData.firstName} ${formData.lastName}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
    window.location.href = mailtoLink;
  };

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName.split('-').map((word, i) => 
      i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')] || LucideIcons.Code;
    return Icon;
  };

  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="logo-link group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h1 className="relative text-3xl font-bold bg-gradient-to-r from-pink-500 via-white to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                AG
              </h1>
            </div>
          </a>
          <nav className="hidden md:flex gap-8">
            <a href="#about" className="text-zinc-400 hover:text-pink-500 transition-colors">About</a>
            <a href="#skills" className="text-zinc-400 hover:text-pink-500 transition-colors">Skills</a>
            <a href="#projects" className="text-zinc-400 hover:text-pink-500 transition-colors">Projects</a>
            <a href="#contact" className="text-zinc-400 hover:text-pink-500 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        {/* Animated Background Elements - Reduced opacity */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/3 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/3 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Profile Image - Smaller Size */}
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              <div className="relative group w-80 md:w-96">
                {/* Glowing background - Reduced */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl blur-2xl opacity-15 group-hover:opacity-25 transition-opacity duration-500"></div>
                
                {/* Image container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-2xl"></div>
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="relative rounded-2xl w-full h-auto object-cover border-2 border-pink-500/20 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Floating decorative elements - Reduced */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-500/10 rounded-full blur-xl animate-pulse-delayed"></div>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="order-1 md:order-2 text-center md:text-left space-y-6">
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-5 py-2.5 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-500 text-sm font-medium backdrop-blur-sm animate-fade-in">
                  Available for opportunities
                </span>
                <span className="px-5 py-2.5 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-500 text-sm font-medium backdrop-blur-sm animate-fade-in">
                  Open for Freelancing
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-slide-up">
                  {personalInfo.name}
                </h1>
                <div className="relative inline-block">
                  <h2 className="text-2xl md:text-3xl text-pink-500 font-semibold animate-slide-up-delayed">
                    {personalInfo.title}
                  </h2>
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-transparent rounded-full"></div>
                </div>
              </div>
              
              <p className="text-lg text-zinc-300 leading-relaxed max-w-xl animate-fade-in-delayed">
                {personalInfo.bio}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <Button 
                  onClick={handleDownloadCV}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-base rounded-xl glow-button font-semibold group transition-all duration-300 hover:scale-105"
                >
                  <LucideIcons.Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Download CV
                </Button>
              </div>

              <div className="flex gap-4 justify-center md:justify-start pt-2">
                <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="w-12 h-12 rounded-xl bg-zinc-800/50 backdrop-blur-sm hover:bg-pink-500 flex items-center justify-center transition-all duration-300 social-icon border border-zinc-700 hover:border-pink-500 hover:-translate-y-1">
                  <LucideIcons.Linkedin className="w-5 h-5 text-white" />
                </a>
                <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer"
                   className="w-12 h-12 rounded-xl bg-zinc-800/50 backdrop-blur-sm hover:bg-pink-500 flex items-center justify-center transition-all duration-300 social-icon border border-zinc-700 hover:border-pink-500 hover:-translate-y-1">
                  <LucideIcons.Github className="w-5 h-5 text-white" />
                </a>
                <a href={personalInfo.social.whatsapp} target="_blank" rel="noopener noreferrer"
                   className="w-12 h-12 rounded-xl bg-zinc-800/50 backdrop-blur-sm hover:bg-pink-500 flex items-center justify-center transition-all duration-300 social-icon border border-zinc-700 hover:border-pink-500 hover:-translate-y-1">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a href={personalInfo.social.email}
                   className="w-12 h-12 rounded-xl bg-zinc-800/50 backdrop-blur-sm hover:bg-pink-500 flex items-center justify-center transition-all duration-300 social-icon border border-zinc-700 hover:border-pink-500 hover:-translate-y-1">
                  <LucideIcons.Mail className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-pink-500 mb-6 inline-block">
              About Me
            </h2>
            <div className="h-1 w-20 bg-pink-500 mx-auto glow-line"></div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Profile Image - Left Side */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative group w-64">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="relative rounded-2xl w-full h-auto object-cover border-2 border-pink-500/20 shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content - Right Side */}
            <div className="md:col-span-3 space-y-8">
              <div className="space-y-6">
                <p className="text-zinc-300 text-lg leading-relaxed">
                  I'm an <span className="text-pink-500 font-semibold">Android Developer</span> with MCA from Amity University (CGPA 8.07). I have proven ability to build production-ready applications, integrating REST APIs, Firebase Auth, GPS, and Riverpod state management.
                </p>
                <p className="text-zinc-300 text-lg leading-relaxed">
                  Proficient in <span className="text-pink-500 font-semibold">MVVM architecture, Room DB, and Retrofit</span>. Currently seeking an Android Developer internship or fresher role to contribute to impactful product development. Learning Kotlin and Jetpack Compose for modern Android development.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-pink-500/30 transition-all duration-300 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <LucideIcons.MapPin className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Location</p>
                    <p className="text-pink-500 text-lg font-medium">{personalInfo.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-pink-500/30 transition-all duration-300 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <LucideIcons.Mail className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Email</p>
                    <p className="text-pink-500 text-lg font-medium">{personalInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-pink-500/30 transition-all duration-300 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <LucideIcons.Phone className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Phone</p>
                    <p className="text-pink-500 text-lg font-medium">{personalInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-pink-500 mb-6 inline-block">
              Skills & Expertise
            </h2>
            <div className="h-1 w-20 bg-pink-500 mx-auto glow-line"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => {
              const Icon = getIcon(skill.icon);
              return (
                <Card
                  key={skill.id}
                  onClick={() => handleSkillClick(skill)}
                  className="skill-card bg-zinc-900 border-zinc-800 p-6 cursor-pointer hover:border-pink-500 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{skill.name}</h3>
                      <p className="text-pink-500 text-sm font-medium">{skill.proficiency}%</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <p className="text-center text-zinc-500 mt-8 text-sm">Click on any skill to see details</p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-pink-500 mb-6">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-pink-500 mb-12 glow-line"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="project-card bg-zinc-900 border-zinc-800 cursor-pointer hover:border-pink-500 transition-all duration-300 group overflow-hidden"
              >
                {/* Project Thumbnail */}
                {project.thumbnail && (
                  <div className="w-full h-48 bg-zinc-800 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <LucideIcons.Folder className="w-6 h-6 text-pink-500" />
                    </div>
                    <LucideIcons.ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-pink-500 transition-colors" />
                  </div>
                  
                  <h3 className="text-pink-500 font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-pink-500/10 text-pink-500 text-xs rounded-full border border-pink-500/20">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-zinc-800 text-zinc-500 text-xs rounded-full">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-zinc-500 text-sm">{project.year}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-pink-500 mb-6">
            Experience
          </h2>
          <div className="h-1 w-20 bg-pink-500 mb-12 glow-line"></div>
          
          {experience.map((exp) => (
            <div key={exp.id} className="border-l-2 border-pink-500 pl-8 pb-12 relative">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-pink-500 border-4 border-black glow-dot"></div>
              <p className="text-pink-500 text-sm font-medium mb-2">{exp.period}</p>
              <h3 className="text-pink-500 text-2xl font-bold mb-2">{exp.title}</h3>
              <p className="text-zinc-400 mb-6">{exp.type}</p>
              <ul className="space-y-3">
                {exp.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3 text-zinc-300">
                    <LucideIcons.CheckCircle2 className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-pink-500 mb-6">
            Education
          </h2>
          <div className="h-1 w-20 bg-pink-500 mb-12 glow-line"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu) => (
              <Card key={edu.id} className="bg-zinc-900 border-zinc-800 p-8 hover:border-pink-500 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <LucideIcons.GraduationCap className="w-6 h-6 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-pink-500 font-bold text-xl mb-2">{edu.degree}</h3>
                    <p className="text-zinc-400 mb-2">{edu.institution}</p>
                    <p className="text-pink-500 text-sm font-medium">{edu.period}</p>
                    {edu.cgpa && (
                      <p className="text-zinc-300 mt-2">CGPA: <span className="text-pink-500 font-semibold">{edu.cgpa}</span></p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {edu.status && (
                        <span className="inline-block px-3 py-1 bg-pink-500/10 text-pink-500 text-xs rounded-full border border-pink-500/20">
                          {edu.status}
                        </span>
                      )}
                      {edu.degreeImage && (
                        <button
                          onClick={() => {
                            setSelectedDegree(edu);
                            setIsDegreeModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-pink-500/10 hover:bg-pink-500 text-pink-500 hover:text-white text-xs rounded-full border border-pink-500/20 hover:border-pink-500 transition-all duration-300"
                        >
                          <LucideIcons.FileText className="w-3 h-3" />
                          View Degree
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-pink-500 mb-6">
            Certifications
          </h2>
          <div className="h-1 w-20 bg-pink-500 mb-12 glow-line"></div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <Card
                key={cert.id}
                onClick={() => window.open(cert.link, '_blank')}
                className="bg-zinc-900 border-zinc-800 p-6 cursor-pointer hover:border-pink-500 transition-all duration-300 group flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <LucideIcons.Award className="w-6 h-6 text-pink-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-pink-500 font-semibold text-lg">{cert.title}</h3>
                </div>
                <LucideIcons.ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-pink-500 transition-colors" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-pink-500 mb-6 text-center">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-pink-500 mb-6 glow-line mx-auto"></div>
          <p className="text-zinc-400 text-lg text-center mb-12">
            Looking for an Android Developer for internship, full-time role, or freelance projects? Let's collaborate!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  required
                  className="bg-zinc-900 border-zinc-800 text-pink-500 placeholder:text-zinc-500 focus:border-pink-500 h-12"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  required
                  className="bg-zinc-900 border-zinc-800 text-pink-500 placeholder:text-zinc-500 focus:border-pink-500 h-12"
                />
              </div>
            </div>
            
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="bg-zinc-900 border-zinc-800 text-pink-500 placeholder:text-zinc-500 focus:border-pink-500 h-12"
              />
            </div>
            
            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={6}
                className="bg-zinc-900 border-zinc-800 text-pink-500 placeholder:text-zinc-500 focus:border-pink-500 resize-none"
              />
            </div>
            
            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-6 text-lg rounded-lg glow-button font-semibold">
              <LucideIcons.Send className="w-5 h-5 mr-2" />
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500">© 2026 {personalInfo.name}. All rights reserved.</p>
            
            <div className="flex gap-6">
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="text-zinc-500 hover:text-pink-500 transition-colors">
                <LucideIcons.Linkedin className="w-5 h-5" />
              </a>
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer"
                 className="text-zinc-500 hover:text-pink-500 transition-colors">
                <LucideIcons.Github className="w-5 h-5" />
              </a>
              <a href={personalInfo.social.whatsapp} target="_blank" rel="noopener noreferrer"
                 className="text-zinc-500 hover:text-pink-500 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Skill Modal */}
      <SkillModal 
        skill={selectedSkill} 
        isOpen={isSkillModalOpen} 
        onClose={() => setIsSkillModalOpen(false)} 
      />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      {/* Degree Certificate Modal */}
      {selectedDegree && (
        <Dialog open={isDegreeModalOpen} onOpenChange={setIsDegreeModalOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white mb-4">
                {selectedDegree.degree}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-zinc-800 rounded-lg p-2">
                <img
                  src={selectedDegree.degreeImage}
                  alt={`${selectedDegree.degree} Certificate`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="text-center">
                <p className="text-zinc-400 mb-4">{selectedDegree.institution}</p>
                <Button
                  onClick={() => window.open(selectedDegree.degreeImage, '_blank')}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <LucideIcons.Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Portfolio;