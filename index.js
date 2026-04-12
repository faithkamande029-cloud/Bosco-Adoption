const dogs = document.querySelectorAll('.dog') 

const names = ["Bosco", "Coco", "Daisy", "Miki","Mary", "Kamau"];

function generateImage(data, dog, name){
    const html = `
        <img src="${data.message}">
        <h4>${name}</h4>
        <button class="btn">Adopt</button>    
    `;
    dog.innerHTML = html;

    const button = dog.querySelector(".btn");

    button.addEventListener("click", () =>{
        button.textContent = "Adopted ✅";
        button.disabled = true;
    });
}


dogs.forEach((dog, index)=> {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => generateImage(data, dog, names[index % names.length]))
    .catch(error => console.error("Error fetching data: ", error));
}) 
dogs.forEach(dog =>{
    const ratings = postId.querySelectorAll(".like");
    
    ratings.forEach(rating =>{
        const btn = rating.querySelector(".post-like-heart");
        const count = rating.querySelector(".post-like-count");

        btn.addEventListener("click", () => {

            if (rating.classList.contains("post-liked")){    
                return;
            }
            
            count.textContent = Number(count.textContent) + 1;

            })
            rating.classList.add("pos-liked");
        
        });
});


function displayFunfacts(fact){
    const factList = document.getElementById("funFacts")

    const factsArray = fact.facts;
    if(!Array.isArray(factsArray)){
        console.error("The fact is not an array:", factsArray)
        return;
    }


    factsArray.forEach((dog, index) => {
        setTimeout(() => {
            const listDogFact = document.createElement("li")
            listDogFact.textContent = dog
            factList.append(listDogFact)
        }, index * 1000);        
        
    });
}

fetch("https://dog-api.kinduff.com/api/facts?number=5")
    .then(response => response.json())
    .then(fact => {
        console.log(fact);
        displayFunfacts(fact);
    })
    .catch(error => console.error("error fetching data:", error));
    
