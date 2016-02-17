/**
 * Created by Williamso on 15-Feb-16.
 */
$(function() {

    var $gameTiles = $('.gameTiles');
    var $tileContainer = $('.tileContainer');
    var tiles = 5;
    var randomizedArray = randomize(newArr(tiles));

    //PUSH TILES TO SCREEN (DECLARE FUNCTION AND CALL IT)
    var fillScreen = function() {
        var tiles = randomizedArray.length;
        for (var i = 0; i < tiles; i++) {
            $('<div class="tileContainer"><div class="gameTiles" value="'+(randomizedArray[i])+'">' + (randomizedArray[i]) + '</div></div>').appendTo('#gamePlay');
        }
    };
    fillScreen();


    //CALL SWAP FUNCTION AT THE BEGINNING
    initSwap();
    //DECLARE SWAP FUNCTION
    function initSwap() {
        initDroppable();
        initDraggable();
    }

    //DECLARE DRAGGABLE FUNCTION - MAKES TILES DRAGGABLE
    function initDraggable() {
        $('.gameTiles').draggable({
            appendTo: 'body',
            helper: 'clone',
            cursor: 'grab',
            revert: 'invalid',
            delay: '300',
            opacity: '0.4',
            winningArray: newArr(tiles),
            //DECLARE FUNCTION TO CHECK IF GAME IS WON AFTER EVERY MOVE
            stop: function(){
                //Get the current gameplay state
                var gamePlayArray = [];
                $('.gameTiles').each(function(){
                    gamePlayArray.push($(this).attr('value'));
                });
                //Compare winning array with gameplay array
                if(gamePlayArray == this.winningArray){
                    alert()
                }

            }
        });
    }

    //DECLARE DROPPABLE FUNCTION - MAKES CONTAINERS DROPPABLE (Read documentation for details)
    function initDroppable() {
        $('.tileContainer, .gameTiles').droppable({
            activeClass: 'ui-state-default',
            hoverClass: 'ui-drop-hover',
            accept: ':not(.ui-sortable-helper)',

            over: function(event, ui) {
                $(this).attr('id','dropping');
            },
            out: function(event, ui) {
                this.setAttribute('id', '')
            },
            drop: function(event, ui) {
                //ON DROP, DELETE ORIGINAL CONTENT AND MOVE DESTINATION CONTENT TO SOURCE
                $(this).after(ui.draggable.clone()); //Clones the dragged tile
                $(ui.draggable).after($(this).clone()).attr('id', ''); //Clones the destination tile
                $(ui.draggable).remove(); //Removes the duplicate of the dragged tile
                $(this).remove(); //Removes the duplicate of the destination tile
                initSwap();

            }
        });
    }






    //FUNCTION TO GENERATE NEW ARRAY
    function newArr(numberOfElements) {
        var gamArr = [];
        for(var x=1; x<=numberOfElements; x++) {
            gamArr.push(x);
        }
        return gamArr;
    }





    //RANDOMIZATION FUNCTION
    function randomize(arr) {
        for(var j, x, i = arr.length; i;
            j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    };


});
