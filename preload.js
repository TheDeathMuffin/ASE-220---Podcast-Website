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
//Reusable Display Podcast Function
function displayPodcast(index=0, finalClass = ".podcast-menu"){
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
            var podcast = document.createElement('div'); podcast.classList.add("podcast"); podcast.classList.add("rounded");
            var title = document.createElement('p'); title.class = "title";
            var link = document.createElement('a'); link.href = "#";
            //var authorList = document.createElement('p'); authorList.class = "authors";
            var description = document.createElement('p'); description.classList.add("article"); description.classList.add("font-italic");
            var datePublished = document.createElement('p'); datePublished.classList.add("font-italic");
            var doi = document.createElement('p'); doi.class = "doi";
            var footer = document.createElement('div'); footer.classList.add("audioClip"); footer.classList.add("bg-dark"); footer.classList.add("text-light"); footer.classList.add("rounded");
            var para1 = document.createElement('p'); para1.classList.add("font-weight-bold");
            //Filling Elements with Data
            link.innerHTML = podcasts[index]["title"];
            console.log(podcasts);
            //authorList.innerHTML = podcasts[index]["firstname"] + " " + podcasts[index]["lastname"];
            description.innerHTML = podcastDescription;
            datePublished.innerHTML = podcasts[index]["publishedDate"];
            doi.innerHTML = podcasts[index]["doi"];
            para1.innerHTML = podcasts[index]["title"];
            //Combining Elements
            title.appendChild(link);
            footer.appendChild(para1);
            podcast.appendChild(title);
            podcast.appendChild(description); podcast.appendChild(datePublished); podcast.appendChild(doi);
            podcast.appendChild(footer);
            $(finalClass).append(podcast);
        })
    })
}

