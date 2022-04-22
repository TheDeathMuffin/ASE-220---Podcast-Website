/* This is used to store the email for the currently-signed in user. It is a jenky but necessary (for now) form of authentication testing. */
const currentUser = 'amy@gmail.com';     
let apiData;                                   /* To simulate no user being signed in, set this value to null */

var noResultsFound = `<p class="font-italic text-secondary h4 pt-5">No results found.</p>`;
var no_card_added = true;

$.getJSON('https://jsonblob.com/api/jsonBlob/953096375785242624', function(data){
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        if (currentUser == data[i]['email']) {
            if (data[i]['billing']['card_no'] != 0) {
                no_card_added = false;
            }
            break;
        }
    }
});

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
    $.getJSON('https://jsonblob.com/api/jsonBlob/953096375785242624', function(data2){          //Retreives user data.
        $.getJSON('https://jsonblob.com/api/jsonBlob/953093703074070528', function(data){       //Retreives podcast data.
            if (Object.keys(data[index]).length === 0) { return; }
            apiData = data;
            console.log(data[index])
            var podcast = document.createElement('div')
            var htmlString =
            `   <div class="podcast rounded" id="${data[index].id}"><div style="float:right;">`;    
            var subscribed = false;
            for (i = 0; i < data2.length; i++) {    /* Loops for each user. */
                if ( currentUser == data2[i]['email'] ) {      /* Checks if the current user matches the currently-looped user. If so, continue... */
                    for (j = 0; j < data2[i]['subscribedTo'].length; j++) {        /* Loops for every user in user's subscribed users. */
                        if ( currentUser != data[index]['email'] && data[index]['email'] == data2[i]['subscribedTo'][j] ) {       /* Checks if the podcast is in the user's saved podcast list. */
                            htmlString += `<a class="text-white" href="unsubscribe.html?email=${data[index].email}"><button type="button" class="btn btn-secondary ownerButton">Subscribed</button></a>`;
                            subscribed = true;
                            break;
                        }
                    } 
                    if ( currentUser != data[index]['email'] && subscribed == false ) {
                        htmlString += `<a class="text-white" href="subscribe.html?email=${data[index].email}"><button type="button" class="btn btn-primary ownerButton">Subscribe to Podcast</button></a>`;
                    }
                    break;
                }
            }
            htmlString += `
                <a class="text-white" href="report.html?index=${data[index].index}"><button type="button" class="btn liked"><img class="iconImage" src="../icon/flag.png"></button></a></div>
                <p class="title"><a class="podcastLink font-weight-bold h5" href="#">${data[index].title}</a></p>
                <p class="authors">${data[index].firstname +" " + data[index].lastname}</p>
                <p class="article font-italic"></p>
                <p class="year font-italic">Date published: ${data[index].publishedDate}</p>
                <p class="doi">DOI: ${data[index].doi}</p>
                <p>Disciplines:`
                for (let i = 0; i < data[index]['scientificDisciplines'].length; i++) {         //Loops through each discipline, creating anchor tags for each.
                    if (i != 0) { htmlString += `, ` }                                          //Prepends comma to discipline if not the first discipline.
                    htmlString += ` <a class="scientificDisciplines" href="disciplines/detail.html?disciplines=${data[index]['scientificDisciplines'][i]}">${data[index]['scientificDisciplines'][i]}</a>`;
                }
                htmlString += `</p>
                <p>Tags:`
                for (let i = 0; i < data[index]['tags'].length; i++) {                          //Loops through each tag, creating anchor tags for each.
                    if (i != 0) { htmlString += `, ` }                                          //Prepends comma to tag if not the first tag.
                    htmlString += ` <a class="tag" href="tags/detail.html?tag=${data[index]['tags'][i]}">${data[index]['tags'][i]}</a>`;
                }
                htmlString += `</p>
                <div class="audioClip bg-dark text-light rounded mb-2"><p class="font-weight-bold">${data[index].title}</p>
                
                <a  data-toggle="collapse" href="#previewText" role="button" aria-expanded="false" aria-controls="previewText">Preview transcript...</a>
                <div class="collapse" id="previewText"><div class="card card-body bg-dark font-italic text-light">
                "This is 2 lines of text from the podcast. This feature is not yet implemented, so please be patient my children. It will dissappear into the void of all space and time, forever and ever until everything goes away and never comes back..."
                </div></div></div>
                `;
            /* Determines what buttons appear on a podcast card */
            if ( currentUser == data[index]['email'] ) {    /* Block only executes if the displayed podcast is owned by the current user. */
                if ( allowDel == true ) {               /* If function call specifies user should be able to edit/delete their own podcasts, delete button is displayed. */
                    htmlString += `<div style="float:right"><a class="text-white" href="updatepodcast.html?index=${data[index].index}"><button type="button" class="btn btn-primary ownerButton">Edit</button></a> <a class="text-white" href="delete.html?index=${data[index].index}"><button type="button" class="btn btn-danger ownerButton deleteButton">Delete</button></a></div>`;
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
                            htmlString += `<a class="text-white" href="unlike.html?index=${data[index].index}"><button type="button" class="btn btn-primary liked"><img class="iconImage" src="../icon/liked.png"> <span class="badge badge-light">${data[index].likes}</span><span class="sr-only">unread messages</span></button></a> `;
                            liked = true;
                            break;
                        }
                    }
                    if ( liked == false ) {
                        htmlString += `<a class="text-white" href="like.html?index=${data[index].index}"><button type="button" class="btn btn-primary unliked"><img class="iconImage" src="../icon/unliked.png"> <span class="badge badge-light">${data[index].likes}</span><span class="sr-only">unread messages</span></button></a> `;
                        //htmlString += `<button type="button" class="btn btn-success notOwnerButton"><a class="text-white" href="save.html?index=${data[index].index}">Save</a></button>`;
                    }
                    for (j = 0; j < data2[i]['savedPodcasts'].length; j++) {        /* Loops for every podcast in user's saved podcasts. */
                        if ( data[index]['index'] == data2[i]['savedPodcasts'][j] ) {       /* Checks if the podcast is in the user's saved podcast list. */
                            htmlString += `<a class="text-white" href="unsave.html?index=${data[index].index}"><button type="button" class="btn btn-primary saved"><img class="iconImage" src="../icon/saved.png"><span class="badge badge-light">${data[index].saves}</span><span class="sr-only">unread messages</span></button></a> `;
                            saved = true;
                            break;
                        }
                    } 
                    if ( saved == false ) {
                        htmlString += `<a class="text-white" href="save.html?index=${data[index].index}"><button type="button" class="btn btn-primary unsaved"><img class="iconImage" src="../icon/unsaved.png"> <span class="badge badge-light">${data[index].saves}</span><span class="sr-only">unread messages</span></button></a> `;
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
            myAjax('GET', "https://jsonblob.com/api/jsonBlob/966066952229634048", null, function(disciplines){
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
                        //Search among podcasts in dashboard page
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
                        //Search Bar for saved podcasts
                        //ONLY USED ON DASHBOARD, SAVED PODCASTS page
                        } else if(type == "savedSearch"){
                            console.log("Loading Saved Podcasts... \n");
                            console.log(podcastList);
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
                                    //Compares Scientific Disciplines to search
                                    for(k = 0; k < searchArray.length; k++){
                                        if(disciplinesArray[j].includes(searchArray[k])){
                                            displayPodcast(i);
                                            hasDisplayed = true;
                                            break;
                                        }
                                    }
                                    if(hasDisplayed){break};
                                }
                            }
                        //Search bar for specific items within a discipline
                        //ONLY FOR discipline.detail page
                        } else if(type == "disciplineSearch"){
                            console.log("Loading Podcasts Already ordered by discipline... \n");
                            var currentDiscipline;
                            //Loop to find current discipline
                            for(i = 0; i < disciplines.length; i++){
                                if(disciplines[i].id == params.get("discipline")){
                                    currentDiscipline = disciplines[i].name;
                                    break;
                                }
                            }
                            for(i = 0; i < podcastList.length; i++){
                                var hasDisplayed = false;
                                var podcastTitle = podcastList[i]["title"].toLowerCase();
                                //Array of Disciplines Per podcast
                                var disciplinesArray = podcastList[i].scientificDisciplines
                                var searchString = e.target.value.toLowerCase();
                                //Search string split apart into array with each word
                                var searchArray = searchString.split(" ");
                                //Podcast Title split into array with each word
                                var titleArray = podcastTitle.split(" ");
                                for(j = 0; j < titleArray.length; j++){
                                    //Compares Titles to search
                                    for(k = 0; k < searchArray.length; k++){
                                        if(titleArray[j].includes(searchArray[k])){
                                            for(r = 0; r < disciplinesArray.length; r++){
                                                if(currentDiscipline == disciplinesArray[r]){
                                                    displayPodcast(i);
                                                    hasDisplayed = true;
                                                    break;
                                                }
                                            }
                                            if(hasDisplayed){break};
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
                                var disciplinesArray = podcastList[i].scientificDisciplines
                                var searchString = e.target.value.toLowerCase();
                                var searchArray = searchString.split(" ");
                                var titleArray = podcastTitle.split(" ");
                                //console.log(searchArray); console.log(titleArray);

                                //Compares Podcast Titles to search 
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
                                if(hasDisplayed) continue;
                                
                                //Compares Scientific Disciplines to search
                                for(j = 0; j < disciplinesArray.length; j++){
                                    for(k = 0; k < searchArray.length; k++){
                                        console.log(disciplinesArray + " COMPARED WITH " + searchArray)
                                        if(disciplinesArray[j].toLowerCase().includes(searchArray[k])){
                                            displayPodcast(i);
                                            hasDisplayed = true;
                                            break;
                                        }
                                    }
                                    if(hasDisplayed){break};
                                }
                                if(hasDisplayed) continue;
                            }
                        }
                    }
                })
            })
        });
    })
}

function displayAllShows(){
    for(i =0; i <= 7; i++){
        displayPodcast(i);
    }
}