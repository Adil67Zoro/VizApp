import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import P2P_4x4 from './pages/Chess/mods/PathToPosition/P2P_4x4/P2P_4x4';
import P2P_4x4_levelspage from './pages/Chess/mods/PathToPosition/P2P_4x4/P2P_4x4_levelspage';
import P2P_5x5 from './pages/Chess/mods/PathToPosition/P2P_5x5/P2P_5x5';
import P2P_5x5_levelspage from './pages/Chess/mods/PathToPosition/P2P_5x5/P2P_5x5_levelspage'
import P2P_6x6 from './pages/Chess/mods/PathToPosition/P2P_6x6/P2P_6x6';
import P2P_6x6_levelspage from './pages/Chess/mods/PathToPosition/P2P_6x6/P2P_6x6_levelspage';
import P2P_7x7 from './pages/Chess/mods/PathToPosition/P2P_7x7/P2P_7x7';
import P2P_7x7_levelspage from './pages/Chess/mods/PathToPosition/P2P_7x7/P2P_7x7_levelspage';
import P2P_8x8 from './pages/Chess/mods/PathToPosition/P2P_8x8/P2P_8x8';
import P2P_8x8_levelspage from './pages/Chess/mods/PathToPosition/P2P_8x8/P2P_8x8_levelspage';

import RP_4x4 from './pages/Chess/mods/RecreatePosition/RP_4x4/RP_4x4';
import RP_4x4_levelspage from './pages/Chess/mods/RecreatePosition/RP_4x4/RP_4x4_levelspage';
import RP_5x5 from './pages/Chess/mods/RecreatePosition/RP_5x5/RP_5x5';
import RP_5x5_levelspage from './pages/Chess/mods/RecreatePosition/RP_5x5/RP_5x5_levelspage';
import RP_6x6 from './pages/Chess/mods/RecreatePosition/RP_6x6/RP_6x6';
import RP_6x6_levelspage from './pages/Chess/mods/RecreatePosition/RP_6x6/RP_6x6_levelspage';
import RP_7x7 from './pages/Chess/mods/RecreatePosition/RP_7x7/RP_7x7';
import RP_7x7_levelspage from './pages/Chess/mods/RecreatePosition/RP_7x7/RP_7x7_levelspage';
import RP_8x8 from './pages/Chess/mods/RecreatePosition/RP_8x8/RP_8x8';
import RP_8x8_levelspage from './pages/Chess/mods/RecreatePosition/RP_8x8/RP_8x8_levelspage';

import { Chesspage, RecreatePosition, PathToPosition } from './pages/Chess/Chesspage';

import { Sudokupage, RP_sudoku, Classic_sudoku } from './pages/Sudoku/Sudokupage';
import { RP_Sudoku_4x4_levelspage,RP_Sudoku_6x6_levelspage, RP_Sudoku_8x8_levelspage, RP_Sudoku_10x10_levelspage } from './pages/Sudoku/levels/RP_Sudoku/RP_Sudoku_levelspage';

import { RP_Sudoku_4x4, RP_Sudoku_6x6, RP_Sudoku_8x8, RP_Sudoku_10x10 } from './pages/Sudoku/levels/RP_Sudoku/RP_Sudoku';

import { Classic_Sudoku_4x4,Classic_Sudoku_6x6, Classic_Sudoku_8x8, Classic_Sudoku_10x10 } from './pages/Sudoku/levels/ClassicSudoku/ClassicSudoku';
import { ClassicSudoku_4x4_levelspage, 
  ClassicSudoku_6x6_levelspage, ClassicSudoku_8x8_levelspage, ClassicSudoku_10x10_levelspage } from './pages/Sudoku/levels/ClassicSudoku/ClassicSudoku_levelspage';


import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

