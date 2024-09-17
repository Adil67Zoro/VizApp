import { SquareTakenByAlly, SquareTakenByOpp } from "./RulesForAll";

export const QueenPossibleMoves = (queen, board) => {
    const possibleMoves = []
    const queenMoves = [
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
    ];
    
    for(const queenMove of queenMoves){
        let x = queen.x + queenMove.dx
        let y = queen.y + queenMove.dy
        while(x>=0 && x<8 && y>=0 && y<8){
            if (SquareTakenByAlly(x, y, board, queen.team)) {
                break;
            } 
            else if(SquareTakenByOpp(x, y, board, queen.team)) {
                possibleMoves.push({ x: x, y: y });
                break;
            } 
            else {
                possibleMoves.push({ x: x, y: y });
            } 
            x += queenMove.dx;
            y += queenMove.dy;
        }
    }
    return possibleMoves;
}