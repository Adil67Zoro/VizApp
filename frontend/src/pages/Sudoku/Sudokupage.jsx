import { useNavigate } from "react-router-dom"
import Header from "../../Header"
import '../OptionsPage.css'


export function Sudokupage(){
    const navigate = useNavigate()
    return(
        <div className="main">
            <Header />
            <button className="button"
                onClick={() => navigate('/sudoku/RecreatePosition/')}>
                <h1 className="mod_heading">Recreate Position</h1>
                <div className="description">
                    <h1>Given a board with some of the squares occupied, memorize it in an allocated time</h1>
                    <h1>Then the numbers disappear and you have to recreate that position</h1>
                </div>
            </button> 

            <button className="button" onClick={() => navigate('/sudoku/Classic/')}>
                <h1 className="mod_heading">Classic</h1>
                <div className="description">
                    <h1>Given a board with some of the squares occupied, memorize it in an allocated time</h1>
                    <h1>Then those occupied squares are "frozen" and you have to complete the board without seeing numbers on "frozen" squares</h1>
                </div>
            </button>

        </div>
    )
}

export function RP_sudoku(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            <button className="button" onClick={() => navigate('/sudoku/RecreatePosition/4x4')}>
                4x4
            </button>  
            <button className="button" onClick={() => navigate('/sudoku/RecreatePosition/6x6')}>
                6x6
            </button>    
            <button className="button" onClick={() => navigate('/sudoku/RecreatePosition/8x8')}>
                8x8
            </button>  
            <button className="button" onClick={() => navigate('/sudoku/RecreatePosition/10x10')}>
                10x10
            </button> 
        </div>
    )
}


export function Classic_sudoku(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            <button className="button" onClick={() => navigate('/sudoku/Classic/4x4')}>
                4x4
            </button>    
            <button className="button" onClick={() => navigate('/sudoku/Classic/6x6')}>
                6x6
            </button>    
            <button className="button" onClick={() => navigate('/sudoku/Classic/8x8')}>
                8x8
            </button>  
            <button className="button" onClick={() => navigate('/sudoku/Classic/10x10')}>
                10x10
            </button> 
        </div>
    )
}