import Speech from './pages/Speech/speech';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sudoku" element={<Sudokupage />} />
          <Route path="/sudoku/RecreatePosition" element={<RP_sudoku />} />
          <Route path="/sudoku/RecreatePosition/4x4/" element={<RP_Sudoku_4x4_levelspage />} />
          <Route path="/sudoku/RecreatePosition/6x6/" element={<RP_Sudoku_6x6_levelspage />} />
          <Route path="/sudoku/RecreatePosition/8x8/" element={<RP_Sudoku_8x8_levelspage />} />
          <Route path="/sudoku/RecreatePosition/10x10/" element={<RP_Sudoku_10x10_levelspage />} />

          <Route path="/sudoku/RecreatePosition/4x4/:level" element={<RP_Sudoku_4x4 />} />
          <Route path="/sudoku/RecreatePosition/6x6/:level" element={<RP_Sudoku_6x6 />} />
          <Route path="/sudoku/RecreatePosition/8x8/:level" element={<RP_Sudoku_8x8 />} />
          <Route path="/sudoku/RecreatePosition/10x10/:level" element={<RP_Sudoku_10x10 />} />

          <Route path="/sudoku/Classic" element={<Classic_sudoku />} />
          <Route path="/sudoku/Classic/4x4" element={<ClassicSudoku_4x4_levelspage />} />
          <Route path="/sudoku/Classic/6x6" element={<ClassicSudoku_6x6_levelspage />} />
          <Route path="/sudoku/Classic/8x8" element={<ClassicSudoku_8x8_levelspage />} />
          <Route path="/sudoku/Classic/10x10" element={<ClassicSudoku_10x10_levelspage />} />

          <Route path="/sudoku/Classic/4x4/:level" element={<Classic_Sudoku_4x4 />} />
          <Route path="/sudoku/Classic/6x6/:level" element={<Classic_Sudoku_6x6 />} />
          <Route path="/sudoku/Classic/8x8/:level" element={<Classic_Sudoku_8x8 />} />
          <Route path="/sudoku/Classic/10x10/:level" element={<Classic_Sudoku_10x10 />} />

          <Route path="/chess" element={<Chesspage />} />
          <Route path="/chess/PathToPosition" element={<PathToPosition />} />
          <Route path="/chess/PathToPosition/4x4" element={<P2P_4x4_levelspage />} />
          <Route path="/chess/PathToPosition/5x5" element={<P2P_5x5_levelspage />} />
          <Route path="/chess/PathToPosition/6x6" element={<P2P_6x6_levelspage />} />
          <Route path="/chess/PathToPosition/7x7" element={<P2P_7x7_levelspage />} />
          <Route path="/chess/PathToPosition/8x8" element={<P2P_8x8_levelspage />} />
          <Route path="/chess/PathToPosition/4x4/:level" element={<P2P_4x4 />} />
          <Route path="/chess/PathToPosition/5x5/:level" element={<P2P_5x5 />} />
          <Route path="/chess/PathToPosition/6x6/:level" element={<P2P_6x6 />} />
          <Route path="/chess/PathToPosition/7x7/:level" element={<P2P_7x7 />} />
          <Route path="/chess/PathToPosition/8x8/:level" element={<P2P_8x8 />} />

          <Route path="/chess/RecreatePosition" element={<RecreatePosition />} />
          <Route path="/chess/RecreatePosition/4x4" element={<RP_4x4_levelspage />} />
          <Route path="/chess/RecreatePosition/5x5" element={<RP_5x5_levelspage />} />
          <Route path="/chess/RecreatePosition/6x6" element={<RP_6x6_levelspage />} />
          <Route path="/chess/RecreatePosition/7x7" element={<RP_7x7_levelspage />} />
          <Route path="/chess/RecreatePosition/8x8" element={<RP_8x8_levelspage />} />
          <Route path="/chess/RecreatePosition/4x4/:level" element={<RP_4x4 />} />
          <Route path="/chess/RecreatePosition/5x5/:level" element={<RP_5x5 />} />
          <Route path="/chess/RecreatePosition/6x6/:level" element={<RP_6x6 />} />
          <Route path="/chess/RecreatePosition/7x7/:level" element={<RP_7x7 />} />
          <Route path="/chess/RecreatePosition/8x8/:level" element={<RP_8x8 />} />
          <Route path="/speech" element={<Speech />} />


          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
