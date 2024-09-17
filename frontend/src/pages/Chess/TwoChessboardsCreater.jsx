import React, { useState, useRef, useEffect } from "react";
import './TwoChessboards.css';
import Squares from "./Squares";
import { NUMBERS, LETTERS } from "./Constants";
import { initialPiece } from "./Constants";
import { useNavigate, useParams } from "react-router-dom";
import { correcter } from "../Speech/correcter"

export default function TwoChessboardsCreater({ xdim, ydim, InitialPosition, FinalPosition }) {
    const { level } = useParams();
    const nextLevel = parseInt(level) + 1; 
    const navigate = useNavigate()
    const className = `twoboard${xdim}x${ydim}`;
    const [boardInitial, setBoardInitial] = useState(InitialPosition.clone());
    const [boardFinal, setBoardFinal] = useState(FinalPosition.clone());
    const [endingBoard, setEndingBoard] = useState(InitialPosition.clone())
    const [openPromotion, setOpenPromotion] = useState(false);
    const [optionColor, setOptionColor] = useState();
    const [pawnToPromote, setPawnToPromote] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [showFirstBoard, setShowFirstBoard] = useState(true);
    const [showSecondBoard, setShowSecondBoard] = useState(true);
    const [showTimer, setShowTimer] = useState(true);
    const [timer, setTimer] = useState(1);
    const [canMove, setCanMove] = useState(false);
    const timerRef = useRef(null);
    const chessBoardRef1 = useRef(null);
    const [moveNumber, setMoveNumber] = useState(0)

    const [speech, setSpeech] = useState()
    const lettersToDigits = {"a" : 0, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "g" : 6, "h" : 7}
    const pieces = {    "rook": "rook", "brooke": "rook", "luke": "rook", "rookie": "rook", 
        "route":"rook", "rakhi":"rook", "brook" : "rook",
        "rocky":"rook", "okay":"rook", "rocket":"rook", "rogue" : "rook",
        "bishop" : "bishop",
        "knight": "knight", "night" : "knight",
        "king" : "king",
        "queen" : "queen"}
    // const pieces = ["rook", "pawn", "queen", "knight", "king", "bishop"]
    const teamToPlay = boardInitial.MovesPlayed % 2===0 ? "w" : "b"
    const recognitionRef = useRef(null);  // Store recognition in a ref
    const commandState = useRef({
        listeningFor: 'piece',
        commandWords: [],
    });
    const [moves, setMoves] = useState([["pawn", "a1", "a2"], ["pawn", "b4", "b3"]]);  // State to keep track of moves
    const [movesHistory, setMovesHistory] = useState([]);

    function speech_on() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new window.SpeechRecognition();
        recognition.interimResults = false;  // Process only final results
        recognition.continuous = true;
        recognitionRef.current = recognition;
        console.log("Speech recognition started.");

        recognition.addEventListener('result', (e) => {
            const transcript = e.results[e.resultIndex][0].transcript.toLowerCase().trim();
            const words = transcript.split(/\s+/);
            console.log(words)

            words.forEach(word => {
                console.log(commandState.current.listeningFor)
                if (commandState.current.listeningFor === 'piece') {//if the system is currently expecting piece 
                    if (word in pieces) { //if its in the list of pieces
                        // Found a piece name
                        commandState.current.listeningFor = 'positions';//now the system is expecting positions
                        commandState.current.commandWords = [pieces[word]];//Stores the detected piece in commandWords
                        console.log('Piece detected:', pieces[word]);
                    }
                    // Ignore other words
                } else if (commandState.current.listeningFor === 'positions') {
                    if (/^[a-h][1-8]$/.test(word)) {
                        commandState.current.commandWords.push(word);
                        if (commandState.current.commandWords.length === 3) {
                            const [pieceName, fromPos, toPos] = commandState.current.commandWords;
                            setMoves(prevMoves => [...prevMoves, [pieceName, fromPos, toPos]]);
                            
                            // Reset state
                            commandState.current.listeningFor = 'piece';
                            commandState.current.commandWords = [];
                        }
                    }
                    else{
                        commandState.current.listeningFor = 'piece';
                        commandState.current.commandWords = [];
                    }
                }
            });
        });

        recognition.start();

        // Optional timeout to stop recognition after 10 minutes
        const recognitionTimeout = setTimeout(() => {
            recognition.stop();
            console.log("Speech recognition stopped after 10 minutes.");
        }, 600000);  // 600,000 ms = 10 minutes
    };

    function speech_off() {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            console.log("Speech recognition manually stopped.");
        }
    }

    // Function to process the move
    function makeNextMove(num) {
        if(num >= moves.length){
            console.log("too high")
            return
        }
        const pieceName = moves[num][0]
        const fromPos = moves[num][1]
        const toPos = moves[num][2]
        console.log('Processing move:', pieceName, fromPos, toPos);
        // Find the piece and perform the move
        const fromLetter = fromPos[0];
        const fromDigit = fromPos[1];
        const toLetter = toPos[0];
        const toDigit = toPos[1];

        const chosenPiece = boardInitial.pieces.find(
            p => p.piece === pieceName.toLowerCase()
                && p.team === teamToPlay
                && p.y === parseInt(fromDigit) - 1
                && p.x === lettersToDigits[fromLetter]
        );

        if (chosenPiece) {
            boardInitial.calculateAllMoves(ydim);
            makeMove(chosenPiece.clone(), lettersToDigits[toLetter], 
                    parseInt(toDigit) - 1, lettersToDigits[fromLetter], parseInt(fromDigit) - 1
        );
        } else {
            console.log("Piece not found or invalid move.");
        }
        setMoveNumber(moveNumber+1)
    }

    function goBackMove(){

    }

    function goToBeginning(){
        setMoveNumber(0)
        setBoardInitial(InitialPosition.clone())
    }  

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
        setBoardInitial(InitialPosition.clone());
        setBoardFinal(FinalPosition.clone());
        setEndingBoard(InitialPosition.clone())
    }, [InitialPosition, FinalPosition]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        tickingTimer();
    }, []);

    const tickingTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(timerRef.current);
                    setShowTimer(false);
                    setShowSecondBoard(false);
                    setCanMove(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const restartBoards = () => {
        setBoardInitial(InitialPosition.clone());
        setBoardFinal(FinalPosition.clone());
        setTimer(5);
        setOpenPromotion(false);
        setOpenSuccess(false);
        setOpenFailure(false);
        setShowSecondBoard(true);
        setShowTimer(true);
        tickingTimer();
    };

    function EnPassant(prevX, prevY, curX, curY, piece, team) {
        const direction = (team === "w") ? 1 : -1;
        if (piece === "pawn") {
            if (curY - prevY === direction && Math.abs(curX - prevX) === 1) {
                const piece = boardInitial.pieces.find((p) => p.x === curX && p.y === curY - direction && p.enPassant);
                if (piece) {
                    return true;
                }
            }
        }
        return false;
    }

    function makeMove(playedPiece, dropX, dropY, grabX, grabY) {
        console.log(playedPiece)
        if (playedPiece.possibleMoves === undefined) return false;
        console.log("1")
        if (playedPiece.team === "w" && boardInitial.MovesPlayed % 2 === 1) return false;
        console.log("2")
        if (playedPiece.team === "b" && boardInitial.MovesPlayed % 2 === 0) return false;
        console.log("3")
        let playedMoveIsValid = false;
        const validMove = playedPiece.possibleMoves.some(m => m.x === dropX && m.y === dropY);
        if (!validMove) return false;
        console.log("4")
        const isEnPassant = EnPassant(playedPiece.x, playedPiece.y, dropX, dropY, playedPiece.piece, playedPiece.team);

        setBoardInitial(() => {
            const clonedBoard = boardInitial.clone();
            clonedBoard.MovesPlayed += 1;
            playedMoveIsValid = clonedBoard.playMove(isEnPassant, validMove, playedPiece, grabX, grabY, dropX, dropY);
            if (clonedBoard.isEqual(boardFinal)) {
                setOpenSuccess(true);
                setShowSecondBoard(true);
            } else if (clonedBoard.pieces.length < boardFinal.pieces.length) {
                setOpenFailure(true);
            }
            console.log(clonedBoard)
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
        return playedMoveIsValid;
    }

    function promote(p, color) {
        setBoardInitial((previousBoard) => {
            const clonedBoard = boardInitial.clone();
            clonedBoard.pieces = clonedBoard.pieces.reduce((results, Piece) => {
                if (Piece.x === pawnToPromote.x && Piece.y === pawnToPromote.y) {
                    results.push(new initialPiece(Piece.x, Piece.y, p, color, false, [], true));
                } else {
                    results.push(Piece);
                }
                return results;
            }, []);
            clonedBoard.calculateAllMoves(xdim, ydim);
            if (clonedBoard.isEqual(boardFinal)) {
                setOpenSuccess(true);
                setShowSecondBoard(true);
            }
            return clonedBoard;
        });
        setOpenPromotion(false);
    }

    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [movingPiece, SetMovingPiece] = useState(null);

    function grab(e) {
        boardInitial.calculateAllMoves(ydim);
        const element = e.target;
        const chessboard = chessBoardRef1.current;
        const dropX = Math.floor((e.clientX - chessboard.offsetLeft) / SQUARE_SIZE); //position to drop
        const dropY = Math.floor(((dim * ydim) - (e.clientY - chessboard.offsetTop)) / SQUARE_SIZE);
        if(e.target.classList.contains("highlight") || e.target.classList.contains("highlight_with_img")){
            const chosenPiece = boardInitial.pieces.find(p => p.x === gridX && p.y === gridY);
            makeMove(chosenPiece.clone(), dropX, dropY, gridX, gridY);
        }
        if (element.classList.contains("img_style")) {
            setGridX(dropX);
            setGridY(dropY);
            const x = e.clientX - SQUARE_SIZE / 2;
            const y = e.clientY - SQUARE_SIZE / 2;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            const activePiece = element;
            SetMovingPiece(activePiece);
        }
    }

    function move(e){
        const chessboard = chessBoardRef1.current;
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
        const chessboard = chessBoardRef1.current;
        const chessboardRect = chessboard.getBoundingClientRect();
        if (e.clientX >= chessboardRect.left && e.clientX <= chessboardRect.right
            && e.clientY <= chessboardRect.bottom &&
            e.clientY >= chessboardRect.top) {
            if (movingPiece) {
                const dropX = Math.floor((e.clientX - chessboard.offsetLeft) / SQUARE_SIZE); //position to drop
                const dropY = Math.floor(((dim * ydim) - (e.clientY - chessboard.offsetTop)) / SQUARE_SIZE);
                const currentPiece = boardInitial.pieces.find(p => p.x === gridX && p.y === gridY);
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
            console.log("else")
            movingPiece.style.position = 'relative';
            movingPiece.style.removeProperty('top');
            movingPiece.style.removeProperty('left');
        }
    }

    let initialPieces = [];
    let finalPieces = [];
    for (let y = ydim - 1; y >= 0; y--) {
        for (let x = 0; x < xdim; x++) {
            const piece1 = boardInitial.pieces.find((p) => p.x === x && p.y === y);
            const piece2 = boardFinal.pieces.find((p) => p.x === x && p.y === y);
            let image1 = piece1 ? piece1.img : undefined;
            let image2 = piece2 ? piece2.img : undefined;
            const key = `${LETTERS[x]}${NUMBERS[y]}`;

            let currentPiece = boardInitial.pieces.find(p => p.x === gridX && p.y === gridY);
            let highlight = currentPiece && currentPiece.possibleMoves ?
                currentPiece.possibleMoves.some((p) => p.x === x && p.y === y) : false;
            initialPieces.push(<Squares key={key} image={image1} xpos={x} ypos={y} highlight={highlight} transparent={false} dimension={dim}/>);
            finalPieces.push(<Squares key={key} image={image2} xpos={x} ypos={y} highlight={false} transparent={false} dimension={dim}/>);
        }
    }

    return (
        <div className="chessboard-container">

            <div className="chessboard-container-two"  onMouseMove={e => move(e)} 
                onMouseDown={e => {
                    if(e.button === 0 && canMove===true){
                        grab(e)
                    }}
                } 
                onMouseUp={e => drop(e)}>
                <div className={className} ref={chessBoardRef1}>
                    {openPromotion && (
                        <div className="modal">
                            <img onClick={() => promote("knight", optionColor)} className="option" src={`../../../public/knight_${optionColor}.png`} />
                            <img onClick={() => promote("rook", optionColor)} className="option" src={`../../../public/rook_${optionColor}.png`} />
                            <img onClick={() => promote("queen", optionColor)} className="option" src={`../../../public/queen_${optionColor}.png`} />
                            <img onClick={() => promote("bishop", optionColor)} className="option" src={`../../../public/bishop_${optionColor}.png`} />
                        </div>
                    )}
                {openSuccess && (
                    <div className="success">
                        <div className="modal_element">
                            Successfully done
                        </div>
                        <button className="nextlevel" onClick={() => {
                        navigate(`/chess/PathToPosition/${xdim}x${ydim}/${nextLevel}`)
                        restartBoards()
                        }}>{'Next Level ->'}</button>
                    </div>
                )}
                {openFailure && (
                    <div className="modal">
                        Failure. There are less pieces than in final board
                    </div>
                )}
                {showFirstBoard && initialPieces}

                </div>
            </div>

            <div className="timer-restart-container">
                {showTimer && <div className="timer">Time left: {timer}</div>}
                <button className="restart" onClick={restartBoards}>Restart</button>
            </div>

            {showSecondBoard ?  (
                <div className="disappear">
                    <div className="chessboard-container-two">
                        <div className={className}>
                            {finalPieces}
                        </div>
                    </div>
                 </div>
            ) : (
                <div className="control_panel">
                    <div className="speech_buttons">
                        <button className="button" onClick={() => speech_on()}>Start Listening</button>
                        <button className="button" onClick={() => speech_off()}>Stop Listening</button>
                    </div>

                    <div className="display">
                        {moves.map((move, index) => (
                            <div className="moves" key={index}>{move.join(' ')}</div>
                        ))}
                    </div>

                    <div className="buttons">
                        <button className="button" onClick={() => goToBeginning()}>Beginning</button>
                        <button className="button" onClick={() => goBackMove()}>Previous</button>
                        <button className="button" onClick={() => makeNextMove(moveNumber)}>Next</button>
                    </div>
                </div>

            )}
        </div>
    );
}
