// File: src/app/components/experience.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimelineComponent} from './timeline.component'; // replace with your actual badge component

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    TimelineComponent,
  ],
  template: `
    <section id="experience" class="py-20 px-4 bg-background">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl mb-6 text-primary" id="experience">Professional Experience</h2>
          <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
            My journey in the tech industry, showcasing growth, impact, and the diverse projects I&apos;ve contributed to across different companies and roles.
          </p>
        </div>
        <app-timeline [items]="experiences"></app-timeline>
      </div>
    </section>
  `,
  styles: [``]
})
export class ExperienceComponent {
  // Icons as SVG strings
  externalLink = `
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
      <path d="M5 12h14"></path>
      <path d="M12 5l7 7"></path>
    </svg>
  `;

  calendarDays = `
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <path d="M16 2v4"></path>
      <path d="M8 2v4"></path>
      <path d="M3 10h18"></path>
    </svg>
  `;

  mapPin = `
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
      <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0118 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  `;

  get companyCount(): number {
    const uniqueCompanies = new Set(this.experiences.map(exp => exp.company));
    return uniqueCompanies.size;
  }

  get yearsExperience(): number {
    const startYear = 2017; // Assuming the first experience started in 2017
    const currentYear = new Date().getFullYear();
    return currentYear - startYear - 1;
  }

  experiences = [
    {
      title: "Lead Software Engineer",
      company: "EPAM Systems",
      location: "Remote",
      duration: "Jul 2023 - Present",
      type: "Full-time",
      description: "Lead engineer focused on designing and delivering cloud-native systems for enterprise-scale clients.",
      achievements: [
        "Architected and delivered distributed systems using AWS CDK, Lambda, and DynamoDB",
        "Implemented serverless workflows with AWS Step Functions and S3 event-driven pipelines",
        "Introduced best practices for observability and monitoring with Splunk",
        "Mentored engineers and collaborated closely with product to align on business goals"
      ],
      technologies: ["AWS Lambda", "AWS CDK", "Step Functions", "DynamoDB", "TypeScript", "Splunk"],
      companyUrl: "https://epam.com"
    },
    {
      title: "Senior Software Engineer",
      company: "Kohl's",
      location: "Remote",
      duration: "Jan 2023 - Jul 2023",
      type: "Full-time",
      description: "Contributed to large-scale retail systems as part of a distributed engineering team.",
      achievements: [
        "Developed and optimized backend and cloud-based services for retail applications",
        "Improved performance and scalability of customer-facing systems",
        "Collaborated with cross-functional teams in a remote-first environment"
      ],
      technologies: ["AWS", "Java", "Spring Boot", "Apigee"],
      companyUrl: "https://kohls.com"
    },
    {
      title: "Senior Software Engineer",
      company: "EPAM Systems",
      location: "Remote",
      duration: "Sep 2021 - Dec 2022",
      type: "Full-time",
      description: "Built backend and frontend systems for global technology clients, following best practices for scalability and maintainability.",
      achievements: [
        "Developed backend RPC services in Scala and TypeScript",
        "Built UI components with Angular and Dart, ensuring accessibility and usability",
        "Consulted clients on best practices for deploying modern SPAs",
        "Practiced TDD and worked with Protocol Buffers for typed service definitions"
      ],
      technologies: ["Kotlin", "Angular", "TypeScript", "Protocol Buffers", "Dart", "Angular-Dart"],
      companyUrl: "https://epam.com"
    },
    {
      title: "UI Engineer (Angular/Node.js)",
      company: "Accesso",
      location: "Remote",
      duration: "Mar 2021 - Sep 2021",
      type: "Full-time",
      description: "Built and maintained Angular-based user interfaces for enterprise ticketing and e-commerce platforms.",
      achievements: [
        "Developed responsive UIs with AngularJS",
        "Collaborated with backend engineers to integrate APIs",
        "Enhanced performance and usability across multiple products",
        "Maintained and made improvements to pipelines"
      ],
      technologies: ["AngularJS", "Node.js", "Javascript", "Groovy", "Jenkins"],
      companyUrl: "https://accesso.com"
    },
    {
      title: "Software Developer",
      company: "Juno",
      location: "Post Falls, ID",
      duration: "Nov 2020 - Mar 2021",
      type: "Full-time",
      description: "Worked on Juno’s conferencing platform, enabling organizations to spin up custom online meeting spaces.",
      achievements: [
        "Served as primary DevOps engineer for the platform",
        "Implemented backend solutions in PHP and MySQL",
        "Automated deployments using Node.js and Groovy",
        "Built frontend components with JavaScript"
      ],
      technologies: ["PHP", "MySQL", "JavaScript", "Node.js", "AWS"],
      companyUrl: "https://juno.live"
    },
    {
      title: "Software Engineer",
      company: "GoToTags",
      location: "Spokane, WA",
      duration: "Jul 2020 - Nov 2020",
      type: "Full-time",
      description: "Designed and implemented reactive front-end applications with Angular and GraphQL.",
      achievements: [
        "Extended Apollo GraphQL queries and mutations for dynamic schemas",
        "Built async data flows with RxJS",
        "Collaborated directly with executive leadership on strategy"
      ],
      technologies: ["Angular", "RxJS", "GraphQL", "Apollo"],
      companyUrl: "https://gototags.com"
    },
    {
      title: "UI Engineer",
      company: "Accesso",
      location: "Lake Mary, FL",
      duration: "Jul 2019 - Jun 2020",
      type: "Full-time",
      description: "Worked on UI systems and integrations for enterprise ticketing and payment platforms.",
      achievements: [
        "Improved CI/CD processes with Jenkins pipelines",
        "Converted legacy AngularJS code to modern TypeScript",
        "Implemented hosted fields for secure payment processing"
      ],
      technologies: ["Angular", "TypeScript", "Jenkins"],
      companyUrl: "https://accesso.com"
    },
    {
      title: "Software Engineer",
      company: "DeepIntel Solutions",
      location: "Remote",
      duration: "Jan 2017 - May 2019",
      type: "Full-time",
      description: "Developed multithreaded systems and microservices using Scala and Akka.",
      achievements: [
        "Built distributed systems with Akka actors",
        "Created web services using Play! Framework and Akka HTTP",
        "Developed responsive UIs with Vue.js",
        "Implemented backend services with Express.js"
      ],
      technologies: ["Scala", "Akka", "Play! Framework", "Vue.js", "Express.js"],
      companyUrl: "https://deepintel.com"
    }
  ];
}
