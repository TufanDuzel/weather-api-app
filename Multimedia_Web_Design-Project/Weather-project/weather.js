
document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city === "") {
    alert("Enter a city...");
    return;
  }

  const apiKey = "9aefcf77029417f3e42fdbdf81980c26";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City Error!");
      }
      return response.json();
    })
    .then(data => {
      const resultDiv = document.getElementById('weatherResult');
      resultDiv.innerHTML = `
  <h3>${data.name}, ${data.sys.country}</h3>
  <p>Temperature: ${data.main.temp}°C</p>
  <p>Weather: ${data.weather[0].description}</p>
  <p>Humidity: ${data.main.humidity}%</p>
  <p>Wind Speed: ${data.wind.speed} m/s</p>
`;

    })
    .catch(error => {
      alert(error.message);
    });
});

document.getElementById("navHome").addEventListener("click", () => {
  document.getElementById("searchSection").style.display = "block";
  document.getElementById("weatherResult").style.display = "block";
  document.getElementById("aboutSection").style.display = "none";
  document.getElementById("contactSection").style.display = "none";
  document.getElementById("feedbackSection").style.display = "none";
});
document.getElementById("navAbout").addEventListener("click", () => {
  document.getElementById("searchSection").style.display = "none";
  document.getElementById("weatherResult").style.display = "none";
  document.getElementById("aboutSection").style.display = "block";
  document.getElementById("contactSection").style.display = "none";
  document.getElementById("feedbackSection").style.display = "none";
});
document.getElementById("navContact").addEventListener("click", () => {
  document.getElementById("searchSection").style.display = "none";
  document.getElementById("weatherResult").style.display = "none";
  document.getElementById("aboutSection").style.display = "none";
  document.getElementById("contactSection").style.display = "block";
  document.getElementById("feedbackSection").style.display = "block";
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = this.querySelectorAll("input, textarea");
  let valid = true;
  let message = "";

  inputs.forEach((field) => {
    const value = field.value.trim();

    if (value === "") {
      valid = false;
      message = "Please fill in all fields.";
    }

    if (field.type === "email") {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(value)) {
        valid = false;
        message = "Enter a valid email address.";
      }
    }

    if (field.tagName === "TEXTAREA" && value.length < 10) {
      valid = false;
      message = "Your message must be at least 10 characters.";
    }
  });

  if (!valid) {
    alert(message);
  } else {
    alert("Your message has been sent successfully. Thank you.!");
    this.reset();
  }
});

document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("feedbackName").value.trim();
  const message = document.getElementById("feedbackMessage").value.trim();

  if (name === "" || message === "") {
    alert("Please enter your name and comment.");
    return;
  }

  const feedbackList = document.getElementById("feedbackList");

  const newFeedback = document.createElement("div");
  newFeedback.classList.add("feedback-item");
  newFeedback.innerHTML = `<strong>${name}</strong><p>${message}</p>`;

  feedbackList.prepend(newFeedback);

  this.reset();
});
// Rain Effect - create falling drops
function createRain() {
  const rainContainer = document.querySelector('.rain');
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.animationDuration = `${0.5 + Math.random()}s`;
    drop.style.opacity = Math.random();
    rainContainer.appendChild(drop);
  }
}

createRain();
