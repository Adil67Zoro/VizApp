import { Board } from "./Board";

export const NUMBERS = ['1','2','3','4','5','6','7','8']
export const LETTERS = ['a','b','c','d','e','f','g','h']

export class initialPiece{
  constructor(x, y, piece, team, hasMoved, enPassant, possibleMoves){
    this.img = `../../../public/${piece}_${team}.png`;
    this.x = x;
    this.y = y;
    this.piece = piece;
    this.team = team;
    this.hasMoved = hasMoved
    this.enPassant = enPassant;
    this.possibleMoves = possibleMoves;
  }

  clone(){
    return new initialPiece(this.x, this.y, this.piece, this.team, this.hasMoved, this.enPassant,this.possibleMoves)
  }

  isEqual(otherPiece) {
    return (
      this.x === otherPiece.x &&
      this.y === otherPiece.y &&
      this.piece === otherPiece.piece &&
      this.team === otherPiece.team
    );
  }
}

export class finalPiece{
  constructor(x, y, piece, team){
    this.img = `../../../public/${piece}_${team}.png`;
    this.x = x;
    this.y = y;
    this.piece = piece;
    this.team = team;
  }

  clone(){
    return new finalPiece(this.x, this.y, this.piece, this.team)
  }
}

export class SudokuPosition{
  constructor(x, y, value){
    this.x = x;
    this.y = y;
    this.value = value;
  }

  clone(){
    return new SudokuPosition(this.x, this.y, this.value)
  }

}

export class SudokuBoard{
  constructor(positions){
    this.positions = positions;
  }
  
  clone(){
    return new SudokuBoard(this.positions.map(p => p.clone()))
  }

  clear(){
      return new SudokuBoard([]);
  }

  isEqual(otherBoard) {
    if (this.positions.length !== otherBoard.positions.length) return false;

    for (let i = 0; i < this.positions.length; i++) {
        const currentPosition = this.positions[i]

        if(!(otherBoard.positions.find(p => p.x===currentPosition.x && p.y===currentPosition.y && p.value===currentPosition.value))){
          return false
        }
    }

    return true;
  }

  checkForCompletion() {
    const size = Math.sqrt(this.positions.length);
    const boardSize = this.positions.length;

    // Helper function to check if an array contains unique values from 1 to boardSize
    const isValidSet = (numbers) => {
      const uniqueNumbers = new Set(numbers);
      if (uniqueNumbers.size !== size) return false;

      for (let i = 1; i <= size; i++) {
        if (!uniqueNumbers.has(i)) return false;
      }
      return true;
    };

    // Check rows
    for (let y = 0; y < size; y++) {
      const rowNumbers = this.positions
        .filter(p => p.y === y)
        .map(p => p.value);
      if (!isValidSet(rowNumbers)) return false;
    }

    // Check columns
    for (let x = 0; x < size; x++) {
      const columnNumbers = this.positions
        .filter(p => p.x === x)
        .map(p => p.value);
      if (!isValidSet(columnNumbers)) return false;
    }

    // Check subgrids
    for(let z=0; z < size; z++){
      const GridNumbers = []
      for(let y=0; y<2;y++){
        for(let x=0; x<size/2; x++){
          const number = this.positions.find(p => p.y===y && p.x===x).value
          GridNumbers.push(number)
        }
      }
      if(!isValidSet(GridNumbers)){
        return false;
      }
    }

    // If all checks pass, the board is correctly completed
    return true;
  }
}

export const SudokuBoardInitial = new SudokuBoard([])
export const initialBoard = new Board([])
export const finalBoard = new Board([])