import { useNavigate } from "react-router-dom"
import Header from "../../../../Header"
import '../../../mod_style.css'

export function RP_Sudoku_4x4_levelspage(){
    const navigate = useNavigate()
    let buttons = []
    for(let i=1; i<9;i++){
        buttons.push(<button className="mod_button" onClick={() => navigate('/sudoku/RecreatePosition/4x4/1')}>level {i}</button>)
    }
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            {buttons}
        </div>
    )
}

export function RP_Sudoku_6x6_levelspage(){
    const navigate = useNavigate()
    let buttons = []
    for(let i=1; i<9;i++){
        buttons.push(<button className="mod_button" onClick={() => navigate('/sudoku/RecreatePosition/6x6/1')}>level {i}</button>)
    }
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            {buttons}
        </div>
    )
}

export function RP_Sudoku_8x8_levelspage(){
    const navigate = useNavigate()
    let buttons = []
    for(let i=1; i<9;i++){
        buttons.push(<button className="mod_button" onClick={() => navigate('/sudoku/RecreatePosition/8x8/1')}>level {i}</button>)
    }
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            {buttons}
        </div>
    )
}

export function RP_Sudoku_10x10_levelspage(){
    const navigate = useNavigate()
    let buttons = []
    for(let i=1; i<9;i++){
        buttons.push(<button className="mod_button" onClick={() => navigate('/sudoku/RecreatePosition/10x10/1')}>level {i}</button>)
    }
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            {buttons}
        </div>
    )
}