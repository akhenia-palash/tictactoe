// src/app/game/game.component.ts
import { Component, OnInit } from '@angular/core';

// Define Player type for better type safety (optional but good practice)
type Player = 'X' | 'O' | 'Z'; // Or extend this if needed
type CellValue = Player | null;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  // --- Game Configuration ---
  readonly dimension: number = 5; // Board size (N x N)
  readonly winCondition: number = 4; // Number of cells in a row to win
  readonly players: Player[] = ['X', 'O', 'Z'];
  // --- Game State ---
  board: CellValue[][] = [];
  currentPlayer!: Player; // Non-null assertion, will be set in ngOnInit/reset
  winner: Player | 'Draw' | null = null;
  gameOver: boolean = false;
  moveCount: number = 0;
  winningCells: { row: number, col: number }[] = []; // To highlight winning cells

  constructor() { }

  ngOnInit(): void {
    this.resetGame();
  }

  // --- Game Initialization & Reset ---
  resetGame(): void {
    this.board = this.createEmptyBoard();
    this.currentPlayer = this.players[0]; // Start with the first player
    this.winner = null;
    this.gameOver = false;
    this.moveCount = 0;
    this.winningCells = [];
    console.log(`Game reset. ${this.currentPlayer}'s turn.`);
  }

  private createEmptyBoard(): CellValue[][] {
    const newBoard: CellValue[][] = [];
    for (let i = 0; i < this.dimension; i++) {
      newBoard[i] = Array(this.dimension).fill(null);
    }
    return newBoard;
  }

  // --- Player Actions ---
  makeMove(row: number, col: number): void {
    // Ignore clicks if game is over or cell is already taken
    if (this.gameOver || this.board[row][col]) {
      return;
    }

    // Place the current player's mark
    this.board[row][col] = this.currentPlayer;
    this.moveCount++;
    console.log(`Player ${this.currentPlayer} placed at (${row}, ${col})`);

    // Check if this move resulted in a win
    if (this.checkWin(row, col)) {
      this.winner = this.currentPlayer;
      this.gameOver = true;
      console.log(`Player ${this.winner} wins!`);
    } else if (this.moveCount === this.dimension * this.dimension) {
      // Check for a draw (board full, no winner)
      this.winner = 'Draw';
      this.gameOver = true;
      console.log("It's a Draw!");
    } else {
      // Switch to the next player
      this.switchToNextPlayer();
      console.log(`Next turn: ${this.currentPlayer}`);
    }
  }

  private switchToNextPlayer(): void {
    const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
    this.currentPlayer = this.players[nextPlayerIndex];
  }

  // --- Win Condition Logic ---
  private checkWin(lastRow: number, lastCol: number): boolean {
    const player = this.board[lastRow][lastCol];
    if (!player) return false; // Should not happen in makeMove context, but safe check

    // Check all four directions (Horizontal, Vertical, Diagonal Down-Right, Diagonal Up-Right)
    const directions = [
      { dr: 0, dc: 1 }, // Horizontal (check left/right)
      { dr: 1, dc: 0 }, // Vertical (check up/down)
      { dr: 1, dc: 1 }, // Diagonal Down-Right (check NW/SE)
      { dr: 1, dc: -1 } // Diagonal Up-Right (check SW/NE)
    ];

    for (const dir of directions) {
      let count = 1; // Start with the cell just placed
      let currentWinningCells = [{ row: lastRow, col: lastCol }]; // Track cells for highlighting

      // Check in the positive direction (e.g., right, down, down-right, up-right)
      for (let i = 1; i < this.winCondition; i++) {
        const r = lastRow + dir.dr * i;
        const c = lastCol + dir.dc * i;
        if (this.isWithinBounds(r, c) && this.board[r][c] === player) {
          count++;
          currentWinningCells.push({ row: r, col: c });
        } else {
          break; // Stop checking in this direction
        }
      }

      // Check in the negative direction (e.g., left, up, up-left, down-left)
      for (let i = 1; i < this.winCondition; i++) {
        const r = lastRow - dir.dr * i;
        const c = lastCol - dir.dc * i;
        if (this.isWithinBounds(r, c) && this.board[r][c] === player) {
          count++;
          currentWinningCells.push({ row: r, col: c });
        } else {
          break; // Stop checking in this direction
        }
      }

      // Did we find enough consecutive cells?
      if (count >= this.winCondition) {
        this.winningCells = currentWinningCells; // Store the winning cells
        return true;
      }
    }

    return false; // No winning line found
  }

  private isWithinBounds(row: number, col: number): boolean {
    return row >= 0 && row < this.dimension && col >= 0 && col < this.dimension;
  }

   // Helper function for template styling
   isWinningCell(row: number, col: number): boolean {
    return this.winningCells.some(cell => cell.row === row && cell.col === col);
  }
}
