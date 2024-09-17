export const SquareTaken = (x, y, board) =>{
    const piece = board.find(p => p.x===x && p.y===y)
    if(piece){
        return true
    }
    return false
}

export const SquareTakenByAlly = (curX, curY, board, team) => {
    const piece = board.find(p => p.x===curX && p.y===curY && p.team===team)
    if(piece){
       // console.log(piece)
        return true
    }
    return false
}

export const SquareTakenByOpp = (curX, curY, board, team) => {
    const piece = board.find(p => p.x===curX && p.y===curY && p.team!=team)
    if(piece){
        return true
    }
    return false
}
