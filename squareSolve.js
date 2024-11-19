function findSolutions() {
  const solutionsContainer = document.getElementById('solutions');
  const solutionsCounter = document.getElementById('counter-solutions');
  solutionsContainer.innerHTML = ''; // Clear previous solutions

  const numbers = [1, 2, 3, 4, 6, 7, 8, 9]; // Exclude 5
  const fixedCenter = 5;

  function isMagicSquare(grid) {
    const rows = [
      [grid[0], grid[1], grid[2]],
      [grid[3], fixedCenter, grid[4]],
      [grid[5], grid[6], grid[7]]
    ];
    const columns = [
      [grid[0], grid[3], grid[5]],
      [grid[1], fixedCenter, grid[6]],
      [grid[2], grid[4], grid[7]]
    ];
    const diagonals = [
      [grid[0], fixedCenter, grid[7]],
      [grid[2], fixedCenter, grid[5]]
    ];

    const isValid = arr => arr.reduce((sum, num) => sum + num, 0) === 15;

    return rows.every(isValid) && columns.every(isValid) && diagonals.every(isValid);
  }

  function permute(arr, used = [], result = [], solutions = []) {
    if (result.length === arr.length) {
      if (isMagicSquare(result)) {
        solutions.push([...result]);
      }
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      result.push(arr[i]);
      permute(arr, used, result, solutions);
      result.pop();
      used[i] = false;
    }
    return solutions;
  }

  const solutions = permute(numbers);

  if (solutions.length === 0) {
    solutionsContainer.innerHTML = '<p>No solutions found.</p>';
    return;
  }

  solutions.forEach(solution => {
    const solutionDiv = document.createElement('div');
    solutionDiv.classList.add('solution');

    const grid = document.createElement('div');
    grid.classList.add('grid');

    solution.forEach((num, index) => {
      if (index === 4) {
        const centerCell = document.createElement('div');
        centerCell.classList.add('cell', 'center');
        centerCell.textContent = fixedCenter;
        grid.appendChild(centerCell);
      }
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = num;
      grid.appendChild(cell);
    });

    solutionDiv.appendChild(grid);
    solutionsContainer.appendChild(solutionDiv);
  });

  solutionsContainer.insertAdjacentHTML('afterbegin', `<p>Found ${solutions.length} solutions.</p>`);
}