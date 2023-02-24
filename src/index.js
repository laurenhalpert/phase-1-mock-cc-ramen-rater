document.addEventListener("DOMContentLoaded", ()=>{
    getRamens();
})

function getRamens() {
    fetch ("http://localhost:3000/ramens")
    .then(resp=> resp.json())
    .then(data => {
        data.forEach(elem=> renderRamen(elem));
        let firstRamen = data[0];
        let placeholder = document.querySelector(".detail-image");
        let nom = document.querySelector(".name");
        let restaurant = document.querySelector(".restaurant");
        let ratingDisplay = document.querySelector("#rating-display");
        let commentDisplay = document.querySelector("#comment-display");
        nom.id = data[0].id;
        nom.innerText = firstRamen.name;
        restaurant.innerText = firstRamen.restaurant;
        ratingDisplay.innerText = firstRamen.rating;
        commentDisplay.innerText= firstRamen.comment;
        placeholder.src = firstRamen.image;
    })
}

function renderRamen(ramen) {
    let image = document.createElement("img");
    image.src = ramen.image;
    image.className = `small-picture`;
    image.id = `${ramen.id}image`;
    image.addEventListener("click", event =>displayRamenDetails(event));
    function displayRamenDetails(event) {
        let ramenDetail = document.querySelector("#ramen-detail");
        let placeholder = document.querySelector(".detail-image");
        let nom = document.querySelector(".name");
        let restaurant = document.querySelector(".restaurant");
        let ratingDisplay = document.querySelector("#rating-display");
        let commentDisplay = document.querySelector("#comment-display");
        nom.id = ramen.id;
        nom.innerText = ramen.name;
        restaurant.innerText = ramen.restaurant;
        ratingDisplay.innerText = ramen.rating;
        commentDisplay.innerText= ramen.comment;
        placeholder.src = event.target.src;
        
    }
    
    document.querySelector("#ramen-menu").appendChild(image);
    document.querySelector("#delete-button").addEventListener("click", event=>deleteRamen(event));
    
    function deleteRamen(event) {
        let placeholder = document.querySelector(".detail-image");
        let nom = document.querySelector(".name");
        let restaurant = document.querySelector(".restaurant");
        
        let ratingDisplay = document.querySelector("#rating-display");
        let commentDisplay = document.querySelector("#comment-display");
        
    
        if (image.src === placeholder.src) {
            image.src ="";
            placeholder.src = "./assets/image-placeholder.jpg";
            nom.innerHTML= "";
            restaurant.innerHTML="";
            ratingDisplay.innerHTML = "";
            commentDisplay.innerHTML = "";
            goodbyeRamen(ramen);
            document.querySelector("#ramen-menu").innerHTML = "";
            getRamens();
        }
        
        
        
        
    }
    
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
    postRamen(ramenObj);
    event.target.reset();

}

document.querySelector("#edit-ramen").addEventListener("submit", event =>editRamen(event));

function editRamen(event) {
    event.preventDefault();

    let editObj = {};
    editObj.rating = event.target[0].value;
    editObj.comment = event.target[1].value;
    editObj.id = document.querySelector(".name").id;
    

    let ratingDisplay = document.querySelector("#rating-display");
    let commentDisplay = document.querySelector("#comment-display");
    ratingDisplay.innerText = editObj.rating;
    commentDisplay.innerText =editObj.comment;
    patchRamen(editObj);
    event.target.reset();

}
function patchRamen(obj) {
    fetch(`http://localhost:3000/ramens/${obj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then (resp => resp.json())
    .then(data => console.log(data))
}

function postRamen(obj) {
    fetch(`http://localhost:3000/ramens`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then (resp => resp.json())
    .then(data =>console.log(data))
}

function goodbyeRamen(obj) {
    document.querySelector("#ramen-menu").innerHTML = "";
    fetch (`http://localhost:3000/ramens/${obj.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then (resp=> resp.json())
    .then (data => console.log(data))
}

//document.querySelector("#delete-button").addEventListener("click", event=>deleteRamen(event));

/*function deleteRamen(event) {
    let placeholder = document.querySelector(".detail-image");
    let nom = document.querySelector(".name");
    let restaurant = document.querySelector(".restaurant");
    
    let ratingDisplay = document.querySelector("#rating-display");
    let commentDisplay = document.querySelector("#comment-display");
    let image = document.querySelector(".big-picture")
    

    if (image.src === placeholder.src) {
        image.src ="";
        placeholder.src = "./assets/image-placeholder.jpg";
        nom.innerHTML= "";
        restaurant.innerHTML="";
        ratingDisplay.innerHTML = "";
        commentDisplay.innerHTML = "";
    }
    
    console.log(ramen);
    
    
}*/