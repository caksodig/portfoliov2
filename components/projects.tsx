"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    category: "web",
    github: "https://github.com",
    demo: "https://example.com",
    details: {
      challenge:
        "Building a scalable e-commerce platform that can handle high traffic and complex product relationships.",
      solution:
        "Implemented a microservices architecture with separate services for products, orders, and payments. Used Redis for caching and MongoDB for data storage.",
      features: [
        "Product catalog with categories and filters",
        "User authentication and profiles",
        "Shopping cart and wishlist",
        "Secure checkout with Stripe",
        "Order tracking and history",
      ],
      techStack: [
        "React",
        "Redux",
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "AWS S3",
        "Stripe API",
        "Docker",
        "GitHub Actions",
      ],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team workspaces.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    category: "web",
    github: "https://github.com",
    demo: "https://example.com",
    details: {
      challenge:
        "Creating a real-time collaborative environment where multiple users can work on tasks simultaneously.",
      solution:
        "Leveraged Firebase Realtime Database for instant data synchronization and implemented optimistic UI updates for a smooth user experience.",
      features: [
        "Team workspaces and project organization",
        "Task assignment and due dates",
        "Real-time collaboration",
        "File attachments and comments",
        "Progress tracking and reporting",
      ],
      techStack: [
        "React",
        "TypeScript",
        "Firebase",
        "Tailwind CSS",
        "React Query",
        "Zustand",
        "Vite",
      ],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
  {
    id: 3,
    title: "AI Content Generator",
    description:
      "An AI-powered application that generates marketing content based on user prompts and brand guidelines.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "OpenAI API", "Vercel", "Prisma"],
    category: "ai",
    github: "https://github.com",
    demo: "https://example.com",
    details: {
      challenge:
        "Developing an intuitive interface for AI content generation while ensuring high-quality, relevant outputs.",
      solution:
        "Created a sophisticated prompt engineering system with fine-tuned models and implemented a feedback loop to continuously improve content quality.",
      features: [
        "Blog post and social media content generation",
        "Brand voice customization",
        "Content editing and refinement",
        "Export to various formats",
        "Usage analytics and history",
      ],
      techStack: [
        "Next.js",
        "OpenAI API",
        "Vercel Edge Functions",
        "Prisma",
        "PostgreSQL",
        "Tailwind CSS",
        "NextAuth.js",
      ],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
  {
    id: 4,
    title: "Mobile Fitness Tracker",
    description:
      "A cross-platform mobile app for tracking workouts, nutrition, and fitness progress.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "GraphQL", "AWS Amplify", "TypeScript"],
    category: "mobile",
    github: "https://github.com",
    demo: "https://example.com",
    details: {
      challenge:
        "Building a performant mobile app that works offline and synchronizes data when connectivity is restored.",
      solution:
        "Implemented a local-first architecture with SQLite for offline storage and AWS AppSync for data synchronization.",
      features: [
        "Workout planning and tracking",
        "Nutrition logging and analysis",
        "Progress visualization with charts",
        "Social sharing and challenges",
        "Personalized recommendations",
      ],
      techStack: [
        "React Native",
        "TypeScript",
        "GraphQL",
        "AWS Amplify",
        "SQLite",
        "Reanimated",
        "Victory Charts",
      ],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
  {
    id: 5,
    title: "DevOps Dashboard",
    description:
      "A comprehensive dashboard for monitoring infrastructure, deployments, and application performance.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "Go", "Docker", "Kubernetes", "Prometheus"],
    category: "devops",
    github: "https://github.com",
    demo: "https://example.com",
    details: {
      challenge:
        "Creating a unified view of complex infrastructure and deployment pipelines across multiple environments.",
      solution:
        "Developed a modular dashboard with real-time data aggregation from various monitoring tools and custom visualization components.",
      features: [
        "Infrastructure health monitoring",
        "Deployment tracking and rollbacks",
        "Performance metrics and alerts",
        "Cost optimization insights",
        "Audit logs and compliance reporting",
      ],
      techStack: [
        "Vue.js",
        "Go",
        "Docker",
        "Kubernetes",
        "Prometheus",
        "Grafana",
        "Terraform",
        "GitHub Actions",
      ],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
  {
    id: 6,
    title: "Blockchain Analytics Platform",
    description:
      "A platform for analyzing blockchain transactions, smart contracts, and market trends.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "Web3.js", "D3.js", "PostgreSQL"],
    category: "blockchain",
    github: "https://github.com",
    demo: "https://example.com",
    details: {
      challenge:
        "Processing and visualizing large volumes of blockchain data in a user-friendly interface.",
      solution:
        "Implemented a data pipeline with specialized indexers for different blockchains and created interactive visualizations for complex relationships.",
      features: [
        "Multi-chain transaction analysis",
        "Smart contract auditing tools",
        "Wallet profiling and tracking",
        "Market trend visualization",
        "Custom alerts and reports",
      ],
      techStack: [
        "React",
        "Node.js",
        "Web3.js",
        "D3.js",
        "PostgreSQL",
        "Redis",
        "AWS",
        "Ethers.js",
      ],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
];

// Project detail modal component
function ProjectDetailModal({ project }: { project: (typeof projects)[0] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-lg"
        >
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Challenge</h3>
              <p>{project.details.challenge}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Solution</h3>
              <p>{project.details.solution}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {project.details.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-border"
                >
                  <Image
                    src={screenshot || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-4">
            <ul className="space-y-2">
              {project.details.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="tech" className="mt-4">
            <div className="flex flex-wrap gap-2">
              {project.details.techStack.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button asChild>
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View Code
            </Link>
          </Button>
        </div>

        <DialogClose className="absolute right-4 top-4">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

// Project card component
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="project-card group"
    >
      <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <ProjectDetailModal project={project} />
      </div>

      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-muted-foreground mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap mb-4">
        {project.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="mr-1 mb-1">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between mt-auto pt-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Code
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Demo
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile" },
    { id: "ai", name: "AI & ML" },
    { id: "devops", name: "DevOps" },
    { id: "blockchain", name: "Blockchain" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work across various domains and
            technologies. Each project represents unique challenges and
            innovative solutions.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link
              href="https://github.com/caksodig"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              View All Projects on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
