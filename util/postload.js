/* Shows/hides auth/notauth elements when user signed in/out */
if (currentUser != null) {
    $('.auth').css("visibility", "visible");
    $('.authdel').css("display", "block");
    $('.notauth').css("visibility", "hidden");
    $('.notauthdel').css("display", "none");
    if ($('main').hasClass('notauth')) {
        window.location.href = "../general/index.html";
    }
}
else {
    if ($('main').hasClass('auth')) {
        window.location.href = "../general/index.html";
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
            if (!no_card_added) {
                $('.card_no').text(data[i]['billing']['card_no']);
                $('.name_on_card').text(data[i]['billing']['name_on_card']);
                $('.billing_addr').text(data[i]['billing']['billing_addr']);
                $('.floating-menu-billing-button').append(`<button type="button" class="btn btn-secondary">Edit</button>`);
            }
            else {
                $('.floating-menu-billing-button').append(`<button type="button" class="btn btn-success">Add</button>`);
            }
            break;
        }
    }
});