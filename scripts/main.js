/**
 * Created by Williamso on 15-Feb-16.
 */
$(function() {

    var gameTiles = $('.gameTiles');

    var win = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];

    //INITIALIZE THE DRAGGABLES
    gameTiles.draggable();
    gameTiles.draggable('option', 'opacity', 0.35);
    gameTiles.draggable('option', 'delay', 500);

    //INITIALIZE THE DROPPABLE TILES


    gameTiles.on('dragcreate', function() {
        gameTiles.toggle('scale');
    });

    //var replace = document.getElementsByClassName('gameTiles');

        gameTiles.on('click mouseleave', function() {
            alert('hello ' + this.textContent);
        });


});


/*
var ontop = document.getElementsByClassName('gameTiles');

for (var i=0; x=0 < ontop.length; i++) {
    ontop[i].addEventListener('mousedown', function() {
        var prev = this;
        if (prev) {
            prev.style.zIndex = ontop.length+1;
        }
        this.style.zIndex = ontop.length+2;
    }, false)
}
*/
