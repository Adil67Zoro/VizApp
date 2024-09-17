import './Squares.css'

export default function Squares({ image, xpos, ypos, highlight, transparent, 
        dimension, sudoku, number, chosen, hidden, length, kingChecked, canGrab }){ 
    const className = [
        (sudoku) && "sqr_style_sudoku",
        (chosen) && "red",
        (hidden) && "hide",
        (transparent) && "sqr_style_transparent", 
        ((xpos+ypos)%2 === 0 && !(transparent || sudoku)) && "sqr_style_black",
        ((xpos+ypos)%2 !== 0 && !(transparent || sudoku)) && "sqr_style_white",
        (highlight && image) && "highlight_with_img",
        (highlight && !(image)) && "highlight",
        (kingChecked) && "kingChecked",
    ].filter(Boolean).join(' ');
    let left_w = 1, right_w = 1, top_w = 1, bottom_w = 1;

    const midPos = length / 2;
    
    if (ypos === 0) {
        bottom_w = 8;
    } else if (ypos === length - 1) {
        top_w = 8;
    } else if (ypos % 2 === 0) {
        bottom_w = 4;
    } else {
        top_w = 4;
    }
    
    if (xpos === 0) {
        left_w = 8;
    } else if (xpos === length - 1) {
        right_w = 8;
    } else if (xpos === midPos - 1) {
        right_w = 4;
    } else if (xpos === midPos) {
        left_w = 4;
    }

    const style = {
        '--width': `${dimension}px`,
        '--height': `${dimension}px`,
        '--highlight-size': `${dimension}px`,
        '--left_w' : `${left_w}px`,
        '--right_w' : `${right_w}px`,
        '--top_w' : `${top_w}px`,
        '--bottom_w' : `${bottom_w}px`,
    };

    return(
        <div className={className} style={style}>
            {image && <div className="img_style" style={{ backgroundImage: `url(${image})` }}></div>}
            {sudoku && number}
        </div>
    )
}