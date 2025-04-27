"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Server, Database, Cloud, LineChart, Shield, GitBranch, Layers, ChevronRight } from "lucide-react"

// Skill data with icons
const skillCategories = [
  {
    name: "Frontend",
    icon: <Code2 className="h-6 w-6" />,
    color: "#3b82f6",
    description: "Building responsive and interactive user interfaces with modern frameworks and libraries.",
    skills: [
      { name: "React", level: 90, years: 4 },
      { name: "Next.js", level: 85, years: 3 },
      { name: "TypeScript", level: 80, years: 3 },
      { name: "Tailwind CSS", level: 90, years: 3 },
      { name: "Three.js", level: 75, years: 2 },
      { name: "Vue.js", level: 70, years: 2 },
    ],
  },
  {
    name: "Backend",
    icon: <Server className="h-6 w-6" />,
    color: "#10b981",
    description: "Developing robust server-side applications and APIs with scalable architecture.",
    skills: [
      { name: "Node.js", level: 85, years: 4 },
      { name: "Express", level: 80, years: 4 },
      { name: "GraphQL", level: 75, years: 2 },
      { name: "REST API", level: 90, years: 5 },
      { name: "Microservices", level: 75, years: 3 },
      { name: "Go", level: 65, years: 1 },
    ],
  },
  {
    name: "Database",
    icon: <Database className="h-6 w-6" />,
    color: "#8b5cf6",
    description: "Designing and optimizing database schemas, queries, and data management systems.",
    skills: [
      { name: "PostgreSQL", level: 80, years: 4 },
      { name: "MongoDB", level: 85, years: 3 },
      { name: "Redis", level: 75, years: 2 },
      { name: "Prisma", level: 80, years: 2 },
      { name: "SQL", level: 85, years: 5 },
      { name: "Firebase", level: 70, years: 3 },
    ],
  },
  {
    name: "DevOps",
    icon: <Cloud className="h-6 w-6" />,
    color: "#ec4899",
    description: "Implementing CI/CD pipelines, containerization, and cloud infrastructure management.",
    skills: [
      { name: "Docker", level: 80, years: 3 },
      { name: "Kubernetes", level: 70, years: 2 },
      { name: "AWS", level: 75, years: 3 },
      { name: "CI/CD", level: 85, years: 4 },
      { name: "Terraform", level: 65, years: 1 },
      { name: "GitHub Actions", level: 80, years: 3 },
    ],
  },
  {
    name: "Tools",
    icon: <Layers className="h-6 w-6" />,
    color: "#f59e0b",
    description: "Utilizing development tools and environments to enhance productivity and code quality.",
    skills: [
      { name: "Git", level: 90, years: 6 },
      { name: "VS Code", level: 95, years: 5 },
      { name: "Figma", level: 75, years: 3 },
      { name: "Webpack", level: 80, years: 4 },
      { name: "Vite", level: 85, years: 2 },
      { name: "npm/yarn", level: 90, years: 5 },
    ],
  },
  {
    name: "Other",
    icon: <LineChart className="h-6 w-6" />,
    color: "#06b6d4",
    description: "Additional skills and practices that contribute to delivering high-quality software solutions.",
    skills: [
      { name: "Testing", level: 80, years: 3 },
      { name: "Agile", level: 85, years: 4 },
      { name: "UI/UX", level: 75, years: 3 },
      { name: "Performance", level: 80, years: 3 },
      { name: "Security", level: 70, years: 2 },
      { name: "Accessibility", level: 75, years: 2 },
    ],
  },
]

// Skill card component with interactive elements
function SkillCard({ category, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`border rounded-lg p-6 transition-all duration-300 cursor-pointer ${
        isActive ? "border-2 shadow-lg" : "border-border bg-card hover:border-muted-foreground/50"
      }`}
      style={{ borderColor: isActive ? category.color : undefined }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div
            className="p-2 rounded-md mr-3"
            style={{ backgroundColor: `${category.color}20`, color: category.color }}
          >
            {category.icon}
          </div>
          <h3 className="text-xl font-bold">{category.name}</h3>
        </div>
        <ChevronRight
          className={`h-5 w-5 transition-transform duration-300 ${isActive ? "rotate-90" : ""}`}
          style={{ color: isActive ? category.color : undefined }}
        />
      </div>

      <p className="text-muted-foreground text-sm mb-4">{category.description}</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {category.skills.slice(0, 3).map((skill) => (
          <Badge
            key={skill.name}
            variant="outline"
            style={{ borderColor: `${category.color}40`, color: category.color }}
          >
            {skill.name}
          </Badge>
        ))}
        {category.skills.length > 3 && <Badge variant="outline">+{category.skills.length - 3} more</Badge>}
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <div className="space-y-4">
            {category.skills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {skill.years} {skill.years === 1 ? "year" : "years"}
                    </span>
                  </div>
                  <span className="text-sm font-mono" style={{ color: category.color }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Skill grid component
function SkillGrid() {
  const [activeCategory, setActiveCategory] = useState(null)

  const handleCategoryClick = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null)
    } else {
      setActiveCategory(categoryName)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category) => (
        <SkillCard
          key={category.name}
          category={category}
          isActive={activeCategory === category.name}
          onClick={() => handleCategoryClick(category.name)}
        />
      ))}
    </div>
  )
}

