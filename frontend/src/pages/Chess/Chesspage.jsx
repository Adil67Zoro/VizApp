import { useNavigate } from "react-router-dom"
import Header from "../../Header"
import '../OptionsPage.css'

export function Chesspage(){
    const navigate = useNavigate()
    return(
        <div className="main">
            <Header />
            <button className="button"
                onClick={() => navigate('/chess/RecreatePosition/')}>
                <h1 className="mod_heading">Recreate Position</h1>
                <div className="description">
                    <h1>You are given a position and certain time to memorize it</h1>
                    <h1>Then the pieces disappear and you have to recreate that position</h1>
                </div>
            </button> 

            <button className="button" onClick={() => navigate('/chess/PathToPosition/')}>
                <h1 className="mod_heading">Path to Position</h1>
                <div className="description">
                    <h1>You are given two boards—an initial and final—and certain time to memorize the final board</h1>
                    <h1>You have to find a combination of moves that would lead the initial position to the final</h1>
                    <h1>by vizualing out in your mind every possible sequence of moves</h1>
                </div>
            </button>

        </div>
    )
}

export function RecreatePosition(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            <button className="button" onClick={() => navigate('/chess/RecreatePosition/4x4')}>
                4x4
            </button>  
            <button className="button" onClick={() => navigate('/chess/RecreatePosition/5x5')}>
                5x5
            </button>  
            <button className="button" onClick={() => navigate('/chess/RecreatePosition/6x6')}>
                6x6
            </button>  
            <button className="button" onClick={() => navigate('/chess/RecreatePosition/7x7')}>
                7x7
            </button>   
            <button className="button" onClick={() => navigate('/chess/RecreatePosition/8x8')}>
                8x8
            </button>           
        </div> 
    )
}

export function PathToPosition(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            <button className="button" onClick={() => navigate('/chess/PathToPosition/4x4')}>
                4x4
            </button>  
            <button className="button" onClick={() => navigate('/chess/PathToPosition/5x5')}>
                5x5
            </button>  
            <button className="button" onClick={() => navigate('/chess/PathToPosition/6x6')}>
                6x6
            </button>  
            <button className="button" onClick={() => navigate('/chess/PathToPosition/7x7')}>
                7x7
            </button>   
            <button className="button" onClick={() => navigate('/chess/PathToPosition/8x8')}>
                8x8
            </button>           
        </div> 
    )
}