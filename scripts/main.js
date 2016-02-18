/**
 * Created by Williamso on 15-Feb-16.
 */
$(function() {
    newGame(4);
});

function newGame(tileNumber) {

    var tiles = tileNumber;
    var winArray = newArr(tiles);  //ALWAYS CORRECT
    var arrangedArray = newArr(tiles);
    var randomizedArray = randomize(arrangedArray);

    //CALL FUNCTION TO PRINT TILES ON SCREEN
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
        $('.gameTiles').disableSelection().draggable({
            appendTo: 'body',
            helper: 'clone',
            cursor: 'grab',
            revert: 'invalid',
            delay: '300',
            opacity: '0.4',
            //DECLARE FUNCTION TO CHECK IF GAME IS WON AFTER EVERY MOVE
            stop: function(event, ui) {
                $(this).delay(10).queue(function() {
                    var gamArr = [];
                    $('.gameTiles').each(function () {
                        gamArr.push($(this).attr('value'));
                    });
                    if (compareArrays(winArray, gamArr)) {
                        //alert('Eureka!');
                        $('.gameTiles').draggable('disable');
                        $('#winGame').fadeIn(800);
                    }
                })
            }
        });
    }
    //DECLARE DROPPABLE FUNCTION - MAKES CONTAINERS DROPPABLE (Read documentation for details)
    function initDroppable() {
        $('.tileContainer, .gameTiles').droppable({
            tolerance: 'intersect',
            over: function(event, ui) {
                $(this).attr('id','dropping');
            },
            out: function(event, ui) {
                $(this).attr('id', '')
            },
            drop: function(event, ui) {
                //ON DROP, DELETE ORIGINAL CONTENT AND MOVE DESTINATION CONTENT TO SOURCE
                $(this).after(ui.draggable.clone()); //Clones the dragged tile
                $(ui.draggable).after($(this).clone()); //Clones the destination tile
                $(ui.draggable).remove(); //Removes the duplicate of the dragged tile
                $(this).remove(); //Removes the duplicate of the destination tile
                $('.gameTiles').delay().attr('id', '');
                initSwap();
            }
        });
    }

    //FUNCTION TO COMPARE GAMEPLAY TILES WITH WINNING TILES
    function compareArrays(arr1, arr2){
        var result;
        if(arr1.length != arr2.length) {
            result = false;
            return result;
        }
        else {
            for(var i=0; i<arr1.length; i++) {
                if(arr1[i]==arr2[i]){
                    result = true;
                }

                else {
                    result = false;
                    break;
                }
            }
            return result;
        }
    }
    //FUNCTION TO PUSH TILES TO SCREEN
    function fillScreen() {
        var tiles = randomizedArray.length;
        var rows = Math.floor(Math.sqrt(tiles));
        for (var i = tiles-1; i >= 0; i--) {
            if(!((i%rows) == 0)) {
                $('<div class="tileContainer"><div class="gameTiles" value="'+(randomizedArray[i])+'">' + (randomizedArray[i]) + '</div></div>').appendTo('#gamePlay');
            }
            else {
                $('<div class="tileContainer"><div class="gameTiles" value="'+(randomizedArray[i])+'">' + (randomizedArray[i]) + '</div></div><br/>').appendTo('#gamePlay');
            }
        }
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
    }
    //FUNCTION TO NOT RELOAD GAME ON PLAYER REQUEST!
    $('#noReplay').click(function() {
        $('#winGame').fadeOut(800);
    });
    //FUNCTION TO RELOAD GAME ON PLAYER REQUEST WHEN GAME IS WON!
    $('#replay').click(function() {
        $('#gamePlay').empty();
        $('#winGame').fadeOut(400);
        newGame(tiles);
    });
    //FUNCTION TO RESET GAME ON USER REQUEST BEFORE GAME IS WON
    $('#resetGame').click(function() {
        $('#gamePlay').empty();
        var userTiles = document.getElementById('tileNumber').value;
        if(!userTiles) {
            newGame(tiles);
        }
        else {
            newGame(userTiles);
        }
    });
}