// Skill mastery component
function SkillMastery() {
  // Group skills by mastery level
  const masterSkills = []
  const advancedSkills = []
  const intermediateSkills = []
  const beginnerSkills = []

  skillCategories.forEach((category) => {
    category.skills.forEach((skill) => {
      const skillWithCategory = { ...skill, category: category.name, color: category.color, icon: category.icon }

      if (skill.level >= 90) {
        masterSkills.push(skillWithCategory)
      } else if (skill.level >= 80) {
        advancedSkills.push(skillWithCategory)
      } else if (skill.level >= 70) {
        intermediateSkills.push(skillWithCategory)
      } else {
        beginnerSkills.push(skillWithCategory)
      }
    })
  })

  const masteryLevels = [
    {
      name: "Master",
      skills: masterSkills,
      description: "Expert-level proficiency with deep understanding and extensive experience.",
    },
    {
      name: "Advanced",
      skills: advancedSkills,
      description: "Strong proficiency with comprehensive knowledge and practical experience.",
    },
    {
      name: "Intermediate",
      skills: intermediateSkills,
      description: "Solid understanding with practical application experience.",
    },
    {
      name: "Beginner",
      skills: beginnerSkills,
      description: "Basic understanding and currently developing practical skills.",
    },
  ]

  return (
    <div className="space-y-8">
      {masteryLevels.map((level, index) => (
        <motion.div
          key={level.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-xl font-bold mb-2">{level.name}</h3>
          <p className="text-muted-foreground mb-4">{level.description}</p>

          <div className="flex flex-wrap gap-2">
            {level.skills.map((skill) => (
              <div
                key={`${skill.category}-${skill.name}`}
                className="group relative flex items-center rounded-full border border-border px-3 py-1 hover:border-primary transition-colors"
              >
                <div className="mr-1" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <span className="text-sm">{skill.name}</span>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-48 z-10">
                  <div className="font-bold mb-1">{skill.name}</div>
                  <div className="flex justify-between mb-1">
                    <span>Proficiency:</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience:</span>
                    <span>
                      {skill.years} {skill.years === 1 ? "year" : "years"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-popover"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Certifications component
function Certifications() {
  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
      icon: <Cloud className="h-5 w-5" />,
      color: "#FF9900",
    },
    {
      name: "Professional Full-Stack Engineer",
      issuer: "Meta (Facebook)",
      date: "2021",
      icon: <Code2 className="h-5 w-5" />,
      color: "#1877F2",
    },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2022",
      icon: <Server className="h-5 w-5" />,
      color: "#326CE5",
    },
    {
      name: "Advanced Security Practitioner",
      issuer: "CompTIA",
      date: "2021",
      icon: <Shield className="h-5 w-5" />,
      color: "#D22630",
    },
    {
      name: "Git & GitHub Professional",
      issuer: "GitHub",
      date: "2020",
      icon: <GitBranch className="h-5 w-5" />,
      color: "#6e5494",
    },
    {
      name: "Data Science Specialization",
      issuer: "Coursera",
      date: "2019",
      icon: <LineChart className="h-5 w-5" />,
      color: "#2A73CC",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certifications.map((cert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300"
        >
          <div className="flex items-center mb-2">
            <div className="p-1.5 rounded-md mr-3" style={{ backgroundColor: `${cert.color}20`, color: cert.color }}>
              {cert.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm">{cert.name}</h4>
              <p className="text-xs text-muted-foreground">
                {cert.issuer} • {cert.date}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Timeline component for education
function EducationTimeline() {
  const education = [
    {
      degree: "M.S. Computer Science",
      institution: "University of Technology",
      period: "2014 - 2016",
      description:
        "Specialized in Distributed Systems and Cloud Computing. Thesis on scalable microservices architecture.",
      color: "#3b82f6",
    },
    {
      degree: "B.S. Computer Science",
      institution: "State University",
      period: "2010 - 2014",
      description: "Graduated with honors. Focused on software engineering and web development.",
      color: "#10b981",
    },
    {
      degree: "Web Development Bootcamp",
      institution: "Code Academy",
      period: "2013 (Summer)",
      description:
        "Intensive program covering full-stack web development with JavaScript, HTML, CSS, and related frameworks.",
      color: "#8b5cf6",
    },
  ]

  return (
    <div className="relative border-l border-border pl-6 ml-6 space-y-10">
      {education.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline dot */}
          <div
            className="absolute -left-[30px] w-5 h-5 rounded-full border-4"
            style={{ backgroundColor: edu.color, borderColor: `${edu.color}40` }}
          ></div>

          {/* Content */}
          <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300">
            <div className="mb-1 text-xl font-bold" style={{ color: edu.color }}>
              {edu.degree}
            </div>
            <div className="mb-2 flex items-center text-sm">
              <span className="font-medium text-muted-foreground">{edu.institution}</span>
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{edu.period}</span>
            </div>
            <p className="text-muted-foreground">{edu.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("categories")
  const [certTab, setCertTab] = useState("certifications")

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, proficiency levels, and professional certifications across
            various domains of software development.
          </p>
        </motion.div>

        <Tabs defaultValue="categories" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="mastery">By Mastery Level</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-8">
            <SkillGrid />
          </TabsContent>

          <TabsContent value="mastery" className="mt-8">
            <SkillMastery />
          </TabsContent>
        </Tabs>

        <div className="mt-16">
          <Tabs defaultValue="certifications" value={certTab} onValueChange={setCertTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="certifications" className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Professional Certifications</h3>
                <Certifications />
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6 text-center">Education</h3>
                <EducationTimeline />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
