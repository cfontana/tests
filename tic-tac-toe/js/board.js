/**
 * Define the "Board" object
 */
function Board(){
    var me = this;
    /**
     * initializes Board object
     */
    me.init = function() {
        me.game = new Game(me);

        $(".cell").each(function() {
            $( this ).html('');
        });

        $(".result").html('');

        $(".cell").on('click', function(){
            var cell = $(this),
                position = $.inArray(this, $('.cell'));

            if (cell.html() !== '') {
                return;
            }

            me.game.userTurn(position);
        });

        $("button").on('click', function(){
            me.game = new Game(me);

            $(".cell").each(function() {
                $( this ).html('');
            });

            me.showResult("");
        });
    }
    /**
     * Draws a symbol in a specific cell.
     */
    me.drawSymbol = function(position, symbol) {
        var cell = $('.cell')[position];

        $(cell).html(symbol);
    }
    /**
     * Shows the match results
     */
    me.showResult = function(result) {
        $('.result').html(result);
    }

    this.init();
}