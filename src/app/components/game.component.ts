import { Component } from '@angular/core';
import { DemoderbyComponent } from './demoderby.component';

@Component({
  selector: 'app-game',
  template: `
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Demo Derby Game</h2>
        <app-demoderby
          wsUrl="wss://demo.duncannevin.com:4000/socket"
          topic="arena:lobby"
          [width]="1200"
          [height]="800"></app-demoderby>
      </div>
    </section>
  `,
  styles: [],
  imports: [DemoderbyComponent],
  standalone: true,
})
export class GameComponent {}
