VizApp (Visualization Application) is a web application that helps users train their memorization, visualization, and photographic memory through chess and sudoku (more games are to be added). 
There are two "modes": the first is where a chess or sudoku position is shown for a short amount of time, and then the board disappears, only leaving an empty one for the user to fill in with pieces or numbers to recreate the initial position, and the second is where two chessboards are shown, initial and final positions, and what the user has to do is not only to memorize the final position, because it also disappears after some time, but also to visualize the initial position in their head and calculate every possible combination of moves to get to the final position, which now only exists in their memory. Moreover, in the second mode, because it would be easy to just try out every possible move on the board displayed directly, since the initial board does not disappear, speech recognition (WebSpeech API) was implemented so that the moves can only be checked after voicing them and to encourage the users to use their brain power. Also, each mode has increasing difficulty levels depending on the size of the board. 

Here is how to run the project: 
1. Download both "backend" and "frontend" folders, and put them in a new folder.
2. Go to directory "./backend", and type: "npm start"
3. Go to directory "./frontend", and type: "npm run dev"
4. Open a browser and go to "http://localhost:5173/"

The frontend was written in ReactJS and ViteJS. The backend on ExpressJS. And MySQL was used as a database for storing, pulling, and parsing chess and sudoku positions

Since I am continuing this project, I am planning to add multiplayer, more modes, and more types of games.
