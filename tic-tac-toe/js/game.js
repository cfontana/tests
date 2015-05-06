/**
 * Define the "Game" object
 */
function Game(board){
    var me = this;
    /**
     * initializes Game object
     */
    me.init = function (board) {
        me.blankCount = 9;
        me.cells = ['','','','','','','','',''];
        me.board = board;
        me.symbols = ["X","O"];
    }
    /**
     * determines the status of the match
     */
    me.determineStatus = function() {
        var c = me.cells, winner;

        me.board.showResult("");

        if (c[0] !== '' && c[0] === c[1] && c[0] === c[2]) {winner = c[0];}
        if (c[3] !== '' && c[3] === c[4] && c[3] === c[5]) {winner = c[3];}
        if (c[6] !== '' && c[6] === c[7] && c[6] === c[8]) {winner = c[6];}

        if (c[0] !== '' && c[0] === c[3] && c[0] === c[6]) {winner = c[0];}
        if (c[1] !== '' && c[1] === c[4] && c[1] === c[7]) {winner = c[1];}
        if (c[2] !== '' && c[2] === c[5] && c[2] === c[8]) {winner = c[2];}

        if (c[0] !== '' && c[0] === c[4] && c[0] === c[8]) {winner = c[0];}
        if (c[6] !== '' && c[6] === c[4] && c[6] === c[2]) {winner = c[6];}

        if (winner) {
            me.board.showResult("Winner is " + winner);
            return winner;
        }

        if(me.blankCount === 0){
            me.board.showResult("Draw");

            return "draw";
        }

        return "notend";
    }
    /**
     * handles the User turn
     */
    me.userTurn = function (position) {
        me.blankCount--;

        me.board.drawSymbol(position, me.symbols[1]);

        me.cells[position] = me.symbols[1];

        if(me.determineStatus() === "notend"){
            me.cpuTurn();
        }
    }
    /**
     * handles the CPU turn
     */
    me.cpuTurn = function () {
        var position = me.cpuBestPosition();

        me.blankCount--;

        me.board.drawSymbol(position, me.symbols[0]);

        me.cells[position] = me.symbols[0];

        me.determineStatus();
    }

    me.cpuBestPosition = function () {
        var c = me.cells, cIx, symbolIx, symbol;

        if (c[4] === '') {return 4;}

        for (symbolIx = 0; symbolIx < me.symbols.length; symbolIx++){
            symbol = me.symbols[symbolIx];

            for (cIx = 0; cIx < 9; cIx = cIx + 3) {
                if (c[0+cIx] === symbol && c[1+cIx] === symbol && c[2+cIx] === '') {return 2+cIx;}
                if (c[0+cIx] === symbol && c[2+cIx] === symbol && c[1+cIx] === '') {return 1+cIx;}
                if (c[1+cIx] === symbol && c[2+cIx] === symbol && c[0+cIx] === '') {return 0+cIx;}
            }

            for (cIx = 0; cIx < 3; cIx++) {
                if (c[0+cIx] === symbol && c[3+cIx] === symbol && c[6+cIx] === '') {return 6+cIx;}
                if (c[0+cIx] === symbol && c[6+cIx] === symbol && c[3+cIx] === '') {return 3+cIx;}
                if (c[3+cIx] === symbol && c[6+cIx] === symbol && c[0+cIx] === '') {return 0+cIx;}
            }

            if (c[0] === symbol && c[4] === symbol && c[8] === '') {return 8;}
            if (c[8] === symbol && c[4] === symbol && c[0] === '') {return 0;}
            if (c[2] === symbol && c[4] === symbol && c[6] === '') {return 6;}
            if (c[6] === symbol && c[4] === symbol && c[2] === '') {return 2;}
        }

        if (c[0] === '') {return 0;}
        if (c[6] === '') {return 6;}
    }

    me.init(board);
}