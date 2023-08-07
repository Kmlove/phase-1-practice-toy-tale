let addToy = false;
const url = "http://localhost:3000";
const toyCollectionDiv = document.querySelector("#toy-collection");
const toyForm = document.querySelector(".container form");

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
    data.forEach((toyObj) => {
      const toyCard = document.createElement("div");
      toyCard.className = "card";

      const toyName = document.createElement("h2");
      toyName.textContent = toyObj.name;
      const toyImage = document.createElement("img");
      toyImage.className = "toy-avatar";
      toyImage.src = toyObj.image;
      const likesP = document.createElement("p");
      likesP.textContent = toyObj.likes;
      const likeBtn = document.createElement("button");
      likeBtn.className = "like-btn";
      likeBtn.setAttribute("id", toyObj.id);
      likeBtn.textContent = "Like";

      toyCard.append(toyName);
      toyCard.append(toyImage);
      toyCard.append(likesP);
      toyCard.append(likeBtn);

      toyCollectionDiv.append(toyCard);
    });
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
    .then((data) => {
      let newToyName = e.target.name.value;
      let newToyURL = e.target.image.value;

      const toyCard = document.createElement("div");
      toyCard.className = "card";

      const toyName = document.createElement("h2");
      toyName.textContent = newToyName;
      const toyImage = document.createElement("img");
      toyImage.className = "toy-avatar";
      toyImage.src = newToyURL;
      const likesP = document.createElement("p");
      likesP.textContent = "0";
      const likeBtn = document.createElement("button");
      likeBtn.setAttribute("id", data.id);
      likeBtn.className = "like-btn";
      likeBtn.textContent = "Like";

      toyCard.append(toyName);
      toyCard.append(toyImage);
      toyCard.append(likesP);
      toyCard.append(likeBtn);

      toyCollectionDiv.append(toyCard);

    })
    .catch((err) => alert("something went wrong!"));
});
