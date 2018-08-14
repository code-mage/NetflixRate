function successCallback(json, elem) {
    const target = elem.querySelector('.jawBone .overview .meta.video-meta ');
    let innerHTML = "";
    if (target !== null && target.querySelector('.netflixRate[data="rating"]') === null && json["Ratings"] !== undefined) {
        json["Ratings"].forEach(rating => {
            // rating["Source"]
            innerHTML += "<div style='padding-right:15px;'>" + "<span class='netflixRate  " + rating["Source"].replace(/ /g, '') + "' data='rating' style='vertical-align: middle;font-size:20px;font-weight:bold;'> " + rating["Value"] + "</span></br>" + "</div>";
        });
        innerHTML = "<div class='netflixRate-container' style='padding-bottom:5px;padding-left:10px;display: flex;'>" + innerHTML + "</div>";
        target.innerHTML += innerHTML;
    } else if (json["Ratings"] === undefined) {
        //console.log("Data not found");
    } else {
        //console.log("ERROR: not adding html as there should already be html");
    }
}

function error(errorCode) {
    //console.log("Error in the API request call. Error Code: " + errorCode);
}


function omdbRequest(elem) {
    if (elem) {
        let title = "";
        if (elem.querySelectorAll(".jawBone .jawbone-title-link .logo").item(0)) {
            title = elem.querySelectorAll(".jawBone .jawbone-title-link .logo").item(0).alt;
        } else {
            title = elem.querySelectorAll(".jawBone .image-fallback-text").item(0).innerHTML;
        }

        let url = "http://www.omdbapi.com/?apikey=88b7e808&t=" + encodeURIComponent(title);

        const xml = new XMLHttpRequest();
        xml.onreadystatechange = () => {
            if (xml.readyState === 4 && xml.status === 200) {
                successCallback(JSON.parse(xml.responseText), elem);
            } else if (xml.readyState === 4 && xml.status !== 200) {
                error(xml.status);
            }
        };
        xml.open("GET", url, true);
        xml.send();
    }
}

function initialteRequest() {
    omdbRequest(document.querySelectorAll(".jawBoneOpenContainer").item(0));
}

setInterval(initialteRequest, 1000);