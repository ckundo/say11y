chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var welcomeEl = document.querySelector("h1");

      if (welcomeEl) {
        chrome.extension.sendMessage({"speak": welcomeEl.textContent});
      }

      var linkEls = document.querySelectorAll("a");
      var headingEls = document.querySelectorAll("h2");
      var searchEl = document.querySelector("input[type='search']");
      searchEl = searchEl || document.querySelector("input[id^='search']");
      searchEl = searchEl || document.querySelector("input[class^='search']");
      searchEl = searchEl || document.querySelector("input[name^='search']");
      searchEl = searchEl || document.querySelector("input[value^='search']");
      searchEl = searchEl || document.querySelector("input[aria-label^='search']");
      searchEl = searchEl || document.querySelector("input[aria-label^='Search']");

      var search = "search for";
      var help = "help";
      var topics = /topics|headings/;

      var recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.start();

      recognition.onresult = function(event) {
        var utterance = event.results[event.results.length - 1][0].transcript;

        if (utterance.match(search)) {
          var query = utterance.slice(search.length + 1);

          searchEl.value = query;
          searchEl.closest("form").submit();
        } else if (utterance.match(topics)) {
          chrome.extension.sendMessage({"speak": headings});
        }
      };
    }
  }, 10);
});
