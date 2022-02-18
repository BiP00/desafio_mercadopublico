$(document).ready(function () {
    var ciudad = "";
    $.get("https://ipinfo.io", function (response) {
        ciudad = response.city;
        $.get("https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&&units=metric&appid=4431c44d3c17791391e3edc81337bd4d&lang=es", function (data) {
            $(".filo").html(" La T° en su área es de: " + data.main.temp + "°C");
            console.log(data.main.temp);
            $("footer").first().addClass("pt-4 mt-4 text-light border-top");
        })
    }, "jsonp");

});

$(document).ready(function () {
    $("#buscar").on("click", function () {
        $('.erase').fadeOut(300);
        const userInput = $("input").val();
        console.log(userInput);
        if (userInput === "") {
            var input = $("#usuario").val();
            $.get("https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?CodigoOrganismo=7048&ticket=36F8C53D-76F4-45E0-8672-818E9F7A5AB2",
                function (response) {
                    response.Listado.forEach(element => {
                        console.log(element);
                        if (element.CodigoEstado == "4") {
                            $("#lista").append("<div class='erase col-md-4'><h3>Número: " + element.Codigo + "</h3><p>Nombre: " + element.Nombre + "</p><p>Estado: enviada</p></div>");
                        }
                        if (element.CodigoEstado == "6") {
                            $("#lista").append("<div class='erase col-md-4'><h3>Número: " + element.Codigo + "</h3><p>Nombre: " + element.Nombre + "</p><p>Estado: aceptada</p></div>");
                        }
                    })
                })
        }
        else {
            $.get("https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?codigo=" + userInput + "&ticket=36F8C53D-76F4-45E0-8672-818E9F7A5AB2",
                function (element) {
                    var total = element.Listado[0].Total;
                    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    if (element.Listado[0].CodigoEstado == "4") {
                        $("#lista").append("<div class='erase col-md-12'><h3>Número: " + element.Listado[0].Codigo + "</h3><h5>Descripción: " + element.Listado[0].Descripcion + "</h5><h6>Total: $" + total + "</h6><p>Estado: enviada</p></div>");
                    }
                    if (element.Listado[0].CodigoEstado == "6") {
                        $("#lista").append("<div class='erase col-md-12'><h3>Número: " + element.Listado[0].Codigo + "</h3><h5>Descripción: " + element.Listado[0].Descripcion + "</h5><h6>Total: $" + total + "</h6><p>Estado: aceptada</p></div>");
                    }
                    else {
                        $("#lista").append("<div class='erase col-md-12'><h3>Número: " + element.Listado[0].Codigo + "</h3><h5>Descripción: " + element.Listado[0].Descripcion + "</h5><h6>Total: $" + total + "</h6><p>Estado:" + element.Listado[0].CodigoEstado + "</p></div>");

                    }
                })
        }

    })
});

$("input").hover(
    function () {
        $(this).addClass("shadow");
    }, function () {
        $(this).removeClass("shadow");
    }
);
$("button").hover(
    function () {
        $(this).addClass("shadow");
    }, function () {
        $(this).removeClass("shadow");
    }
);