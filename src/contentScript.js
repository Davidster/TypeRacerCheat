/*
David Huculak, February 2017

This is a content script which runs in a chrome extension on the Type Racer website.

It will try to find the word needed to be typed by the user,
fill the input area with this word, and wait for the user to press space
(this part could not be easily simulated unfortunately)

Note that while this will allow you to easily score 250+ WPM, the site will
call you a cheater and make you type a CAPTCHA, which this code does not solve.

*/


// if we fail to find the current word
// that the user needs to type, wait 1000ms and try again
let timeout = 1000;

// find the next word the user needs to type then fill the input panel
function locateNextWord() {
	setTimeout(() =>{

		// pull the current word from the page via JQuery
		var $currentWord = $(".nonHideableWords span:nth-of-type(2)");
		var currentWordString = $currentWord.html() + $(".nonHideableWords span:nth-of-type(3)").html();

		// if we found a word, fill input panel, otherwise try again
		if($currentWord.length > 0){
			fillInputPanel(currentWordString);
			timeout = 0;
		} else {
			locateNextWord();
		}

	}, timeout);
}

// fill input panel with a given word via JQuery
function fillInputPanel(currentWordString){
	  $(".inputPanel .txtInput").val(currentWordString);
}

// every time the user presses space, call locateNextWord() again
$('body').keyup(e => {
   if(e.keyCode == 32){
       locateNextWord();
   }
});

locateNextWord();
