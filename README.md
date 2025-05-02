# Enhanced Tic-Tac-Toe (Angular)

This project is a configurable Tic-Tac-Toe game built with Angular 15. It goes beyond the standard 3x3 grid, allowing for different dimensions, multiple players, and adjustable winning conditions.

## Live Demo

Play the game live here: [https://tictactoe-swart-two.vercel.app/](https://tictactoe-swart-two.vercel.app/)

## Features

*   **Configurable Board Dimension:** Easily change the grid size (e.g., 5x5, 4x4, etc.).
*   **Configurable Win Condition:** Set the number of consecutive cells needed to win (e.g., 4 in a row, 3 in a row).
*   **Multiple Players:** Supports more than two players (Default: 3 players - X, O, Z).
*   **Win Detection:** Checks for horizontal, vertical, and diagonal wins based on the configured condition.
*   **Draw Detection:** Identifies when the board is full with no winner.
*   **Clear UI:** Shows the current player's turn, highlights the winning line, and displays the game outcome.
*   **Reset Functionality:** Allows restarting the game at any point or after completion.
*   **Responsive Design:** Adapts reasonably well to different screen sizes.

## Technology Stack

*   **Angular 15:** Frontend framework.
*   **TypeScript:** Language used for Angular development.
*   **HTML:** Structure of the game board and interface.
*   **CSS:** Styling, including CSS Grid for the board layout and animations for highlighting.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed, along with the Angular CLI (`npm install -g @angular/cli`).
2.  **Clone the repository:**
    ```bash
    git clone <your-repository-url> # Replace <your-repository-url> with the actual URL
    cd tictactoe        # Or your project directory name
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```

## Running the Application

1.  **Start the development server:**
    ```bash
    ng serve -o
    ```
    or
    ```bash
    npm start # If you have this defined in package.json scripts
    ```
2.  This command builds the application, starts a local development server, and automatically opens it in your default web browser at `http://localhost:4200/`.

## How to Play

1.  The game starts automatically when loaded.
2.  The current player's turn (X, O, or Z) is indicated above the board.
3.  Click on any empty cell on the board to place your mark.
4.  Players take turns placing their marks.
5.  The first player to get the required number of their marks in a row (horizontally, vertically, or diagonally - default is 4) wins the game.
6.  If all cells are filled and no player has won, the game ends in a draw.
7.  Click the "Reset Game" or "Play Again?" button to start a new match.

## Configuration / Scalability

The game is designed to be easily configurable:

*   Open the file: `src/app/game/game.component.ts`
*   Modify the following `readonly` properties at the top of the `GameComponent` class:
    *   `dimension: number`: Change this value to set the board size (e.g., `3` for 3x3, `5` for 5x5).
    *   `winCondition: number`: Change this value to set the number of consecutive cells required to win (e.g., `3` for standard Tic-Tac-Toe, `4` for the current setup). *Ensure `winCondition` is less than or equal to `dimension`*.
    *   `players: Player[]`: Modify this array to change the player marks or the number of players (e.g., `['X', 'O']` for a 2-player game).

The game logic and UI will adapt automatically to these configuration changes.

## Contact

Created by Palash Akhenia.

*   **Email:** [er.palashakhenia@gmail.com](mailto:er.palashakhenia@gmail.com)
*   **Skype / Microsoft Teams ID:** palash.akhenia

## License

This project is open source and available under the [MIT License].
