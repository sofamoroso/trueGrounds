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

// populate sections

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
            <div>
             <h2>${section.title}</h2>
             <p class="section-label">${section.label}</p></div>
            </div>

          <p>${section.text}</p>
        </div>
        <div class="image-preview" data-src="${section.image}" data-alt="${section.title}">
          <button class="show-image">Show Image</button>
        </div>
      `;
  
      container.appendChild(sectionEl);
    });
  }
  

  // show image button
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

//form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");

  //Set validation rules for each of the fields
  const fields = [
    {
      input: form.fullname,
      errorId: "error-fullname",
      validate: (value) => value.trim() !== "", //Checks that is not empty
    },
    {
      input: form.email,
      errorId: "error-email",
      validate: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), //Reggex
    },
    {
      input: form.consent,
      errorId: "error-consent",
      validate: () => form.consent.checked, //Check that it is cheked
    },
  ];

 
  function validateField({ input, errorId, validate }) {
    const errorElement = document.getElementById(errorId);
    const isValid = validate(input.type === "checkbox" ? null : input.value);

    if (!isValid) {
      input.setAttribute("aria-invalid", "true"); //Adds "aria-invalid" for screen readers
      errorElement.classList.add("visible"); //Show error message
    } else {
      input.removeAttribute("aria-invalid"); 
      errorElement.classList.remove("visible");
    }

    return isValid; // Return "true" if valid, "false" otherwise
  }


  function validateFormLive() {
    const allValid = fields.every(validateField); //Checks if all fields are valid
    submitButton.disabled = !allValid; //Button disabled if not all fields are valid
  }

  //Real time validation
  fields.forEach((field) =>{
    const{input} = field;
     const eventType = input.type === "checkbox" ? "change" : "input";
     input.addEventListener(eventType, validateFormLive);

     input.addEventListener("blur", () => validateField(field)); //Show error on leaving the field
  })

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let allValid = true;
    fields.forEach((field) => {
      const isFieldValid = validateField(field);
      if (!isFieldValid) allValid = false; //Set allValid t false if an input check fails
    });

    if (allValid) {
      alert("Form submitted successfully!");
      form.reset();
      submitButton.disabled = true; // Disable again after reset
    }
  });

  submitButton.disabled = true;
});