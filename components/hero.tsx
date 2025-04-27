"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowDown,
  Github,
  Code,
  Sparkles,
  ExternalLink,
  Terminal,
} from "lucide-react";

// Animated background component with improved performance
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const setCanvasDimensions = () => {
      if (!canvas) return;
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Track mouse movement for interactive particles
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      maxOpacity: number;
      distance: number;
      maxDistance: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.baseSize = Math.random() * 2 + 0.5;
        this.size = this.baseSize;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.maxOpacity = Math.random() * 0.5 + 0.2;
        this.opacity = this.maxOpacity;
        this.color = `rgba(59, 130, 246, ${this.opacity})`;
        this.distance = 0;
        this.maxDistance = 100;
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > window.innerWidth) this.x = 0;
        else if (this.x < 0) this.x = window.innerWidth;
        if (this.y > window.innerHeight) this.y = 0;
        else if (this.y < 0) this.y = window.innerHeight;

        // Calculate distance from mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);

        // Interactive behavior based on mouse position
        if (this.distance < this.maxDistance) {
          const force = (this.maxDistance - this.distance) / this.maxDistance;
          this.size = this.baseSize * (1 + force);
          this.opacity = this.maxOpacity * (1 + force * 0.5);

          // Gentle push away from cursor
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 0.2;
          const pushY = Math.sin(angle) * force * 0.2;

          this.x -= pushX;
          this.y -= pushY;
        } else {
          this.size = this.baseSize;
          this.opacity = this.maxOpacity;
        }

        this.color = `rgba(59, 130, 246, ${this.opacity})`;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles with density based on screen size
    const particles: Particle[] = [];
    const particleCount = Math.min(
      120,
      Math.floor((window.innerWidth * window.innerHeight) / 9000)
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect particles with lines - optimized for performance
    function connectParticles(ctx: CanvasRenderingContext2D) {
      const maxDistance = 150;
      const connections: { p1: Particle; p2: Particle; distance: number }[] =
        [];

      // First pass: collect valid connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            connections.push({
              p1: particles[i],
              p2: particles[j],
              distance,
            });
          }
        }
      }

      // Second pass: draw connections
      ctx.lineWidth = 0.5;
      for (const conn of connections) {
        const opacity = 1 - conn.distance / maxDistance;
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(conn.p1.x, conn.p1.y);
        ctx.lineTo(conn.p2.x, conn.p2.y);
        ctx.stroke();
      }
    }

    // Animation loop with performance optimizations
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    function animate(currentTime: number) {
      animationFrameId = requestAnimationFrame(animate);

      // Throttle frame rate for performance
      const delta = currentTime - lastTime;
      if (delta < interval) return;

      lastTime = currentTime - (delta % interval);

      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle) => {
        particle.update(mousePosition.x, mousePosition.y);
        particle.draw(ctx);
      });

      connectParticles(ctx);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

// Animated typing effect for the role text
const TypedText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length) {
      setIsTyping(false);
      const timeout = setTimeout(() => {
        setIsTyping(true);
        setDisplayText("");
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isTyping]);

  return (
    <div className="inline-flex h-8">
      <span className="code-text">{displayText}</span>
      <span
        className={`w-1 bg-primary ml-1 ${
          isTyping ? "animate-blink" : "opacity-0"
        }`}
      ></span>
    </div>
  );
};

// Animated code snippet component with improved styling and animations
const AnimatedCodeSnippet = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="bg-black/90 backdrop-blur-md rounded-lg p-4 font-jetbrains text-sm md:text-base text-left max-w-md mx-auto overflow-hidden border border-gray-800 shadow-xl shadow-primary/10"
    >
      <div className="flex items-center justify-between mb-2 text-gray-400 text-xs">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center">
          <Terminal className="h-3 w-3 mr-1" />
          <span>developer.js</span>
        </div>
      </div>

      <div className="text-gray-300">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span className="text-purple-400">class</span>{" "}
          <span className="text-yellow-300">FullstackDeveloper</span> {"{"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="ml-4"
        >
          <span className="text-purple-400">constructor</span>() {"{"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="ml-8"
        >
          <span className="text-blue-400">this</span>.
          <span className="text-green-400">name</span> ={" "}
          <span className="text-orange-400">"Yodig Nor"</span>;
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="ml-8"
        >
          <span className="text-blue-400">this</span>.
          <span className="text-green-400">skills</span> = [
          <span className="text-orange-400">"React"</span>,{" "}
          <span className="text-orange-400">"Node.js"</span>,{" "}
          <span className="text-orange-400">"TypeScript"</span>];
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="ml-4"
        >
          {"}"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.3 }}
          className="ml-4"
        >
          <span className="text-green-400">createAmazingExperiences</span>(){" "}
          {"{"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.6 }}
          className="ml-8"
        >
          <span className="text-purple-400">return</span>{" "}
          <span className="text-orange-400">
            "Elegant solutions to complex problems"
          </span>
          ;
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.9 }}
          className="ml-4"
        >
          {"}"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.2 }}
        >
          {"}"}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Floating tech badges component
const FloatingTechBadges = () => {
  const badges = [
    { name: "React", delay: 0, color: "#61DAFB" },
    { name: "Node.js", delay: 0.2, color: "#339933" },
    { name: "TypeScript", delay: 0.4, color: "#3178C6" },
    { name: "Next.js", delay: 0.6, color: "#000000" },
    { name: "Tailwind", delay: 0.8, color: "#06B6D4" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          className="absolute bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border text-xs font-medium shadow-lg"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth * 0.8,
              Math.random() * window.innerWidth * 0.8,
              Math.random() * window.innerWidth * 0.8,
            ],
            y: [
              Math.random() * window.innerHeight * 0.8,
              Math.random() * window.innerHeight * 0.8,
              Math.random() * window.innerHeight * 0.8,
            ],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 15,
            times: [0, 0.5, 1],
            delay: badge.delay * 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          style={{ color: badge.color }}
        >
          {badge.name}
        </motion.div>
      ))}
    </div>
  );
};

// Main hero component
export default function Hero() {
  // Scroll-based animations
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <AnimatedBackground />
      <FloatingTechBadges />

      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center"
        style={{ opacity, scale, y }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.div
            className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <TypedText text="Fullstack Developer & Software Engineer" />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="gradient-text">Yodig Nor</span>
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="code-text">
              Building the future, one line at a time
            </span>
          </motion.h2>
        </motion.div>

        <AnimatedCodeSnippet />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="max-w-2xl text-lg text-muted-foreground mt-8 mb-8 bg-background/50 backdrop-blur-sm p-4 rounded-lg"
        >
          Building elegant solutions to complex problems with modern
          technologies. Specialized in React, Node.js, and cloud architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            asChild
          >
            <Link href="#projects">
              <Code className="mr-2 h-5 w-5" />
              View My Work
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 hover:border-primary transition-colors"
            asChild
          >
            <Link
              href="https://github.com/caksodig"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub Profile
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 4.2 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          <Link
            href="#contact"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
          >
            <ExternalLink className="h-3 w-3 mr-1" /> Contact Me
          </Link>
          <span className="text-muted-foreground mx-2">•</span>
          <Link
            href="#projects"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
          >
            <ExternalLink className="h-3 w-3 mr-1" /> Latest Projects
          </Link>
          <span className="text-muted-foreground mx-2">•</span>
          <Link
            href="#skills"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
          >
            <ExternalLink className="h-3 w-3 mr-1" /> Skills & Expertise
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 4.1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <Link href="#projects" aria-label="Scroll down">
          <ArrowDown className="h-8 w-8 text-primary" />
        </Link>
      </motion.div>
    </section>
  );
}
