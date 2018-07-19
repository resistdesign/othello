const rows = 8;
const columns = 8;
const matrix = [
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 2, 0, 0, 0 ],
  [ 0, 0, 0, 2, 1, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ]
];

function getRow(matrix = [], rowIndex){
  return matrix[rowIndex];
}

function getColumn(matrix = [], columnIndex){
  return matrix
    .reduce((acc, row = []) => {
      acc.push(row[columnIndex]);

      return acc;
    }, []);
}

function getDownSlant(matrix = [], rowIndex, columnIndex, numberOfRows, numberOfColumns){
  const firstRowIndex = rowIndex - columnIndex;
  const firstColumnIndex = columnIndex - rowIndex;
  const downSlant = [];

  let i = 0,
    r = firstRowIndex >= 0 ? firstRowIndex : 0,
    c = firstColumnIndex >= 0 ? firstColumnIndex : 0,
    currentIndex = 0;

  while(r < numberOfRows && c < numberOfColumns){
    downSlant.push(matrix[r][c]);

    if(r === rowIndex && c === columnIndex){
      currentIndex = i;
    }

    i++;
    r++;
    c++;
  }

  return {
    values: downSlant,
    currentIndex
  };
}

console.log(getDownSlant(matrix, 3, 4, rows, columns));
