function successCallback(json, target, title) {
    if (json["Ratings"] !== undefined) {

        var node = document.createElement("div");
        node.style.paddingBottom = "5px";
        node.style.paddingLeft = "10px";
        node.style.display = "flex";
        node.className = 'netflixRate-container';


        json["Ratings"].forEach(rating => {
            let innerNode = document.createElement("div");
            let source = rating["Source"].replace(/ /g, '');
            innerNode.className = "netflixRate " + source;
            innerNode.style.paddingRight = "15px";
            innerNode.textContent = rating["Value"];
            
            node.appendChild(innerNode);
        });

        target.appendChild(node); 

    } else {
        console.log(title + " has no rating data.");
    }
}

function errorCallback(errorCode, title) {
    console.log("Error in the API request call for "+title+". Error Code: " + errorCode);
}


function omdbRequest(elem) {
    if (elem) {
        const target = elem.querySelector('.jawBone .overview .meta.video-meta ');
        if (target !== null && target.querySelector('.netflixRate-container') === null) {
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
                    successCallback(JSON.parse(xml.responseText), target, title);
                } else if (xml.readyState === 4 && xml.status !== 200) {
                    errorCallback(xml.status, title);
                }
            };
            xml.open("GET", url, true);
            xml.send();
        }
    }
}

function initialteRequest() {
    omdbRequest(document.querySelectorAll(".jawBoneOpenContainer").item(0));
}

setInterval(initialteRequest, 1000);