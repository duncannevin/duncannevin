// File: src/app/components/about.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Card} from './card.component';
import {LucideAngularModule, CodeIcon, LightbulbIcon, UsersIcon, TargetIcon} from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Card, CommonModule, LucideAngularModule],
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

          <app-card class="bg-gradient-to-br from-secondary/50 to-accent/50 border-none">
              <app-card-header>
                <app-card-title>Quick Facts</app-card-title>
              </app-card-header>

            <app-card-content>
              <app-card-bullets [items]="[
                '🎓 Computer Science Background',
                '💼 7+ Years of Development Experience',
                '🌍 Remote Work Enthusiast',
                '📚 Lifelong Learner',
                '☕ Coffee Powered Developer',
                '🎨 Design &amp; UX Enthusiast',
              ]">
              </app-card-bullets>
            </app-card-content>
          </app-card>

        </div>

        <div class="flex">
          <ng-container *ngFor="let value of values; index as i">
            <app-card class="mr-5">
              <app-card-header>
                <div class="flex justify-center mb-4 text-primary">
                  <lucide-icon [img]="value.icon" name="house"></lucide-icon>
                </div>
                <app-card-title>{{ value.title }}</app-card-title>
              </app-card-header>
              <app-card-description>{{ value.description }}</app-card-description>
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
      icon: CodeIcon,
      title: 'Clean Code',
      description: 'I believe in writing maintainable, efficient code that stands the test of time.'
    },
    {
      icon: LightbulbIcon,
      title: 'Innovation',
      description: 'Always exploring new technologies and approaches to solve complex problems.'
    },
    {
      icon: UsersIcon,
      title: 'Collaboration',
      description: 'Strong communication skills and enjoy working in diverse, creative teams.'
    },
    {
      icon: TargetIcon,
      title: 'Results-Driven',
      description: 'Focused on delivering solutions that create real value for users and businesses.'
    }
  ];
}
