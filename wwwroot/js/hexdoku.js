window.Hexdoku = {
    gridElement: null,
    dotNetHelper: null,
    currentPuzzleData: null,
    highlightErrorsEnabled: false,
    overlayElement: null,

    init: function (dotNetHelper) {
        console.log("Hexdoku JS Initializing...");
        this.gridElement  = document.getElementById('hexdoku-grid');
        this.dotNetHelper = dotNetHelper;
        if (!this.gridElement) {
            console.error("Hexdoku grid element not found!");
            return;
        }
        this.gridElement.style.display             = 'grid';
        this.gridElement.style.gridTemplateColumns = 'repeat(16, 1fr)';
        this.gridElement.style.gridTemplateRows    = 'repeat(16, 1fr)';
        this.gridElement.style.aspectRatio         = '1 / 1';
        this.gridElement.style.width               = 'min(80vw, 600px)';
        this.gridElement.style.margin              = 'auto';
        this.gridElement.style.border              = '2px solid black';
        console.log("Hexdoku JS Initialized.");
    },

    createGrid: function (puzzleData) {
        console.log("Creating grid with data:", puzzleData);
        if (!this.gridElement || !puzzleData) {
            console.error("Cannot create grid. Element or data missing.");
            return;
        }
        this.currentPuzzleData     = puzzleData;
        this.gridElement.innerHTML = '';

        for (let r = 0; r < 16; r++) {
            for (let c = 0; c < 16; c++) {
                const cell             = document.createElement('input');
                      cell.type        = 'text';
                      cell.maxLength   = 1;
                      cell.dataset.row = r;
                      cell.dataset.col = c;

                // Styling
                cell.style.width           = '100%';
                cell.style.height          = '100%';
                cell.style.boxSizing       = 'border-box';
                cell.style.textAlign       = 'center';
                cell.style.fontSize        = 'clamp(10px, 2vw, 18px)';
                cell.style.padding         = '0';
                cell.style.border          = '1px solid #ccc';
                cell.style.outline         = 'none';
                cell.style.backgroundColor = 'white';

                // Add thicker borders for 4x4 sub-grids
                if (r % 4 === 0 && r !== 0) cell.style.borderTop  = '2px solid black';
                if (c % 4 === 0 && c !== 0) cell.style.borderLeft = '2px solid black';
                if (r === 15) cell.style.borderBottom = '1px solid #ccc';
                if (c === 15) cell.style.borderRight  = '1px solid #ccc';

                const initialValue = puzzleData[r][c];
                if (initialValue && initialValue !== '.') {
                    cell.value                 = initialValue.toUpperCase();
                    cell.readOnly              = true;
                    cell.style.fontWeight      = 'bold';
                    cell.style.backgroundColor = '#eee';
                } else {
                    cell.value    = '';
                    cell.readOnly = false;
                    cell.addEventListener('keydown', this.handleKeyDown.bind(this));
                }
                // Add click event listener to all cells
                cell.addEventListener('click', this.handleCellClick.bind(this));

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
            // Clear highlights when cell is emptied
            const cells = this.gridElement.querySelectorAll('input');
            cells.forEach(cell => {
                if (!cell.readOnly) {
                    cell.style.backgroundColor = 'white';
                } else {
                    cell.style.backgroundColor = '#eee';
                }
            });
            return;
        }

        // Prevent default for any single character key
        if (event.key.length === 1) {
            event.preventDefault();

            let value = event.key.toUpperCase();

            // Allow only valid hex characters (0-9, A-F)
            if (/^[0-9A-F]$/.test(value)) {
                input.value = value;
                this.checkAllErrors();
                this.highlightMatchingCells(input);
                // Check if puzzle is complete after each valid input
                this.validatePuzzle();
            }
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
            this.clearHighlights();
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
                     this.clearHighlights();
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

        return this.dotNetHelper.invokeMethodAsync('GetSolution')
            .then(solution => {
                if (!solution) return { hasErrors: false, isComplete: false };

                let hasErrors   = false;
                let emptyFields = false;
                const cells = this.gridElement.querySelectorAll('input');

                cells.forEach(cell => {
                    if (cell.readOnly) {
                        cell.style.backgroundColor = '#eee';
                        cell.style.color = 'black';
                        return;
                    }

                    const r            = parseInt(cell.dataset.row);
                    const c            = parseInt(cell.dataset.col);
                    const currentValue = cell.value.toUpperCase();
                    const correctValue = solution[r][c].toUpperCase();

                    if (!currentValue) {
                        emptyFields = true;
                        if (this.highlightErrorsEnabled) {
                            cell.style.backgroundColor = 'white';
                            cell.style.color = 'black';
                        }
                    } else if (currentValue !== correctValue) {
                        hasErrors = true;
                        if (this.highlightErrorsEnabled) {
                            cell.style.backgroundColor = 'red';
                            cell.style.color           = 'white';
                        }
                    } else {
                        if (this.highlightErrorsEnabled) {
                            cell.style.backgroundColor = 'white';
                            cell.style.color           = 'black';
                        }
                    }
                });

                return {
                    hasErrors: hasErrors,
                    isComplete: !emptyFields
                };
            })
            .catch(error => {
                console.error("Error getting solution for validation:", error);
                return { hasErrors: true, isComplete: false };
            });
    },

    createOverlay: function(message) {
        if (this.overlayElement && document.body.contains(this.overlayElement)) {
            document.body.removeChild(this.overlayElement);
        }

        this.overlayElement = document.createElement('div');
        this.overlayElement.style.position        = 'fixed';
        this.overlayElement.style.top             = '50%';
        this.overlayElement.style.left            = '50%';
        this.overlayElement.style.transform       = 'translate(-50%, -50%)';
        this.overlayElement.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        this.overlayElement.style.color           = 'white';
        this.overlayElement.style.padding         = '20px';
        this.overlayElement.style.borderRadius    = '10px';
        this.overlayElement.style.zIndex          = '1000';
        this.overlayElement.style.textAlign       = 'center';
        this.overlayElement.innerHTML             = message;

        // Add close button
        const closeButton                       = document.createElement('button');
              closeButton.textContent           = 'Close';
              closeButton.style.marginTop       = '15px';
              closeButton.style.padding         = '8px 16px';
              closeButton.style.border          = 'none';
              closeButton.style.borderRadius    = '5px';
              closeButton.style.backgroundColor = '#756bdf';
              closeButton.style.cursor          = 'pointer';
              closeButton.onclick               = () => document.body.removeChild(this.overlayElement);

        this.overlayElement.appendChild(document.createElement('br'));
        this.overlayElement.appendChild(closeButton);

        document.body.appendChild(this.overlayElement);
    },

    validatePuzzle: function() {
        return this.checkAllErrors().then(result => {
            if (!result.hasErrors && result.isComplete) {
                this.createOverlay('🎉 Congratulations! You solved the puzzle correctly! 🎉');
                return true;
            }
            if (result.hasErrors && result.isComplete) {
                // Only enable error highlighting and show message when grid is complete
                this.createOverlay('❌ Some errors were found. Keep trying! ❌');
                this.highlightErrorsEnabled = true;
                this.dotNetHelper.invokeMethodAsync('SetHighlightErrors', true);
                this.checkAllErrors();
                return false;
            }
            return false;
        });
    },

    clearHighlights: function() {
        const cells = this.gridElement.querySelectorAll('input');
        cells.forEach(cell => {
            if (!cell.readOnly) {
                cell.style.backgroundColor = 'white';
            } else {
                cell.style.backgroundColor = '#eee';
            }
        });
    },

    handleCellClick: function(event) {
        const cell = event.target;
        this.highlightMatchingCells(cell);
    },

    highlightMatchingCells: function(activeCell) {
        const value            = activeCell.value.toUpperCase();
        const activeRow        = parseInt(activeCell.dataset.row);
        const activeCol        = parseInt(activeCell.dataset.col);
        const activeSubGridRow = Math.floor(activeRow / 4);
        const activeSubGridCol = Math.floor(activeCol / 4);

        const cells = this.gridElement.querySelectorAll('input');

        // Count occurrences of each value in the grid
        const valueCounts = new Map();
        cells.forEach(cell => {
            const cellValue = cell.value.toUpperCase();
            if (cellValue) {
                valueCounts.set(cellValue, (valueCounts.get(cellValue) || 0) + 1);
            }
        });

        cells.forEach(cell => {
            const cellValue      = cell.value.toUpperCase();
            const cellRow        = parseInt(cell.dataset.row);
            const cellCol        = parseInt(cell.dataset.col);
            const cellSubGridRow = Math.floor(cellRow / 4);
            const cellSubGridCol = Math.floor(cellCol / 4);

            // Reset styling for non-readonly cells first
            if (!cell.readOnly) {
                cell.style.backgroundColor = 'white';
                cell.style.color           = 'black';
            } else {
                cell.style.backgroundColor = '#eee';
                cell.style.color           = 'black';
            }

            // Add light blue highlight for same row, column, or sub-grid
            if (cellRow === activeRow || cellCol === activeCol ||
                (cellSubGridRow === activeSubGridRow && cellSubGridCol === activeSubGridCol)) {
                cell.style.backgroundColor = '#e3f2fd';
            }

            // Check if any values are fully placed (appear 16 times)
            if (cellValue && valueCounts.get(cellValue) === 16) {
                cell.style.backgroundColor = '#D2FAD2';  // Light green
                cell.style.color           = '#888888';  // Light grey text
            }
            // Then highlight matching value cells (higher priority than row/column highlight)
            else if (cellValue === value && value !== '') {
                cell.style.backgroundColor = '#ffeb3b'; // Light yellow highlight
            }
        });

        // Darker yellow for active cell
        activeCell.style.backgroundColor = '#ffd700';
    }
};