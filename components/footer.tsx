"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastCommit, setLastCommit] = useState({
    hash: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 500);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    // Simulate fetching last commit from GitHub API
    const mockCommit = {
      hash: "8f4e21a",
      date: new Date().toISOString(),
      message: "Update portfolio with latest projects",
    };

    setLastCommit(mockCommit);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="font-jetbrains text-xl font-bold">
              <span className="text-primary">&lt;</span>
              <span className="text-foreground">YodigNorR.</span>
              <span className="text-primary">/&gt;</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Building elegant solutions to complex problems with modern
              technologies.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#hero"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Latest Update</h3>
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center mb-2">
                <Github className="h-4 w-4 mr-2" />
                <span className="text-sm font-mono">{lastCommit.hash}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {lastCommit.message}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(lastCommit.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Yodig Nor. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>

      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-lg"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </footer>
  );
}
