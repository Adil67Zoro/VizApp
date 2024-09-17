import React, { useState, useRef, useEffect} from "react"
import './OneChessboard.css'
import Squares from "./Squares"
import { NUMBERS, LETTERS, initialPiece } from "./Constants"
import { correcter } from "../Speech/correcter"

export default function OneChessboardCreater({xdim, ydim, InitialPosition}){
    const className = `b${xdim}x${ydim}`
    const [board, setBoard] = useState(InitialPosition.clone())
    const [optionColor, setOptionColor] = useState()
    const [openPromotion, setOpenPromotion] = useState(false)
    const ChessBoardRef = useRef(null);
    const [pawnToPromote, setPawnToPromote] = useState(null);
    const [kingChecked, setKingChecked] = useState(false);
    const [speech, setSpeech] = useState()
    const lettersToDigits = {"a" : 0, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "g" : 6, "h" : 7}
    const pieces = ["pawn", "rook", "bishop", "knight", "king", "queen"]
    const teamToPlay = board.MovesPlayed % 2===0 ? "w" : "b"
    const recognitionRef = useRef(null);  // Store recognition in a ref

    useEffect(() => {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new window.SpeechRecognition();
        recognition.interimResults = true;
        recognition.continuous = true;
        recognitionRef.current = recognition; 
        console.log("123");
    
        recognition.addEventListener('result', (e) => {
            const text = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
                .toLowerCase();
    
            setSpeech(text);
            let [firstWord, ...restOfSentence] = text.split(' ');
            let restSentence = restOfSentence.join(' ');
            console.log(firstWord, restSentence);
            const positionPattern = /^[a-h][1-8]\s[a-h][1-8]$/;
    
            if (pieces.includes(firstWord) && positionPattern.test(restSentence)) {
                console.log("1");
                const [from, to] = restSentence.split(' ');
                const fromLetter = from[0];
                const fromDigit = from[1];
                const toLetter = to[0];
                const toDigit = to[1];
                const chosenPiece = board.pieces.find(p => p.piece === firstWord.toLowerCase() && p.team === teamToPlay && p.y === fromDigit - 1 && p.x === lettersToDigits[fromLetter]);
                console.log(chosenPiece);
                board.calculateAllMoves(8);
                makeMove(chosenPiece.clone(), lettersToDigits[toLetter], toDigit - 1, lettersToDigits[fromLetter], fromDigit - 1);
            } else {
                console.log("2");
                const [correctedPiece, correctedFrom, correctedTo] = correcter(firstWord, restSentence);
                const [fromLetter, fromDigit] = correctedFrom.split("");
                const [toLetter, toDigit] = correctedTo.split("");
                console.log(correctedPiece, correctedFrom, correctedTo);
                const chosenPiece = board.pieces.find(p => p.piece === correctedPiece && p.team === teamToPlay && p.y === fromDigit - 1);
                console.log(chosenPiece);
                board.calculateAllMoves(8);
                makeMove(chosenPiece.clone(), lettersToDigits[toLetter], toDigit - 1, lettersToDigits[fromLetter], fromDigit - 1);
            }
        });
    
        recognition.start();
    
        // Set a timeout to stop recognition after 10 minutes (600,000 ms)
        const recognitionTimeout = setTimeout(() => {
            recognition.stop();
            console.log("Speech recognition stopped after 10 minutes.");
        }, 600000);  // 600,000 ms = 10 minutes
    
        return () => {
            recognition.stop();
            clearTimeout(recognitionTimeout); // Clear timeout if component unmounts
        };
    }, [teamToPlay]);

    const off = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();  // Stop the speech recognition
            console.log("Speech recognition manually stopped.");
        }
    };


    let dim = 0
    switch(xdim){
        case 4:
        dim = 100
        break
        case 5:
            dim = 95
            break
        case 6:
            dim = 90
            break
        case 7:
            dim = 85
            break
        case 8:
            dim = 80
            break
    }
    const SQUARE_SIZE = dim;

    useEffect(() => {
        setBoard(InitialPosition.clone());
    }, [InitialPosition]);

    function EnPassant(prevX, prevY, curX, curY, piece, team) {
        const direction = (team === "w") ? 1 : -1;
        if (piece === "pawn") {
            if (curY - prevY === direction && Math.abs(curX - prevX) === 1) {
                const piece = board.pieces.find((p) => p.x === curX && p.y === curY - direction && p.enPassant);
                if (piece) {
                    return true;
                }
            }
        }
        return false;
    }

    function makeMove(playedPiece, dropX, dropY, grabX, grabY) {
        if (playedPiece.possibleMoves === undefined) return false;
        if (playedPiece.team === "w" && board.MovesPlayed % 2 === 1) return false;
        if (playedPiece.team === "b" && board.MovesPlayed % 2 === 0) return false;
        let playedMoveIsValid = false;
        const validMove = playedPiece.possibleMoves.some(m => m.x === dropX && m.y === dropY);
        if (!validMove){
            return false
        }
        const isEnPassant = EnPassant(playedPiece.x, playedPiece.y, dropX, dropY, playedPiece.piece, playedPiece.team);

        setBoard(() => {
            const clonedBoard = board.clone();
            clonedBoard.MovesPlayed += 1;
            playedMoveIsValid = clonedBoard.playMove(isEnPassant, validMove, playedPiece, grabX, grabY, dropX, dropY);
            if(clonedBoard.isKingInCheck()){
                setKingChecked(true)
                setTimeout(() => setKingChecked(false), 300);
            }
            return clonedBoard;
        });

        if (playedPiece.piece === "pawn") {
            let promotionRow = (playedPiece.team === "w") ? (ydim - 1) : 0;
            if (dropY === promotionRow) {
                setOptionColor(playedPiece.team);
                setOpenPromotion(true);
                setPawnToPromote(() => {
                    const clonedPlayedPiece = playedPiece.clone();
                    clonedPlayedPiece.x = dropX;
                    clonedPlayedPiece.y = dropY;
                    return clonedPlayedPiece;
                });
            }
        }
        // console.log(playedMoveIsValid)
        return playedMoveIsValid;
    }

    function promote(p, color) {
        setBoard((previousBoard) => {
            const clonedBoard = board.clone();
            clonedBoard.pieces = clonedBoard.pieces.reduce((results, Piece) => {
                if (Piece.x === pawnToPromote.x && Piece.y === pawnToPromote.y) {
                    results.push(new initialPiece(Piece.x, Piece.y, p, color, false, [], true));
                } else {
                    results.push(Piece);
                }
                return results;
            }, []);
            clonedBoard.calculateAllMoves(xdim, ydim);
            return clonedBoard;
        });
        setOpenPromotion(false);
    }
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [movingPiece, SetMovingPiece] = useState(null);

    function grab(e) {
        board.calculateAllMoves(ydim);
        const element = e.target;
        const chessboard = ChessBoardRef.current;
        const dropX = Math.floor((e.clientX - chessboard.offsetLeft) / SQUARE_SIZE); //position to drop
        const dropY = Math.floor(((dim * ydim) - (e.clientY - chessboard.offsetTop)) / SQUARE_SIZE);
        if(e.target.classList.contains("highlight") || e.target.classList.contains("highlight_with_img")){
            const chosenPiece = board.pieces.find(p => p.x === gridX && p.y === gridY);
            makeMove(chosenPiece.clone(), dropX, dropY, gridX, gridY);
        }
        else if (element.classList.contains("img_style")) {
            const activePiece = element;
            const backgroundImage = activePiece.style.backgroundImage
            const regex = /url\("\.\.\/\.\.\/\.\.\/public\/(\w+)_([wb])\.png"\)/;
            let team;
            const match = backgroundImage.match(regex);
            if (match) {
                team = match[2];
            }
            const teamToPlay = board.MovesPlayed % 2===0 ? "w" : "b"
            if(teamToPlay===team){
                setGridX(dropX);
                setGridY(dropY);
                const x = e.clientX - SQUARE_SIZE / 2;
                const y = e.clientY - SQUARE_SIZE / 2;
                element.style.position = "absolute";
                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
                SetMovingPiece(activePiece);
            }
            else{
                SetMovingPiece(null)
            }
        }
    }

    function move(e){
        const chessboard = ChessBoardRef.current;
        if(movingPiece && chessboard){
            const minX = chessboard.offsetLeft - SQUARE_SIZE / 4;
            const minY = chessboard.offsetTop - SQUARE_SIZE / 4;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - (SQUARE_SIZE - SQUARE_SIZE/2);
            const maxY = chessboard.offsetTop + chessboard.clientHeight - (SQUARE_SIZE - SQUARE_SIZE/2);
            const x = e.clientX - SQUARE_SIZE/2;
            const y = e.clientY - SQUARE_SIZE/2;
            movingPiece.style.position = 'absolute'

            if(x<minX){movingPiece.style.left = `${minX}px`}
            else if(x>maxX){movingPiece.style.left = `${maxX}px`}
            else{movingPiece.style.left = `${x}px`}

            if(y<minY){movingPiece.style.top = `${minY}px`}
            else if(y>maxY){movingPiece.style.top = `${maxY}px`}
            else{movingPiece.style.top = `${y}px`}
        }
    }


    function drop(e) {
        const chessboard = ChessBoardRef.current;
        const chessboardRect = chessboard.getBoundingClientRect();
        if (e.clientX >= chessboardRect.left && e.clientX <= chessboardRect.right
        && e.clientY <= chessboardRect.bottom &&
        e.clientY >= chessboardRect.top) {
            if (movingPiece) {
                const dropX = Math.floor((e.clientX - chessboard.offsetLeft) / SQUARE_SIZE); //position to drop
                const dropY = Math.floor(((dim * ydim) - (e.clientY - chessboard.offsetTop)) / SQUARE_SIZE);
                const currentPiece = board.pieces.find(p => p.x === gridX && p.y === gridY);
                if (currentPiece) {
                var moveMade = makeMove(currentPiece.clone(), dropX, dropY, gridX, gridY);
                if (!moveMade) {
                movingPiece.style.position = 'relative';
                movingPiece.style.removeProperty('top');
                movingPiece.style.removeProperty('left');
                }
                }
                SetMovingPiece(null);
            }
        } else {
            movingPiece.style.position = 'relative';
            movingPiece.style.removeProperty('top');
            movingPiece.style.removeProperty('left');
        }
    }

    const king = board.pieces.find(p => p.piece==="king" && p.team===teamToPlay)
    let allPieces = []
    for (let y=ydim-1; y>=0; y--){
        for (let x=0; x<xdim; x++){
            const piece = board.pieces.find((p) => p.x===x && p.y===y)
            let image = piece ? piece.img : undefined;
            const key = `${LETTERS[x]}${NUMBERS[y]}`;
            let isKingChecked = (kingChecked && king.x===x && king.y===y) ? true : false
            let currentPiece = board.pieces.find(p => p.x===gridX && p.y===gridY)
            let highlight = currentPiece && currentPiece.possibleMoves ? 
            currentPiece.possibleMoves.some((p) => p.x===x && p.y===y) : false
            allPieces.push(<Squares key={key} image={image} xpos={x} ypos={y} 
                                    highlight={highlight} dimension={dim} kingChecked={isKingChecked}/>)
        }
    }

    return(
        <div className="chessboard-container"> 
            <p>{speech}</p>
            <div className="chessboard-container-one">
                <div className={className} onMouseMove={e => move(e)} 
                    onMouseDown={e => {
                        if(e.button === 0){
                            grab(e)
                        }
                    }} 
                    onMouseUp={e => drop(e)}
                    ref={ChessBoardRef}>

                    {openPromotion && (
                        <div className="modal">
                            <img onClick={() => promote("knight", optionColor)} className="option" src={`../../../public/knight_${optionColor}.png`} />
                            <img onClick={() => promote("rook", optionColor)} className="option" src={`../../../public/rook_${optionColor}.png`} />
                            <img onClick={() => promote("queen", optionColor)} className="option" src={`../../../public/queen_${optionColor}.png`} />
                            <img onClick={() => promote("bishop", optionColor)} className="option" src={`../../../public/bishop_${optionColor}.png`} />
                        </div>
                    )}

                    {allPieces}
                    <button onClick={() => off()}>stop</button>
                </div>
            </div>
        </div>
    )
}