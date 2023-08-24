export class PegSolitaire {
    constructor(board) {
      this.board = board;
      this.moves = [];
    }
  
    solve() {
      const startState = { board: this.board, moves: [] };
      const stack = [startState];
      let maxStackLength = 0;
      while (stack.length > 0) {
        if(stack.length > maxStackLength){
            maxStackLength = stack.length;
        }
        const currentState = stack.pop();
        const currentBoard = currentState.board;
  
        if (this.isSolved(currentBoard)) {
          this.moves = currentState.moves;
          console.log("max stack", maxStackLength)
          return;
        }
  
        const possibleMoves = this.generateMoves(currentBoard);
        for (const move of possibleMoves) {
          const newBoard = this.makeMove(currentBoard, move);
          const newMoves = currentState.moves.concat([move]);
  
          stack.push({ board: newBoard, moves: newMoves });
        }
      }
    }
  
    isSolved(board) {
      return board.flat().filter(cell => cell === 1).length === 1;
    }
  
    generateMoves(board) {
      const moves = [];
      const rows = board.length;
      const cols = board[0].length;
  
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (board[row][col] === 1) {
            // Check possible jump directions: up, down, left, right
            const directions = [[-2, 0], [2, 0], [0, -2], [0, 2]];
  
            for (const [dx, dy] of directions) {
              const newRow = row + dx;
              const newCol = col + dy;
              const jumpRow = row + dx / 2;
              const jumpCol = col + dy / 2;
  
              if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                board[newRow][newCol] === 0 &&
                board[jumpRow][jumpCol] === 1
              ) {
                moves.push({ from: [row, col], to: [newRow, newCol] });
              }
            }
          }
        }
      }
  
      return moves;
    }
  
    makeMove(board, move) {
      const newBoard = board.map(row => [...row]);
      const { from, to } = move;
      newBoard[from[0]][from[1]] = 0;
      newBoard[to[0]][to[1]] = 1;
      const jumpRow = (from[0] + to[0]) / 2;
      const jumpCol = (from[1] + to[1]) / 2;
      newBoard[jumpRow][jumpCol] = 0;
      return newBoard;
    }
  
    getSolution() {
      return this.moves;
    }
  }
  
  // Example usage
  export const initialBoard = [
    [2, 2, 1, 1, 1, 2, 2],
    [2, 2, 1, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [2, 2, 1, 1, 1, 2, 2],
    [2, 2, 1, 1, 1, 2, 2],
  ];
  
  const pegSolitaire = new PegSolitaire(initialBoard);
  pegSolitaire.solve();
  console.log("Solution:", pegSolitaire.getSolution());
  console.log();