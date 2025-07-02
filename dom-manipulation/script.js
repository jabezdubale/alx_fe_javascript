const quotes = [
  {
    quote: "quote 1",
    category: "catagory 1",
  },
  {
    quote: "quote 2",
    category: "catagory 2",
  },
  {
    quote: "quote 3",
    category: "catagory 3",
  },
  {
    quote: "quote 4",
    category: "catagory 1",
  },
  {
    quote: "quote 5",
    category: "catagory 2",
  },
  {
    quote: "quote 6",
    category: "catagory 3",
  },
  {
    quote: "quote 7",
    category: "catagory 1",
  },
  {
    quote: "quote 8",
    category: "catagory 2",
  },
];
const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
showQuoteButton.addEventListener("click", showRandomQuote);

function showRandomQuote() {
  quoteDisplay.innerHTML = "";
  const quoteParagraph = document.createElement("p");
  const catagoryParagraph = document.createElement("p");
  const randomNumber = Math.floor(Math.random() * quotes.length);
  quoteParagraph.textContent = "Quote: " + quotes[randomNumber].quote;
  catagoryParagraph.textContent = "Catagory: " + quotes[randomNumber].category;
  quoteDisplay.append(quoteParagraph);
  quoteDisplay.append(catagoryParagraph);
  createAddQuoteForm();
}
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
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
  formContainer.append(quoteRequest);
  formContainer.append(catagoryRequest);
  formContainer.append(addNewQuoteButton);
  document.body.append(formContainer);
}
