"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Parallax sections observer
    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
          } else {
          }
        });
      },
      { threshold: [0, 0.1, 0.5] },
    );

    document
      .querySelectorAll(".parallax-section")
      .forEach((el) => parallaxObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      parallaxObserver.disconnect();
    };
  }, []);

  const parallaxStyle = (speed: number) => ({
    transform: `translateY(${scrollY * speed}px)`,
  });

  const mouseParallax = (speed: number) => {
    // Don't apply transform until mouse has moved (avoids hydration mismatch)
    if (mousePosition.x === 0 && mousePosition.y === 0) {
      return {};
    }
    return {
      transform: `translate(${(mousePosition.x - window.innerWidth / 2) * speed}px, ${(mousePosition.y - window.innerHeight / 2) * speed}px)`,
    };
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Multi-layered animated background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Layer 1 - Slowest */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px) scale(${1 + scrollY * 0.0003})`,
          }}
        />

        {/* Layer 2 - Medium */}
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(${-scrollY * 0.2}px, ${scrollY * 0.25}px) rotate(${scrollY * 0.05}deg)`,
          }}
        />

        {/* Layer 3 - Fast */}
        <div
          className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.3}px, ${-scrollY * 0.35}px)`,
          }}
        />

        {/* Layer 4 - Extra movement */}
        <div
          className="absolute top-2/3 left-10 w-[400px] h-[400px] bg-gradient-to-br from-orange-500/15 via-rose-500/10 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.4}px) scale(${1 + scrollY * 0.0002})`,
          }}
        />

        {/* Floating orbs - mouse reactive */}
        <div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl transition-transform duration-300"
          style={mouseParallax(0.02)}
        />
        <div
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl transition-transform duration-500"
          style={mouseParallax(-0.015)}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
      </div>

      {/* Hero Section - Dramatic parallax */}
      <header
        className="relative min-h-screen flex items-center justify-center"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />

        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <div style={parallaxStyle(-0.15)} className="mb-8">
              <div
                className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20"
                style={{
                  transform: `scale(${1 - scrollY * 0.0003})`,
                }}
              >
                <span className="text-sm text-blue-400">
                  Open to new opportunities!
                </span>
              </div>
            </div>

            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 bg-clip-text text-transparent"
              style={{
                transform: `translateY(${-scrollY * 0.2}px) scale(${1 - scrollY * 0.0005})`,
              }}
            >
              Renz Miller
            </h1>

            <p
              className="text-2xl sm:text-3xl lg:text-4xl text-zinc-400 mb-10 font-light"
              style={{ transform: `translateY(${-scrollY * 0.25}px)` }}
            >
              Software Developer
            </p>

            <div
              className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm mb-8"
              style={{
                transform: `translateY(${-scrollY * 0.3}px)`,
              }}
            >
              <span className="text-zinc-400 hover:text-blue-400  duration-300 hover:scale-110 cursor-default">
                📍 Sandringham, Auckland
              </span>
              <a
                href="tel:+6427-465-5424"
                className="text-zinc-400 hover:text-blue-400  duration-300 hover:scale-110"
              >
                📞 +64 27 465 5424
              </a>
              <a
                href="mailto:renzaldamamiller@gmail.com"
                className="text-zinc-400 hover:text-blue-400  duration-300 hover:scale-110"
              >
                ✉️ renzaldamamiller@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/renz-miller"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-400  duration-300 hover:scale-110"
              >
                💼 linkedin.com/in/renz-miller
              </a>
            </div>

            {/* Scroll indicator */}
            <div
              className="mt-16 flex flex-col items-center gap-2"
              style={{
                transform: `translateY(${-scrollY * 0.35}px)`,
              }}
            >
              <span className="text-xs text-zinc-500 uppercase tracking-wider">
                Scroll to explore
              </span>
              <div className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-zinc-500 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content with parallax layers */}
      <main className="relative z-10 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="max-w-5xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
          {/* Summary Section - Parallax */}
          <section
            className="mb-32 parallax-section"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 500) * -0.1)}px) scale(${Math.max(0.85, 1 - Math.max(0, scrollY - 1500) / 1500)})`,
            }}
          >
            <div
              className="inline-block mb-6 px-4 py-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full border border-zinc-700"
              style={{
                transform: `translateX(${Math.max(0, (scrollY - 500) * 0.05)}px)`,
              }}
            >
              <h2 className="text-sm uppercase tracking-wider text-zinc-400">
                About Me
              </h2>
            </div>
            <div
              className="relative"
              style={{
                transform: `perspective(1000px) rotateX(${Math.min(5, (scrollY - 600) * -0.01)}deg)`,
              }}
            >
              <h3 className="text-3xl sm:text-3xl font-bold text-zinc-100 mb-8">
                Ensuring quality and scalability in every project, <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  one line of code at a time.
                </span>
              </h3>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Implementation Consultant and Web Application Developer with
                over 10 years of experience delivering banking and finance
                projects using Agile methodologies. I spent more than 8 years
                deployed on-site to various clients in Singapore, collaborating
                closely with stakeholders to deliver enterprise-scale solutions.
                More than 5 years experience in React, Typescript, Java, Spring
                Boot. I have contributed to major projects for UBS, Credit
                Suisse, Standard Chartered, United Overseas Bank, and Bank of
                Singapore. In addition to large-scale enterprise work, I’ve also
                built smaller applications as a full-stack developer. I focus on
                clean, maintainable code, performance, and test-driven
                development, with a strong emphasis on scalability, clean
                architecture, and continuous refactoring to keep systems robust
                and adaptable over time.
              </p>
            </div>
          </section>

          {/* Technical Skills Section - 3D Parallax cards */}
          <section
            className="mb-32 parallax-section"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 1000) * -0.15)}px) scale(${Math.max(0.8, 1 - Math.max(0, scrollY - 2800) / 1500)})`,
            }}
          >
            <div
              className="inline-block mb-6 px-4 py-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full border border-zinc-700"
              style={{
                transform: `translateX(${Math.max(0, (scrollY - 1000) * -0.05)}px)`,
              }}
            >
              <h2 className="text-sm uppercase tracking-wider text-zinc-400">
                Tech Stack
              </h2>
            </div>
            <h3 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-12">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div
                className="group relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-700/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:scale-105 backdrop-blur-sm"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - 1100) * -0.05)}px) rotateY(${Math.min(5, (scrollY - 1100) * 0.01)}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl" />
                <h3 className="font-semibold text-zinc-100 mb-3 text-lg relative z-10">
                  Frontend
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed relative z-10">
                  Angular, React, TypeScript, JavaScript, HTML5, CSS3,
                  Bootstrap, Material UI, WebSocket
                </p>
              </div>

              <div
                className="group relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-700/50 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all hover:scale-105 backdrop-blur-sm"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - 1150) * -0.05)}px) rotateY(${Math.min(5, (scrollY - 1100) * 0.01)}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                <h3 className="font-semibold text-zinc-100 mb-3 text-lg relative z-10">
                  Backend
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed relative z-10">
                  Java, Spring Boot, Hibernate, REST APIs, Microservices, T-SQL
                </p>
              </div>

              <div
                className="group relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-700/50 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all hover:scale-105 backdrop-blur-sm"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - 1200) * -0.05)}px) rotateY(${Math.min(5, (scrollY - 1100) * 0.01)}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl" />
                <h3 className="font-semibold text-zinc-100 mb-3 text-lg relative z-10">
                  Testing
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed relative z-10">
                  Jasmine, Karma, JUnit, Mockito, Selenium
                </p>
              </div>

              <div
                className="group relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-700/50 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all hover:scale-105 backdrop-blur-sm"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - 1250) * -0.05)}px) rotateY(${Math.min(5, (scrollY - 1100) * 0.01)}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl" />
                <h3 className="font-semibold text-zinc-100 mb-3 text-lg relative z-10">
                  Tools
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed relative z-10">
                  Jenkins, SonarQube, SwaggerUI, Git, Maven, Postman, Docker
                </p>
              </div>
            </div>
          </section>

          {/* Work Experience Section - Dramatic entrance */}
          <section
            className=" parallax-section"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 1800) * -0.09)}px) scale(${Math.max(0.7, 1 - Math.max(0, scrollY - 5500) / 1800)})`,
            }}
          >
            <div
              className="inline-block mb-6 px-4 py-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full border border-zinc-700"
              style={{
                transform: `translateX(${Math.max(0, (scrollY - 1800) * 0.03)}px)`,
              }}
            >
              <h2 className="text-sm uppercase tracking-wider text-zinc-400">
                Career Journey
              </h2>
            </div>
            <h3 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-16">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h3>

            {/* Tech Mahindra Pte Ltd */}
            <div className="mb-16">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
                <h3 className="text-2xl font-bold text-zinc-100">
                  Tech Mahindra Pte Ltd
                </h3>
                <span className="text-sm text-zinc-500">
                  Feb 2019 – Sep 2025
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-400 mb-2">
                Implementation Consultant - Associate Team Lead • Singapore
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
                <span className="text-xs font-medium text-emerald-400">
                  🏆 Pat on Back Award (2022)
                </span>
              </div>

              <div className="space-y-8">
                {/* UBS Client Projects */}
                <div className="group relative bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl p-6 border border-zinc-700/50 hover:border-blue-500/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl" />
                  <h4 className="font-bold text-xl text-zinc-100 mb-6 relative z-10 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    UBS Client Projects
                  </h4>

                  <div className="space-y-5">
                    {/* Epsilon CLI */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                        <p className="font-medium text-zinc-800 dark:text-zinc-200">
                          Epsilon - Command Line Interface
                        </p>
                        <span className="text-xs text-zinc-500">
                          Jun 2024 – Sep 2025
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">
                        Role: Lead Frontend Developer
                      </p>
                      <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mb-2">
                        <li>
                          • Developed web-based CLI for T24 COB process
                          executions and OS commands (UNIX/Windows)
                        </li>
                        <li>
                          • Implemented maker-checker workflow with controlled
                          permissions from ground-up
                        </li>
                        <li>
                          • Built real-time command execution monitoring using
                          WebSocket
                        </li>
                        <li>
                          • Managed code quality ensuring 80%+ coverage using
                          Karma and Jasmine
                        </li>
                      </ul>
                      <p className="text-xs text-zinc-500">
                        React • TypeScript • Bootstrap • jQuery • Java •
                        WebSocket • Spring Boot • Oracle SQL • Jenkins • Karma •
                        Jasmine
                      </p>
                    </div>

                    {/* Epsilon Self Onboarding */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                        <p className="font-medium text-zinc-800 dark:text-zinc-200">
                          Epsilon Self Onboarding Portal
                        </p>
                        <span className="text-xs text-zinc-500">
                          Sep 2024 – Sep 2025
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">
                        Role: Lead Frontend Developer
                      </p>
                      <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mb-2">
                        <li>
                          • Built self-service portal enabling teams to onboard
                          their environments with Epsilon instances
                        </li>
                        <li>
                          • Architected Angular 19 application with modular
                          component structure
                        </li>
                        <li>
                          • Integrated with Spring Boot APIs for automated
                          provisioning workflows
                        </li>
                      </ul>
                      <p className="text-xs text-zinc-500">
                        Angular 19 • TypeScript • Java • Spring Boot • Oracle
                        SQL • Jenkins • Karma • Jasmine
                      </p>
                    </div>

                    {/* Epsilon Mailer */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                        <p className="font-medium text-zinc-800 dark:text-zinc-200">
                          Epsilon Mailer
                        </p>
                        <span className="text-xs text-zinc-500">
                          May 2023 – Dec 2023
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">
                        Role: Fullstack Developer
                      </p>
                      <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mb-2">
                        <li>
                          • Created standalone email composition tool with
                          Epsilon-specific templates
                        </li>
                        <li>
                          • Developed template management system with dynamic
                          variable injection
                        </li>
                        <li>
                          • Implemented secure email delivery to Credit Suisse
                          recipients
                        </li>
                      </ul>
                      <p className="text-xs text-zinc-500">
                        React • TypeScript • Bootstrap • Java • Spring Boot •
                        Hibernate
                      </p>
                    </div>

                    {/* Application Fitness Tracker */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                        <p className="font-medium text-zinc-800 dark:text-zinc-200">
                          Application Fitness Tracker
                        </p>
                        <span className="text-xs text-zinc-500">
                          Jan 2022 – May 2023
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">
                        Role: Fullstack Developer
                      </p>
                      <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mb-2">
                        <li>
                          • Built monitoring dashboard for application health
                          tracking across Credit Suisse projects
                        </li>
                        <li>
                          • Implemented drag-and-drop interface using
                          Sortable.js and Masonry layout
                        </li>
                        <li>
                          • Developed scoring system based on SRE-defined
                          criteria and requirements
                        </li>
                        <li>
                          • Created REST APIs with Swagger documentation for
                          health metrics
                        </li>
                      </ul>
                      <p className="text-xs text-zinc-500">
                        React • TypeScript • Sortable.js • Masonry • Bootstrap •
                        Java • Spring Boot • Hibernate • Swagger
                      </p>
                    </div>

                    {/* Reconciliation */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                        <p className="font-medium text-zinc-800 dark:text-zinc-200">
                          Reconciliation
                        </p>
                        <span className="text-xs text-zinc-500">
                          Jun 2021 – Dec 2021
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">
                        Role: Frontend Developer
                      </p>
                      <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mb-2">
                        <li>
                          • Developed data validation tool for Credit Suisse to
                          UBS database migration
                        </li>
                        <li>
                          • Built comparison views using PrimeNG data tables
                          with filtering and sorting
                        </li>
                        <li>
                          • Implemented discrepancy reporting and resolution
                          workflows
                        </li>
                      </ul>
                      <p className="text-xs text-zinc-500">
                        React • TypeScript • PrimeNG • Bootstrap • JavaScript •
                        Java • Spring Boot
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bank of Singapore Project */}
                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                  <h4 className="font-semibold text-zinc-100 mb-3 relative z-10">
                    Bank of Singapore Project
                  </h4>

                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                      <p className="font-medium text-zinc-100">T24 Migration</p>
                      <span className="text-xs text-zinc-500">
                        Feb 2019 – Mar 2020
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">
                      Role: Developer
                    </p>
                    <ul className="text-sm text-zinc-400 space-y-1 mb-2">
                      <li>• Executed T24 data migration using ETL processes</li>
                      <li>
                        • Developed data transformation scripts and validation
                        procedures
                      </li>
                      <li>
                        • Performed data quality checks and reconciliation
                      </li>
                    </ul>
                    <p className="text-xs text-zinc-500">T-SQL • Java</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pan Asia Resources */}
            <div className="mb-10">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Pan Asia Resources
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                  Mar 2017 – Feb 2019
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">
                Senior IT Consultant • Singapore
              </p>

              <div className="space-y-6">
                {/* UOB Project */}
                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                  <h4 className="font-semibold text-zinc-100 mb-3 relative z-10">
                    United Overseas Bank Project
                  </h4>

                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                      <p className="font-medium text-zinc-100">
                        Client Portfolio Management Tool
                      </p>
                      <span className="text-xs text-zinc-500">Dec 2018</span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">
                      Role: Developer, Production Support
                    </p>
                    <ul className="text-sm text-zinc-400 space-y-1 mb-2">
                      <li>
                        • Developed data patching tool for entity linking and
                        unlinking operations
                      </li>
                      <li>
                        • Provided production support for critical portfolio
                        management functions
                      </li>
                      <li>
                        • Integrated with EdgeConnect using RESTful Web Services
                        and OData
                      </li>
                    </ul>
                    <p className="text-xs text-zinc-500">
                      Java/JavaSE • Shell Script • EdgeConnect • RESTful Web
                      Services • OData
                    </p>
                  </div>
                </div>

                {/* SCB Project */}
                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                  <h4 className="font-semibold text-zinc-100 mb-3 relative z-10">
                    Standard Chartered Bank Project
                  </h4>

                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                      <p className="font-medium text-zinc-100">
                        Temenos Connect Internet Banking (Wealth TAP Module)
                      </p>
                      <span className="text-xs text-zinc-500">
                        Dec 2016 – Nov 2018
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">
                      Role: Developer/UX Designer
                    </p>
                    <ul className="text-sm text-zinc-400 space-y-1 mb-2">
                      <li>
                        • Developed new features and enhancements for Wealth TAP
                        modules for Private and Retail banking
                      </li>
                      <li>
                        • Designed and implemented user interfaces following SCB
                        design guidelines
                      </li>
                      <li>
                        • Built responsive components using Bootstrap and jQuery
                      </li>
                      <li>
                        • Integrated with EdgeConnect backend services using
                        OData and RESTful APIs
                      </li>
                    </ul>
                    <p className="text-xs text-zinc-500">
                      Java • Bootstrap • jQuery • RESTful Web Services •
                      EdgeConnect • TCIB Wealth • OData
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SOFGEN Holdings */}
            <div className="mb-10">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  SOFGEN Holdings
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                  Nov 2014 – Mar 2017
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                Software Engineer • Philippines
              </p>
              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-4 space-y-1">
                <p>🏆 Avaloq Certified Professional</p>
                <p>🏆 Rookie of the Year Nominee (2015)</p>
                <p>🏆 Java Bootcamp 3rd Placer (2016)</p>
              </div>

              <div className="space-y-5 bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                {/* Automated System Testing */}
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <p className="font-medium text-zinc-100">
                      Automated System Testing for Avaloq
                    </p>
                    <span className="text-xs text-zinc-500">
                      Jun – Dec 2016
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">
                    Role: Developer/SCRUM Master
                  </p>
                  <ul className="text-sm text-zinc-400 space-y-1 mb-2">
                    <li>
                      • Developed XML-based scripting tool for testing Avaloq
                      modules
                    </li>
                    <li>• Led SCRUM ceremonies and managed sprint planning</li>
                    <li>
                      • Implemented test automation framework using JUnit and
                      Mockito
                    </li>
                  </ul>
                  <p className="text-xs text-zinc-500">
                    Java/JavaSE • JUnit • Mockito • Maven • Spring MVC •
                    Hibernate
                  </p>
                </div>

                {/* T24 Testing Assistant */}
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <p className="font-medium text-zinc-100">
                      T24 Testing Assistant
                    </p>
                    <span className="text-xs text-zinc-500">
                      May – Jun 2016
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">Role: Developer</p>
                  <ul className="text-sm text-zinc-400 space-y-1 mb-2">
                    <li>
                      • Built web application supporting T24 test automation
                    </li>
                    <li>
                      • Developed test case management and execution features
                    </li>
                    <li>• Integrated with Jenkins for CI/CD pipeline</li>
                  </ul>
                  <p className="text-xs text-zinc-500">
                    Java/JavaEE • JUnit • Mockito • Maven • Jenkins • Spring MVC
                    • Hibernate
                  </p>
                </div>

                {/* Bank's Activity Monitor */}
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <p className="font-medium text-zinc-100">
                      Bank&apos;s Activity Monitor
                    </p>
                    <span className="text-xs text-zinc-500">
                      Jan – May 2016
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">Role: Developer</p>
                  <ul className="text-sm text-zinc-400 space-y-1 mb-2">
                    <li>
                      • Developed monitoring application for T24 Close of
                      Business (COB) jobs
                    </li>
                    <li>• Created real-time job status dashboard</li>
                    <li>• Implemented alerting system for job failures</li>
                  </ul>
                  <p className="text-xs text-zinc-500">
                    Java/JavaEE • JUnit • Mockito • Maven • Jenkins • Postman •
                    SoapUI
                  </p>
                </div>

                {/* Operational Efficiency Reporting */}
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <p className="font-medium text-zinc-100">
                      Operational Efficiency Reporting
                    </p>
                    <span className="text-xs text-zinc-500">
                      Dec 2014 – Jan 2016
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">
                    Role: Developer/Team Lead
                  </p>
                  <ul className="text-sm text-zinc-400 space-y-1 mb-2">
                    <li>
                      • Led development of efficiency measurement system for
                      bank operations
                    </li>
                    <li>
                      • Created interactive dashboards with FusionCharts for
                      data visualization
                    </li>
                    <li>
                      • Managed team of developers and coordinated project
                      deliverables
                    </li>
                  </ul>
                  <p className="text-xs text-zinc-500">
                    ASP .NET C# • FusionCharts • Entity Framework • MSSQL
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Other Projects Section */}
          <section
            className="transform relative z-10 parallax-section"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 6500) * -0.05)}px) scale(${Math.max(0.75, 1 - Math.max(0, scrollY - 8500) / 1500)})`,
            }}
          >
            <div className="inline-block mb-6 px-4 py-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full border border-zinc-700">
              <h2 className="text-sm uppercase tracking-wider text-zinc-400">
                Other Projects
              </h2>
            </div>
            <h3 className="text-4xl sm:text-5xl font-bold mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
                Featured Work
              </span>
            </h3>

            <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h4 className="text-lg font-semibold text-zinc-100">
                    Little John&apos;s Math Adventures
                  </h4>
                  <span className="text-sm text-zinc-500">2014</span>
                </div>
                <p className="text-sm font-medium text-emerald-400 mb-2">
                  🏆 Best Capstone Project
                </p>
                <p className="text-sm text-zinc-400 mb-2">
                  Educational Android application for children&apos;s math
                  learning featuring interactive games and progressive
                  difficulty levels
                </p>
                <p className="text-xs text-zinc-500">
                  Java • JavaME • Cocos2d • Android
                </p>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section
            className="transform relative z-10 parallax-section"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 8000) * -0.06)}px) scale(${Math.max(0.75, 1 - Math.max(0, scrollY - 10000) / 1500)})`,
            }}
          >
            <div className="inline-block mb-6 px-4 py-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full border border-zinc-700">
              <h2 className="text-sm uppercase tracking-wider text-zinc-400">
                Education
              </h2>
            </div>
            <h3 className="text-4xl sm:text-5xl font-bold mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
                Academic Background
              </span>
            </h3>

            <div className="space-y-6">
              {/* Don Bosco College */}
              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-zinc-100">
                      Don Bosco College
                    </h4>
                    <span className="text-sm text-zinc-500">
                      Jun 2010 – Apr 2014
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-2">
                    Bachelor of Science in Information Technology
                  </p>
                  <div className="text-sm font-medium text-emerald-400 space-y-1">
                    <p>🏆 Best Capstone Awardee</p>
                    <p>
                      🏆 Philippine Society of IT Educators Android Programming
                      Competition, 4th Placer
                    </p>
                    <p>
                      • Don Bosco College&apos;s COMELEC Technical Team (2013)
                    </p>
                  </div>
                </div>
              </div>

              {/* Rizal Institute */}
              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-zinc-100">
                      Rizal Institute Canlubang
                    </h4>
                    <span className="text-sm text-zinc-500">
                      A.Y. 2005 – 2009
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">High School</p>
                </div>
              </div>
            </div>
          </section>

          {/* Training & Seminars Attended Section */}
          <section
            className="transform relative z-10 parallax-section"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 9500) * -0.07)}px) scale(${Math.max(0.75, 1 - Math.max(0, scrollY - 11500) / 1500)})`,
            }}
          >
            <div className="inline-block mb-6 px-4 py-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full border border-zinc-700">
              <h2 className="text-sm uppercase tracking-wider text-zinc-400">
                Training & Seminars
              </h2>
            </div>
            <h3 className="text-4xl sm:text-5xl font-bold mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
                Professional Development
              </span>
            </h3>
            <div className="space-y-3 bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl border border-zinc-700/50 backdrop-blur-sm p-6">
              <div className="flex items-start">
                <span className="text-purple-400 mr-3 mt-0.5">•</span>
                <div>
                  <p className="text-zinc-100">
                    Philippine Youth Congress on IT
                  </p>
                  <p className="text-sm text-zinc-500">UP Diliman, Sep 2012</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-3 mt-0.5">•</span>
                <div>
                  <p className="text-zinc-100">
                    Avaloq Certified Professional Training
                  </p>
                  <p className="text-sm text-zinc-500">
                    CheQ Systems, Apr 2015
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-3 mt-0.5">•</span>
                <div>
                  <p className="text-zinc-100">
                    Java Bootcamp (Module 1: Core Java, Module 2: Web
                    Applications, Module 3: Spring Framework)
                  </p>
                  <p className="text-sm text-zinc-500">
                    Orange and Bronze Software Labs, Jan 2016
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-3 mt-0.5">•</span>
                <div>
                  <p className="text-zinc-100">Temenos edgeConnect</p>
                  <p className="text-sm text-zinc-500">SOFGEN, Jan 2016</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-3 mt-0.5">•</span>
                <div>
                  <p className="text-zinc-100">
                    Temenos TCIB (Temenos Connect Internet Banking)
                  </p>
                  <p className="text-sm text-zinc-500">SOFGEN, Feb 2016</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-3 mt-0.5">•</span>
                <div>
                  <p className="text-zinc-100">
                    Introduction to GitHub Copilot
                  </p>
                  <p className="text-sm text-zinc-500">Coursera, Jun 2025</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-3 mt-0.5">•</span>
                <div>
                  <p className="text-zinc-100">
                    Boost Your Productivity with GitHub Copilot
                  </p>
                  <p className="text-sm text-zinc-500">Coursera, Jun 2025</p>
                </div>
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section
            className="mb-20 pb-40 transform relative z-10 parallax-section"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 11000) * -0.07)}px) scale(${Math.max(0.75, 1 - Math.max(0, scrollY - 13000) / 1500)})`,
            }}
          >
            <div className="inline-block mb-6 px-4 py-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-full border border-zinc-700">
              <h2 className="text-sm uppercase tracking-wider text-zinc-400">
                Certifications
              </h2>
            </div>
            <h3 className="text-4xl sm:text-5xl font-bold mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
                Professional Credentials
              </span>
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <p className="font-medium text-zinc-100 mb-1">
                    Java Bootcamp Training
                  </p>
                  <p className="text-sm text-zinc-400">
                    Orange and Bronze Software Labs
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <p className="font-medium text-zinc-100 mb-1">
                    Avaloq Certified Professional
                  </p>
                  <p className="text-sm text-zinc-400">Avaloq</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <p className="font-medium text-zinc-100 mb-1">
                    Introduction to GitHub Copilot
                  </p>
                  <p className="text-sm text-zinc-400">Microsoft/Coursera</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-sm group relative p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <p className="font-medium text-zinc-100 mb-1">
                    Boost Your Productivity with GitHub Copilot
                  </p>
                  <p className="text-sm text-zinc-400">Microsoft/Coursera</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800 mt-20 bg-gradient-to-t from-zinc-950 to-zinc-900 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-10 sm:px-8 lg:px-12">
          {/* Subtle glow effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          <div className="text-center">
            <p className="text-sm text-zinc-400">© 2026 Renz Miller</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
