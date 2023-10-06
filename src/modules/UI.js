class Display {
    constructor() {
        this.chessboard = document.getElementById('chessboard');
    }

    fillBoard() {
        const createBlackCell = () => {
            const cell = document.createElement('div');
            cell.classList.add('black');
            cell.classList.add('cell');
            return cell;
        }
        const createWhiteCell = () => {
            const cell = document.createElement('div');
            cell.classList.add('white');
            cell.classList.add('cell');
            return cell;
        }
        const createHolder = () => {
            const holder = document.createElement('div');
            holder.classList.add('holder');
            return holder;
        }
        const createHolderHorisontal = () => {
            const holder = document.createElement('div');
            holder.classList.add('holder');
            holder.classList.add('horizontal');
            return holder;
        }
        const createHolderVertical = () => {
            const holder = document.createElement('div');
            holder.classList.add('holder');
            holder.classList.add('vertical');
            return holder;
        }
        const createHolderRowBlank = () => {
            for(let i = 0; i < 10; i++) {
                const holder = createHolder();
                this.chessboard.appendChild(holder);
            }
        }

        const createHolderRow = () => {
            const holderOne = createHolder();
            const holderTwo = createHolder();
            this.chessboard.appendChild(holderOne);

            for(let i = 0; i < 8; i++) {
                const holder = createHolderHorisontal();
                this.chessboard.appendChild(holder);
            }

            this.chessboard.appendChild(holderTwo);
        }

        const createOddRow = () => {
            const holderOne = createHolderVertical();
            this.chessboard.appendChild(holderOne);

            for(let i = 0; i < 4; i++) {
                const cellOne = createWhiteCell();
                const cellTwo = createBlackCell();
                this.chessboard.appendChild(cellOne);
                this.chessboard.appendChild(cellTwo);
            }

            const holderTwo = createHolder();
            this.chessboard.appendChild(holderTwo);
        }


        const createEvenRow = () => {
            const holderOne = createHolderVertical();
            this.chessboard.appendChild(holderOne);

            for(let i = 0; i < 4; i++) {
                const cellOne = createBlackCell();
                const cellTwo = createWhiteCell();
                this.chessboard.appendChild(cellOne);
                this.chessboard.appendChild(cellTwo);
            }

            const holderTwo = createHolder();
            this.chessboard.appendChild(holderTwo);
        }

        const fillVertical = () => {
            const holdersVertical = document.querySelectorAll('div.vertical');

            for (let i = 0; i < 8; i++) {
                const number = 8 - i;
                holdersVertical[i].textContent = number;
            }
        }

        const fillHorisontal = () => {
            const startCharCode = 'a'.charCodeAt(0);
            const holdersHorisontal = document.querySelectorAll('div.horizontal');

            for (let i = 0; i < 8; i++) {
                const letter = String.fromCharCode(startCharCode + i);
                holdersHorisontal[i].textContent = letter;
            }

        }

        const assignData = () => {
            const cells = document.querySelectorAll('div.cell')
            const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            const rows = [8, 7, 6, 5, 4, 3, 2, 1];

            let count = 0;
            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < columns.length; j++) {
                const x = j;
                const y = 7 - i;
                const name = columns[j] + rows[i];

                cells[count].dataset.x = x;
                cells[count].dataset.y = y;
                cells[count].dataset.name = name;

                count++;
                }
            }
        }
        
        createHolderRowBlank();

        for(let i = 0; i < 4; i++) {
            createOddRow();
            createEvenRow();
        }

        createHolderRow();
        fillVertical();
        fillHorisontal();
        assignData();
    }
}

export default Display;