import { useNavigate } from "react-router-dom"
import Header from '../../../../../Header'
import '../../../../mod_style.css'

export default function P2P_8x8_levelspage(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/8x8/1')}>level 1</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/8x8/2')}>level 2</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/8x8/3')}>level 3</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/8x8/4')}>level 4</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/8x8/5')}>level 5</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/8x8/6')}>level 6</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/8x8/7')}>level 7</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/8x8/8')}>level 8</button>
        </div>
    )
}