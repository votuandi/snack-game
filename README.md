# About this project

This is a simple console-based Snake game implemented as a take-home project. The user provides the dimensions of the matrix (width and height), and the game simulates the snake's movement, consuming baits and growing in length. The game ends when the snake either wins or loses.

## Requirement

- User input the width and height for a matrix.
- The initial length of the snake is 3. Start at 0x0 position
- At one time, only 1 bait is randomly appeared on the screen, but not on the current location of the snake.
- After consume the bait, the length of the snake increase 1 at the head.
- The snake only move by the head by 1 index at the time, it couldn't move backward through it's body. 
- The body must follow the head movement or the previous body part. Each step takes 1 second.
- The game ends when:
	+ The snake hits the border of the matrix. (Print: You lose)
	+ The snake hits itself. (Print: You lose)
	+ There is no more place for the snake to move. If the body of the snake cover all of the matrix, print: You win. If not, print: You lose.
- Print to console the snake step by step to find and consume the bait (don't clear the console after each step).

## How to Play

1. **Input Dimensions**: The user inputs the width and height for the game matrix.
2. **Initial Setup**: 
   - The snake starts with an initial length of 3.
   - The starting position of the snake is at the top-left corner (0,0).
3. **Bait Generation**:
   - At any given time, one bait appears randomly on the screen.
   - The bait does not appear on the current location of the snake.
4. **Movement and Growth**:
   - The snake moves by 1 index at a time.
   - After consuming a bait, the snake's length increases by 1 at the head.
   - The snake's body follows the movement of the head or the previous body part.
   - Each movement step takes 1 second.
5. **Game End Conditions**:
   - The game ends if the snake hits the border of the matrix or itself, printing "You lose".
   - If the snake covers the entire matrix without any available moves, the game ends:
     - If the body of the snake covers the entire matrix, print "You win".
     - Otherwise, print "You lose".
6. **Console Output**:
   - The game prints the snake's movement step by step to the console.
   - The console is not cleared after each step, allowing the user to see the progression of the snake.

### Install Packages
```bash
npm install
```

### Start Project
```bash
npm start
```