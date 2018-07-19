const rows = 8;
const columns = 8;
const matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

function getRow(matrix = [], rowIndex) {
  return matrix[rowIndex];
}

function getColumn(matrix = [], columnIndex) {
  return matrix
    .reduce((acc, row = []) => {
      acc.push(row[columnIndex]);

      return acc;
    }, []);
}

function getDownSlant(matrix = [], rowIndex, columnIndex, numberOfRows, numberOfColumns) {
  const firstRowIndex = rowIndex - columnIndex;
  const firstColumnIndex = columnIndex - rowIndex;
  const values = [];

  let i = 0,
    r = firstRowIndex >= 0 ? firstRowIndex : 0,
    c = firstColumnIndex >= 0 ? firstColumnIndex : 0,
    currentIndex = 0;

  while (r < numberOfRows && c < numberOfColumns) {
    values.push(matrix[r][c]);

    if (r === rowIndex && c === columnIndex) {
      currentIndex = i;
    }

    i++;
    r++;
    c++;
  }

  return {
    values,
    currentIndex
  };
}

function getUpSlant(matrix = [], rowIndex, columnIndex, numberOfRows, numberOfColumns) {
  const firstRowIndex = rowIndex + columnIndex;
  const firstColumnIndex = columnIndex - ((numberOfRows - 1) - rowIndex);
  const values = [];

  let i = 0,
    r = firstRowIndex < numberOfRows ? firstRowIndex : numberOfRows - 1,
    c = firstColumnIndex >= 0 ? firstColumnIndex : 0,
    currentIndex = 0;

  while (r >= 0 && c < numberOfColumns) {
    values.push(matrix[r][c]);

    if (r === rowIndex && c === columnIndex) {
      currentIndex = i;
    }

    i++;
    r--;
    c++;
  }

  return {
    values,
    currentIndex
  };
}

console.log(getDownSlant(matrix, 4, 3, rows, columns));
console.log(getUpSlant(matrix, 4, 3, rows, columns));
