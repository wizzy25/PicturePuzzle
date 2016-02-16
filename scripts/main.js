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
            cursor: 'move',
            revert: 'invalid'
        });
    }

    //DECLARE DROPPABLE FUNCTION - MAKES CONTAINERS DROPPABLE (Read documentation for details)
    function initDroppable() {
        $('.tileContainer, .gameTiles').droppable({
            activeClass: 'ui-state-default',
            hoverClass: 'ui-drop-hover',
            accept: ':not(.ui-sortable-helper)',

            over: function(event, ui) {
                var $this = $(this);
            },
            drop: function(event, ui) {
                //ON DROP, DELETE ORIGINAL CONTENT AND MOVE DESTINATION CONTENT TO SOURCE
                var $this = $(this);
                var linew1 = $(this).after(ui.draggable.clone());
                var linew2 = $(ui.draggable).after($(this).clone());
                $(ui.draggable).remove();
                $(this).remove();
                initSwap();
            }
        });
    }
});