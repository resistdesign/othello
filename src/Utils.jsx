export const getHorizontal = (matrix = [], rowIndex, columnIndex) => {
  return {
    values: matrix[rowIndex]
      .map((value, index) => {
        return {
          value,
          row: rowIndex,
          column: index
        };
      }),
    currentIndex: columnIndex
  };
};

export const getVertical = (matrix = [], rowIndex, columnIndex) => {
  return {
    values: matrix
      .reduce((acc, row = [], index) => {
        acc.push({
          value: row[columnIndex],
          row: index,
          column: columnIndex
        });

        return acc;
      }, []),
    currentIndex: rowIndex
  };
};

export const getDownSlant = (matrix = [], rowIndex, columnIndex, numberOfRows, numberOfColumns) => {
  const firstRowIndex = rowIndex - columnIndex;
  const firstColumnIndex = columnIndex - rowIndex;
  const values = [];

  let i = 0,
    r = firstRowIndex >= 0 ? firstRowIndex : 0,
    c = firstColumnIndex >= 0 ? firstColumnIndex : 0,
    currentIndex = 0;

  while (r < numberOfRows && c < numberOfColumns) {
    values.push({
      value: matrix[r][c],
      row: r,
      column: c
    });

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
};

export const getUpSlant = (matrix = [], rowIndex, columnIndex, numberOfRows, numberOfColumns) => {
  const firstRowIndex = rowIndex + columnIndex;
  const firstColumnIndex = columnIndex - ((numberOfRows - 1) - rowIndex);
  const values = [];

  let i = 0,
    r = firstRowIndex < numberOfRows ? firstRowIndex : numberOfRows - 1,
    c = firstColumnIndex >= 0 ? firstColumnIndex : 0,
    currentIndex = 0;

  while (r >= 0 && c < numberOfColumns) {
    values.push({
      value: matrix[r][c],
      row: r,
      column: c
    });

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
};

export const PATH_FINDER_MAP = {
  HORIZONTAL: getHorizontal,
  VERTICAL: getVertical,
  DOWN_SLANT: getDownSlant,
  UP_SLANT: getUpSlant
};

export const getFlippableValuesFromPath = (matchValue = 0, path = [], currentIndex = 0) => {
  const potentialBackValues = [];
  const potentialForthValues = [];

  let backValues = [];
  let forthValues = [];

  // Work backwards from index.
  for (let i = currentIndex - 1; i >= 0; i--) {
    const item = path[i];
    const {value} = item;

    if (value !== 0 && value !== matchValue) {
      potentialBackValues.push(item);
    } else {
      if (value === matchValue) {
        backValues = potentialBackValues;
      }

      break;
    }
  }

  // Work forward from index.
  for (let i = currentIndex + 1; i < path.length; i++) {
    const item = path[i];
    const {value} = item;

    if (value !== 0 && value !== matchValue) {
      potentialForthValues.push(item);
    } else {
      if (value === matchValue) {
        backValues = potentialForthValues;
      }

      break;
    }
  }

  return [
    ...backValues,
    ...forthValues
  ];
};

export const getFlippableValuesFromMatrix = (matchValue = 0, rowIndex, columnIndex, matrix = [], numberOfRows, numberOfColumns) => {
  const paths = Object
    .keys(PATH_FINDER_MAP)
    .map((k) => PATH_FINDER_MAP[k](matrix, rowIndex, columnIndex, numberOfRows, numberOfColumns));

  return paths
    .reduce((acc, {values = [], currentIndex = 0} = {}) => {
      return [
        ...acc,
        getFlippableValuesFromPath(matchValue, values, currentIndex)
      ];
    }, []);
};
