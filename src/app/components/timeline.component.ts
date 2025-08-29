import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BadgeComponent} from './badge.component';
import {Card} from './card.component';

export interface TimelineItem {
  title: string;
  company: string;
  companyUrl?: string;
  type?: string;          // e.g., "Full-time"
  duration: string;       // e.g., "Jan 2022 – Present"
  location?: string;
  description?: string;
  achievements?: string[];
  technologies?: string[];
}

@Component({
  selector: 'app-timeline',
  template: `
    <div class="relative">
      <!-- vertical rail -->
      <div class="absolute left-0 right-0 top-0 -bottom-[5px] mx-auto w-[1px] bg-neutral-200 rounded">
      </div>

      <div>
        <ng-container *ngFor="let item of items; let i = index">
          <!-- card -->
          <div
            class="flex relative mt-6"
            [ngClass]="i % 2 === 0 ? 'justify-end' : 'justify-start'"
          >
            <!-- dot -->
            <div
              class="absolute left-0 right-0 top-[2em] bottom-0 mx-auto h-[3px] w-[3px] rounded-full bg-black"
              [attr.aria-label]="'Timeline point ' + (i+1)"
            ></div>

            <app-card class="md:w-[49%] md:pl-12 md:ml-0 hover:shadow-lg transition-shadow duration-300">
              <!-- header -->
              <app-card-header>
                <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <app-card-title>{{ item.title }}</app-card-title>

                  <ng-container *ngIf="item.companyUrl; else plainCompany">
                    <app-card-link>
                      {{ item.company }}
                    </app-card-link>
                  </ng-container>

                  <ng-template #plainCompany>
                    <span class="font-semibold text-foreground">{{ item.company }}</span>
                  </ng-template>

                  <app-badge *ngIf="item.type" variant="secondary">{{ item.type }}</app-badge>
                </div>

                <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">

                  <app-card-icon-text>
                  <span card-icon>
                    <svg viewBox="0 0 24 24" class="h-4 w-4 stroke-current fill-none stroke-2">
                      <path
                        d="M8 2v4M16 2v4M3 10h18M21 8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h18Z"></path>
                    </svg>
                  </span>
                    <span card-text>{{ item.duration }}</span>
                  </app-card-icon-text>

                  <app-card-icon-text>
                  <span card-icon>
                    <svg viewBox="0 0 24 24" class="h-4 w-4 stroke-current fill-none stroke-2">
                      <path d="M12 21s7-7 7-11a7 7 0 1 0-14 0c0 4 7 11 7 11Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                    <span card-text>{{ item.location }}</span>
                  </app-card-icon-text>
                </div>
              </app-card-header>

              <app-card-description>
                {{ item.description }}
              </app-card-description>

              <app-card-content>
                <app-card-bullets [items]="item.achievements ?? []">
                  <div card-bullets-title>
                    Key Achievements:
                  </div>
                </app-card-bullets>
              </app-card-content>

              <app-card-footer>
                <h4 class="text-sm font-bold text-muted-foreground mb-1">Technologies Used:</h4>

                <div class="flex flex-wrap gap-2">
                  <app-badge *ngFor="let t of item.technologies" class="">
                    {{ t }}
                  </app-badge>
                </div>
              </app-card-footer>
            </app-card>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  standalone: true,
  imports: [...Card, CommonModule, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  @Input() items: TimelineItem[] = [];
}
