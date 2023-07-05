$(document).ready(function(){

    console.log('Listo')

    //  Obtén la fecha actual y actualízala en el DOM.
    var date_time = new Date()
    let display_date= "Fecha_" + date_time.toLocaleDateString()
    
    $(document).ready(function () {
        $("#date").html(display_date)
    })



    //  Escribe un evento, cuando se hace clic en el botón eviar.
    $('#button').click(function(){

        //  Obtén el valor del texto, del área de texto, con el método 'val()'.
        let text_value = $('#text').val()

        //  Conviértelo en un objeto JS.
        //  Proporciona una 'clave' aquí y en escribe lo mismo en el archivo app.py; también para extraer los datos.
        let input_text = {'customer_review' : text_value}
        console.log(input_text)

        //  Requerimiento AJAX.
        $.ajax({

            //  Tipo de requerimiento web.
            type: 'POST',

            //  URL.
            url: "/predict",

            //  Datos a ser enviados en formato JSON.
            data : JSON.stringify(input_text),

            //  Tipo de respuesta esperada en JSON.
            dataType : 'json',

            //  contentType - (tipo de contenido).
            contentType : 'application/json',

            //  Si todo es exitoso, ejecuta esta función.
            success : function(result){

                // Extrae la predicción y la URL del emoticón del resultado.
                let prediction = result.prediction
                let emoji_url = result.url


                //  Actualiza los elementos del DOM.
                //  Muestra los elementos.
                $('#sentiment').text(prediction)
                $('#sentiment').show()

                $('#emoji').attr('src', emoji_url)
                $('#emoji').show()
            },

            //  Si hay algún error, ejecuta esta función.
            error : function(result){
                console.log(result)
            }
        })


        //  Borra el cuadro de texto después de cada clic en el botón.
        $('#text').val("")
    })
        
})
