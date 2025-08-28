import {Component, HostBinding, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class CardComponent {
  @HostBinding('class') hostClass = 'flex flex-col grow-0 inline-block bg-background border border-neutral-200 rounded-xl p-5 sm:p-6';

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class CardHeaderComponent {
  @HostBinding('class') hostClass = 'grid gap-2';

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class CardTitleComponent {
  @HostBinding('class') hostClass = 'text-xl font-bold text-foreground m-0';

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

@Component({
  selector: 'app-card-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [href]="href"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ng-content></ng-content>
      <span class="ml-1 text-sm" aria-hidden="true">↗</span>
    </a>
  `
})
export class CardLinkComponent {
  @HostBinding('class') hostClass = 'font-semibold text-foreground border-b border-dashed border-neutral-300 hover:border-solid inline-flex items-center';
  @Input() href = '#';

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

@Component({
  selector: 'app-card-icon-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content select="[card-icon]"></ng-content>
    <ng-content select="[card-text]"></ng-content>
  `
})
export class CardIconTextComponent {
  @HostBinding('class') hostClass = 'inline-flex items-center gap-2';

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

@Component({
  selector: 'app-card-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class CardDescriptionComponent {
  @HostBinding('class') hostClass = 'block mt-2 text-muted-foreground';

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

@Component({
  selector: 'app-card-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class CardActionComponent {
  @HostBinding('class') hostClass = 'col-start-2 row-span-2 row-start-1 self-start justify-self-end';

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

@Component({
  selector: 'app-card-bullets',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h4 class="text-sm font-bold text-muted-foreground mb-1">
      <ng-content select="[card-bullets-title]"></ng-content>
    </h4>
    <ul class="list-disc pl-5 space-y-1">
      <li *ngFor="let a of items" class="text-foreground">
        {{ a }}
      </li>
    </ul>
  `
})
export class CardBulletsComponent {
  @HostBinding('class') hostClass = 'block mt-3';

  @Input() items: string[] = [];

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class CardContentComponent {
  @HostBinding('class') hostClass = 'block mt-3';

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
export class CardFooterComponent {
  @HostBinding('class') hostClass = 'block mt-3';

  @Input() set className(value: string) {
    this.hostClass += ` ${value}`;
  }
}

export const Card = [
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardLinkComponent,
  CardDescriptionComponent,
  CardActionComponent,
  CardContentComponent,
  CardFooterComponent,
  CardIconTextComponent,
  CardBulletsComponent,
];
