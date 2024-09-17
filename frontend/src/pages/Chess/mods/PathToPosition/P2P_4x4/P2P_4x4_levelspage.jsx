import { useNavigate } from "react-router-dom"
import Header from '../../../../../Header'
import '../../../../mod_style.css'

export default function P2P_4x4_levelspage(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col items-center justify-center">
            <Header />
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/4x4/1')}>level 1</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/4x4/2')}>level 2</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/4x4/3')}>level 3</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/4x4/4')}>level 4</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/4x4/5')}>level 5</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/4x4/6')}>level 6</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/4x4/7')}>level 7</button>
            <button className="mod_button" onClick={() => navigate('/chess/PathToPosition/4x4/8')}>level 8</button>
        </div>
    )
}