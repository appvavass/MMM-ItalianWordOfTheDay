// modules/translated-word/translated-word.js

Module.register('translated-word', {
	word: '',
  
	start: function() {
	  // Make an AJAX request to retrieve the translated word
	  this.getTranslatedWord();
	  // Refresh the word every 30 seconds
	  setInterval(() => {
		this.getTranslatedWord();
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
	  wrapper.className = 'translated-word';
	  wrapper.innerHTML = this.word;
	  return wrapper;
	}
  });
  