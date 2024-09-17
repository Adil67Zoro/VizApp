import { Board } from "../../../Board";
import { finalBoard, finalPiece, initialBoard, initialPiece } from "../../../Constants";
import TwoChessboardsCreater from "../../../TwoChessboardsCreater"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../../../../Header";

export default function P2P_6x6(){
    const [boardInitial, setBoardInitial] = useState(initialBoard.clone())
    const [boardFinal, setBoardFinal] = useState(finalBoard.clone())
    const { level } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/chess/PathToPosition/6x6/${level}`)
            .then(res => {
                const fetchedInitialPieces = res.data[0].map(p => 
                    new initialPiece(p.x, p.y, p.piece, p.team, false)
                  );
                const fetchedFinalPieces = res.data[1].map(p => 
                    new finalPiece(p.x, p.y, p.piece, p.team)
                );
        
                const initialBoardState = new Board(fetchedInitialPieces, 0);
                const finalBoardState = new Board(fetchedFinalPieces, 0);

                setBoardInitial(initialBoardState)
                setBoardFinal(finalBoardState)
            })
            .catch(err => {
                console.error("Couldn't fetch positions", err);
            });
    }, [level]);

    return(
        <div>
            <Header />
            <TwoChessboardsCreater xdim={6} ydim={6} InitialPosition={boardInitial} FinalPosition={boardFinal}/>
        </div>
    )
}