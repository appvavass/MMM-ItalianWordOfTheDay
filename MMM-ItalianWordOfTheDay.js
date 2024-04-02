Module.register('MMM-ItalianWordOfTheDay', {
    // Default module config.
    defaults: {},

    // Define start sequence.
    start: function () {
        var self = this;

        // Schedule the initial update after 3 seconds
        setTimeout(function () {
            // Call the function to fetch data from the webpage
            self.updateContent();
            // Schedule subsequent updates every 8 hours
            setInterval(function () {
                self.updateContent();
            }, 8 * 60 * 60 * 1000); // 8 hours interval
        }, 3 * 1000); // 3 seconds delay for initial update
    },

    updateContent: function () {
    var self = this;
    // Call the function to fetch data from the webpage
    this.extractHeading50Content("https://dizionaripiu.zanichelli.it/cultura-e-attualita/le-parole-del-giorno/parola-del-giorno/")
        .then(data => {
            if (data && data.word) {
                // Store the fetched Italian word
                self.data.word = data.word;
                // Translate the Italian word to English
                self.translateWord(data.word);
            } else {
                // Set error message in module data
                self.data.error = 'Failed to fetch data.';
                self.updateDom(); // Update the module
            }
        })
        .catch(error => {
            // Set error message in module data
            self.data.error = error.message;
            self.updateDom(); // Update the module
        });
},

translateWord: function (italianWord) {
    var self = this;
    var apiUrl = "https://api.mymemory.translated.net/get?q=" + encodeURI(italianWord) + "&langpair=it|en";
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.responseData && data.responseData.translatedText) {
                // Update module with translated word
                self.data.translation = data.responseData.translatedText;
                self.updateDom(); // Update the module
            } else {
                throw new Error("Translation not found.");
            }
        })
        .catch(error => {
            // Set error message in module data
            self.data.error = error.message;
            self.updateDom(); // Update the module
        });
},


    extractHeading50Content: async function (url) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            const tree = new DOMParser().parseFromString(html, 'text/html');
            const heading50Elements = tree.querySelectorAll('h1.heading-50');
            if (heading50Elements.length > 0) {
                const word = heading50Elements[0].textContent.trim();
                return { word };
            } else {
                throw new Error("Content with class 'heading-50' not found on the page.");
            }
        } catch (error) {
            throw new Error("Failed to fetch the webpage: " + error.message);
        }
    },
    
    getHeader: function() {
        return "Italian Word of The Day"},
        
    // Override dom generator.
    getDom: function () {
    var wrapper = document.createElement('div');

    // Display fetched data or error message on the module
    if (this.data && this.data.word && this.data.translation) {
        var word = this.data.word;
        var translation = this.data.translation;
        var wordElement = document.createElement('div');
        var translationElement = document.createElement('div');
        wordElement.innerHTML = "Italian word: " + word;
        translationElement.innerHTML = "Translation: " + translation;
        wrapper.appendChild(wordElement);
        wrapper.appendChild(translationElement);
    } else if (this.data && this.data.error) {
        var errorElement = document.createElement('div');
        errorElement.innerHTML = 'Error: ' + this.data.error;
        wrapper.appendChild(errorElement);
    }

    return wrapper;
}

});
