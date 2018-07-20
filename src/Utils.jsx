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

export const getMatrixValueList = (matrix = []) => {
  return matrix
    .reduce((acc, row = [], r) => {
      row.forEach((value, c) => {
        acc.push({
          value,
          row: r,
          column: c
        });
      });

      return acc;
    }, []);
};

export const getValueHasFlippableValues = (value = 1, matrix = [], numberOfRows, numberOfColumns) => {
  const matrixValueList = getMatrixValueList(matrix);
  const flippableValues = matrixValueList
    .reduce((acc, valueItem = {}) => {
      const {value: currentValue = 0, row = 0, column = 0} = valueItem;

      if (currentValue === 0) {
        return [
          ...acc,
          ...getFlippableValuesFromMatrix(value, row, column, matrix, numberOfRows, numberOfColumns)
        ];
      } else {
        return acc;
      }
    }, []);

  return flippableValues.length > 0;
};

export const getMatrixWithFlippedValues = (matrix = [], flipValues = [], toValue = 1) => {
  const newMatrix = matrix
    .reduce((acc, row = []) => {
      const newRow = row
        .map(v => v);

      acc.push(newRow);

      return acc;
    }, []);

  flipValues
    .forEach(({row = 0, column = 0} = {}) => {
      newMatrix[row][column] = toValue;
    });

  return newMatrix;
};

export const getValueCountInMatrix = (matrix = [], matchValue = 0) => {
  return matrix
    .reduce((acc, row = []) => {
      return acc + row
        .reduce((acc2, c) => {
          return acc2 + (c === matchValue ? 1 : 0);
        }, 0);
    }, 0);
};
