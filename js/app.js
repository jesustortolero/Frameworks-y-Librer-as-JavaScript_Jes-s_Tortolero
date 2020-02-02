$(document).ready(function () {
  //-------- definicion de variables -------

  var tiempo = 0;
  var resHorizonatal = 0;
  var resVertical = 0;
  var cuenta = 0;
  var movimiento = 0;
  var posVer = "";
  var posHor = "";
  var reversa = "";



  //--------- Evalua si el movimiento es valido
  function isValidMovement(element, elementType) {

    posVer = $(element)
      .parent()
      .attr("class");


    var columna = posVer.slice(-1);

    posHor = $(element).index();


    var Horizontal = posHor + 1;
    columna = Number(columna);
    Horizontal = Number(Horizontal);


    hor1 = $(".col-" + columna)
      .children("img:nth-child(" + Horizontal + ")")
      .attr("src");

    hor2 = $(".col-" + (columna + 1))
      .children("img:nth-child(" + Horizontal + ")")
      .attr("src");


    hor3 = $(".col-" + (columna + 2))
      .children("img:nth-child(" + Horizontal + ")")
      .attr("src");


    hor4 = $(".col-" + (columna - 1))
      .children("img:nth-child(" + Horizontal + ")")
      .attr("src");

    hor5 = $(".col-" + (columna - 2))
      .children("img:nth-child(" + Horizontal + ")")
      .attr("src");

    ver1 = $(".col-" + columna)
      .children("img:nth-child(" + Horizontal + ")")
      .attr("src");
    ver2 = $(".col-" + columna)
      .children("img:nth-child(" + (Horizontal + 1) + ")")
      .attr("src");
    ver3 = $(".col-" + columna)
      .children("img:nth-child(" + (Horizontal + 2) + ")")
      .attr("src");
    ver4 = $(".col-" + columna)
      .children("img:nth-child(" + (Horizontal - 1) + ")")
      .attr("src");
    ver5 = $(".col-" + columna)
      .children("img:nth-child(" + (Horizontal - 2) + ")")
      .attr("src");

    if (
      (hor1 == hor2 && hor2 == hor3) ||
      (hor1 == hor4 && hor4 == hor5) ||
      (hor1 == hor4 && hor1 == hor2) ||
      (ver1 == ver2 && ver2 == ver3) ||
      (ver1 == ver4 && ver4 == ver5) ||
      (ver1 == ver4 && ver1 == ver2)
    ) {
      return true;
    } else {
      return false;
    }
  };
  var dropElementValid = false;
  var dragElementValid = false;

  function afterValid() {
    if (dragElementValid || dropElementValid) {
      validar();
    } else {
    }
  };

  //-----interaccion drop-------
  function swapCandy(event, candyDrag) {
    var candyDrag = $(candyDrag.draggable);
    var dragSrc = candyDrag.attr("src");
    var candyDrop = $(this);
    var dropSrc = candyDrop.attr("src");
    candyDrag.attr("src", dropSrc);
    candyDrop.attr("src", dragSrc);

    dropElementValid = isValidMovement(this, "Drop");
    dragElementValid = isValidMovement(candyDrag, "Drag");

    if (dragElementValid || dropElementValid) {
      movimiento += 1;
      $("#movimientos-text").html(movimiento);
    } else {
      candyDrag.attr('src', dragSrc);
      candyDrop.attr('src', dropSrc);
    }
  }

  //-------------multiplicacion de string-------------
  String.prototype.times = function (n) {
    return Array.prototype.join.call({ length: n + 1 }, this);
  };

  function agregarElemento() {
    var etiqueta = "<img class='caramelo'/>".times(7);

    $("[class*='col']").append(etiqueta);

    //-------------ruta img-------------

    $(".caramelo").attr("src", function () {
      var aleatorio = Math.floor(Math.random() * 4) + 1;
      var ruta_img = "image/" + aleatorio + ".png";
      return ruta_img;
    });
    $("img").addClass("elemento");
  }
  agregarElemento();

  function eliminaElementos() {
    var selector = $("[class*='col']").children();

    selector.remove();
  }

  //-------------animacion de color-------------

  function anim() {
    var primero = "#DCFF0E";
    var segundo = "#BF2DE3";

    $(".main-titulo").animate({ color: primero }, 1000, function () {
      $(".main-titulo").animate({ color: segundo }, 1000, function () {
        anim();
      });
    });
  }

  //------------- funcion de tiempo -------------

  var min = 2;
  var seg = 0;

  function timer() {
    if (seg != 0) {
      seg = seg - 1;
    }
    if (seg == 0) {
      if (min == 0) {
        clearInterval(eliminar);
        clearInterval(tiempo);
        min = 2;
        seg = 0;
        $(".panel-tablero").hide("slow");
        $(".time").hide();
        $(".panel-score").animate({ width: "100%" }, 1000);
      }

      seg = 59;
      min = min - 1;
    }

    if (seg.toString().length < 2) {
      $("#timer").html("0" + min + ":" + "0" + seg);
    } else {
      $("#timer").html("0" + min + ":" + seg);
    }
  }

  //---------- filas y columnas-------

  function validar() {

    //  -----------horizontal---------
    for (var j = 1; j < 8; j++) {
      for (var k = 1; k < 6; k++) {
        var res1 = $(".col-" + k)
          .children("img:nth-child(" + j + ")")
          .attr("src");
        var res2 = $(".col-" + (k + 1))
          .children("img:nth-child(" + j + ")")
          .attr("src");
        var res3 = $(".col-" + (k + 2))
          .children("img:nth-child(" + j + ")")
          .attr("src");

        if (res1 == res2 && res2 == res3 && (res1 && res2 && res3 != "undefined")) {
          $(".col-" + k)
            .children("img:nth-child(" + j + ")")
            .attr("class", "elemento activo");
          $(".col-" + (k + 1))
            .children("img:nth-child(" + j + ")")
            .attr("class", "elemento activo");
          $(".col-" + (k + 2))
            .children("img:nth-child(" + j + ")")
            .attr("class", "elemento activo");

          resHorizonatal += 10;
        }
      }
    }

    //  ----------vertical----------

    for (var l = 1; l < 6; l++) {
      for (var k = 1; k < 8; k++) {
        var res1 = $(".col-" + k)
          .children("img:nth-child(" + l + ")")
          .attr("src");
        var res2 = $(".col-" + k)
          .children("img:nth-child(" + (l + 1) + ")")
          .attr("src");
        var res3 = $(".col-" + k)
          .children("img:nth-child(" + (l + 2) + ")")
          .attr("src");

        if (res1 == res2 && res2 == res3 && (res1 && res2 && res3 != "undefined")) {
          $(".col-" + k)
            .children("img:nth-child(" + l + ")")
            .attr("class", "elemento activo");
          $(".col-" + k)
            .children("img:nth-child(" + (l + 1) + ")")
            .attr("class", "elemento activo");
          $(".col-" + k)
            .children("img:nth-child(" + (l + 2) + ")")
            .attr("class", "elemento activo");

          resVertical += 10;
        }
      }
    }

    var resFinal = resVertical + resHorizonatal;

    if (resFinal > 0) {
      cuenta += resFinal;

      $("#score-text").html(cuenta);
      resHorizonatal = 0;
      resVertical = 0;
      resFinal = 0;
    }

    eliminar();
  }

  //----------funcion que elimina los caramelos--------

  function eliminar() {
    $(".elemento.activo").hide("pulsate", 1000, function () {
      $(".elemento.activo").remove();
      $(".elemento").draggable({ disabled: true })
      agregarDulcesFaltantes()
    });
  }

  //---------- funacion que agrega los caramelos ------------

  function efectoDulce() {

    ultimo = $(".ULTIMO").length;

    function primero() {
      $(".PRIMERO").attr("src", function () {
        var aleatorio = Math.floor(Math.random() * 4) + 1;
        var ruta_img = "image/" + aleatorio + ".png";
        return ruta_img;
      });
    };

    function segundo() {
      for (var k = 1; k < 8; k++) {
        var res1 = $(".col-" + k).children(".PRIMERO").attr("src");
        $(".col-" + k).children(".2").attr("src", res1)
      };
    };

    function tercero() {
      for (var k = 1; k < 8; k++) {
        res1 = $(".col-" + k).children(".2").attr("src");
        $(".col-" + k).children(".3").attr("src", res1)
      };
    };
    function cuarto() {
      for (var k = 1; k < 8; k++) {
        res1 = $(".col-" + k).children(".3").attr("src");
        $(".col-" + k).children(".4").attr("src", res1)
      };
    };
    function quinto() {
      for (var k = 1; k < 8; k++) {
        res1 = $(".col-" + k).children(".4").attr("src");
        $(".col-" + k).children(".5").attr("src", res1)
      };
    };
    function sexto() {
      for (var k = 1; k < 8; k++) {
        res1 = $(".col-" + k).children(".5").attr("src");
        $(".col-" + k).children(".6").attr("src", res1)
      };
    }
    function septimo() {
      for (var k = 1; k < 8; k++) {
        res1 = $(".col-" + k).children(".5").attr("src");
        $(".col-" + k).children(".6").attr("src", res1)
      };
    }

    if ($(".PRIMERO").attr("style") == 'visibility: hidden') {
      primero()
      $(".PRIMERO").attr("style", "visibility: visible");
      if ($("img").hasClass("PRIMERO") && $("img").hasClass("ULTIMO")) {
        $(".ULTIMO.PRIMERO").addClass("p")
        $(".p").removeClass("nuevo")
        $(".p").removeClass("ULTIMO");
        $(".p").removeClass("PRIMERO");
      };


    } else if ($(".2").attr("style") == 'visibility: hidden') {

      segundo()
      $(".2").attr("style", "visibility: visible");

      if ($("img").hasClass("2") && $("img").hasClass("ULTIMO")) {
        $(".ULTIMO.2").addClass("p")
        $(".p").removeClass("nuevo")
        $(".p").removeClass("ULTIMO");
        $(".p").removeClass("2");
      };
      primero()


    } else if ($(".3").attr("style") == 'visibility: hidden') {

      tercero()
      $(".3").attr("style", "visibility: visible");

      if ($("img").hasClass("3") && $("img").hasClass("ULTIMO")) {
        $(".ULTIMO.3").addClass("p")
        $(".p").removeClass("nuevo")
        $(".p").removeClass("ULTIMO");
        $(".p").removeClass("3");
      };
      segundo()
      primero()


    } else if ($(".4").attr("style") == 'visibility: hidden') {

      cuarto()
      $(".4").attr("style", "visibility: visible");

      if ($("img").hasClass("4") && $("img").hasClass("ULTIMO")) {
        $(".ULTIMO.4").addClass("p")
        $(".p").removeClass("nuevo")
        $(".p").removeClass("ULTIMO");
        $(".p").removeClass("4");
      };

      tercero()
      segundo()
      primero()

    } else if ($(".5").attr("style") == 'visibility: hidden') {

      quinto()

      $(".5").attr("style", "visibility: visible");

      if ($("img").hasClass("5") && $("img").hasClass("ULTIMO")) {
        $(".ULTIMO.5").addClass("p")
        $(".p").removeClass("nuevo")
        $(".p").removeClass("ULTIMO");
        $(".p").removeClass("5");
      };
      cuarto()
      tercero()
      segundo()
      primero()

    } else if ($(".6").attr("style") == 'visibility: hidden') {

      sexto()
      $(".6").attr("style", "visibility: visible");

      if ($("img").hasClass("6") && $("img").hasClass("ULTIMO")) {
        $(".ULTIMO.6").addClass("p")
        $(".p").removeClass("nuevo")
        $(".p").removeClass("ULTIMO");
        $(".p").removeClass("6");
      };

      quinto()
      cuarto()
      tercero()
      segundo()
      primero()

    } else if ($(".7").attr("style") == 'visibility: hidden') {

      septimo()
      $(".7").attr("style", "visibility: visible");

      if ($("img").hasClass("7") && $("img").hasClass("ULTIMO")) {
        $(".ULTIMO.6").addClass("p")
        $(".p").removeClass("nuevo")
        $(".p").removeClass("ULTIMO");
        $(".p").removeClass("7");
      };

      sexto()
      quinto()
      cuarto()
      tercero()
      segundo()
      primero()

    } else if (ultimo == 0) {



      $("img").removeClass("nuevo");
      $("img").removeClass("PRIMERO");
      $("img").removeClass("p");
      $("img").removeClass("1");
      $("img").removeClass("2");
      $("img").removeClass("3");
      $("img").removeClass("4");
      $("img").removeClass("5");
      $("img").removeClass("6");
      $("img").removeClass("7");


      $(".caramelo").draggable({
        containment: ".panel-tablero",
        droppable: "img",
        revert: true,
        revertDuration: 500,
        grid: [100, 100],
        zIndex: 10,
        stop: afterValid
      });

      $("img").droppable({
        drop: swapCandy,
        revert: reversa
      });

      $(".elemento").draggable({ disabled: false })

      validar();
      clearInterval(efecto);
    }


  };

  function agregarDulcesFaltantes() {
    for (var k = 1; k < 8; k++) {
      var res = $(".col-" + k).children().length;

      if (res < 7) {
        for (var l = res; l < 7; l++) {

          var etiqueta = "<img class='nuevo caramelo elemento' style='visibility: hidden'>";
          $(".col-" + k).prepend(etiqueta)

        }
      }
    }



    $("[class*='col']").find(".nuevo:last").addClass("ULTIMO");
    ultimo = $("[class*='col']>img").hasClass("ULTIMO");

    $("[class*='col']").find(".nuevo:first").addClass("PRIMERO");
    primero = $("[class*='col']>img").hasClass("PRIMERO");

    if (primero == true) {

      $("[class*='col']").find(".nuevo").removeClass("PRIMERO");

      $("[class*='col']").find(".nuevo:first").addClass("PRIMERO");

    }

    $("[class*='col']").find(".nuevo:eq(1)").addClass("2");
    $("[class*='col']").find(".nuevo:eq(2)").addClass("3");
    $("[class*='col']").find(".nuevo:eq(3)").addClass("4");
    $("[class*='col']").find(".nuevo:eq(4)").addClass("5");
    $("[class*='col']").find(".nuevo:eq(5)").addClass("6");
    $("[class*='col']").find(".nuevo:eq(6)").addClass("7");

    varificar = $("[class*='col']>img").hasClass("2", "3", "4", "5", "6", "7");

    if (varificar == true) {
      $("[class*='col']").find(".nuevo").removeClass("2");
      $("[class*='col']").find(".nuevo").removeClass("3");
      $("[class*='col']").find(".nuevo").removeClass("4");
      $("[class*='col']").find(".nuevo").removeClass("5");
      $("[class*='col']").find(".nuevo").removeClass("6");
      $("[class*='col']").find(".nuevo").removeClass("7");

      $("[class*='col']").find(".nuevo:eq(1)").addClass("2");
      $("[class*='col']").find(".nuevo:eq(2)").addClass("3");
      $("[class*='col']").find(".nuevo:eq(3)").addClass("4");
      $("[class*='col']").find(".nuevo:eq(4)").addClass("5");
      $("[class*='col']").find(".nuevo:eq(5)").addClass("6");
      $("[class*='col']").find(".nuevo:eq(6)").addClass("7");
    };

    if (ultimo == true) {

      efecto = setInterval(function () { efectoDulce() }, 500)

    }
  }

  //-------------boton inicio-------------

  $(".btn-reinicio").click(function () {
    if ($(".btn-reinicio").text() == "Iniciar") {
      anim();
      validar();

      //------------- interaccion caramelos-------------
      $("img").draggable({
        containment: ".panel-tablero",
        droppable: "img",
        revert: true,
        revertDuration: 500,
        grid: [100, 100],
        zIndex: 10,
        stop: validar
      });
      $("img").droppable({
        drop: swapCandy,
        revert: reversa
      });

      $(".btn-reinicio").text("Reiniciar");

      tiempo = setInterval(function () {
        timer()
      }, 1000);
    } else if ($(".btn-reinicio").text() == "Reiniciar") {

      $(".panel-score").animate({ width: "25%" }, 500, function () {
        $(".panel-tablero, .time").show("slow");
      });

      $("#score-text").html(0);

      $("#movimientos-text").html(0);
      movimiento = 0;
      cuenta = 0;

      clearInterval(tiempo);
      clearInterval(efecto);

      eliminaElementos();

      agregarElemento();

      $("#timer").html("02:00");

      $(".btn-reinicio").text("Iniciar");
    }
  });
});
