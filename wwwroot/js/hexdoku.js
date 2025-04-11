window.Hexdoku = {
    gridElement: null,
    dotNetHelper: null,
    currentPuzzleData: null,
    highlightErrorsEnabled: false,

    init: function (dotNetHelper) {
        console.log("Hexdoku JS Initializing...");
        this.gridElement = document.getElementById('hexdoku-grid');
        this.dotNetHelper = dotNetHelper;
        if (!this.gridElement) {
            console.error("Hexdoku grid element not found!");
            return;
        }
        this.gridElement.style.display = 'grid';
        this.gridElement.style.gridTemplateColumns = 'repeat(16, 1fr)';
        this.gridElement.style.gridTemplateRows = 'repeat(16, 1fr)';
        this.gridElement.style.aspectRatio = '1 / 1';
        this.gridElement.style.width = 'min(80vw, 600px)';
        this.gridElement.style.margin = 'auto';
        this.gridElement.style.border = '2px solid black';
        console.log("Hexdoku JS Initialized.");
    },

    createGrid: function (puzzleData) {
        console.log("Creating grid with data:", puzzleData);
        if (!this.gridElement || !puzzleData) {
            console.error("Cannot create grid. Element or data missing.");
            return;
        }
        this.currentPuzzleData = puzzleData;
        this.gridElement.innerHTML = '';

        for (let r = 0; r < 16; r++) {
            for (let c = 0; c < 16; c++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.maxLength = 1;
                cell.dataset.row = r;
                cell.dataset.col = c;

                // Styling
                cell.style.width = '100%';
                cell.style.height = '100%';
                cell.style.boxSizing = 'border-box';
                cell.style.textAlign = 'center';
                cell.style.fontSize = 'clamp(10px, 2vw, 18px)';
                cell.style.padding = '0';
                cell.style.border = '1px solid #ccc';
                cell.style.outline = 'none';
                cell.style.backgroundColor = 'white';

                // Add thicker borders for 4x4 sub-grids
                if (r % 4 === 0 && r !== 0) cell.style.borderTop = '2px solid black';
                if (c % 4 === 0 && c !== 0) cell.style.borderLeft = '2px solid black';
                if (r === 15) cell.style.borderBottom = '1px solid #ccc';
                if (c === 15) cell.style.borderRight = '1px solid #ccc';


                const initialValue = puzzleData[r][c];
                if (initialValue && initialValue !== '.') {
                    cell.value = initialValue.toUpperCase();
                    cell.readOnly = true;
                    cell.style.fontWeight = 'bold';
                    cell.style.backgroundColor = '#eee';
                } else {
                    cell.value = '';
                    cell.readOnly = false;
                    cell.addEventListener('keydown', this.handleKeyDown.bind(this));
                }

                this.gridElement.appendChild(cell);
            }
        }
        this.checkAllErrors();
        console.log("Grid created.");
    },

    handleKeyDown: function (event) {
        const input = event.target;

        if (event.key === 'Backspace' || event.key === 'Delete') {
            input.value = '';
            this.checkAllErrors();
            return;
        }

        // Get the pressed key and convert to uppercase
        let value = event.key.toUpperCase();

        // Allow only valid hex characters (0-9, A-F)
        if (/^[0-9A-F]$/.test(value)) {
            event.preventDefault(); // Prevent default to handle the input ourselves
            input.value = value;
            this.checkAllErrors();
        }
    },

    solveGrid: function (solutionData) {
        console.log("Solving grid with data:", solutionData);
        if (!this.gridElement || !solutionData) return;

        const cells = this.gridElement.querySelectorAll('input');
        cells.forEach(cell => {
            const r = parseInt(cell.dataset.row);
            const c = parseInt(cell.dataset.col);
            cell.value = solutionData[r][c].toUpperCase();
            cell.style.backgroundColor = cell.readOnly ? '#eee' : 'white';
            cell.style.color = 'black';
        });
        console.log("Grid solved.");
    },

    clearGrid: function () {
        console.log("Clearing grid.");
        if (this.currentPuzzleData) {
            this.createGrid(this.currentPuzzleData);
        } else {
             const cells = this.gridElement.querySelectorAll('input');
             cells.forEach(cell => {
                 if (!cell.readOnly) {
                     cell.value = '';
                     cell.style.backgroundColor = 'white';
                     cell.style.color = 'black';
                 }
             });
        }
         console.log("Grid cleared.");
    },

    setHighlightErrors: function(enabled) {
        console.log("Setting highlight errors:", enabled);
        this.highlightErrorsEnabled = enabled;
        this.checkAllErrors();
    },

    checkAllErrors: function() {
        if (!this.dotNetHelper) return;

        if (!this.highlightErrorsEnabled) {
            const cells = this.gridElement.querySelectorAll('input');
            cells.forEach(cell => {
                if (!cell.readOnly) { // Only reset user cells
                    cell.style.backgroundColor = 'white';
                    cell.style.color = 'black';
                } else {
                    cell.style.backgroundColor = '#eee'; // Keep pre-filled style
                    cell.style.color = 'black';
                }
            });
            return;
        }

        this.dotNetHelper.invokeMethodAsync('GetSolution')
            .then(solution => {
                if (!solution) return;

                const cells = this.gridElement.querySelectorAll('input');
                cells.forEach(cell => {
                    if (cell.readOnly) {
                        cell.style.backgroundColor = '#eee';
                        cell.style.color = 'black';
                        return;
                    }

                    const r = parseInt(cell.dataset.row);
                    const c = parseInt(cell.dataset.col);
                    const currentValue = cell.value.toUpperCase();
                    const correctValue = solution[r][c].toUpperCase();

                    if (currentValue && currentValue !== correctValue) {
                        cell.style.backgroundColor = 'red'; // Bright red for errors
                        cell.style.color = 'white'; // Make text visible
                    } else if (currentValue) {
                        // Correct value
                        cell.style.backgroundColor = 'white';
                        cell.style.color = 'black';
                    } else {
                        // Empty cell
                        cell.style.backgroundColor = 'white';
                        cell.style.color = 'black';
                    }
                });
            })
            .catch(error => console.error("Error getting solution for validation:", error));
    }
};