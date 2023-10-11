class Display {
    constructor() {
        this.knight = document.getElementById('knight');
        this.knightPark = document.getElementById('knight-park');
        this.chessboard = document.getElementById('chessboard');
        this.target = document.getElementById('target');
        this.targetPark = document.getElementById('target-park');
        this.knightPosition = document.getElementById('knight-position');
        this.targetPosition = document.getElementById('target-position');
        this.cons = document.getElementById('console');
        this.init = this.initiate();
        this.isDragging = false;
        this.start = [];
        this.finish = [];
    }

    initiate() {
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
        this.handleElementsDragging();
        this.enableButtonTransitions();

        return true;
    }

    handleElementsDragging() {
        const updatePosition = (cell, element) => {
            const pos = cell.dataset.name;
            element.textContent = ' ' + pos;
        }

        this.knight.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'knight');
            this.isDragging = true;
            const landing = this.knight.parentNode;
            landing.classList.remove('knight-landing');
            
        })

        this.target.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'target');
            this.isDragging = true;
            const landing = this.target.parentNode;
            landing.classList.remove('target-landing');
            
        })

        this.knight.addEventListener('dragend', () => {
            this.isDragging = false;
            const hovers = document.querySelectorAll('div.hover');
            if (hovers.length) {
                hovers.forEach(hover => hover.classList.remove('hover'));
            }
        })

        this.target.addEventListener('dragend', () => {
            this.isDragging = false;
            const hovers = document.querySelectorAll('div.hover');
            if (hovers.length) {
                hovers.forEach(hover => hover.classList.remove('hover'));
            }
        })

        this.chessboard.addEventListener('dragover', (e) => {
            e.preventDefault();
            const target = e.target;
            let name = undefined;
            if (target.dataset.name !== undefined) name = target.dataset.name;
            if (this.isDragging && name !== undefined) {
                const cell = document.querySelector(`div[data-name=${name}]`);
                cell.classList.add('hovered');
            }
        })

        this.chessboard.addEventListener('dragleave', (e) => {
            const target = e.target;
            let name = undefined;
            if (target.dataset.name !== undefined) name = target.dataset.name;
            if (name !== undefined) {
                const cell = document.querySelector(`div[data-name=${name}]`);
                cell.classList.remove('hovered');
            }
        })

        this.chessboard.addEventListener('drop', (e) => {
            e.preventDefault();
            const target = e.target;
            const data = e.dataTransfer.getData('text/plain')
            let name = undefined;
            if (target.dataset.name !== undefined) name = target.dataset.name;
            if (this.isDragging && name !== undefined) {
                const cell = document.querySelector(`div[data-name=${name}]`);

                if (data === 'knight') {
                    cell.appendChild(this.knight);                   
                    cell.classList.add('knight-landing');
                    updatePosition(cell, this.knightPosition);
                    const startX = Number(cell.dataset.x);
                    const startY = Number(cell.dataset.y);
                    this.start = [startX, startY];
                    this.log(`Knight is placed on ${cell.dataset.name}`)
                    console.log(this.start);
                }
                else if (data === 'target') {
                    cell.appendChild(this.target);
                    cell.classList.add('target-landing');
                    updatePosition(cell, this.targetPosition);
                    const finishX = Number(cell.dataset.x);
                    const finishY = Number(cell.dataset.y);
                    this.finish = [finishX, finishY];
                    this.log(`Mark is placed on ${cell.dataset.name}`);
                    console.log(this.finish);
                };

                this.isDragging = false;
                cell.classList.remove('hovered');
            }
        })
    }

    enableButtonTransitions() {
        const addTransitions = () => {
            removeEventListener('DOMContentLoaded', addTransitions);
            const buttons = document.querySelectorAll('button');
            buttons.forEach((button) => {
                button.classList.add('.transition');
            });
        }
        document.addEventListener('DOMContentLoaded', addTransitions);
    }

    log(message) {
        const body = document.createElement('div');
        body.classList.add('message');
        body.textContent = message;
        this.cons.appendChild(body);
    }

    handleTravail(array) {
        if (!this.start.length || !this.finish.length) {
            this.log('Please place knight and target markers on the board before the start!');
            return
        }

        this.log('Travail begins!');
        this.targetPark.appendChild(this.target);
        const qq = [];
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        array.forEach((item) => {
            const [x, y] = item;
            const element = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            qq.push(element);
        })

        qq.forEach(async (item) => {
            const multiplier = qq.indexOf(item);
            await delay(100 * multiplier);
            await item.classList.add('hovered');
        })

        let translateX = 0;
        let translateY = 0;

        const endroad = () => {
            this.knight.removeEventListener('transitionend', endroad);
            const destination = qq[qq.length - 1];
            this.knight.style.transform = 'translate(0, 0)'
            destination.appendChild(this.knight);
        }

        qq.forEach(async (item) => {
            const i = qq.indexOf(item);
            const name = item.dataset.name

            await delay(1000 * i);
            if (i === 0) this.log(`Start at ${name},`);
            else if (i === qq.length - 1) {
                this.log(`and finish at ${name}!`);
                this.knight.addEventListener('transitionend', endroad);
            } else this.log(`then go to ${name},`);

            const cur = array[i];
            const next = array[i + 1];
            if (next) {
                const [x, y] = cur;
                const [nextX, nextY] = next;
                
                const deltaX = Math.abs(nextX - x);
                const deltaY = Math.abs(nextY - y);

                if (nextX > x) translateX += deltaX;
                else translateX -= deltaX;
                if (nextY < y) translateY += deltaY;
                else translateY -= deltaY;
            }

            this.knight.style.transform = `translate(calc(var(--c-side) * ${translateX}), calc(var(--c-side) * ${translateY}))`;
            await item.classList.remove('hovered');
        })
    }
}

export default Display;