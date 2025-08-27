import {Component, HostBinding, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div data-slot="card" [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() className = '';
  @HostBinding('class') hostClass = 'block h-full bg-card text-card-foreground flex flex-col gap-6 rounded-xl border';
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      data-slot="card-header"
      [ngClass]="'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class CardHeaderComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h4 data-slot="card-title" [ngClass]="'leading-none ' + className">
      <ng-content></ng-content>
    </h4>
  `
})
export class CardTitleComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-card-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p data-slot="card-description" [ngClass]="'text-muted-foreground ' + className">
      <ng-content></ng-content>
    </p>
  `
})
export class CardDescriptionComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-card-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      data-slot="card-action"
      [ngClass]="'col-start-2 row-span-2 row-start-1 self-start justify-self-end ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class CardActionComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div data-slot="card-content" [ngClass]="'px-6 [&:last-child]:pb-6 ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class CardContentComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div data-slot="card-footer" [ngClass]="'flex items-center px-6 pb-6 [.border-t]:pt-6 ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class CardFooterComponent {
  @Input() className = '';
}


