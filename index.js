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
    .catch(error => console.log("Error fetching data: ", error));
}) 


function displayFunfacts(fact){
    const factList = document.getElementById("funFactsDisplay")

    fact.facts.forEach((dog, index) => {
        setTimeout(() => {
            const listDogFact = document.createElement("li")
            listDogFact.textContent = dog.fact || dog;
            factList.append(listDogFact)
        }, index * 3000);        
        
    });
}

fetch("https://dog-api.kinduff.com/api/facts?number=5")
    .then(response => response.json())
    .then(fact => displayFunfacts(fact))
    .catch(error => console.error("error fetching data:", error));
    
