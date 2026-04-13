const dogs = document.querySelectorAll('.dog') 
// Dog names array
const names = ["Bosco", "Coco", "Daisy", "Miki","Mary", "Kamau"];

function generateImage(data, dog, name){
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
    dog.innerHTML = html;

    const rating = dog.querySelector(".like");
    const count = dog.querySelector(".post-like-count");

    rating.addEventListener("click", () => {            
        const liked = rating.classList.toggle("liked");

        if(liked) {
            count.textContent = Number(count.textContent) + 1;
        }else {
            count.textContent = Number(count.textContent) - 1;
        }
    }); 

    const button = dog.querySelector(".btn");

    button.addEventListener("click", () =>{
        button.textContent = "Adopted ✅";
        button.disabled = true;
    });
}

// fetches images from public API
dogs.forEach((dog, index)=> {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => generateImage(data, dog, names[index % names.length]))
    .catch(error => console.error("Error fetching data: ", error));
}) 
// funfact function
// Request fun facts from public API
function displayFunfacts(fact){
    const factList = document.getElementById("funFactsDisplay")

    factList.innerHTML = "";

    const factsArray = fact.data;

    if(!Array.isArray(factsArray)){
        console.error("The fact is not an array:", factsArray)
        return;
    }


    factsArray.forEach((item, index) => {
        setTimeout(() => {
            const listDogFact = document.createElement("li")
            listDogFact.textContent = item.attributes.body;
            factList.append(listDogFact);
        }, index * 1000);        
        
    });
}

fetch("https://dogapi.dog/api/v2/facts")
    .then(response => response.json())
    .then(fact => {
        console.log(fact);
        displayFunfacts(fact);
    })
    .catch(error => console.error("error fetching data:", error));
    
