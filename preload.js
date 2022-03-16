/* This is used to store the email for the currently-signed in user. It is a jenky but necessary (for now) form of authentication testing. */
const currentUser = 'amy@gmail.com';                                        /* To simulate no user being signed in, set this value to null */

function myAjax(method='GET',endpoint,data=null,onSuccess=null){
    $.ajax({
        url:endpoint,
        type:method,
        data: data==null ? null : JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:'json',
        success: function (body, status, response) {
            onSuccess(body,status,response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

