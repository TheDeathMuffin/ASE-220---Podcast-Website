/* Shows/hides auth/notauth elements when user signed in/out */
if (currentUser != null) {
    $('.auth').css("visibility", "visible");
    $('.authdel').css("display", "block");
    $('.notauth').css("visibility", "hidden");
    $('.notauthdel').css("display", "none");
    if ($('main').hasClass('notauth')) {
        window.location.href = "index.html";
    }
}
else {
    if ($('main').hasClass('auth')) {
        window.location.href = "index.html";
    }
    $('.auth').css("visibility", "hidden");
    $('.authdel').css("display", "none");
    $('.notauth').css("visibility", "visible");
    $('.notauthdel').css("display", "block");
}

/* Populates Page with User's Details */
$.getJSON('https://jsonblob.com/api/jsonBlob/953096375785242624', function(data){
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        if (currentUser == data[i]['email']) {
            $('.currentName').append(data[i]['firstname'],' ',data[i]['lastname']);
            $('.currentEmail').append(data[i]['email']);
            $('.currentOrganization').append(data[i]['organization']);
            break;
        }
    }
});