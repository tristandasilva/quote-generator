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
    const apiKey = 'fvZyELNZcvbZv6KMV1dDOQ==avTGS55qghhnIWhr';
    const apiURL = 'https://api.api-ninjas.com/v1/quotes';
    try {
        const response = await fetch(apiURL, {
            headers: {'X-Api-Key': apiKey  }
        })
        const data = await response.json()
        console.log(data)
        // Replacing Blank Author With Unknown
        if (data[0].author === '') {
            authorText.innerText = '- Unknown';
        } else {
            authorText.innerText = '- ' + data[0].author;
        }

        // Reduce Font Size On Larger Quotes
        if (data[0].quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data[0].quote;
        
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