let addToy = false;
const url = "http://localhost:3000";
const toyCollectionDiv = document.querySelector("#toy-collection");
const toyForm = document.querySelector(".container form");

function renderToy(toy) {
  const toyCard = document.createElement("div");
  toyCard.className = "card";

  const toyName = document.createElement("h2");
  toyName.textContent = toy.name;

  const toyImage = document.createElement("img");
  toyImage.className = "toy-avatar";
  toyImage.src = toy.image;

  const likesP = document.createElement("p");
  likesP.textContent = toy.likes;

  const likeBtn = document.createElement("button");
  likeBtn.className = "like-btn";
  likeBtn.setAttribute("id", toy.id);
  likeBtn.textContent = "Like";
  likeBtn.addEventListener("click", (e) => {
    fetch(`${url}/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "content-type" : "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({likes: toy.likes += 1})
    })
    .then(res => res.json())
    .then(data => {
      likesP.textContent = data.likes
    })
    .catch(err => alert("Something went wrong!"))
  })

  toyCard.append(toyName);
  toyCard.append(toyImage);
  toyCard.append(likesP);
  toyCard.append(likeBtn);

  toyCollectionDiv.append(toyCard);
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch(`${url}/toys`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((toyObj) => renderToy(toyObj));
  });

toyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  };

  fetch(`${url}/toys`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newToy),
  })
    .then((res) => res.json())
    .then((data) => renderToy(data))
    .catch((err) => alert("Something went wrong! Your toy was not added to the page. Please try again later."));
});
