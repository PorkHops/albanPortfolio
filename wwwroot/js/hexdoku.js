window.Hexdoku = {
    gridElement: null,
    dotNetHelper: null,
    currentPuzzleData: null, // Store the initial puzzle state for clearing/validation
    highlightErrorsEnabled: false, // Track the state of the checkbox

    init: function (dotNetHelper) {
        console.log("Hexdoku JS Initializing...");
        this.gridElement = document.getElementById('hexdoku-grid');
        this.dotNetHelper = dotNetHelper; // Store the reference
        if (!this.gridElement) {
            console.error("Hexdoku grid element not found!");
            return;
        }
        // Basic grid styles set in JS for clarity, could be moved to CSS
        this.gridElement.style.display = 'grid';
        this.gridElement.style.gridTemplateColumns = 'repeat(16, 1fr)';
        this.gridElement.style.gridTemplateRows = 'repeat(16, 1fr)';
        this.gridElement.style.aspectRatio = '1 / 1'; // Maintain square aspect ratio
        this.gridElement.style.width = 'min(80vw, 600px)'; // Responsive width
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
        this.currentPuzzleData = puzzleData; // Store for later use (clear, validation)
        this.gridElement.innerHTML = ''; // Clear previous grid

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
                cell.style.boxSizing = 'border-box'; // Include padding/border in size
                cell.style.textAlign = 'center';
                cell.style.fontSize = 'clamp(10px, 2vw, 18px)'; // Responsive font size
                cell.style.padding = '0';
                cell.style.border = '1px solid #ccc';
                cell.style.outline = 'none';
                cell.style.backgroundColor = 'white'; // Default background

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
                    cell.style.backgroundColor = '#eee'; // Indicate pre-filled cells
                } else {
                    cell.value = '';
                    cell.readOnly = false;
                    cell.addEventListener('input', this.handleInput.bind(this));
                }

                this.gridElement.appendChild(cell);
            }
        }
        this.checkAllErrors(); // Initial error check if highlighting is on
        console.log("Grid created.");
    },

    handleInput: function (event) {
        const input = event.target;
        const value = input.value.toUpperCase();

        // Allow only valid hex characters (0-9, A-F) or empty string
        if (!/^[0-9A-F]?$/.test(value)) {
            input.value = ''; // Clear invalid input
        } else {
            input.value = value; // Ensure uppercase
        }
        this.checkAllErrors(); // Check errors on every input
    },

    solveGrid: function (solutionData) {
        console.log("Solving grid with data:", solutionData);
        if (!this.gridElement || !solutionData) return;

        const cells = this.gridElement.querySelectorAll('input');
        cells.forEach(cell => {
            const r = parseInt(cell.dataset.row);
            const c = parseInt(cell.dataset.col);
            cell.value = solutionData[r][c].toUpperCase();
            cell.style.backgroundColor = cell.readOnly ? '#eee' : 'white'; // Reset background color
            cell.style.color = 'black'; // Reset text color
            // Make all cells read-only after solving? Optional.
            // cell.readOnly = true;
        });
        console.log("Grid solved.");
    },

    clearGrid: function () {
        console.log("Clearing grid.");
        if (this.currentPuzzleData) {
            this.createGrid(this.currentPuzzleData); // Recreate grid with initial puzzle data
        } else {
            // Fallback: just clear inputs if no initial data stored (shouldn't happen often)
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

    // --- Error Highlighting Logic ---

    setHighlightErrors: function(enabled) {
        console.log("Setting highlight errors:", enabled);
        this.highlightErrorsEnabled = enabled;
        this.checkAllErrors(); // Update highlighting immediately
    },

    checkAllErrors: function() {
        if (!this.dotNetHelper) return; // Only return if no dotNetHelper
        
        // Reset styles if highlighting is off
        if (!this.highlightErrorsEnabled) {
            const cells = this.gridElement.querySelectorAll('input');
            cells.forEach(cell => {
                if (!cell.readOnly) { // Only reset user-editable cells
                    cell.style.backgroundColor = 'white';
                    cell.style.color = 'black';
                } else {
                    cell.style.backgroundColor = '#eee'; // Keep pre-filled style
                    cell.style.color = 'black';
                }
            });
            return;
        }

        // Asynchronously get the solution from C#
        this.dotNetHelper.invokeMethodAsync('GetSolution')
            .then(solution => {
                if (!solution) return; // No solution available

                const cells = this.gridElement.querySelectorAll('input');
                cells.forEach(cell => {
                    if (cell.readOnly) { // Don't highlight pre-filled cells as errors
                        cell.style.backgroundColor = '#eee';
                        cell.style.color = 'black';
                        return;
                    }

                    const r = parseInt(cell.dataset.row);
                    const c = parseInt(cell.dataset.col);
                    const currentValue = cell.value.toUpperCase();
                    const correctValue = solution[r][c].toUpperCase();

                    if (currentValue && currentValue !== correctValue) {
                        // Incorrect value entered
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