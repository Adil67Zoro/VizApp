import React, { useState, useRef, useEffect} from "react"
import './OneChessboard.css'
import Squares from "./Squares"
import { NUMBERS, LETTERS, initialPiece } from "./Constants"
import { useNavigate, useParams } from "react-router-dom"

export default function OneChessboardCreater({xdim, ydim, InitialPosition}){
  const { level } = useParams();
  const nextLevel = parseInt(level) + 1; 
  const navigate = useNavigate()
  const className = `b${xdim}x${ydim}`
  const [timer, setTimer] = useState(1);
  const [board, setBoard] = useState(InitialPosition.clone())
  const [openSuccess, setOpenSuccess] = useState(false)
  const [showTimer, setShowTimer] = useState(true)
  const [canDrag, setCanDrag] = useState(false)
  const timerRef = useRef(null);
  const pieces = ["pawn", "rook", "knight", "bishop", "queen", "king"]

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
                  setCanDrag(true);
                  const emptyBoard = board.clear()
                  setBoard(emptyBoard)
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
    setCanDrag(false)
    tickingTimer();
  };

  function putinplace(piece, team, dropX, dropY){
    if(dropX>=0 && dropX<xdim && dropY>=0 && dropY<ydim){
      setBoard(() => {
        const clonedBoard = board.clone()
        clonedBoard.pieces.push(new initialPiece(dropX, dropY, piece, team))

        if(clonedBoard.isEqual(InitialPosition)){
          setOpenSuccess(true)
        }

        return clonedBoard
    })
    }
  }

  function moveInside(dropX, dropY, grabX, grabY){
    setBoard((prevBoardInitial) => {
      const clonedBoard = prevBoardInitial.clone();
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        const pieceOnThatSquare = clonedBoard.pieces.find(p => p.x===dropX && p.y===dropY)
        if(!(pieceOnThatSquare) && piece.x===grabX && piece.y===grabY){ //the pieces that's been moved, updating new location
          piece.x = dropX;
          piece.y = dropY;
          results.push(piece);
        }
        else{
          results.push(piece);
        }
        return results
      }, [])
      if(clonedBoard.isEqual(InitialPosition)){
        setOpenSuccess(true)
      }
      return clonedBoard;
    });
  }

  function removePieceFromBoard(x, y) {
    setBoard((prevBoardInitial) => {
      const clonedBoard = prevBoardInitial.clone();
      clonedBoard.pieces = clonedBoard.pieces.filter(p => !(p.x === x && p.y === y));
      if(clonedBoard.isEqual(InitialPosition)){
        setOpenSuccess(true)
      }
      return clonedBoard;
    });
  }

  const [grabmouseX, setGrabmouseX] = useState(0)
  const [grabmouseY, setGrabmouseY] = useState(0)
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [movingPiece, SetMovingPiece] = useState(null);
  const chessBoardRef1 = useRef(null);
  const displayedPiecesRef = useRef(null)
  const oneChessboardContainerRef = useRef(null)

  function grab(e){
    const element = e.target;
    const chessboard = chessBoardRef1.current
    if((element.classList.contains("img_style") || element.classList.contains("pieces")) && chessboard){//e.clientX and e.clientY provide the X and Y coordinates of the mouse event
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / SQUARE_SIZE)//chessboard.offsetLeft and chessboard.offsetTop give the position of the
      const grabY = Math.floor(((dim*ydim) - (e.clientY - chessboard.offsetTop)) / SQUARE_SIZE)//chessboard relative to the left and top of the viewport
      setGridX(grabX);
      setGridY(grabY);
      setGrabmouseX(e.clientX)
      setGrabmouseY(e.clientY)
      const x = e.clientX - SQUARE_SIZE / 2;
      const y = e.clientY - SQUARE_SIZE / 2;
      element.style.position = "absolute";
      element.style.left = `${x}px`
      element.style.top = `${y}px`
      const activePiece = element
      SetMovingPiece(activePiece);
    }
  }
  
    function move(e){
      const chessboard = chessBoardRef1.current;
      const oneChessboardContainer = oneChessboardContainerRef.current
      if(movingPiece && chessboard){
          const x = e.clientX - SQUARE_SIZE/2;
          const y = e.clientY - SQUARE_SIZE/2;
          const minX = oneChessboardContainer.offsetLeft - SQUARE_SIZE / 4;
          const minY = oneChessboardContainer.offsetTop - SQUARE_SIZE / 4;
          const maxX = oneChessboardContainer.offsetLeft + oneChessboardContainer.clientWidth - (SQUARE_SIZE - SQUARE_SIZE/2);
          const maxY = oneChessboardContainer.offsetTop + oneChessboardContainer.clientHeight - (SQUARE_SIZE - SQUARE_SIZE/2);
          movingPiece.style.left = `${x}px`
          movingPiece.style.top = `${y}px`
          movingPiece.style.position = 'absolute'
          
          if(x<minX){movingPiece.style.left = `${minX}px`}
          else if(x>maxX){movingPiece.style.left = `${maxX}px`}
          else{movingPiece.style.left = `${x}px`}
    
          if(y<minY){movingPiece.style.top = `${minY}px`}
          else if(y>maxY){movingPiece.style.top = `${maxY}px`}
          else{movingPiece.style.top = `${y}px`}
      }
    }
  
    function drop(e){
      const chessboard = chessBoardRef1.current;
      const displayedPieces = displayedPiecesRef.current;
      if(movingPiece && chessboard && displayedPieces){
          const dropX = Math.floor((e.clientX - chessboard.offsetLeft) / SQUARE_SIZE);
          const dropY = Math.floor(((dim*ydim) - (e.clientY - chessboard.offsetTop) ) / SQUARE_SIZE);

          const displayedPiecesRect = displayedPieces.getBoundingClientRect();
          const chessboardRect = chessboard.getBoundingClientRect()

          if (e.clientX >= displayedPiecesRect.left && e.clientX <= displayedPiecesRect.right && 
            e.clientY >= displayedPiecesRect.top && e.clientY <= displayedPiecesRect.bottom &&
            !(grabmouseX >= displayedPiecesRect.left && grabmouseX <= displayedPiecesRect.right && 
            grabmouseY >= displayedPiecesRect.top && grabmouseY <= displayedPiecesRect.bottom)) {
              removePieceFromBoard(gridX, gridY);
              movingPiece.style.display = 'none';
          } 
          else if((gridX>=0 && gridX<xdim && gridY>=0 && gridY<ydim) 
            && e.clientX >= chessboardRect.left && e.clientX <= chessboardRect.right && 
          e.clientY >= chessboardRect.top && e.clientY <= chessboardRect.bottom){
            moveInside(dropX, dropY, gridX, gridY)
          }
          else {
              const backgroundImage = movingPiece.style.backgroundImage;
              const regex = /url\("\.\.\/\.\.\/\.\.\/public\/(\w+)_([wb])\.png"\)/;
              const match = backgroundImage.match(regex);
              if (match) {
                  const piece = match[1];
                  const team = match[2];
                  putinplace(piece, team, dropX, dropY);
              }
          }
          movingPiece.style.position = 'relative'
          movingPiece.style.removeProperty('top')
          movingPiece.style.removeProperty('left')
          SetMovingPiece(null)
      }
  }

  let initialPieces = []
  for (let y=ydim-1; y>=0; y--){
    for (let x=0; x<xdim; x++){
      const piece1 = board.pieces.find((p) => p.x===x && p.y===y)
      let image1 = piece1 ? piece1.img : undefined;
      const key = `${LETTERS[x]}${NUMBERS[y]}`;

      let currentPiece = board.pieces.find(p => p.x===gridX && p.y===gridY)
      let highlight = currentPiece && currentPiece.possibleMoves ? 
      currentPiece.possibleMoves.some((p) => p.x===x && p.y===y) : false
      initialPieces.push(<Squares key={key} image={image1} xpos={x} ypos={y} highlight={highlight} dimension={dim}/>)
    }
  }

  let whitePiecePlacholders = []
  let blackPiecePlacholders = []
  for (let x=0; x<6; x++){
      whitePiecePlacholders.push(<Squares key={`${pieces[x]}_w`} image={`../../../public/${pieces[x]}_w.png`} 
          xpos={x} ypos={0} highlight={false} transparent={true} dimension={dim}/>)
      blackPiecePlacholders.push(<Squares key={`${pieces[x]}_b`} image={`../../../public/${pieces[x]}_b.png`} 
          xpos={x} ypos={1} highlight={false} transparent={true} dimension={dim}/>)
  }

  return(
      <div className="chessboard-container" onMouseMove={e => move(e)} 
            onMouseDown={e => {
              if(e.button===0 && canDrag===true){
                grab(e)
              }
            }}  
            onMouseUp={e => drop(e)}
            ref={oneChessboardContainerRef}>
          <div className='chessboard-container-one'>
              <div className={className} ref={chessBoardRef1}>
                  {openSuccess && (
                    <div className="success">
                      <div className="modal_element">
                          Successfully done
                      </div>
                      <button className="nextlevel" onClick={() => {
                        navigate(`/chess/RecreatePosition/${xdim}x${ydim}/${nextLevel}`)
                        restartBoards()
                      }}>{'Next Level ->'}</button>
                    </div>
                  )}
                  {initialPieces}
              </div>
          </div>


          <div className="right_box">
            <div className="timer-restart-container">
              {showTimer && <div className="timer">Time left: {timer}</div>}
              <button className="restart" onClick={restartBoards}>Restart</button>
            </div>

            <div className="displayedPieces" onMouseMove={e => move(e)} 
                onMouseDown={e => {
                  if(e.button===0 && canDrag===true){
                    grab(e)
                  }
                }} 
                onMouseUp={e => drop(e)}
                ref={displayedPiecesRef}
                >
                {whitePiecePlacholders}
                {blackPiecePlacholders}
            </div>
          </div>
                      
      </div>
  )
}
