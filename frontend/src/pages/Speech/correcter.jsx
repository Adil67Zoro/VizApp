const PiecePossibilities = {
    "rook": "rook", "brooke": "rook", "luke": "rook", "rookie": "rook", "route":"rook", "rakhi":"rook", 
        "rocky":"rook", "okay":"rook", "rocket":"rook", "rogue" : "rook "
}

const MovePossibilities = {
    "h1 h2": ["h1", "h2"]   
};

// Dynamically add possibilities for moves
for (let i = 2; i < 9; i++) {
    const from = "a1";
    const to = `a${i}`;
    
    MovePossibilities[`a 18${i}`] = [from, to];
    MovePossibilities[`a18${i}`] = [from, to];
    MovePossibilities[`81 8${i}`] = [from, to];
    MovePossibilities[`18${i}`] = [from, to];
    MovePossibilities[`818${i}`] = [from, to];
}


export function correcter(firstWord, restSentence){
    const move = MovePossibilities[restSentence]

    let from, to
    if(move){
        from = move[0]
        to = move[1]
    }   

    return [PiecePossibilities[firstWord], from, to]
}