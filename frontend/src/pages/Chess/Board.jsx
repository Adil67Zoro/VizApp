import { BishopPossibleMoves, KingPossibleMoves, KnightPossibleMoves, PawnPossibleMoves, QueenPossibleMoves, RookPossibleMoves, getCastlingMoves } from "./rules";

export class Board{
    constructor(pieces, MovesPlayed, winningTeam){
        this.pieces = pieces
        this.MovesPlayed = MovesPlayed
        this.winningTeam = winningTeam
    }

    calculateAllMoves(ydim){
        for(const piece of this.pieces){ //assigns all the possible moves of each piece
            piece.possibleMoves = this.GetValidMoves(piece, this.pieces, ydim) // to possibleMoves array for each piece
        }

        for(const king of this.pieces.filter(p => p.piece==="king")){//gets kings from all pieces
            king.possibleMoves = [...king.possibleMoves,...getCastlingMoves(king, this.pieces)]// (...) is used to unpack the elements of both arrays.
        } // concatenes both arrays, basically adding castling moves to already existing possible moves

        const teamToPlay = this.MovesPlayed % 2===0 ? "w" : "b"
        this.checkCurrentTeamMover()

        for(const piece of this.pieces.filter(p => p.team!==teamToPlay)){//gets all enemy's pieces
            piece.possibleMoves = [];//and prevents them from moving by assigning empy array to their possible moves
        }

        // Check if the current team has any valid moves left
        const currentTeamHasMoves = this.pieces
            .filter(p => p.team === teamToPlay)//gets only current team's pieces
            .some(p => p.possibleMoves && p.possibleMoves.length > 0);//return true possibleMoves isn't empty, and false if it's empty

        // If the current team has no valid moves, set the winning team
        if (!currentTeamHasMoves) {
            this.winningTeam = teamToPlay === "w" ? "black" : "white";
        } 
    }

    checkCurrentTeamMover(){
        //checks all possible moves for the current team and filters out any moves that would result 
        //in the king being in check.
        const teamToPlay = this.MovesPlayed % 2===0 ? "w" : "b"
        for(const piece of this.pieces.filter(p => p.team===teamToPlay)){
        //gets all pieces from the team that has to make a move
            if(piece.possibleMoves){

                for(const move of piece.possibleMoves){//takes each move (x,y) from possibleMoves

                    const simulatedBoard = this.clone()
                    simulatedBoard.pieces = simulatedBoard.pieces.filter(p => p.x!==move.x || p.y!==move.y)
                    //removes pieces that occupy the same position as the current move.
                    //checks if capturing the current piece would result in check

                    const clonedPiece = simulatedBoard.pieces.find(p => p.x===piece.x && p.y===piece.y)//clones each piece
                    clonedPiece.x = move.x //simulates making the move.
                    clonedPiece.y = move.y
                    const clonedKing = simulatedBoard.pieces.find(p => p.piece==="king" && p.team===teamToPlay)//clones king of the current team
                    if(clonedKing){
                        for(const enemy of simulatedBoard.pieces.filter(p => p.team!==teamToPlay)){ //takes each enemy pieces
                            enemy.possibleMoves = simulatedBoard.GetValidMoves(enemy, simulatedBoard.pieces) //gets enemy possible moves
                            if(enemy.piece==="pawn"){
                                //only considers diagonal captures, excluding the case where piece is above or below pawn (m.x === enemy.x).
                                if(enemy.possibleMoves.some(m => m.x!==enemy.x && (m.x===clonedKing.x && m.y===clonedKing.y))){
                                    //removes that move from piece's possible moves
                                    piece.possibleMoves = piece.possibleMoves.filter(m => m.x!==move.x || m.y!==move.y)
                                }
                            }
                            else{
                                //check if any of enemy's moves can attack the cloned king.
                                if(enemy.possibleMoves.some(m => m.x===clonedKing.x && m.y===clonedKing.y)){
                                    //if they can, then remove that possible move from current team's piece
                                    piece.possibleMoves = piece.possibleMoves.filter(m => m.x!==move.x || m.y!==move.y)
                                }
                            }
    
                        }
                    }

                }
            }
        }
    }

