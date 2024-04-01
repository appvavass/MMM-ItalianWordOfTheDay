Module.register('MMM-ItalianWordOfTheDay', {
    initialWord: 'ciaone',
    word: 'ciaone',
  
    start: function() {
        var self = this;
        // Update the DOM initially with the initial word
        this.updateDom();
        // Make an AJAX request to retrieve the translated word
        this.getTranslatedWord();
        // Refresh the word every 30 seconds
        setInterval(() => {
            self.getTranslatedWord();
        }, 30000);
    },
  
    getTranslatedWord: function() {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'query.py', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                self.word = response.word;
                self.updateDom();
            }
        };
        xhr.send();
    },
  
    getDom: function() {
        const wrapper = document.createElement('div');
        wrapper.className = 'MMM-ItalianWordOfTheDay';
        wrapper.innerHTML = "Initial Word: " + this.initialWord + "<br>New Word: " + this.word;
        return wrapper;
    }
});
