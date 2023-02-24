document.addEventListener("DOMContentLoaded", ()=>{
    fetch ("http://localhost:3000/ramens")
    .then(resp=> resp.json())
    .then(data => data.forEach(elem=> renderRamen(elem)))
})

function renderRamen(ramen) {
    let image = document.createElement("img");
    image.src = ramen.image;
    image.addEventListener("click", event =>displayRamenDetails(event));
    function displayRamenDetails(event) {
        let ramenDetail = document.querySelector("#ramen-detail");
        let placeholder = document.querySelector(".detail-image");
        let nom = document.querySelector(".name");
        let restaurant = document.querySelector(".restaurant");
        let ratingDisplay = document.querySelector("#rating-display");
        let commentDisplay = document.querySelector("#comment-display");
        nom.innerText = ramen.name;
        restaurant.innerText = ramen.restaurant;
        ratingDisplay.innerText = ramen.rating;
        commentDisplay.innerText= ramen.comment;
        placeholder.src = event.target.src;
        
    }
    document.querySelector("#ramen-menu").appendChild(image);
}


document.querySelector("#new-ramen").addEventListener("submit", event =>handleSubmit(event));

function handleSubmit(event) {
    event.preventDefault();
    let ramenObj = {};
    ramenObj.name = event.target[0].value;
    ramenObj.restaurant = event.target[1].value;
    ramenObj.image = event.target[2].value;
    ramenObj.rating = event.target[3].value;
    ramenObj.comment = event.target[4].value;
    renderRamen(ramenObj);
    event.target.reset();

}

