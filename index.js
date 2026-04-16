// gets the main container where all dog card will go
const dogs = document.getElementById("dog-container");

// Dog names array
const names = ["Bosco", "Coco", "Daisy", "Miki","Mary", "Kamau"];

// function to create the dog card images
function generateImage(data, name){

    // creates new div for each dog
    const dogCard = document.createElement("div");
    dogCard.classList.add("dog");

    // inserts images + name + buttons
    const html = `
        <img src="${data.message}">
        <h4>${name}</h4>
        <button class="btn">Adopt</button>   
        
        <div class="icon">
            <div class="like post-liked">
                <span class="post-like-hrt material-icons-outlined">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </span>
                <span class="post-like-count">0</span>
            </div>
                
        </div>
    `;
    dogCard.innerHTML = html;

    // select like button inside the dog cards 
    const rating = dogCard.querySelector(".like");
    const count = dogCard.querySelector(".post-like-count");

    // add click event to the like button
    rating.addEventListener("click", () => {
        const liked = rating.classList.toggle("liked");
        count.textContent = liked
            // increases and decreases  like count
            ? Number(count.textContent) + 1
            : Math.max(0, Number(count.textContent) - 1);
    });
    
    // To select adopt button
    const button = dogCard.querySelector(".btn");

    // mark adopted when clicked
    button.addEventListener("click", () =>{
        button.textContent = "Adopted ✅";
        button.disabled = true;
    });
    //  adds newly created elements to the dog card
    dogs.appendChild(dogCard);
};

// fetches images from public API
// loops through the 6 dog divs to get the dogs
for(let i = 0; i < 6; i++ ) {
    fetch("https://dog.ceo/api/breeds/image/random")
        // converts response to json
        .then(response => response.json())
        // senf data to function to display
        .then(data => generateImage(data, names[i % names.length]))
        // catch error from fetch
        .catch(error => console.log(error));
};

// funfact function
// Request fun facts from public API
function displayFunfacts(fact){
    const factList = document.getElementById("funFactsDisplay")

    // clear old facts before adding new facts
    factList.innerHTML = "";

    const factsArray = fact.data;

    // checks if data is an array
    if(!Array.isArray(factsArray)){
        console.error("The fact is not an array:", factsArray)
        return;
    }

    // loops through each fact 
    factsArray.forEach((item, index) => {
        // delays each fact
        setTimeout(() => {
            // creates list for each fact
            const listDogFact = document.createElement("li")
            listDogFact.textContent = item.attributes.body;
            factList.append(listDogFact);
        }, index * 3000); // time delay of 1 second      
        
    });
}
// fetching dog facts
fetch("https://dogapi.dog/api/v2/facts")
    .then(response => response.json())
    .then(fact => {
        console.log(fact);
        displayFunfacts(fact);
    })
    .catch(error => console.error("error fetching data:", error));


