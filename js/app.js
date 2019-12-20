$( document ).ready(function(){

    //multiplicacion de string
    String.prototype.times = function(n) {
        return Array.prototype.join.call({length: n+1},this);
        
    };

    function agregarElemento(){
    var etiqueta = "<img class='caramelo'/>".times(7);
    
        $("[class*='col']").append(etiqueta);

        //ruta img
        $(".caramelo").attr("src",function(){
            var aleatorio = Math.floor(Math.random()*4)+1;
            var ruta_img = "image/"+ aleatorio+".png";
            return(ruta_img);
        });
        $("img").addClass("elemento");
    };
    agregarElemento();

    function eliminaElementos(){

        var selector = $("[class*='col']").children();
        
        selector.remove()

    };

    //animacion de color
    function anim(){
        var primero = "#DCFF0E";
        var segundo = "#BF2DE3";
        $(".main-titulo").animate({color: primero}, 1000, function(){
            $(".main-titulo").animate({color: segundo}, 1000, function(){
                anim() 
            });
        });
    };

    

// boton inicio

$(".btn-reinicio").click(function(){
    
    

    if($(".btn-reinicio").text()=="Iniciar"){

        // obtiene filas de dulces o columas
        function giveCandyArrays(arrayType, index) {

            var candyCol1 = $('.col-1').children();
            var candyCol2 = $('.col-2').children();
            var candyCol3 = $('.col-3').children();
            var candyCol4 = $('.col-4').children();
            var candyCol5 = $('.col-5').children();
            var candyCol6 = $('.col-6').children();
            var candyCol7 = $('.col-7').children();

            var candyColumns = $([candyCol1, candyCol2, candyCol3, candyCol4,
                candyCol5, candyCol6, candyCol7
            ]);

            if (typeof index === 'number') {
                var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
                    candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
                    candyCol7.eq(index)
                ]);
            } else {
                index = '';
            }

            if (arrayType === 'columns') {
                return candyColumns;
            } else if (arrayType === 'rows' && index !== '') {
                return candyRow;
            }
        }

        // arreglos de filas
        function candyRows(index) {
            var candyRow = giveCandyArrays('rows', index);
            return candyRow;
        }

        // arreglos de colunmnas
        function candyColumns(index) {
            var candyColumn = giveCandyArrays('columns');
            return candyColumn[index];
        }



        //Valida si hay dulces par eliminar en una columna
        function columnValidation() {
            for (var j = 0; j < 7; j++) {
                var counter = 0;
                var candyPosition = [];
                var extraCandyPosition = [];
                var candyColumn = candyColumns(j);
                var comparisonValue = candyColumn.eq(0);
                var gap = false;
                for (var i = 1; i < candyColumn.length; i++) {
                    var srcComparison = comparisonValue.attr('src');
                    var srcCandy = candyColumn.eq(i).attr('src');

                    if (srcComparison != srcCandy) {
                        if (candyPosition.length >= 3) {
                            gap = true;
                        } else {
                            candyPosition = [];
                        }
                        counter = 0;
                    } else {
                        if (counter == 0) {
                            if (!gap) {
                                candyPosition.push(i - 1);
                            } else {
                                extraCandyPosition.push(i - 1);
                            }
                        }
                        if (!gap) {
                            candyPosition.push(i);
                        } else {
                            extraCandyPosition.push(i);
                        }
                        counter += 1;
                    }
                    comparisonValue = candyColumn.eq(i);
                }
                if (extraCandyPosition.length > 2) {
                    candyPosition = $.merge(candyPosition, extraCandyPosition);
                }
                if (candyPosition.length <= 2) {
                    candyPosition = [];
                }
                candyCount = candyPosition.length;
                if (candyCount >= 3) {
                    deleteColumnCandy(candyPosition, candyColumn);
                    setScore(candyCount);
                }
            }
        }
        function  deleteColumnCandy(candyPosition, candyColumn) {
            for (var i = 0; i < candyPosition.length; i++) {
                candyColumn.eq(candyPosition[i]).addClass('delete');
            }
        }

        // Valida si hay dulces par eliminar en la fila
        function rowValidation() {
            for (var j = 0; j < 6; j++) {
                var counter = 0;
                var candyPosition = [];
                var extraCandyPosition = [];
                var candyRow = candyRows(j);
                var comparisonValue = candyRow[0];
                var gap = false;
                for (var i = 1; i < candyRow.length; i++) {
                    var srcComparison = comparisonValue.attr('src');
                    var srcCandy = candyRow[i].attr('src');

                    if (srcComparison != srcCandy) {
                        if (candyPosition.length >= 3) {
                            gap = true;
                        } else {
                            candyPosition = [];
                        }
                        counter = 0;
                    } else {
                        if (counter == 0) {
                            if (!gap) {
                                candyPosition.push(i - 1);
                            } else {
                                extraCandyPosition.push(i - 1);
                            }
                        }
                        if (!gap) {
                            candyPosition.push(i);
                        } else {
                            extraCandyPosition.push(i);
                        }
                        counter += 1;
                    }
                    comparisonValue = candyRow[i];
                }
                if (extraCandyPosition.length > 2) {
                    candyPosition = $.merge(candyPosition, extraCandyPosition);
                }
                if (candyPosition.length <= 2) {
                    candyPosition = [];
                }
                candyCount = candyPosition.length;
                if (candyCount >= 3) {
                    deleteHorizontal(candyPosition, candyRow);
                    setScore(candyCount);
                }
            }
        }
        function deleteHorizontal(candyPosition, candyRow) {
            for (var i = 0; i < candyPosition.length; i++) {
                candyRow[candyPosition[i]].addClass('delete');
            }
        }

        //  interaccion caramelos
        function addCandyEvents() {
            $('img').draggable({
                containment: '.panel-tablero',
                droppable: 'img',
                revert: true,
                revertDuration: 500,
                grid: [100, 100],
                zIndex: 10,
                drag: constrainCandyMovement
            });
            $('img').droppable({
                drop: swapCandy
            });
            enableCandyEvents();
        }
        
        function disableCandyEvents() {
            $('img').draggable('disable');
            $('img').droppable('disable');
        }
        
        function enableCandyEvents() {
            $('img').draggable('enable');
            $('img').droppable('enable');
        }
        
        //hace que el caramelo sea solido al moverse
        function constrainCandyMovement(event, candyDrag) {
            candyDrag.position.top = Math.min(100, candyDrag.position.top);
            candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
            candyDrag.position.left = Math.min(100, candyDrag.position.left);
            candyDrag.position.right = Math.min(100, candyDrag.position.right);
        }
        
        //reemplaza a los caramelos anteriores
        function swapCandy(event, candyDrag) {
            var candyDrag = $(candyDrag.draggable);
            var dragSrc = candyDrag.attr('src');
            var candyDrop = $(this);
            var dropSrc = candyDrop.attr('src');
            candyDrag.attr('src', dropSrc);
            candyDrop.attr('src', dragSrc);
        
            setTimeout(function () {
                checkBoard();
                if ($('img.delete').length === 0) {
                    candyDrag.attr('src', dragSrc);
                    candyDrop.attr('src', dropSrc);
                } else {
                    updateMoves();
                }
            }, 500);
        
        }


        $(".btn-reinicio").text("Reiniciar");

        $('#timer').startTimer({
			onComplete: endGame
		})

    }else if($(".btn-reinicio").text()=="Reiniciar"){

        eliminaElementos()

        agregarElemento()
        
        $(".btn-reinicio").text("Iniciar");

    }
});
    
});


