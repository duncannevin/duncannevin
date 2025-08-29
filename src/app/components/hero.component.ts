import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConwaysGameOfLifeComponent} from './conways-game-of-life.component';
import {ButtonComponent} from './button.component';

@Component({
  selector: 'app-hero',
  template: `
    <section class="relative mt-16 flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20" style="height: calc(100vh - 40px);">
      @if (!isPhone) {
        <app-conways-game-of-life></app-conways-game-of-life>
      }

      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div class="mb-8">
          <!-- Enhanced hero title with multiple visual effects -->
          <div class="relative">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl mb-6 relative">
              <span class="absolute inset-0 text-primary/20 blur-sm transform translate-x-1 translate-y-1">
                Hello, I'm Duncan Nevin
              </span>
              <span class="absolute inset-0 text-primary/40 blur-xs transform translate-x-0.5 translate-y-0.5">
                Hello, I'm Duncan Nevin
              </span>
              <span
                class="relative text-primary font-bold tracking-tight"
              >
                Hello, I'm Duncan Nevin
              </span>
            </h1>
          </div>

          <div class="relative mb-4">
            <div class="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl transform scale-105 -z-10"></div>
            <p
              class="text-lg sm:text-xl lg:text-2xl text-foreground mb-2 relative font-semibold"
              style="text-shadow: 0 2px 4px rgba(3, 2, 19, 0.3), 0 0 8px rgba(255, 255, 255, 0.8); filter: drop-shadow(0 1px 2px rgba(3, 2, 19, 0.3));"
            >
              Full Stack Developer & Creative Problem Solver
            </p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <app-button variant="primary" size="lg" href="#experience">
            View My Work
          </app-button>
          <app-button variant="secondary" size="lg" href="#contact">
            Get In Touch
          </app-button>
        </div>

        <div class="relative">
          <div class="absolute inset-0 rounded-full transform scale-110 -z-10"></div>
          <div class="flex justify-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-primary/10"
              style="filter: drop-shadow(0 2px 4px rgba(3, 2, 19, 0.3));"
              aria-label="GitHub"
            >
              <i class="lucide-github"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-primary/10"
              style="filter: drop-shadow(0 2px 4px rgba(3, 2, 19, 0.3));"
              aria-label="LinkedIn"
            >
              <i class="lucide-linkedin"></i>
            </a>
            <a
              href="mailto:your.email@example.com"
              class="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-primary/10"
              style="filter: drop-shadow(0 2px 4px rgba(3, 2, 19, 0.3));"
              aria-label="Email"
            >
              <i class="lucide-mail"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
  imports: [CommonModule, ConwaysGameOfLifeComponent, ButtonComponent],
  standalone: true,
})
export class HeroComponent implements OnInit, OnDestroy {
  isPhone = false;
  private mql: MediaQueryList | null = null;
  private mqListener = () => {
    if (this.mql) this.isPhone = this.mql.matches;
  };

  ngOnInit() {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      this.mql = window.matchMedia('(max-width: 640px)');
      this.isPhone = this.mql.matches;
      this.mql.addEventListener?.('change', this.mqListener);
    }
  }

  ngOnDestroy() {
    this.mql?.removeEventListener?.('change', this.mqListener);
  }
  // Smooth scrolling handled by ButtonComponent when href is a hash
}
