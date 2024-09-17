import React, { useState, useRef, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import Squares from "../../../Chess/Squares"
import '../../Sudoku.css'
import { SudokuPosition } from "../../../Chess/Constants"

export default function ClassicSudoku_BoardCreater({xdim, ydim, InitialPosition}){
    const navigate = useNavigate()
    const { level } = useParams();
    const nextLevel = parseInt(level) + 1; 
    const [timer, setTimer] = useState(1);
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFailure, setOpenFailure] = useState(false)
    const [showTimer, setShowTimer] = useState(true)
    const [canTap, setCanTap] = useState(false  )
    const [board, setBoard] = useState(InitialPosition.clone())
    const timerRef = useRef(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const sudokuBoardRef = useRef(null);
    const displayedPiecesRef = useRef(null)
    const SQUARE_SIZE = 100
    const rows = xdim/2
    const className = `sudoku${xdim}x${ydim}`
    const [redOnBoard, setRedOnBoard] = useState(null);
    const [redOnDisplay, setRedOnDisplay] = useState(null);
    const [numberChosen, setNumberChosen] = useState()
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        setBoard(InitialPosition.clone());
    }, [InitialPosition]);
  
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
                    setCanTap(true);
                    setHidden(true)
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };


    const restartBoards = () => {
        setBoard(InitialPosition.clone());
        setTimer(1);
        setOpenSuccess(false);
        setShowTimer(true);
        setCanTap(false)
        tickingTimer();
        setRedOnBoard(null)
        setRedOnDisplay(null)
        setNumberChosen(null)
        setHidden(false)
    };

    const removeNumber = () => {
        if(redOnBoard){
            setBoard(() => {
                const clonedBoard = board.clone()
                const updatedBoard = clonedBoard.positions.filter(p => !(p.x===gridX && p.y===gridY))
                clonedBoard.positions = updatedBoard  
                setRedOnBoard(null)
                setRedOnDisplay(null)   
                if(clonedBoard.positions.length===(xdim*xdim)){
                    if(clonedBoard.checkForCompletion()){
                        setOpenSuccess(true)
                        setHidden(false)
                    }
                    else{
                        setOpenFailure(true);
                    }
                }  

                console.log(clonedBoard)

                return clonedBoard
            })
        }
    }

    function displayChosenNumber(x, y, value){
        setBoard(() => {
            const clonedBoard = board.clone()
            let SquareTaken = clonedBoard.positions.find(p => p.x===x && p.y===y)
            if(SquareTaken){
                SquareTaken.value = value
            }
            else{
                clonedBoard.positions.push(new SudokuPosition(x, y, value))
            }

            if(clonedBoard.positions.length===(xdim*xdim)){
                if(clonedBoard.checkForCompletion()){
                    setOpenSuccess(true)
                    setHidden(false)
                }
                else{
                    setOpenFailure(true);
                }
            }

            console.log(clonedBoard)
    
            return clonedBoard
        })
    }
    
    function grab(e) {
        const sudokuBoard = sudokuBoardRef.current;
        const sudokuBoardRect = sudokuBoard.getBoundingClientRect()
        const displayedPieces = displayedPiecesRef.current;
        const displayedPiecesRect = displayedPieces.getBoundingClientRect()
        const grabX = Math.floor((e.clientX - sudokuBoard.offsetLeft) / SQUARE_SIZE);
        const grabY = Math.floor(((100 * ydim) - (e.clientY - sudokuBoard.offsetTop)) / SQUARE_SIZE);
        setGridX(grabX);
        setGridY(grabY);

        if (e.clientX >= sudokuBoardRect.left && e.clientX <= sudokuBoardRect.right && 
            e.clientY >= sudokuBoardRect.top && e.clientY <= sudokuBoardRect.bottom ){
                if(!(e.target.className==="sqr_style_sudoku hide")){
                    setRedOnBoard(`${grabX}, ${grabY}`)
                }
        }

        if (e.clientX >= displayedPiecesRect.left && e.clientX <= displayedPiecesRect.right && 
            e.clientY >= displayedPiecesRect.top && e.clientY <= displayedPiecesRect.bottom ){
                setNumberChosen(Number(e.target.textContent));
                setRedOnBoard(null)
                setRedOnDisplay(e.target.textContent)
        }
    }

    function drop(e){
        const sudokuBoard = sudokuBoardRef.current;
        const sudokuBoardRect = sudokuBoard.getBoundingClientRect()
        if(numberChosen && redOnBoard && (e.clientX >= sudokuBoardRect.left && e.clientX <= sudokuBoardRect.right && 
            e.clientY >= sudokuBoardRect.top && e.clientY <= sudokuBoardRect.bottom )){
            displayChosenNumber(gridX, gridY, numberChosen)
            setNumberChosen(null)
        }
    }

    let initialPieces = []
    for (let y=ydim-1; y>=0; y--){
        for (let x=0; x<xdim; x++){ 
            const square = board.positions.find((p) => p.x===x && p.y===y)
            let value = square ? square.value : undefined;
            let chosen = (redOnBoard===(`${x}, ${y}`)) ? true : false
            const isInitialPosition = InitialPosition.positions.some(p => p.x === x && p.y === y);

            initialPieces.push(<Squares xpos={x} ypos={y} key={[x, y]} sudoku={true} dimension={100} number={value} chosen={chosen} 
                hidden={isInitialPosition ? hidden : false} length={xdim}/>)
        }
    }

    let numbers = []
    for (let x=1; x<=xdim; x++){
        let chosen = (redOnDisplay==x) ? true : false;
        numbers.push(<Squares key={x} xpos={x} sudoku={true} number={x} chosen={chosen}/>)
    }

    const style = {
        '--width': `${xdim}`,
        '--rows' : `${rows}`,
    };

    return(
      <div className="chessboard-container" style={style}>
        <div className={className} ref={sudokuBoardRef}
            onMouseDown={e => {
            if(canTap===true){
                grab(e)
            }}}
            onMouseUp={e => (drop(e))}>
            {openSuccess && (
                <div className="success">
                    <div className="modal_element">
                        Successfully done
                    </div>
                    <button className="nextlevel" onClick={() => {
                    navigate(`/sudoku/Classic/${xdim}x${ydim}/${nextLevel}`)
                    restartBoards()
                    }}>{'Next Level ->'}</button>
                </div>)}
            {openFailure && (
                <div className="success">
                    <div className="modal_element">
                        Failure
                    </div>
                </div>
            )}
            {initialPieces}
        </div>


          <div className="right_box">
            <div className="timer-restart-container">
                {showTimer && <div className="timer">Time left: {timer}</div>}
                <button className="restart" onClick={restartBoards}>Restart</button>
            </div>

            <div className="displayedNumbers"
                onMouseDown={e => {
                  if(canTap===true){
                    grab(e)
                  }
                }} 
                ref={displayedPiecesRef}
                >
                    {numbers}
            </div>
            <button className="restart" onClick={removeNumber}>Delete</button>
          </div>
                      
      </div>
  )
}
