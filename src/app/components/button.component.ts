import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- define the single projection point once -->
    <ng-template #projected>
      <ng-content></ng-content>
    </ng-template>

    <a
      *ngIf="href; else nativeBtn"
      [href]="href!"
      [attr.target]="target || null"
      [attr.rel]="rel || (target === '_blank' ? 'noopener noreferrer' : null)"
      [attr.aria-disabled]="disabled ? 'true' : null"
      [attr.tabindex]="disabled ? -1 : null"
      [ngClass]="classes"
      (click)="onAnchorClick($event)"
    >
      <ng-container [ngTemplateOutlet]="projected"></ng-container>
    </a>

    <ng-template #nativeBtn>
      <button
        [type]="type"
        [disabled]="disabled"
        [ngClass]="classes"
        (click)="onButtonClick($event)"
      >
        <ng-container [ngTemplateOutlet]="projected"></ng-container>
      </button>
    </ng-template>
  `
})
export class ButtonComponent {
  @Input() href?: string;
  @Input() target?: string;
  @Input() rel?: string;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() className = '';

  @Output() pressed = new EventEmitter<Event>();

  get classes(): string {
    const base = 'rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none';
    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-3 text-lg'
    };
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-primary text-primary-foreground focus:ring-2 focus:ring-primary/50',
      secondary: 'bg-secondary-600 text-secondary-foreground focus:ring-2 focus:ring-secondary/40',
      ghost: 'bg-transparent border border-neutral-300 text-foreground hover:bg-neutral-50 focus:ring-2 focus:ring-neutral-300'
    };
    return [base, sizes[this.size], variants[this.variant], this.disabled ? 'opacity-60 pointer-events-none' : '', this.className]
      .filter(Boolean)
      .join(' ');
  }

  onAnchorClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    if (this.href && this.href.startsWith('#')) {
      const el = document.querySelector(this.href);
      if (el) {
        event.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    this.pressed.emit(event);
  }

  onButtonClick(event: MouseEvent) {
    if (this.disabled) return;
    this.pressed.emit(event);
  }
}

