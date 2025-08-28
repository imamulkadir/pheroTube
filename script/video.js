// console.log("here");

// Create Categories
const loadCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    )
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories));
  } catch (error) {
    console.error("Error fetching categories!");
  }
};
// SORT FUNCTION
let sortDescending = true; // start with descending

function sortVideosByViews() {
  const sorted = [...allVideos].sort((a, b) => {
    const viewsA = parseViews(a.others.views);
    const viewsB = parseViews(b.others.views);
    return sortDescending ? viewsB - viewsA : viewsA - viewsB;
  });

  displayVideos(sorted);

  // toggle the sort order for next click
  sortDescending = !sortDescending;
}

const loadCategoryVideos = async (id) => {
  //   alert(id);
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        allVideos = data.category;
        // remove active class from btns
        removeActiveClass();
        // add active class to btn
        const activeBtn = document.getElementById(`btn-${id}`);
        // console.log(activeBtn);
        activeBtn.classList.add("active");

        displayVideos(allVideos);
      });
  } catch (error) {
    console.error("Error fetching categories!");
  }
};

loadCategories();

const categoriesContainer = document.getElementById("categories");

// Dsiplay Categories
const displayCategories = (data) => {
  for (const category of data) {
    // console.log(category);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button 
    id="btn-${category.category_id}" 
    onClick="loadCategoryVideos(${category.category_id})" 
    class="btn category-btn">
    ${category.category}
    </button>
    `;

    categoriesContainer.append(buttonContainer);
  }
};

// GETvIEWS
function parseViews(viewString) {
  if (!viewString) return 0;
  // Remove "K", trim spaces, and parse
  if (viewString.toUpperCase().includes("K")) {
    return parseFloat(viewString) * 1000;
  } else if (viewString.toUpperCase().includes("M")) {
    return parseFloat(viewString) * 1000000;
  }
  return parseFloat(viewString);
}

let allVideos = []; // store videos here

// GetVideos
const getVideos = async (searchText = "") => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
    )
      .then((res) => res.json())
      .then((data) => {
        allVideos = data.videos;
        displayVideos(allVideos);
      });
  } catch (error) {
    console.error("Error fetching videos!");
  }
};

const videoContainer = document.getElementById("videos-container");

// Convert Time

function timeAgo(timestamp) {
  if (!timestamp) return "";

  const now = Date.now();
  const posted = timestamp * 1000; // Convert seconds to ms
  const diff = now - posted;

  if (diff < 0) return "Just now"; // Future timestamps

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const displayDays = days > 0 ? `${days} days ` : "";
  const displayHours = hours % 24 > 0 ? `${hours % 24} hours ` : "";
  const displayMinutes = minutes % 60 > 0 ? `${minutes % 60} minutes ` : "";

  return `${displayDays}${displayHours}${displayMinutes}ago`.trim();
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  //   console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// Get details
const loadDetails = async (videoId) => {
  //   console.log(videoId);
  const url = fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  )
    .then((res) => res.json())
    .then((data) => displayDetails(data.video));
};

// Show details
const displayDetails = (video) => {
  //   console.log(video);
  const detailsContainer = document.getElementById("modal-content");

  detailsContainer.innerHTML = `
  <img
  src=${video.thumbnail}
  alt=${video.title}
  />
  <p class="text-lg font-bold py-2">${video.title}  <span class="text-xs">by ${video.authors[0].profile_name}</span></p>
  <p class="py-2">${video.description}</p>
  `;
  document.getElementById("customModal").showModal();
};

// Display Videos
const displayVideos = (data) => {
  videoContainer.innerHTML = "";

  if (data.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[400px] flex flex-col gap-5 justify-center items-center">
    <img
        class=""
        src="assets/icon.png"
        alt="Not found" />
    <h1 class="text-2xl font-bold">Oops!! Sorry, there is no content here.</h1>
    </div>
    
    `;
    return;
  }
  //   console.log(data);
  else {
    videoContainer.classList.add("grid");
  }
  for (const video of data) {
    // console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] relative">
        <img
        class="h-full w-full object-cover"
        src=${video.thumbnail}
        alt=${video.title} />

        <span class="absolute text-gray-300 text-xs right-2 bottom-2 bg-slate-950 shadow-lg rounded-md px-2"> ${
          video.others.posted_date ? timeAgo(video.others.posted_date) : ""
        }</span>
    </figure>
    <div class="px-0 py-2 flex gap-2">
        <div>
            <img
            class="w-10 h-10 rounded-full"
            class="h-full w-full object-cover"
            src=${video.authors[0].profile_picture}
            alt="" />
        </div>
        <div>
            <h2 class="text-xl font-bold">${video.title}</h2>
            <p class="text-sm text-gray-500 flex items-center gap-1">
            ${video.authors[0].profile_name} 
                <span>
                ${
                  video.authors[0].verified
                    ? `<img  width="14" height="14" src="https://img.icons8.com/color/48/verified-badge.png" alt="verified-badge"/>`
                    : ""
                }
                </span>
            </p>
            <p class="text-sm text-gray-500">${video.others.views}</p>
            <p class="text-sm text-gray-500">
                <button 
                    onClick="loadDetails('${video.video_id}')" 
                    class="btn btn-error btn-sm text-gray-100">
                    Details
                </button>
            </p>
        </div>
    </div>
    `;
    videoContainer.appendChild(card);
  }
};

// Get Search text
document.getElementById("search-input").addEventListener("keyup", (e) => {
  getVideos(e.target.value);
});

getVideos();
