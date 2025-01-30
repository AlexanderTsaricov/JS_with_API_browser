const key = "myKey";

let localLike = localStorage.getItem("localLike");
const imgTag = document.querySelector(".imgBox_img");
const likesTag = document.querySelector(".likeBox_globalCount");
const pageLikesTag = document.querySelector(".likeBox_count");
const discriptionTag = document.querySelector(".imgBox_discription");
const photographNameTag = document.querySelector(".imgBox_photographName");
const connect = document.querySelector(".connect");
const likeButton = document.querySelector(".likeBox_button");
const url = `https://api.unsplash.com/photos/random/?client_id=${key}`;

likesTag.textContent = `Likes ${localLike}`;
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

async function loadPhoto() {
    const photo = await getPhoto(url);
    console.log(photo);
    return photo;
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
    const photo = await loadPhoto();
    imgTag.src = photo.urls.small;
    let likes = photo.likes;
    likesTag.textContent = `Global likes: ${likes}`;
    discriptionTag.textContent = `Discription:\n${photo.alt_description}`;
    photographNameTag.textContent = `Photograph name: ${photo.user.name}`;
    likeButton.addEventListener("click", function (e) {
        likePhoto(photo);
        likes++;
        likesTag.textContent = `Global likes: ${likes}`;
        ++localLike;
        localStorage.setItem("localLikes", localLike);
        pageLikesTag.textContent = `Likes ${localLike}`;
    });
});

async function checkNetworkConnection() {
    try {
        const response = await fetch("https://www.google.com", { method: "GET", mode: "no-cors" });
        connect.className = "connect online";
        connect.textContent = "Online";
    } catch (error) {
        console.error("Нет соединения с сетью", error);
        connect.textContent = "Offline";
        connect.className = "connect offline";
    }
}

// Пример вызова
checkNetworkConnection();
