const quoteContainer = document.getElementById('quote-container'),
      quoteText      = document.getElementById('quote'),
      authorText     = document.getElementById('author'),
      twitterBtn     = document.getElementById('twitter'),
      quoteBtn       = document.getElementById('new-quote'),
      loader         = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Retrieving Quote From API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://guarded-beach-38805.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // Replacing Blank Author With Unknown
        if (data.quoteAuthor === '') {
            authorText.innerText = '- Unknown';
        } else {
            authorText.innerText = '- ' + data.quoteAuthor;
        }

        // Reduce Font Size On Larger Quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        
        // Quote And Author Loaded
        removeLoadingSpinner();
    } catch(err) {
        getQuote();
    }
}
 
// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText,
          author = authorText.innerText,
          twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ${author}`;
    window.open(twitterUrl, '_blank');
}

quoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();