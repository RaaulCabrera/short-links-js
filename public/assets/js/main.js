$(document).ready(function(){
    $("#warning-too-much-urls").hide();

    $("#urls-inpt").on('keyup keypress blur change', function(e) {
        const urls = $("#urls-inpt").val();
        if(urls.length == 0) {
            $("#warning-too-much-urls").hide();
            return;
        }
        const urlsList = urls.split("\n");
        if(urlsList.length > 100) {
            $("#process-btn").prop("disabled", true);
            $("#warning-too-much-urls").show();
            e.preventDefault();
        } else {
            $("#process-btn").prop("disabled", false);
            $("#warning-too-much-urls").hide();
        }
    });


    $("#process-btn").click(function(){
        console.log("jsdka");
        const urls = $("#urls-inpt").val();
        
        if(!urls || urls.length == 0) {
            return;
        }

        const urlsList = urls.split("\n");



        console.log(urlsList);

    });
});