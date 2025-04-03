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
        <div class="image-preview" data-src="${section.image}" data-alt="${section.title}">
          <button class="show-image">Show Image</button>
        </div>
      `;
  
      container.appendChild(sectionEl);
    });
  }
  

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-image")) {
    const container = e.target.parentElement;
    const imgSrc = container.dataset.src; 
    const imgAlt = container.dataset.alt;

    if (imgSrc) {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = imgAlt;

      container.innerHTML = ""; // Remove button & placeholder
      container.appendChild(img); // Add the image dynamically
    }
  }
});

