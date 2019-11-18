import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Add Event listener

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.getElementById("limit").value;

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }

  searchInput.value = "";

  //Search reddit

  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = `<div class="card-columns">`;
    results.forEach(post => {
      const image = post.preview
        ? post.preview.images[0].source.url
        : "https://wearesocial-net.s3.amazonaws.com/us/wp-content/uploads/sites/7/2015/07/2A326ECA00000578-3148329-California_based_Reddit_logo_shown_has_fired_an_employee_called_-a-6_1435919411902.jpg";
      output += `
      <div class="card">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${truncateText(post.selftext, 100)}</p>
        <a href="${
          post.url
        }"  target="_blank" class="btn btn-primary">Read More..</a>
        <hr>
        <span class="badge badge-secondary">Subreddit:${post.subreddit}</span>
        <span class="badge badge-dark">Score:${post.score}</span>
      </div>
    </div>
      `;
    });
    output += `</div>`;
    document.getElementById("results").innerHTML = output;
  });
});

// show message
function showMessage(message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  const searchContainer = document.getElementById("search-container");
  const search = document.getElementById("search");

  searchContainer.insertBefore(div, search);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
