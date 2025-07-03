const quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    quote: "",
    category: "",
  },
];
const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
const downloadQuotes = document.getElementById("exportQuotes");

showQuoteButton.addEventListener("click", showRandomQuote);
downloadQuotes.addEventListener("click", exportJson);

function showRandomQuote() {
  quoteDisplay.innerHTML = "";
  const quoteParagraph = document.createElement("p");
  const catagoryParagraph = document.createElement("p");
  const randomNumber = Math.floor(Math.random() * quotes.length);
  quoteParagraph.textContent = "Quote: " + quotes[randomNumber].quote;
  catagoryParagraph.textContent = "Category: " + quotes[randomNumber].category;
  quoteDisplay.append(quoteParagraph);
  quoteDisplay.append(catagoryParagraph);
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
  quoteRequest.value = "";
  catagoryRequest.value = "";
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

//work on last viewed session storage
