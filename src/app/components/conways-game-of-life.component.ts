import {Component, ElementRef, OnInit, ViewChild, HostListener, AfterViewInit} from '@angular/core';

class CellMap extends Map<string, boolean> {
  setCell(x: number, y: number, alive: boolean): this {
    const key = `${x},${y}`;
    super.set(key, alive);
    return this;
  }

  getCell(x: number, y: number): boolean | undefined {
    const key = `${x},${y}`;
    return super.get(key);
  }

  deleteCell(x: number, y: number): boolean {
    const key = `${x},${y}`;
    return super.delete(key);
  }
}

class Grid {
  private cells = new CellMap();
  generations = 0;

  constructor(private cols: number, private rows: number) {
    this.initializeCells();
  }

  private initializeCells() {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        this.cells.setCell(x, y, false);
      }
    }
  }

  get cellsArray(): {x: number, y: number, alive: boolean}[] {
    return Array.from(this.cells.entries()).map(([key, alive]) => {
      const [x, y] = key.split(',').map(Number);
      return { x, y, alive };
    });
  }

  addBeaconPattern(x: number, y: number) {
    const pattern = [
      [0, 0], [0, 1], [1, 0], [1, 1],
      [2, 2], [2, 3], [3, 2], [3, 3]
    ];

    pattern.forEach(([dx, dy]) => {
      this.cells.setCell(x + dx, y + dy, true);
    });
  }

  addGliderPattern(x: number, y: number) {
    const pattern = [
      [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
    ];

    pattern.forEach(([dx, dy]) => {
      this.cells.setCell(x + dx, y + dy, true);
    });
  }

  addRandomCell(x: number, y: number) {
    const alive = Math.random() < 0.5; // Randomly decide if the cell is alive
    this.cells.setCell(x, y, alive);
  }

  addPulsarPattern(x: number, y: number) {
    const pattern = [
      [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
      [2, 0], [2, 1], [2, 7], [2, 8],
      [3, 0], [3, 1], [3, 7], [3, 8],
      [4, 0], [4, 1], [4, 7], [4, 8],
      [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
      [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
      [7, 2], [7, 3], [7, 4], [7, 5]
    ];

    pattern.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      this.cells.setCell(newX, newY, true);
    });
  }

  addBlinkersPattern(x: number, y: number) {
    const pattern = [
      [0, 1], [1, 1], [2, 1]
    ];

    pattern.forEach(([dx, dy]) => {
      this.cells.setCell(x + dx, y + dy, true);
    });
  }

  addRandomPatterns(count: number) {
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * this.rows);
      const y = Math.floor(Math.random() * this.cols);

      if (i % 2 === 0) {
        this.addPulsarPattern(x, y);
      } if (i % 3 === 0) {
        this.addBlinkersPattern(x, y);
      } else {
        this.addGliderPattern(x, y);
      }
    }
  }

  addPulsarsDiagnalAcrossWorld() {
    const pulsarSize = 13; // Pulsar size is 13x13
    for (let x = 0; x < this.rows; x += pulsarSize) {
      for (let y = 0; y < this.cols; y += pulsarSize) {
        this.addPulsarPattern(x, y);
      }
    }
  }

  drawLightningPattern() {
    const lightningPattern = [
      [0, 0], [1, 0], [2, 0], [3, 1], [4, 2],
      [5, 3], [6, 4], [7, 5], [8, 6], [9, 7],
      [10, 8], [11, 9], [12, 10], [13, 11]
    ];

    lightningPattern.forEach(([dx, dy]) => {
      this.cells.setCell(dx, dy, true);
    });
  }

  toggleCell(x: number, y: number) {
    const maybeCell = this.cells.getCell(x, y);
    this.cells.setCell(x, y, !maybeCell);
  }

  reset() {
    this.cells.clear();
  }

  countNeighbors(x: number, y: number): number {
    const neighbors = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    let count = 0;

    for (const [dx, dy] of neighbors) {
      if (this.cells.getCell(x + dx, y + dy)) {
        count++;
      }
    }

    return count;
  }

  nextGeneration(): void {
    const newCells = new CellMap();

    this.cells.forEach((alive, key) => {
      const [x, y] = key.split(',').map(Number);
      const neighbors = this.countNeighbors(x, y);

      if (alive) {
        // Any live cell with two or three live neighbours survives.
        newCells.setCell(x, y, neighbors === 2 || neighbors === 3);
      } else {
        // Any dead cell with exactly three live neighbours becomes a live cell.
        newCells.setCell(x, y, neighbors === 3);
      }
    });

    this.generations++;
    this.cells = newCells;
  }
}

