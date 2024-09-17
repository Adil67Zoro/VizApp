import { SquareTakenByAlly, SquareTakenByOpp } from "./RulesForAll";

export const RookPossibleMoves = (rook, board) => {
    const possibleMoves = []
    const rookMoves = [
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 }
    ];
        
    for (const rookMove of rookMoves) {
        let x = rook.x + rookMove.dx;
        let y = rook.y + rookMove.dy;
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (SquareTakenByAlly(x, y, board, rook.team)) {
                break;
            } 
            else if (SquareTakenByOpp(x, y, board, rook.team)) {
                possibleMoves.push({ x: x, y: y });
                break;
            } 
            else {
                possibleMoves.push({ x: x, y: y });
            }
            x += rookMove.dx;
            y += rookMove.dy;
        }
    }    
    return possibleMoves
}