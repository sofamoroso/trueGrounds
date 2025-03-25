// Get the <html> element (not body!)
const html = document.documentElement;

// Buttons
const ecoBtn = document.getElementById("ecoMode");
const normalBtn = document.getElementById("normalMode");

// Apply Eco Theme
ecoBtn.addEventListener("click", () => {
  html.classList.remove("normal");
  html.classList.add("eco");
});

// Apply Normal Theme
normalBtn.addEventListener("click", () => {
  html.classList.remove("eco");
  html.classList.add("normal");
});

fetch("sections.json")
  .then((res) => res.json())
  .then((sectionData) => renderSections(sectionData));

function renderSections(data) {
  const container = document.getElementById("sections-container");

  data.forEach((section, i) => {
    const sectionEl = document.createElement("section");
    sectionEl.classList.add("info-section");
    sectionEl.innerHTML = `
    <div class="text-content">
      <div class="section-heading">
        <img src="${section.icon}" alt="Icon ${i + 1}" class="section-icon" />
        <h2>${section.title}</h2>
      </div>
      <p class="section-label">${section.label}</p>
      <p>${section.text}</p>
    </div>
    <div class="image-preview">
      <button class="show-image">See More</button>
      <img class="lazy-image" data-src="${section.image}" alt="${section.title}" loading="lazy" />
    </div>
  `;

    container.appendChild(sectionEl);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-image")) {
    const img = e.target.nextElementSibling;
    if (img && img.dataset.src) {
      img.src = img.dataset.src;
      img.style.display = "block";
    }
  }
});
