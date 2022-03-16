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