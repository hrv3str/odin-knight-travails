class Move {
    constructor (x, y) {
        this.position = [x, y],
        this.leftUp = null,
        this.upLeft = null,
        this.upRight = null,
        this.rightUp = null,
        this.rightDown = null,
        this.downRight = null,
        this.downLeft = null,
        this.leftDown = null
    }
}

export default class Moves {
    constructor (x, y) {
        this.start = this.build(x, y)
    }

    _boardCheck (array) {
        return array[0] >= 0 
            && array[0] < 8 
            && array[1] >= 0 
            && array[1] < 8;
    }

    build (...args) {
        const check = this._boardCheck(args);
        if (!check) return null;

        const start = new Move (args[0], args[1]);

        start.rightUp = this.build(args[0] + 2, args[1] + 1);
        start.rightDown = this.build(args[0] + 2, args[1] - 1);
        start.downRight = this.build(args[0] + 1, args[1] - 2);
        start.downLeft = this.build(args[0] - 1, args[1] - 2);
        start.leftDown = this.build(args[0] - 2, args[1] - 1);
        start.leftUp = this.build(args[0] - 2, args[1] + 1);
        start.upLeft = this.build(args[0] - 1, args[1] + 2);
        start.upRight = this.build(args[0] + 1, args[1] + 2);

        return start;
    }

    getRoute(x,y) {
        const buffer = {
            target: [x, y],
            visited: {},
            path: []
        }

        const findPath = (node = this.start) => {

                buffer.visited[node.position.toString()] = true;
                buffer.path.push(node.position);

                if (node.position[0] === buffer.target[0]
                    && node.position[1] === buffer.target[1]) {
                        return buffer.path;
                    }
                
                const possibleWays = [
                    node.leftUp,
                    node.upLeft,
                    node.upRight,
                    node.rightUp,
                    node.rightDown,
                    node.downRight,
                    node.downLeft,
                    node.leftDown
                ];
                
                for (const way of possibleWays) {
                    if (way && !visited[way.position.toString()]) {
                        const foundWay = findPath(way);
                        if (foundWay) return foundWay;
                    }
                }

                buffer.path.pop();
                return null;
        }
    }
}