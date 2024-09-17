import OneChessboardCreater from '../../../OneChessboardCreater'
import Header from "../../../../../Header";
import { initialBoard, initialPiece } from '../../../Constants';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Board } from '../../../Board';

export default function RP_8x8(){
    const [boardInitial, setBoardInitial] = useState(initialBoard.clone())
    const { level } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/chess/RecreatePosition/8x8/${level}`)
            .then(res => {
                const fetchedInitialPieces = res.data.map(p => 
                    new initialPiece(p.x, p.y, p.piece, p.team, false)
                  );
        
                const initialBoardState = new Board(fetchedInitialPieces, 0);

                setBoardInitial(initialBoardState)
            })
            .catch(err => {
                console.error("Couldn't fetch positions", err);
            });
    }, [level]);
    return(
        <div>
            <Header />
            <OneChessboardCreater xdim={8} ydim={8} InitialPosition={boardInitial}/>
        </div>
    )
}