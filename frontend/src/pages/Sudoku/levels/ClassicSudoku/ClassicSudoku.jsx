import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../../../Header";
import ClassicSudoku_BoardCreater from './ClassicSudoku_BoardCreater'
import { SudokuBoard, SudokuBoardInitial, SudokuPosition } from "../../../Chess/Constants";

export function Classic_Sudoku_4x4(){
  const [boardInitial, setBoardInitial] = useState(SudokuBoardInitial.clone())
  const { level } = useParams();

  useEffect(() => {
      axios.get(`http://localhost:8080/sudoku/Classic/4x4/${level}`)
          .then(res => {
            const fetchedPositions = res.data.map(p => 
              new SudokuPosition(p.x, p.y, p.value)
            );
  
          const initialBoardState = new SudokuBoard(fetchedPositions, 0);

          setBoardInitial(initialBoardState)
          })
          .catch(err => {
              console.error("Couldn't fetch positions", err);
          });
  }, [level]);

  return(
      <div>
          <Header />
          <ClassicSudoku_BoardCreater xdim={4} ydim={4} InitialPosition={boardInitial}/>
      </div>
  )
}

export function Classic_Sudoku_6x6(){
  const [boardInitial, setBoardInitial] = useState(SudokuBoardInitial.clone())
  const { level } = useParams();

  useEffect(() => {
      axios.get(`http://localhost:8080/sudoku/Classic/6x6/${level}`)
          .then(res => {
            const fetchedPositions = res.data.map(p => 
              new SudokuPosition(p.x, p.y, p.value)
            );
  
          const initialBoardState = new SudokuBoard(fetchedPositions, 0);

          setBoardInitial(initialBoardState)
          })
          .catch(err => {
              console.error("Couldn't fetch positions", err);
          });
  }, [level]);

  return(
      <div>
          <Header />
          <ClassicSudoku_BoardCreater xdim={6} ydim={6} InitialPosition={boardInitial}/>
      </div>
  )
}

export function Classic_Sudoku_8x8(){
  const [boardInitial, setBoardInitial] = useState(SudokuBoardInitial.clone())
  const { level } = useParams();

  useEffect(() => {
      axios.get(`http://localhost:8080/sudoku/Classic/8x8/${level}`)
          .then(res => {
            const fetchedPositions = res.data.map(p => 
              new SudokuPosition(p.x, p.y, p.value)
            );
  
          const initialBoardState = new SudokuBoard(fetchedPositions, 0);

          setBoardInitial(initialBoardState)
          })
          .catch(err => {
              console.error("Couldn't fetch positions", err);
          });
  }, [level]);

  return(
      <div>
          <Header />
          <ClassicSudoku_BoardCreater xdim={8} ydim={8} InitialPosition={boardInitial}/>
      </div>
  )
}

export function Classic_Sudoku_10x10(){
  const [boardInitial, setBoardInitial] = useState(SudokuBoardInitial.clone())
  const { level } = useParams();

  useEffect(() => {
      axios.get(`http://localhost:8080/sudoku/Classic/10x10/${level}`)
          .then(res => {
            const fetchedPositions = res.data.map(p => 
              new SudokuPosition(p.x, p.y, p.value)
            );
  
          const initialBoardState = new SudokuBoard(fetchedPositions, 0);

          setBoardInitial(initialBoardState)
          })
          .catch(err => {
              console.error("Couldn't fetch positions", err);
          });
  }, [level]);

  return(
      <div>
          <Header />
          <ClassicSudoku_BoardCreater xdim={10} ydim={10} InitialPosition={boardInitial}/>
      </div>
  )
}