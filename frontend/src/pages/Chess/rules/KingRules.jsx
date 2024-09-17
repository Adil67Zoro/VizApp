const Neighbourhood = (prevX, curX, prevY, curY, board, team) => {
    if(Math.abs(curX-prevX)<=1 && Math.abs(curY-prevY)<=1){
        const piece = board.find(p => p.x===curX && p.y===curY)
        if(piece){
            return piece.team!==team
        }
        return true;
    }
    return false;
}

const isNotNearOtherKing = (curX, curY, board, team) => {
    const otherKing = board.find(p => p.piece === "king" && p.team !== team);
    if (otherKing) {
        return Math.abs(curX - otherKing.x) > 1 //checks if that other king is not 
        || Math.abs(curY - otherKing.y) > 1;  //in 1 space proximity to the location we want to move
    } 
    return true;
}

export const KingPossibleMoves = (king, board) => {
    const possibleMoves = []
    const kingMoves = [
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
    ]
    for(const kingMove of kingMoves){
        let x = king.x + kingMove.dx
        let y = king.y + kingMove.dy
        if(x>=0 && x<8 && y>=0 && y<8){
            if(Neighbourhood(king.x , x, king.y, y, board, king.team) 
                && isNotNearOtherKing(x, y, board, king.team)){
                possibleMoves.push({ x: x, y: y });
            }
        }
    }
    return possibleMoves;
}

export const getCastlingMoves = (king, board) => {
    const possibleMoves = [];
    if (king.hasMoved) return possibleMoves;

    const rooks = board.filter(p => p.piece === "rook" && p.team === king.team && !p.hasMoved);
    for (const rook of rooks) {
        const direction = (rook.x - king.x > 0) ? 1 : -1;

        let pathClear = true;
        for (let x = king.x + direction; x !== rook.x; x += direction) {
            if (board.some(p => p.x === x && p.y === king.y)) {
                pathClear = false;
                break;
            }
        }
        if (!pathClear) continue;

        const conceringTiles = rook.possibleMoves.filter(m => m.y === king.y);

        const enemyPieces = board.filter(p => p.team !== king.team);
        let valid = true;

        for (const enemy of enemyPieces) {
            if (enemy.possibleMoves === undefined) continue;

            for (const move of enemy.possibleMoves) {
                if (conceringTiles.some(t => t.x === move.x && t.y === move.y)) {
                    valid = false;
                }
                if (!valid) break;
            }
            if (!valid) break;
        }

        if (!valid) continue;

        // We now want to add it as a possible move!
        possibleMoves.push({ x: rook.x, y: rook.y });
    }

    return possibleMoves;
};
