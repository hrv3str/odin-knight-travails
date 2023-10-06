class Chessboard {
    constructor(size) {
        //represents size of the board
        this.size = size;
    }

    //check if move is within board
    check(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    //represents possible knight moves
    get knightMoves() {
        return [
            [-1, -2], [-2, -1], [-2, 1], [-1, 2],
            [1, -2], [2, -1], [2, 1], [1, 2]
        ]
    }

    //find showrtest path between start and target coordinates
    pathFind(start, target) {
        //initiates queue
        const qq = [[start]];
        //initiates set to track visited cells
        const checkList = new Set();

        //initiates loop to breadth-first traverse through the positions
        while (qq.length) {
            const path = qq.shift();
            const [x, y] = path[path.length - 1];

            //returns path if found target
            if(x === target[0] && y === target[1]) {
                return path;
            }

            //iterate through possible moves, using offsets from knightMoves()
            for (const [dx, dy] of this.knightMoves) {
                //calculates new coordinates using offset
                const newX = x + dx;
                const newY = y + dy;

                //add calculated coordinates to queue and checklist if they're not there
                if(this.check(newX, newY) && !checkList.has(`${newX}-${newY}`)) {
                    checkList.add(`${newX}-${newY}`);
                    qq.push([...path, [newX, newY]]);
                }
            }
        }

        //returns null if path not found
        return null;
    }
}

export default Chessboard;