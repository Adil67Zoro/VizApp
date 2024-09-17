import { SquareTaken, SquareTakenByOpp } from "./RulesForAll";

export const PawnPossibleMoves = (pawn, board, ydim) => {
    const possibleMoves = []
    const direction = (pawn.team==="w") ? 1 : -1;
    const whichTeam = (pawn.team==="w") ? 1 : 6
    if(!(SquareTaken(pawn.x, pawn.y+direction, board))){
        possibleMoves.push({x : pawn.x, y : pawn.y+direction})

        if(ydim===8){
            if(pawn.y===whichTeam &&!(SquareTaken(pawn.x, pawn.y+2*direction, board))){
                possibleMoves.push({x : pawn.x, y : pawn.y+2*direction})
            }
        }
    }
    if(SquareTakenByOpp(pawn.x+1, pawn.y+direction, board, pawn.team)){
        possibleMoves.push({x : pawn.x+1, y : pawn.y+direction})
    }
    if(SquareTakenByOpp(pawn.x-1, pawn.y+direction, board, pawn.team)){
        possibleMoves.push({x : pawn.x-1, y : pawn.y+direction})
    }
    if((pawn.team==="w" && pawn.y===4) || (pawn.team==="b" && pawn.y===3)){
        const leftPiece = board.find((p) => p.x===pawn.x-1 && p.y===pawn.y && p.enPassant===true)
        const rightPiece = board.find((p) => p.x===pawn.x+1 && p.y===pawn.y && p.enPassant===true)
        if(leftPiece){
            possibleMoves.push({x : pawn.x-1, y : pawn.y+direction})
        }
        if(rightPiece){
            possibleMoves.push({x : pawn.x+1, y : pawn.y+direction})
        }
    }
    return possibleMoves;
}