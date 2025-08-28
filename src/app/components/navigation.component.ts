import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center flex-shrink-0">
            <img src="/favicon-32x32.png" alt="Logo" class="h-6 w-6 inline-block mr-2"/>
            <h2 class="text-primary">Duncan Nevin</h2>
          </div>

          <!-- Desktop Menu -->
<!--          <div class="hidden md:block">-->
<!--            <div class="ml-10 flex items-baseline space-x-8">-->
<!--              <button-->
<!--                *ngFor="let link of navLinks"-->
<!--                (click)="scrollToSection(link.href)"-->
<!--                class="text-foreground hover:text-primary px-3 py-2 transition-colors duration-200"-->
<!--              >-->
<!--                {{ link.label }}-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; Mobile menu button &ndash;&gt;-->
<!--          <div class="md:hidden">-->
<!--            <button-->
<!--              (click)="toggleMenu()"-->
<!--              class="text-foreground hover:text-primary p-2"-->
<!--            >-->
<!--              <ng-container *ngIf="isOpen; else menuIcon">-->
<!--&lt;!&ndash;                <x-icon size="24"></x-icon>&ndash;&gt;-->
<!--              </ng-container>-->
<!--              <ng-template #menuIcon>-->
<!--&lt;!&ndash;                <menu-icon size="24"></menu-icon>&ndash;&gt;-->
<!--              </ng-template>-->
<!--            </button>-->
<!--          </div>-->
        </div>
      </div>

      <!-- Mobile Menu -->
<!--      <div *ngIf="isOpen" class="md:hidden">-->
<!--        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b">-->
<!--          <button-->
<!--            *ngFor="let link of navLinks"-->
<!--            (click)="scrollToSection(link.href)"-->
<!--            class="text-foreground hover:text-primary block px-3 py-2 text-base w-full text-left"-->
<!--          >-->
<!--            {{ link.label }}-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
    </nav>
  `,
  styles: [],
  imports: [CommonModule],
  standalone: true,
})
export class NavigationComponent {
  isOpen = false;

  navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  scrollToSection(href: string) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isOpen = false;
    }
  }
}
