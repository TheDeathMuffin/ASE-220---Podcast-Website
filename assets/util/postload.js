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
$.getJSON('http://localhost:8080/api/user/'+currentUserID, function(data){
    $('.currentName').append(data['firstname'],' ',data['lastname']);
    $('.currentEmail').append(data['email']);
    $('.currentOrganization').append(data['organization']);
    if (!no_card_added) {
        $('.card_no').text(data[i]['billing']['card_no']);
        $('.name_on_card').text(data['billing']['name_on_card']);
        $('.billing_addr').text(data['billing']['billing_addr']);
        $('.floating-menu-billing-button').append(`<button type="button" class="btn btn-secondary">Edit</button>`);
    }
    else {
        $('.floating-menu-billing-button').append(`<button type="button" class="btn btn-success">Add</button>`);
    }
});
let params = (new URL(document.location)).searchParams
if(params.get("podcastID") != null){
    myAjax("GET", `http://localhost:8080/api/podcast/${params.get("podcastID")}`, null, function(data){
        console.log(data)
        $().append
    });
}

