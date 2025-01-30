const key = "myAccesKey";

const currentTime = new Date().toLocaleString();

let localLike = localStorage.getItem("localLikes");
const imgTag = document.querySelector(".imgBox_img");
const likesTag = document.querySelector(".likeBox_globalCount");
const pageLikesTag = document.querySelector(".likeBox_count");
const discriptionTag = document.querySelector(".imgBox_discription");
const photographNameTag = document.querySelector(".imgBox_photographName");
const connect = document.querySelector(".connect");
const likeButton = document.querySelector(".likeBox_button");
const url = `https://api.unsplash.com/photos/random/?client_id=${key}`;
const lastPhotoButton = document.querySelector(".imgBox_getLastPhoto");
const historyUlTag = document.querySelector(".historyBox_ul");

function getUrlForLastPhoto(id) {
    return `https://api.unsplash.com/photos/${id}/?client_id=${key}`;
}

pageLikesTag.textContent = `Likes ${localLike}`;
async function getPhoto(url) {
    try {
        const response = await fetch(url);
        const photo = await response.json();
        return photo;
    } catch (error) {
        console.error("Error load photo: ", error);
        return undefined;
    }
}

async function loadPhoto(url, history) {
    const photo = await getPhoto(url);
    console.log(photo);
    imgTag.src = photo.urls.small;
    let likes = photo.likes;
    likesTag.textContent = `Global likes: ${likes}`;
    discriptionTag.textContent = `Discription:\n${photo.alt_description}`;
    photographNameTag.textContent = `Photograph name: ${photo.user.name}`;
    history.push({ id: photo.id, time: currentTime });
    console.log(history);
    localStorage.setItem("history", JSON.stringify(history));
    likeButton.addEventListener("click", function (e) {
        likePhoto(photo);
        likes++;
        likesTag.textContent = `Global likes: ${likes}`;
        ++localLike;
        localStorage.setItem("localLikes", localLike);
        pageLikesTag.textContent = `Likes ${localLike}`;
    });
}

async function likePhoto(photo) {
    fetch(`https://api.unsplash.com/photos?client_id=${key}${photo.id}/like/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: "703089",
        }),
    });
}

document.addEventListener("DOMContentLoaded", async function (e) {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    await loadPhoto(url, history);

    lastPhotoButton.addEventListener("click", function (e) {
        loadPhoto(getUrlForLastPhoto(history[history.length - 2].id), history);
    });

    history.forEach((element) => {
        const liTag = document.createElement("li");
        const button = document.createElement("button");
        button.classList.add("historyBox_button");
        button.textContent = "Show";
        button.id = element.id;
        liTag.classList.add("historyBox_li");
        liTag.textContent = element.time;
        historyUlTag.appendChild(liTag);
        historyUlTag.appendChild(button);
    });

    historyUlTag.addEventListener("click", function (e) {
        if (e.target.tagName == "BUTTON") {
            loadPhoto(getUrlForLastPhoto(e.target.id), history);
        }
    });
});

async function checkNetworkConnection() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/?client_id=${key}`);
        console.log(response);
        connect.className = "connect online";
        connect.textContent = "Online";
        if (!response.ok) {
            connect.textContent = "Offline";
            connect.className = "connect offline";
        }
    } catch (error) {
        console.error("Нет соединения с сетью", error);
        connect.textContent = "Offline";
        connect.className = "connect offline";
    }
}

// Пример вызова
checkNetworkConnection();
