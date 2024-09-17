import { useNavigate } from "react-router-dom"
import Header from '../../../../../Header'
import '../../../../mod_style.css'

export default function RP7x7_levelspage(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col items-center justify-center">
            <Header/>
            <button className="mod_button" onClick={() => navigate('/chess/RecreatePosition/7x7/1')}>level 1</button>
            <button className="mod_button" onClick={() => navigate('/chess/RecreatePosition/7x7/2')}>level 2</button>
            <button className="mod_button" onClick={() => navigate('/chess/RecreatePosition/7x7/3')}>level 3</button>
            <button className="mod_button" onClick={() => navigate('/chess/RecreatePosition/7x7/4')}>level 4</button>
            <button className="mod_button" onClick={() => navigate('/chess/RecreatePosition/7x7/5')}>level 5</button>

        </div>
    )
}