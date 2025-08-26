import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from './components/navigation.component';
import {HeroComponent} from './components/hero.component';
import {GameComponent} from './components/game.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-background">
      <app-navigation></app-navigation>
      <app-hero></app-hero>
      <app-game></app-game>
    </div>
  `,
  imports: [GameComponent, HeroComponent, NavigationComponent],
  standalone: true,
})
export class AppComponent {
  title = 'duncannevin.com';
}