@Component({
  selector: 'app-conways-game-of-life',
  template: `
    <div class="absolute inset-0">
      <div (click)="handleWorldClick($event)" #world id="world" class="w-full h-full border border-pink-50 relative">
      </div>

      <!-- Controls -->
      <div class="absolute bottom-11 left-80 flex gap-2 z-10">
        <button
          (click)="togglePlayPause()"
          class="bg-background/80 backdrop-blur-sm px-2 py-1 rounded"
        >
          {{ isPlaying ? 'Pause' : 'Play' }}
        </button>
      </div>

      <!-- Generation counter -->
      <div class="absolute bottom-10 right-4 z-10">
        <div class="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm text-muted-foreground">
          Generation: {{ grid.generations }}
        </div>
      </div>

      <!-- Instructions -->
      <div class="absolute bottom-10 left-4 z-10 max-w-xs">
        <div class="bg-background/80 backdrop-blur-sm px-3 py-2 rounded-md text-xs text-muted-foreground">
          <div class="mb-1">Click cells to toggle • Conway's Game of Life</div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  standalone: true,
})
export class ConwaysGameOfLifeComponent implements OnInit {
  @ViewChild('world', { static: true }) worldRef!: ElementRef<HTMLDivElement>;

  isPlaying = false;
  generation = 0;
  cellSize = 8;
  grid: Grid = new Grid(100, 100); // Default grid size
  animationFrameId!: number;
  lastUpdate = 0;
  speed = 150; // milliseconds between generations

  @HostListener('window:resize')
  onResize() {
  }

  ngOnInit(): void {
    const worldDiv = this.worldRef.nativeElement;
    this.initializeGrid(worldDiv.offsetWidth, worldDiv.offsetHeight);
    this.drawGrid(worldDiv);
  }

  initializeGrid(width: number, height: number) {
    const rows = Math.floor(height / this.cellSize);
    const cols = Math.floor(width / this.cellSize);
    this.grid = new Grid(cols, rows);
    this.grid.drawLightningPattern();
    this.grid.addRandomPatterns(20);
    this.togglePlayPause();
  }

  drawGrid(worldCtx: HTMLDivElement) {
    // Clear the canvas
    worldCtx.innerHTML = '';

    const cells = this.grid.cellsArray;

    for (const cell of cells) {
      if (cell.alive) {
        const cellDiv = document.createElement('div');
        cellDiv.style.position = 'absolute';
        cellDiv.style.width = `${this.cellSize}px`;
        cellDiv.style.height = `${this.cellSize}px`;
        cellDiv.style.left = `${cell.y * this.cellSize}px`;
        cellDiv.style.top = `${cell.x * this.cellSize}px`;
        cellDiv.style.backgroundColor = 'black';
        cellDiv.style.border = '1px solid lightgray';
        worldCtx.appendChild(cellDiv);
      }
    }
  }

  handleWorldClick(event: MouseEvent) {
    const world = this.worldRef.nativeElement;
    const rect = world.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const mouseY = event.clientX - rect.left;
    const mouseX = event.clientY - rect.top;

    // Determine the cell coordinates
    const cellY = Math.floor(mouseY / this.cellSize);
    const cellX = Math.floor(mouseX / this.cellSize);

    this.grid.toggleCell(cellX, cellY);

    // just for test
    this.drawGrid(world);
  }

  resetGrid() {
  }

  randomizeGrid() {
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.startAnimation();
    } else {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    }
  }

  startAnimation() {
    this.grid.nextGeneration();
    this.drawGrid(this.worldRef.nativeElement);
    this.animationFrameId = requestAnimationFrame(() => this.startAnimation());
  }
}
