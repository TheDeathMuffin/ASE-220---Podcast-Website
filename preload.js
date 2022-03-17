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
function clearBox(className = ".podcast-menu")
{
    $(".podcast-menu").empty();
}
//Working Complicated Search Bar
myAjax('GET', "https://jsonblob.com/api/jsonBlob/953093703074070528", null, function(response){
    var podcastList = response;
    console.log(response);
    $('#search').on("keypress", function(e){
        if(e.which == 13){
            alert(e.target.value);
            clearBox();
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
    })
})


    /*
    if(searchString.length == 0){
        displayAllShows();
        return
    }

   
    console.log(apiData[5].title)
    console.log(searchString)

    const filteredCharacters = apiData.filter((show) => {
        return (
            show.title.includes(searchString)
        );
    });

    console.log(filteredCharacters);*/
// })

    // for(i=0; i<=7; i++){

    //     if(apiData[i].title.includes(searchString)){
    //         podcastsShow.push(apiData[i].index);
    //     }
    // }

    // for(i=0; i <= podcastsShow.length; i++){
    //     var index = podcastsShow[i];
    // }
    
    // console.log(podcastsShow);


function displayAllShows(){
    for(i =0; i <= 7; i++){
        displayPodcast(i);
    }
}
    /*
    var podcasts;
    var podcastDescription;
    //Grabs podcast Data
    myAjax('GET', 'https://jsonblob.com/api/jsonBlob/953093703074070528', null, function(body){
        console.log("Getting Podcast data..." + body);
        podcasts = body;
        myAjax('GET', podcasts[index]["descriptionLocation"], null, function(body){
            podcastDescription = body.description;
            console.log("Grabbing Podcast Description...\n" + "Description: " + podcastDescription)
            //Creating Elements

            console.log(podcasts[0].firstname)

            const htmlString = podcasts.map((podcasts) => {
                return`
                <li class="character">
                 <div class="podcast rounded" id="${podcasts.id}">
                    <p class="title"><a class="podcastLink font-weight-bold" href="#">${podcasts.title}</a></p>
                    <p class="authors">${podcasts.firstname +" " + podcasts.lastname}</p>
                    
                    <p class="article font-italic"></p>
                    <p class="year font-italic">Date published: ${podcasts.publishedDate}</p>
                    <p class="doi">DOI: ${podcasts.doi}</p>
                    <div class="audioClip bg-dark text-light rounded"><p class="font-weight-bold">${podcasts.title}</p></div>
                </div>
                </li>
                `;
            })

            console.log(htmlString);

            var podcast = document.createElement('div'); podcast.classList.add("podcast"); podcast.classList.add("rounded");
            var title = document.createElement('p'); title.class = "title";
          //  var link = document.createElement('a'); link.href = "#";
            //var authorList = document.createElement('p'); authorList.class = "authors";
         //   var description = document.createElement('p'); description.classList.add("article"); description.classList.add("font-italic");
          //  var datePublished = document.createElement('p'); datePublished.classList.add("font-italic");
          //  var doi = document.createElement('p'); doi.class = "doi";
          //  var footer = document.createElement('div'); footer.classList.add("audioClip"); footer.classList.add("bg-dark"); footer.classList.add("text-light"); footer.classList.add("rounded");
          //  var para1 = document.createElement('p'); para1.classList.add("font-weight-bold");
            //Filling Elements with Data
         //   link.innerHTML = podcasts[index]["title"];
         //   console.log(podcasts);
            //authorList.innerHTML = podcasts[index]["firstname"] + " " + podcasts[index]["lastname"];
         //   description.innerHTML = podcastDescription;
         //   datePublished.innerHTML = podcasts[index]["publishedDate"];
          //  doi.innerHTML = podcasts[index]["doi"];
          //  para1.innerHTML = podcasts[index]["title"];
            //Combining Elements
         //   title.appendChild(link);
         //   footer.appendChild(para1);
            var podcast = document.createElement('div')
            podcast.innerHTML = htmlString;
            //podcast.appendChild(title);
            //podcast.appendChild(description); podcast.appendChild(datePublished); podcast.appendChild(doi);
           // podcast.appendChild(footer);
            $('.podcast-menu').append(podcast);
        })
    })*/