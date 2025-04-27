"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Server, Database, Cloud, Briefcase, GraduationCap, Heart, Book, Lightbulb } from "lucide-react"

// Experience timeline component
function ExperienceTimeline() {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description:
        "Leading development of cloud-native applications using React, Node.js, and AWS. Implemented CI/CD pipelines and mentored junior developers.",
      icon: <Briefcase className="h-5 w-5" />,
      color: "#3b82f6",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2021",
      description:
        "Developed and maintained multiple web applications using React, Express, and MongoDB. Collaborated with UX designers to implement responsive interfaces.",
      icon: <Code className="h-5 w-5" />,
      color: "#10b981",
    },
    {
      title: "Frontend Developer",
      company: "Creative Web Agency",
      period: "2016 - 2018",
      description:
        "Created interactive web experiences using JavaScript, HTML, and CSS. Worked on performance optimization and cross-browser compatibility.",
      icon: <Server className="h-5 w-5" />,
      color: "#8b5cf6",
    },
  ]

  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative pl-8 before:absolute before:left-0 before:top-1 before:h-4 before:w-4 before:rounded-full before:content-['']"
          style={
            {
              "--before-bg": exp.color,
              "--before-border": `${exp.color}40`,
            } as React.CSSProperties
          }
        >
          <div className="absolute left-0 top-1 h-4 w-4 rounded-full" style={{ backgroundColor: exp.color }}></div>
          <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-border"></div>

          <div className="mb-1 text-xl font-bold">{exp.title}</div>
          <div className="mb-2 flex items-center text-sm">
            <span className="font-medium text-muted-foreground">{exp.company}</span>
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{exp.period}</span>
          </div>
          <p className="text-muted-foreground">{exp.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Education timeline component
function EducationTimeline() {
  const education = [
    {
      degree: "M.S. Computer Science",
      institution: "University of Technology",
      period: "2014 - 2016",
      description:
        "Specialized in Distributed Systems and Cloud Computing. Thesis on scalable microservices architecture.",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "#ec4899",
    },
    {
      degree: "B.S. Computer Science",
      institution: "State University",
      period: "2010 - 2014",
      description: "Graduated with honors. Focused on software engineering and web development.",
      icon: <Book className="h-5 w-5" />,
      color: "#f59e0b",
    },
    {
      degree: "Web Development Bootcamp",
      institution: "Code Academy",
      period: "2013 (Summer)",
      description:
        "Intensive program covering full-stack web development with JavaScript, HTML, CSS, and related frameworks.",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "#06b6d4",
    },
  ]

  return (
    <div className="space-y-8">
      {education.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative pl-8 before:absolute before:left-0 before:top-1 before:h-4 before:w-4 before:rounded-full before:content-['']"
        >
          <div className="absolute left-0 top-1 h-4 w-4 rounded-full" style={{ backgroundColor: edu.color }}></div>
          <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-border"></div>

          <div className="mb-1 text-xl font-bold">{edu.degree}</div>
          <div className="mb-2 flex items-center text-sm">
            <span className="font-medium text-muted-foreground">{edu.institution}</span>
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{edu.period}</span>
          </div>
          <p className="text-muted-foreground">{edu.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Animated profile image component
const AnimatedProfileImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl animate-pulse-slow"></div>
        <div className="absolute inset-0 rounded-full border-2 border-primary/50"></div>
        <div className="absolute inset-2 rounded-full overflow-hidden bg-card">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="John Doe"
            width={300}
            height={300}
            className="object-cover"
          />
        </div>

        {/* Floating badges */}
        <motion.div
          className="absolute -top-4 -right-4 bg-card p-2 rounded-full shadow-lg border border-border"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
        >
          <Code className="h-6 w-6 text-primary" />
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -right-6 bg-card p-2 rounded-full shadow-lg border border-border"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay: 0.5 }}
        >
          <Server className="h-6 w-6 text-green-500" />
        </motion.div>

        <motion.div
          className="absolute -bottom-6 left-10 bg-card p-2 rounded-full shadow-lg border border-border"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3.5, ease: "easeInOut", delay: 1 }}
        >
          <Database className="h-6 w-6 text-purple-500" />
        </motion.div>

        <motion.div
          className="absolute -top-2 -left-6 bg-card p-2 rounded-full shadow-lg border border-border"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4.5, ease: "easeInOut", delay: 1.5 }}
        >
          <Cloud className="h-6 w-6 text-blue-400" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <section id="about" className="py-20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know my background, experience, and approach to software development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6 space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  I'm a passionate Full Stack Developer with over 6 years of experience building web and mobile
                  applications. My journey in software development started with a curiosity about how websites work,
                  which led me to pursue formal education in Computer Science.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  I specialize in creating scalable, user-friendly applications using modern technologies like React,
                  Node.js, and cloud services. I'm particularly interested in performance optimization, clean
                  architecture, and creating intuitive user experiences.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  When I'm not coding, I enjoy contributing to open-source projects, writing technical articles, and
                  mentoring aspiring developers. I believe in continuous learning and staying updated with the latest
                  industry trends.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-2 flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-primary" />
                          My Approach
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>User-centered design thinking</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Clean, maintainable code</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Performance-first mindset</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Continuous learning and improvement</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-2 flex items-center">
                          <Heart className="h-5 w-5 mr-2 text-secondary" />
                          Personal Interests
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <span>Open source contribution</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <span>Technical writing</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <span>Mentoring and teaching</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <span>Exploring new technologies</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <ExperienceTimeline />
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <EducationTimeline />
              </TabsContent>
            </Tabs>
          </div>

          <div className="order-1 lg:order-2">
            <AnimatedProfileImage />
          </div>
        </div>
      </div>
    </section>
  )
}
