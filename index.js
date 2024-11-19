function checkSolution() {
  const grid = document.querySelectorAll('.grid .cell input');
  const result = document.getElementById('result');
  const fixedCenter = 5;
  const values = [];

  // Collect all numbers except the center
  grid.forEach((cell, index) => {
    const value = parseInt(cell.value);
    if (isNaN(value) || value < 1 || value > 9 || value === fixedCenter) {
      result.textContent = 'All cells must be filled with numbers 1-9 (except 5).';
      result.style.color = 'brown';
      return;
    }
    values.push(value);
  });

  // Check for duplicates
  if (new Set(values).size !== values.length) {
    result.textContent = 'Numbers must not repeat!';
    result.style.color = 'brown';
    return;
  }

  // Add the fixed center value
  values.splice(4, 0, fixedCenter); // Center value goes at index 4

  // Check rows, columns, and diagonals
  const rows = [
    [values[0], values[1], values[2]], // First row
    [values[3], values[4], values[5]], // Second row (center included)
    [values[6], values[7], values[8]]  // Third row
  ];

  const columns = [
    [values[0], values[3], values[6]], // First column
    [values[1], values[4], values[7]], // Second column (center included)
    [values[2], values[5], values[8]]  // Third column
  ];

  const diagonals = [
    [values[0], values[4], values[8]], // Diagonal from top-left to bottom-right
    [values[2], values[4], values[6]]  // Diagonal from top-right to bottom-left
  ];

  const isValid = arr => arr.reduce((sum, num) => sum + num, 0) === 15;

  if (rows.every(isValid) && columns.every(isValid) && diagonals.every(isValid)) {
    result.textContent = 'Congratulations! You solved the puzzle!';
    result.style.color = '#4CAF50';
  } else {
    result.textContent = 'The solution is incorrect. Try again!';
    result.style.color = 'brown';
  }
}
