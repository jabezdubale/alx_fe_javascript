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

showQuoteButton.addEventListener("click", displayRandomQuote);

function displayRandomQuote() {
  quoteDisplay.innerHTML = "";
  const quoteParagraph = document.createElement("p");
  const catagoryParagraph = document.createElement("p");
  const randomNumber = Math.floor(Math.random() * quotes.length);
  quoteParagraph.textContent = "Quote: " + quotes[randomNumber].quote;
  catagoryParagraph.textContent = "Catagory: " + quotes[randomNumber].category;
  quoteDisplay.append(quoteParagraph);
  quoteDisplay.append(catagoryParagraph);
}
