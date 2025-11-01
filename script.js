const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');

async function fetchQuote() {
  quoteText.style.opacity = 0;
  authorText.style.opacity = 0;

  try {
    const response = await fetch('http://localhost:3000/quote');
    const data = await response.json();

    quoteText.innerText = `"${data.content}"`;
    authorText.innerText = `– ${data.author}`;

    setTimeout(() => {
      quoteText.style.opacity = 1;
      authorText.style.opacity = 1;
    }, 100);
  } catch (error) {
    quoteText.innerText = "⚠️ Unable to fetch quote. Try again.";
    authorText.innerText = "";
  }
}

// Fetch new quote on button click
newQuoteBtn.addEventListener('click', fetchQuote);

// Tweet the current quote
tweetBtn.addEventListener('click', () => {
  const text = `${quoteText.innerText} ${authorText.innerText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(twitterUrl, '_blank');
});

// Fetch a quote on page load
fetchQuote();
