import { SquareTakenByAlly, SquareTakenByOpp } from "./RulesForAll";

export const BishopPossibleMoves = (bishop, board) => {
    const possibleMoves = []
    const bishopMoves = [
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: -1 }
    ];
    
    for(const bishopMove of bishopMoves){
        let x = bishop.x + bishopMove.dx
        let y = bishop.y + bishopMove.dy
        while(x>=0 && x<8 && y>=0 && y<8){
            if (SquareTakenByAlly(x, y, board, bishop.team)) {
                break;
            } 
            else if(SquareTakenByOpp(x, y, board, bishop.team)) {
                possibleMoves.push({ x: x, y: y });
                break;
            } 
            else {
                possibleMoves.push({ x: x, y: y });
            } 
            x += bishopMove.dx;
            y += bishopMove.dy;
        }
    }
    return possibleMoves;
} 