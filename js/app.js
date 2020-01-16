$( document ).ready(function(){

    //-------- definicion de variables -------

    var tiempo=0;

    var resHorizonatal = 0;
    var resVertical = 0;
    var cuenta = 0;
    var movimiento = 0;



    //-------------multiplicacion de string-------------
    String.prototype.times = function(n) {
        return Array.prototype.join.call({length: n+1},this);
        
    };

    function agregarElemento(){
    var etiqueta = "<img class='caramelo'/>".times(7);
    
        $("[class*='col']").append(etiqueta);

        //-------------ruta img-------------

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

    //-------------animacion de color-------------

      function anim(){  
    var primero = "#DCFF0E";
        var segundo = "#BF2DE3";

        $(".main-titulo").animate({color: primero}, 1000, function(){
            $(".main-titulo").animate({color: segundo}, 1000, function(){
                anim() 
            });
        })};


    //------------- funcion de tiempo -------------

    var min = 2
    var seg = 0

    function timer(){
        if(seg!=0){
            seg=seg-1;}
        if(seg==0){
            if(min==0){
                clearInterval(eliminar);
                //clearInterval(nuevosDulces);
                //clearInterval(intervalo);
                clearInterval(tiempo);
                $(".panel-tablero").hide("drop","slow",/*funcioncita*/);
                $(".time").hide();
            }
            seg=59;
            min=min-1;};

            if(seg.toString().length < 2){
                $("#timer").html("0"+min+":"+"0"+seg)
            }else{
                $("#timer").html("0"+min+":"+seg)
            }
            
            
            
    };


    //---------- filas y columnas-------

    function validar(){
        // horizontal
        var horizontal = false;
        var elementHor = '';
        var elementVer = '';
        for(var j=1;j<8;j++){
            for(var k=1;k<6;k++){
                var res1=$(".col-"+k).children("img:nth-child("+j+")").attr("src");
                var res2=$(".col-"+(k+1)).children("img:nth-child("+j+")").attr("src");
                var res3=$(".col-"+(k+2)).children("img:nth-child("+j+")").attr("src");
    
                if (res1 == res2 && res2 == res3) {                    
                    $(".col-" + k).children("img:nth-child(" + (j) + ")").attr("class", "elemento activo");
                    $(".col-" + (k + 1)).children("img:nth-child(" + (j) + ")").attr("class", "elemento activo");
                    $(".col-" + (k + 2)).children("img:nth-child(" + (j) + ")").attr("class", "elemento activo");

                    resHorizonatal+=10;
                    console.log("resultado horizontal-"+resHorizonatal);
                    
                };
            }};

        //  ----------vertical----------

         for (var l = 1; l < 6; l++) {
             for (var k = 1; k < 8; k++) {
                 var res1 = $(".col-" + k).children("img:nth-child(" + l + ")").attr("src");
                 var res2 = $(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("src");
                 var res3 = $(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("src");

                 if (res1 == res2 && res2 == res3) {
                     $(".col-" + k).children("img:nth-child(" + (l) + ")").attr("class", "elemento activo");
                     $(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("class", "elemento activo");
                     $(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("class", "elemento activo");

                     resVertical+=10;
                     console.log("resultado vertical-"+resVertical);
                     
                 };
             }};

        var resFinal = resVertical + resHorizonatal;
        console.log("resultaddo final -"+resFinal);

        if(resFinal > 0){
            
            cuenta += resFinal;
            console.log("cuenta-"+cuenta)
            $("#score-text").html(cuenta)
            resHorizonatal = 0;
            resVertical = 0;
            resFinal = 0;

            console.log("horizontal 2-"+ resHorizonatal)
            console.log("vertical 2-"+ resVertical)
            console.log("Final 2-"+ resFinal)
        }
        
        

        eliminar();
    };

    function eliminar(){
        
        $(".elemento.activo").hide("pulsate",1000,function(){
            $(".elemento.activo").remove();
            agregarDulcesFaltantes();
		});
    }

    function agregarDulcesFaltantes(){
        for(var k=1;k<8;k++){
            var res=$(".col-"+k).children().length;
            console.log("En col "+k+" - Cantidad "+res);
            if(res < 7){
                for(var l = res; l<7; l++){
                    var aleatorio = Math.floor(Math.random()*4)+1;
                    var ruta_img = "image/"+ aleatorio+".png";
                    var etiqueta = "<img class='caramelo elemento' src='"+ruta_img+"'/>";
                    $(".col-"+k).prepend(etiqueta).slideDown("slow");
                    $(".caramelo").draggable({
                        containment: '.panel-tablero',
                    droppable: 'img',
                    revert: true,
                    revertDuration: 500,
                    grid: [100, 100],
                    zIndex: 10,
                    stop: validar                        
                    });
                    
                    $('img').droppable({
                        drop: swapCandy            
                });
                function swapCandy(event, candyDrag) {
                    var candyDrag = $(candyDrag.draggable);
                    var dragSrc = candyDrag.attr('src');
                    var candyDrop = $(this);
                    var dropSrc = candyDrop.attr('src');
                    candyDrag.attr('src', dropSrc);
                    candyDrop.attr('src', dragSrc);
                };
                       
                }
            }
            
            
        }
        validar()
    }

    //-------------boton inicio-------------

    $(".btn-reinicio").click(function(){   

        // if(swapCandy()){

        //     movimiento += 1;
        //      console.log("movimientos-"+movimiento)

        // }
        
        
        if($(".btn-reinicio").text()=="Iniciar"){
            anim()
            validar()

            //------------- interaccion caramelos-------------
                $('img').draggable({
                    containment: '.panel-tablero',
                    droppable: 'img',
                    revert: true,
                    revertDuration: 500,
                    grid: [100, 100],
                    zIndex: 10,
                    stop: validar
                });
                $('img').droppable({
                    drop: swapCandy            
            });

            function swapCandy(event, candyDrag) {
                var candyDrag = $(candyDrag.draggable);
                var dragSrc = candyDrag.attr('src');
                var candyDrop = $(this);
                var dropSrc = candyDrop.attr('src');
                candyDrag.attr('src', dropSrc);
                candyDrop.attr('src', dragSrc);
            };        


            $(".btn-reinicio").text("Reiniciar");

            tiempo=setInterval(function(){
                timer()
            },1000); 


        }else if($(".btn-reinicio").text()=="Reiniciar"){

            $(".panel-tablero, .time").show("slow")
            $("#score-text").html(0)

            cuenta = 0;

            clearInterval(tiempo)

            eliminaElementos()

            agregarElemento()

            $("#timer").html("02:00")
            
            $(".btn-reinicio").text("Iniciar");

        }
    });
    
});