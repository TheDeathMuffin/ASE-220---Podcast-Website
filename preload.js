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
function displayPodcast(index=0,appendingClass=".podcast-menu",allowDel=true){
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
                    if ( currentUser == data[index]['email'] ) {
                        if ( allowDel == true ) {
                            htmlString += `<button type="button" class="btn btn-primary ownerButton"><a class="text-white" href="updatepodcast.html?index=${data[index].index}">Edit</a></button> <button type="button" class="btn btn-danger ownerButton deleteButton"><a class="text-white" href="delete.html?index=${data[index].index}">Delete</a></button>`;
                        }
                        else {
                            htmlString += `<i>This is your podcast!</i>`;
                        }
                    }
                    else {
                            var included = false;
                            for (i = 0; i < data2.length; i++) {
                                if ( currentUser == data2[i]['email'] ) {
                                    for (j = 0; j < data2[i]['savedPodcasts'].length; j++) {
                                        if ( data[index]['index'] == data2[i]['savedPodcasts'][j] ) {
                                            htmlString += `<button type="button" class="btn btn-secondary notOwnerButton"><a class="text-white" href="unsave.html?index=${data[index].index}">Unsave</a></button>`;
                                            included = true;
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                            if ( included == false ) {
                                htmlString += `<button type="button" class="btn btn-success notOwnerButton"><a class="text-white" href="save.html?index=${data[index].index}">Save</a></button>`;
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