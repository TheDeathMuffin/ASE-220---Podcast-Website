/* This is used to store the email for the currently-signed in user. It is a jenky but necessary (for now) form of authentication testing. */
const currentUser = 'amy@gmail.com';     
let apiData;                                   /* To simulate no user being signed in, set this value to null */

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

//Reusable Display Podcast Function
function displayPodcast(index=0,appendingClass=".podcast-menu",allowDel=false){
    $.getJSON('https://jsonblob.com/api/jsonBlob/953096375785242624', function(data2){
    $.getJSON('https://jsonblob.com/api/jsonBlob/953093703074070528', function(data){
                if (Object.keys(data[index]).length === 0) { return; }
                apiData = data;
                console.log(data[index])
                var podcast = document.createElement('div')
                var htmlString = 
                `
                    <div class="podcast rounded" id="${data[index].id}">
                    <p class="title"><a class="podcastLink font-weight-bold" href="#">${data[index].title}</a></p>
                    <p class="authors">${data[index].firstname +" " + data[index].lastname}</p>
                    <p class="article font-italic"></p>
                    <p class="year font-italic">Date published: ${data[index].publishedDate}</p>
                    <p class="doi">DOI: ${data[index].doi}</p>
                    <div class="audioClip bg-dark text-light rounded"><p class="font-weight-bold">${data[index].title}</p></div><br>
                    `;
                /* Determines what buttons appear on a podcast card */
                if ( currentUser == data[index]['email'] ) {    /* Block only executes if the displayed podcast is owned by the current user. */
                    if ( allowDel == true ) {               /* If function call specifies user should be able to delete their own podcasts, delete button is displayed. */
                        htmlString += `<button type="button" class="btn btn-primary ownerButton"><a class="text-white" href="updatepodcast.html?index=${data[index].index}">Edit</a></button> <button type="button" class="btn btn-danger ownerButton deleteButton"><a class="text-white" href="delete.html?index=${data[index].index}">Delete</a></button>`;
                    }
                    else {                                  /* Otherwise, their podcasts are identified as their own using string. */
                        htmlString += `<i style="float:right">This is your podcast!</i>`;
                    }
                }
                
                var saved = false;
                var liked = false;
                for (i = 0; i < data2.length; i++) {    /* Loops for each user. */
                    if ( currentUser == data2[i]['email'] ) {      /* Checks if the current user matches the currently-looped user. If so, continue... */
                        for (k = 0; k < data2[i]['likedPodcasts'].length; k++) {        /* Loops for every podcast in user's liked podcasts. */
                            if ( data[index]['index'] == data2[i]['likedPodcasts'][k] ) {       /* Checks if the podcast is in the user's liked podcast list. */
                                htmlString += `<button type="button" class="btn btn-primary liked"><img class="iconImage" src="icon/liked.png"> <span class="badge badge-light"> 9</span><span class="sr-only">unread messages</span></button> `;
                                liked = true;
                                break;
                            }
                        }
                        if ( liked == false ) {
                            htmlString += `<button type="button" class="btn btn-primary unliked"><img class="iconImage" src="icon/unliked.png"> <span class="badge badge-light"> 9</span><span class="sr-only">unread messages</span></button> `;
                            //htmlString += `<button type="button" class="btn btn-success notOwnerButton"><a class="text-white" href="save.html?index=${data[index].index}">Save</a></button>`;
                        }
                        for (j = 0; j < data2[i]['savedPodcasts'].length; j++) {        /* Loops for every podcast in user's saved podcasts. */
                            if ( data[index]['index'] == data2[i]['savedPodcasts'][j] ) {       /* Checks if the podcast is in the user's saved podcast list. */
                                htmlString += `<button type="button" class="btn btn-primary saved"><a class="text-white" href="unsave.html?index=${data[index].index}"><img class="iconImage" src="icon/saved.png"> <span class="badge badge-light"> 19</span><span class="sr-only">unread messages</span></a></button> `;
                                saved = true;
                                break;
                            }
                        } 
                        if ( saved == false ) {
                            htmlString += `<button type="button" class="btn btn-primary unsaved"><a class="text-white" href="save.html?index=${data[index].index}"><img class="iconImage" src="icon/unsaved.png"> <span class="badge badge-light"> 19</span><span class="sr-only">unread messages</span></a></button> `;
                        }
                        break;
                    }
                }
                
                htmlString += `</div>`
                podcast.innerHTML += htmlString;
                $(appendingClass).append(podcast);
                
        });
    });
}
//Function used to reset podcast div in searchBar function
function clearBox(className = ".podcast-menu")
{
    $(".podcast-menu").empty();
}
//Working Complicated Search Bar
function searchBar(type = "indexSearch"){
    myAjax('GET', "https://jsonblob.com/api/jsonBlob/953093703074070528", null, function(response){
        myAjax('GET', "https://jsonblob.com/api/jsonBlob/953096375785242624", null, function(users){
            var podcastList = response;
            var savedPodcasts = [];
            var yourPodcasts = [];
            //Loop to find your Podcasts
            for(i = 0; i < Object.keys(podcastList).length; i++){
                if(podcastList[i]["email"] == currentUser){
                    yourPodcasts.push(podcastList[i])
                }
            }
            for (i = 0; i < users.length; i++){
                if(currentUser == users[i]["email"]){
                    for(j = 0; j < users[i]["savedPodcasts"].length; j ++){
                        savedPodcasts.push(users[i]["savedPodcasts"][j])
                    }
                }
            }
            console.log(response);
            $(".search").on("keypress", function(e){
                if(e.which == 13){
                    clearBox(".podcast-menu");
                    //For Dashboard search podcast menu
                    if(type == "dashboardSearch"){
                        for(i = 0; i < yourPodcasts.length; i++){
                            var hasDisplayed = false;
                            var podcastTitle = podcastList[i]["title"].toLowerCase();
                            var searchString = e.target.value.toLowerCase();
                            var searchArray = searchString.split(" ");
                            var titleArray = podcastTitle.split(" ");
                            //console.log(searchArray); console.log(titleArray);
                            for(j = 0; j < titleArray.length; j++){
                                for(k = 0; k < searchArray.length; k++){
                                    if(titleArray[j].includes(searchArray[k])){
                                        displayPodcast(i);
                                        hasDisplayed = true;
                                        break;
                                    }
                                }
                                if(hasDisplayed){break};
                            }
                        }
                    //For Saved Podcasts Search bar
                    } else if(type == "savedSearch"){
                        console.log("Loading Saved Podcasts... \n");
                        console.log(savedPodcasts);
                        for(i = 0; i < savedPodcasts.length; i++){
                            var hasDisplayed = false;
                            var podcastTitle = podcastList[i]["title"].toLowerCase();
                            var searchString = e.target.value.toLowerCase();
                            var searchArray = searchString.split(" ");
                            var titleArray = podcastTitle.split(" ");
                            //console.log(searchArray); console.log(titleArray);
                            for(j = 0; j < titleArray.length; j++){
                                for(k = 0; k < searchArray.length; k++){
                                    if(titleArray[j].includes(searchArray[k])){
                                        displayPodcast(i);
                                        hasDisplayed = true;
                                        break;
                                    }
                                }
                                if(hasDisplayed){break};
                            }
                        }
                    //Mainly for normal searches through ALL podcasts
                    } else {
                        for(i = 0; i < podcastList.length; i++){
                            var hasDisplayed = false;
                            var podcastTitle = podcastList[i]["title"].toLowerCase();
                            var searchString = e.target.value.toLowerCase();
                            var searchArray = searchString.split(" ");
                            var titleArray = podcastTitle.split(" ");
                            //console.log(searchArray); console.log(titleArray);
                            for(j = 0; j < titleArray.length; j++){
                                for(k = 0; k < searchArray.length; k++){
                                    if(titleArray[j].includes(searchArray[k])){
                                        displayPodcast(i);
                                        hasDisplayed = true;
                                        break;
                                    }
                                }
                                if(hasDisplayed){break};
                            }
                        }
                    }
                    
                }
            })
        });
        
    })
}


function displayAllShows(){
    for(i =0; i <= 7; i++){
        displayPodcast(i);
    }
}