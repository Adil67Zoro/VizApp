import { useEffect, useState } from "react";
import ClassicChessBoardCreater from '../Chess/ClassicChessBoardCreater'
import { initialPiece } from "../Chess/Constants";
import { Board } from "../Chess/Board";
import Header from '../../Header'

export default function Speech(){
    let pieces = []
    // for (let i=0; i<8; i++){
    //     pieces.push(new initialPiece(i, 1, "pawn", "w"))
    //     pieces.push(new initialPiece(i, 6, "pawn", "b"))
    // }
    pieces.push(new initialPiece(0, 0, "rook", "w"))
    pieces.push(new initialPiece(1, 0, "knight", "w"))   
    pieces.push(new initialPiece(2, 0, "bishop", "w")) 
    pieces.push(new initialPiece(3, 0, "king", "w")) 
    pieces.push(new initialPiece(4, 0, "queen", "w")) 
    pieces.push(new initialPiece(5, 0, "bishop", "w")) 
    pieces.push(new initialPiece(6, 0, "knight", "w")) 
    pieces.push(new initialPiece(7, 0, "rook", "w")) 

    pieces.push(new initialPiece(0, 7, "rook", "b"))
    pieces.push(new initialPiece(1, 7, "knight", "b"))   
    pieces.push(new initialPiece(2, 7, "bishop", "b")) 
    pieces.push(new initialPiece(3, 7, "king", "b")) 
    pieces.push(new initialPiece(4, 7, "queen", "b")) 
    pieces.push(new initialPiece(5, 7, "bishop", "b")) 
    pieces.push(new initialPiece(6, 7, "knight", "b")) 
    pieces.push(new initialPiece(7, 7, "rook", "b")) 

    const fullBoard = new Board(pieces, 0)
    return(
        <div>
            <Header/>
            <ClassicChessBoardCreater xdim={8} ydim={8} InitialPosition={fullBoard}/>
        </div>
    )
}