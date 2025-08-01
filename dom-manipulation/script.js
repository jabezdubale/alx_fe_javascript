let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
const downloadQuotes = document.getElementById("exportQuotes");
const categoryFilter = document.getElementById("categoryFilter");

window.addEventListener("DOMContentLoaded", () => {
  setInterval(fetchQuotesFromServer, 100000);
});
showQuoteButton.addEventListener("click", showRandomQuote);
downloadQuotes.addEventListener("click", exportJson);

fetchQuotesFromServer();

function fakeFetch() {
  fetch("https://jsonplaceholder.typicode.com/posts");
}
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("http://localhost:3000/quotes");
    if (!response.ok) {
      throw new Error("response status: " + response.status);
    }
    const data = await response.json();
    const isDataSame = dataSimilarityChecker(data);
    if (isDataSame === true) {
      populateCategories();
    } else {
      const syncQuotes = confirm(
        "Fetched quotes and your quotes are not similar. Do you want to make them similar?"
      );
      if (syncQuotes) {
        quotes = data;
        localStorage.setItem("quotes", JSON.stringify(quotes));
        populateCategories();
        alert("Quotes synced with server!");
      }
    }
  } catch (error) {
    console.error("Error: ", error.message);
  }
}
function dataSimilarityChecker(data) {
  let checker = true;
  if (data.length !== quotes.length) return false;
  data.forEach((e, i) => {
    if (JSON.stringify(quotes[i]) !== JSON.stringify(e)) checker = false;
  });
  return checker;
}
async function poster(data) {
  try {
    const response = await fetch("http://localhost:3000/quotes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error: ", error.message);
  }
}
function populateCategories() {
  const selectedCategory = localStorage.getItem("selectedCategory");
  const allCategories = quotes.map((e) => e.category);
  const filteredArray = allCategories.filter((v, i, a) => {
    return a.indexOf(v) === i;
  });
  filteredArray.forEach((e) => {
    const option = document.createElement("option");
    option.value = e;
    option.textContent = e;
    categoryFilter.append(option);
  });
  if (selectedCategory) {
    categoryFilter.value = selectedCategory;
  } else {
    categoryFilter.value = "all";
  }
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuote();
}
function showRandomQuote() {
  const selectedCategory = localStorage.getItem("selectedCategory");

  let filtred;
  if (!selectedCategory || selectedCategory === "all") {
    filtred = quotes;
  } else {
    filtred = quotes.filter((e) => {
      return e.category === selectedCategory;
    });
  }
  quoteDisplay.innerHTML = "";
  if (quotes.length === 0) {
    const showError = document.createElement("p");
    showError.innerText =
      "Please add a quote or import a .json file that have quotes";
    quoteDisplay.append(showError);
  } else {
    const quoteParagraph = document.createElement("p");
    const catagoryParagraph = document.createElement("p");
    const randomNumber = Math.floor(Math.random() * filtred.length);
    quoteParagraph.textContent = "Quote: " + filtred[randomNumber].quote;
    catagoryParagraph.textContent =
      "Category: " + filtred[randomNumber].category;
    quoteDisplay.append(quoteParagraph);
    quoteDisplay.append(catagoryParagraph);
  }
  const formContainer = document.getElementById("formContainer");
  if (!formContainer) createAddQuoteForm();
}
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.setAttribute("id", "formContainer");
  const quoteRequest = document.createElement("input");
  quoteRequest.setAttribute("id", "newQuoteText");
  quoteRequest.setAttribute("type", "text");
  quoteRequest.setAttribute("placeholder", "Enter a new quote");
  const catagoryRequest = document.createElement("input");
  catagoryRequest.setAttribute("id", "newQuoteCategory");
  catagoryRequest.setAttribute("type", "text");
  catagoryRequest.setAttribute("placeholder", "Enter quote category");
  const addNewQuoteButton = document.createElement("button");
  addNewQuoteButton.innerText = "Add Quote";
  addNewQuoteButton.setAttribute("onclick", "addQuote()");
  const breaker = document.createElement("br");
  formContainer.append(breaker);
  formContainer.append(quoteRequest);
  formContainer.append(catagoryRequest);
  formContainer.append(addNewQuoteButton);
  document.body.appendChild(formContainer);
}

function addQuote() {
  const quoteRequest = document.getElementById("newQuoteText");
  const catagoryRequest = document.getElementById("newQuoteCategory");
  const quoteObject = {
    quote: quoteRequest.value,
    category: catagoryRequest.value,
  };
  quotes.push(quoteObject);
  localStorage.setItem("quotes", JSON.stringify(quotes));
  poster(quoteObject);
  quoteRequest.value = "";
  catagoryRequest.value = "";
  populateCategories();
}

function exportJson() {
  const anchor = document.createElement("a");
  const blobFile = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const blobUrl = URL.createObjectURL(blobFile);
  anchor.href = blobUrl;
  anchor.setAttribute("download", "JsonFile.json");
  anchor.click();
  URL.revokeObjectURL(blobUrl);
}

function importFromJsonFile(event) {
  const file = event.target.files[0];
  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(file);
  event.target.value = "";
}

//work on last viewed session storage