    isKingInCheck(){
        for(const piece of this.pieces){ 
            piece.possibleMoves = this.GetValidMoves(piece, this.pieces, 8)
        }
        const teamToPlay = this.MovesPlayed % 2===0 ? "w" : "b"
        const king = this.pieces.find(p => p.piece==="king" && p.team===teamToPlay)
        for(const piece of this.pieces.filter(p => p.team!==teamToPlay)){
            if(piece.possibleMoves.some(m => m.x===king.x && m.y===king.y)){
                return true
            }
        }
        return false
    }

    GetValidMoves(piece, board, ydim){
        switch (piece.piece) {
            case "pawn":
                return PawnPossibleMoves(piece, board, ydim);
            case "knight":
                return KnightPossibleMoves(piece, board);
            case "bishop":
                return BishopPossibleMoves(piece, board);
            case "rook":
                return RookPossibleMoves(piece, board);
            case "queen":
                return QueenPossibleMoves(piece, board);
            case "king":
                return KingPossibleMoves(piece, board);
            default:
                return [];
        }
    }

    playMove(isEnPassant, validMove, playedPiece, grabX, grabY, dropX, dropY){ 
        const direction = (playedPiece.team==="w") ? 1 : -1;
        const dropPiece = this.pieces.find(p => p.x===dropX && p.y===dropY && p.piece==="rook")
        if(playedPiece.piece==="king" && dropPiece && dropPiece.team===playedPiece.team){
            const castDir = (dropPiece.x - playedPiece.x > 0) ? 1 : -1
            const KingNewPosX = playedPiece.x + castDir * 2
            this.pieces = this.pieces.map(p => {
                if(p.x===playedPiece.x && p.y===playedPiece.y){
                    p.x = KingNewPosX
                }else if(p.x===dropPiece.x && p.y===dropPiece.y){
                    p.x = KingNewPosX - castDir
                }
                return p
            })
            this.calculateAllMoves();
            return true
        }

        if(isEnPassant){
            this.pieces = this.pieces.reduce((results, piece) => {
                if(piece.x===grabX && piece.y===grabY){ //the pieces that's been moved, updating new location
                piece.enPassant=false;
                piece.x = dropX;
                piece.y = dropY;
                piece.hasMoved = true;
                results.push(piece);
                }
                else if(piece.x!==dropX || piece.y!==dropY-direction){
                if(piece.piece === "pawn"){
                    piece.enPassant = false;
                }
                results.push(piece);
                }
                return results
            }, [])
            this.calculateAllMoves();
        }
        else if(validMove){
            this.pieces = this.pieces.reduce((results, piece) => {
                if(piece.x===grabX && piece.y===grabY){
                if(Math.abs(grabY-dropY)===2 && piece.piece==="pawn"){
                    piece.enPassant = true;
                }else{
                    piece.enPassant = false;
                }
                piece.x = dropX;
                piece.y = dropY;
                piece.hasMoved = true;
                results.push(piece);
                }
                else if(!(piece.x===dropX && piece.y===dropY)){
                    if(piece.piece==="pawn"){
                        piece.enPassant=false;
                    }
                    results.push(piece)
                }

                return results;
            }, [])
            this.calculateAllMoves();
        }
        else{
            return false
        }

        return true;
    }

    clone(){
        return new Board(this.pieces.map(p => p.clone()), this.MovesPlayed)
    }

    clear(){
        return new Board([]);
    }

    addPiece(piece) {
        return new Board([...this.pieces, piece]);
    }

    isEqual(otherBoard) {
        if (this.pieces.length !== otherBoard.pieces.length) return false;
    
        for (let i = 0; i < this.pieces.length; i++) {
            const currentPiece = this.pieces[i]

            if(!(otherBoard.pieces.find(p => p.piece===currentPiece.piece && 
                p.team===currentPiece.team && p.x===currentPiece.x && p.y===currentPiece.y))){
                    return false
            }
        }
    
        return true;
    }
}