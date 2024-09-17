import { SquareTakenByOpp, SquareTaken } from "./RulesForAll";

export const KnightPossibleMoves = (knight, board) => {
    const possibleMoves = []
    const knightMoves = [
        { dx: 1, dy: 2 },
        { dx: 2, dy: 1 },
        { dx: 2, dy: -1 },
        { dx: -2, dy: 1 },
        { dx: -2, dy: -1 },
        { dx: -1, dy: 2 },
        { dx: -1, dy: -2 },
        { dx: 1, dy: -2 }
    ];
        
    for (const knightMove of knightMoves) {
        let x = knight.x + knightMove.dx;
        let y = knight.y + knightMove.dy;
        if(x>=0 && x<8 && y>=0 && y<8){
            if (SquareTakenByOpp(x, y, board, knight.team) || !(SquareTaken(x, y, board))) {
                possibleMoves.push({ x: x, y: y });
            } 
        }  
    }
    return possibleMoves;
}