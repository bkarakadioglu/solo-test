import { PegSolitaire, initialBoard } from "./algo.js";

const board = [
    [true, true, true],
    [true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true, false, true, true, true],
    [true, true, true, true, true, true, true],
    [true, true, true],
    [true, true, true]
];

const boardContainer = document.querySelector(".board");
let highlightedTrueCell = { row: null, col: null };
let highlightedFalseCell = { row: null, col: null };

board.forEach((row, rowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    row.forEach((value, columnIndex) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (value) {
            cellElement.classList.add("black");
        }else{
            cellElement.classList.add("grey");
        }

        cellElement.addEventListener("click", () => {
            highlightSelector(rowIndex, columnIndex);

            // Update highlight styles
            board.forEach((r, i) => {
                r.forEach((v, j) => {
                    const cell = boardContainer.querySelector(`.row:nth-child(${i+1}) .cell:nth-child(${j+1})`);
                    cell.classList.remove("highlight");
                    if (i === highlightedTrueCell.row && j === highlightedTrueCell.col) {
                        cell.classList.add("highlight");
                    } else if (i === highlightedFalseCell.row && j === highlightedFalseCell.col) {
                        cell.classList.add("highlight");
                    }
                });
            });

            if (highlightedTrueCell.row != null && highlightedFalseCell.row != null) {
                if(calculateDistance(highlightedTrueCell.row, highlightedTrueCell.col,
                    highlightedFalseCell.row, highlightedFalseCell.col) == 2){
                        let betweenCircle = cellBetween(highlightedTrueCell.row, highlightedTrueCell.col,
                            highlightedFalseCell.row, highlightedFalseCell.col);
                        if (!board[betweenCircle.row][betweenCircle.col]) {
                            highlightedTrueCell = { row: null, col: null };
                            highlightedFalseCell == { row: null, col: null };
                        }else{
                            board[highlightedTrueCell.row][highlightedTrueCell.col] = false;
                            board[highlightedFalseCell.row][highlightedFalseCell.col] = true;
                            board[betweenCircle.row][betweenCircle.col] = false;
                            highlightedTrueCell = { row: null, col: null };
                            highlightedFalseCell = { row: null, col: null };
                        }
                        board.forEach((r, i) => {
                            r.forEach((v, j) => {
                                const cell = boardContainer.querySelector(`.row:nth-child(${i+1}) .cell:nth-child(${j+1})`);
                                cell.classList.remove("highlight");
                                if (v) {
                                    cell.classList.remove("grey");
                                    cell.classList.add("black");
                                }else{
                                    cell.classList.remove("black");
                                    cell.classList.add("grey");
                                }
                            });
                        });
                }
            }

        });

        rowElement.appendChild(cellElement);
    });

    boardContainer.appendChild(rowElement);
});

function highlightSelector(rowIndex, columnIndex) {
    let value = board[rowIndex][columnIndex];
    if (value) {
        // Toggle highlight for true cell
        if (highlightedTrueCell.row === rowIndex && highlightedTrueCell.col === columnIndex) {
            highlightedTrueCell.row = null;
            highlightedTrueCell.col = null;
        } else {
            highlightedTrueCell.row = rowIndex;
            highlightedTrueCell.col = columnIndex;

            // Log position of highlighted true cell
            console.log(`Highlighted True Cell: Row ${highlightedTrueCell.row}, Column ${highlightedTrueCell.col}`);
            console.log(`Highlighted False Cell: Row ${highlightedFalseCell.row}, Column ${highlightedFalseCell.col}`);
        }
    } else {
        // Toggle highlight for false cell
        if (highlightedFalseCell.row === rowIndex && highlightedFalseCell.col === columnIndex) {
            highlightedFalseCell.row = null;
            highlightedFalseCell.col = null;
        } else {
            highlightedFalseCell.row = rowIndex;
            highlightedFalseCell.col = columnIndex;

            // Log position of highlighted false cell
            console.log(`Highlighted True Cell: Row ${highlightedTrueCell.row}, Column ${highlightedTrueCell.col}`);

            console.log(`Highlighted False Cell: Row ${highlightedFalseCell.row}, Column ${highlightedFalseCell.col}`);
        }
    }
}

function calculateDistance(row1, col1, row2, col2) {
    const colOffset = [2, 2, 0, 0, 0, 2, 2];
    col1 += colOffset[row1];
    col2 += colOffset[row2];
    if (row1 === row2) {
      return Math.abs(col1 - col2);
    }
    if (col1 === col2) {
      return Math.abs(row1 - row2);
    }
    return -1; // Diagonal cells
}

//Called after the distance being two is made sure
function cellBetween(row1, col1, row2, col2) {
    if (row1 === row2) {
        return {row: (row1+row2)/2, col: (col1+col2)/2};
    }
    const colOffset = [2, 2, 0, 0, 0, 2, 2];
    col1 += colOffset[row1];
    col2 += colOffset[row2];
    if (col1 === col2) {
        return {row: (row1+row2)/2, col: (col1 + col2)/2 - colOffset[(row1+row2)/2]};
    }
}
  