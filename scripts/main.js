/**
 * Created by Williamso on 15-Feb-16.
 */
$(function() {

    var $gameTiles = $('.gameTiles');
    var $tileContainer = $('.tileContainer');
    //CALL SWAP FUNCTION AT THE BEGINNING
    initSwap();

    //DECLARE SWAP FUNCTION
    function initSwap() {
        initDroppable();
        initDraggable();
    }

    //DECLARE DRAGGABLE FUNCTION - MAKES TILES DRAGGABLE
    function initDraggable() {
        $('.gameTiles, .tileContainer').draggable({
            appendTo: 'body',
            helper: 'clone',
            cursor: 'grab',
            revert: 'invalid',
            delay: '300',
            opacity: '0.4'
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

});

Math.random();