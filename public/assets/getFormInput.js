$(document).ready(function() {

    $('form').on('submit', function() {
        
        //Passing input data to matche variable
        var matches = {male: $("#male").val(), female: $("#female").val()}

        $.ajax({
            type: 'POST',
            url: '/',
            data: matches,
            success: function(data) {
                alert(data.toUpperCase())
                location.reload()
            },
            error: function(err) {
                alert("An error occur\n\n" + err )
                location.reload()
            }
        })
    });
    return false
})