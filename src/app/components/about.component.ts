// File: src/app/components/about.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent, CardContentComponent} from './card.component';
import {BypassHtmlSanitizerPipe} from '../pipes/bypass-html-sanitize.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BypassHtmlSanitizerPipe, CardComponent, CardContentComponent, CommonModule],
  styles: [``],
  template: `
    <section id="about" class="py-20 px-4 bg-background">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl mb-6 text-primary">About Me</h2>
          <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
            I&apos;m a passionate developer who loves turning complex problems into simple,
            beautiful solutions. With a strong foundation in both frontend and backend technologies,
            I create digital experiences that are not only functional but delightful to use.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 class="text-2xl mb-6 text-primary">My Journey</h3>
            <p class="text-muted-foreground mb-4">
              My journey into tech was a non-traditional one. I began in the United States Marine Corps and later
              spent years in construction and business ownership before moving into software. Those experiences taught
              me discipline, adaptability, and resilience—qualities I now carry into every engineering challenge.
            </p>
            <p class="text-muted-foreground mb-4">
              I started coding with Scala and actor frameworks, then expanded into full-stack development with TypeScript
              and Angular. Over time I discovered Elixir, which quickly became my passion for its elegance and real-time
              concurrency. I enjoy building systems that are resilient, scalable, and shaped by functional design.
            </p>
            <p class="text-muted-foreground">
              Today I focus on cloud-native development, distributed systems, and mentoring others while exploring new ideas
              through projects like Gratistoria, SmartFeeder, and EntityDB. My path may be unique, but it reflects a love of
              building, continuous growth, and working with teams who share that passion.
            </p>
          </div>

          <div class="relative h-full">
            <app-card class="bg-gradient-to-br from-secondary/50 to-accent/50">
              <app-card-content>
                <h4 class="text-xl mt-4 mb-3 text-primary">Quick Facts</h4>
                <ul class="mt-3 space-y-2 text-muted-foreground">
                  <li>🎓 Computer Science Background</li>
                  <li>💼 7+ Years of Development Experience</li>
                  <li>🌍 Remote Work Enthusiast</li>
                  <li>📚 Lifelong Learner</li>
                  <li>☕ Coffee Powered Developer</li>
                  <li>🎨 Design &amp; UX Enthusiast</li>
                </ul>
              </app-card-content>
            </app-card>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ng-container *ngFor="let value of values; index as i">
            <app-card class="text-center hover:shadow-lg transition-shadow duration-300">
              <app-card-content>
                <div class="flex justify-center mt-6 mb-3 text-primary">
                  <div [innerHTML]="value.icon | bypassHtmlSanitizer"></div>
                </div>
                <h4 class="text-lg mb-3 mt-3 text-primary">{{ value.title }}</h4>
                <p class="text-sm mt-3 text-muted-foreground">{{ value.description }}</p>
              </app-card-content>
            </app-card>
          </ng-container>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  values = [
    {
      icon: `
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
        </svg>
      `,
      title: 'Clean Code',
      description: 'I believe in writing maintainable, efficient code that stands the test of time.'
    },
    {
      icon: `
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
          <path d="M12 2l2 7h7l-5.5 4 2 7-6-4-6 4 2-7L3 9h7l2-7z"/>
        </svg>
      `,
      title: 'Innovation',
      description: 'Always exploring new technologies and approaches to solve complex problems.'
    },
    {
      icon: `
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      `,
      title: 'Collaboration',
      description: 'Strong communication skills and enjoy working in diverse, creative teams.'
    },
    {
      icon: `
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8z"/>
        </svg>
      `,
      title: 'Results-Driven',
      description: 'Focused on delivering solutions that create real value for users and businesses.'
    }
  ];
}
