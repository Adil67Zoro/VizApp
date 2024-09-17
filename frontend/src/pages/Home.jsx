import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import './Home.css'

function Home() {
    const navigate = useNavigate()
    return (
    <div className="home_main">
        <Header />
        <button className="home_button" onClick={() => navigate('/chess')}>
            Chess
        </button>   
        <button className="home_button" onClick={() => navigate('/sudoku')}>
            Sudoku
        </button> 
    </div>
  )
}

export default Home