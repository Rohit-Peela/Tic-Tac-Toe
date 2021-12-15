export const TYPE_OF_PLAY = {
  LOCAL: 0,
  COMPUTER: 1
}

export const USER_ICON = ['O', 'X'];

export const CHECK_MOVE = {
  LOCAL: 0,
  COMPUTER: 1
}

const getEmptyCells = (cells) => {
  return cells
    .map((val, idx) => [val, idx])
    .filter(item => item[0] === null);
}

const isMoveLeft = (cells) => {
  const emptyCells = getEmptyCells(cells);
  return emptyCells.length > 0;
}

const line1 = [0, 1, 2];
const line2 = [2, 4, 6];
const line3 = [3, 4, 5];
const line4 = [0, 4, 8];
const line5 = [6, 7, 8];
const line6 = [2, 5, 8];
const line7 = [0, 3, 6];
const line8 = [1, 4, 7];

export const checkGameState = (cells) => {
  const lines = [
    line1,
    line3, 
    line5, 
    line7, 
    line8, 
    line6, 
    line4, 
    line2 
  ];

  let position = "";
  let pointer = 0;
  while (pointer < lines.length) {
    const [first, second, third] = lines[pointer];
    //this.compute(position,pointer, first, second, third, cells);

    // if(equalCheck(first, second, third)) {

    // }

    if (equalCheck(first, second, third, cells)) {
      if (pointer >= 0 && pointer <= 2) position = `h h${pointer}`;
      else if (pointer>= 3 && pointer <= 5) position = `v v${pointer - 3}`;
      else position = `d${pointer - 6}`;

      return {
        position,
        iconType: cells[first],
        isTie: null
      }
      //compute(position, pointer, first, second, third, cells);
    }

    pointer++;
  }

  return {
    position: "",
    iconType: null,
    isTie: isMoveLeft(cells) ? null : true
  };
}

 export const equalCheck = (x,y,w, grid) => {
   return grid[x] !== null && grid[x] === grid[y] && grid[x] === grid[w];
}

export const compute = (position, pointer, a, b, c, cells) => {
    if (pointer >= 0 && pointer <= 2) position = `h h${pointer}`;
    else if (pointer>= 3 && pointer <= 5) position = `v v${pointer - 3}`;
    else position = `d${pointer - 6}`;

    return {
      position,
      iconType: cells[a],
      isTie: null
    }
  
}

export const getRandom = (start, end) => {
  return start + Math.floor(Math.random() * (end - start));
}

export const replace = (cells, index, value) => {
  return [...cells.slice(0, index), value, ...cells.slice(index + 1, cells.length)];
}


export const findRandomMove = (cells) => {
  const emptyCells = getEmptyCells(cells);

  if (emptyCells.length > 0) {
    const randomNum = getRandom(0, emptyCells.length);
    const index = emptyCells[randomNum][1];

    return index;
  }

  return null;
}


const minimax = (cells, depth, computerType, isMax) => {
  const score = evaluate(cells, computerType);

  if (score === 10) return score - depth;

  if (score === -10) return score + depth;

  if (!isMoveLeft(cells)) return 0;

  const len = cells.length;
  let best;

  if (isMax) {
    best = -1000;

    let pointer = 0;
    while (pointer < len) {
      const cell = cells[pointer];

      if (cell === null) {
        const nextCells = [...cells.slice(0, pointer), computerType, ...cells.slice(pointer + 1, cells.length)];

        best = Math.max(best, minimax(nextCells, depth + 1, computerType, !isMax));
      }

      pointer++;
    }
  } else {
    best = 1000;
    let pointer = 0;
    while (pointer < len) {
      const cell = cells[pointer];

      if (cell === null) {
        const nextCells = [...cells.slice(0, pointer), computerType, ...cells.slice(pointer + 1, cells.length)];

        best = Math.min(best, minimax(nextCells, depth + 1, computerType, !isMax));
      }

      pointer++;
    }
  }

  return best;
}

export const findBestMove = (cells, computerType) => {
  let bestVal = -1000;
  let bestMove = null;

  const len = cells.length;
  let pointer = 0;
  while (pointer < len) {
    const cell = cells[pointer];

    if (cell === null) {
      const nextCells = [...cells.slice(0, pointer), computerType, ...cells.slice(pointer + 1, cells.length)];

      const moveVal = minimax(nextCells, 0, computerType, false);

      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestMove = pointer;
      }
    }

    pointer++;
  }

  return bestMove;
}

const evaluate = (cells, computerType) => {
  const lines = [
    line1,
    line3, 
    line5, 
    line7, 
    line8, 
    line6, 
    line4, 
    line2 
  ];

  let pointer = 0;
  while (pointer < lines.length) {
    const [a, b, c] = lines[pointer];

    if (equalCheck(a, b, c, cells)) {
      if (cells[a] === computerType) return 10;
      return -10;
    }

    pointer++;
  }

  return 0;
}