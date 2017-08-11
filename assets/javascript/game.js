var wordList = ["abruptly","absurd","abyss","affix","askew","avenue","awkward","axiom","azure","bagpipes","bandwagon","banjo","bayou","beekeeper","bikini","blitz","blizzard","boggle","bookworm","boxcar","boxful","buckaroo","buffalo","buffoon","buxom","buzzard","buzzing","buzzwords","caliph","cobweb","cockiness","croquet","crypt","curacao","cycle","daiquiri","dirndl","disavow","dizzying","duplex","dwarves","embezzle","equip","espionage","euouae","exodus","faking","fishhook","fixable","fjord","flapjack","flopping","fluffiness","flyby","foxglove","frazzled","frizzled","fuchsia","funny","gabby","galaxy","galvanize","gazebo","giaour","gizmo","glowworm","glyph","gnarly","gnostic","gossip","grogginess","haiku","haphazard","hyphen","iatrogenic","icebox","injury","ivory","ivy","jackpot","jaundice","jawbreaker","jaywalk","jazziest","jazzy","jelly","jigsaw","jinx","jiujitsu","jockey","jogging","joking","jovial","joyful","juicy","jukebox","jumbo","kayak","kazoo","keyhole","khaki","kilobyte","kiosk","kitsch","kiwifruit","klutz","knapsack","larynx","lengths","lucky","luxury","lymph","marquis","matrix","megahertz","microwave","mnemonic","mystify","naphtha","nightclub","nowadays","numbskull","nymph","onyx","ovary","oxidize","oxygen","pajama","peekaboo","phlegm","pixel","pizazz","pneumonia","polka","pshaw","psyche","puppy","puzzling","quartz","queue","quips","quixotic","quiz","quizzes","quorum","razzmatazz","rhubarb","rhythm","rickshaw","schnapps","scratch","shiv","snazzy","sphinx","spritz","squawk","staff","strength","strengths","stretch","stronghold","stymied","subway","swivel","syndrome","thriftless","thumbscrew","topaz","transcript","transgress","transplant","triphthong","twelfth","twelfths","unknown","unworthy","unzip","uptown","vaporize","vixen","vodka","voodoo","vortex","voyeurism","walkway","waltz","wave","wavy","waxy","wellspring","wheezy","whiskey","whizzing","whomever","wimpy","witchcraft","wizard","woozy","wristwatch","wyvern","xylophone","yachtsman","yippee","yoked","youthful","yummy","zephyr","zigzag","zigzagging","zilch","zipper","zodiac","zombie"];
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var names = ['Slender Man','The Tall Man','The Thin Man','Der Schlanker Mann','Fear Dubh','Schlankwald','Slendy','Slenderman','The Pale One','The White King','Master','Black King']
var pages=0;
var wins= document.getElementById('Wins');
var currentWord =document.getElementById('Current-Word');
var lettersUsed =document.getElementById('Letters-Used');
var lives= document.getElementById('Lives');
var thePage=document.getElementById('The-Page')
var distance = 12;
wins.innerHTML = "<p> Pages Collected: " + pages + "</p>";
var gameBoard=[""];
var playedLetters =[];
setAnswer();
slendy();
function slendy()
{
	lives.innerHTML ="<p> Be careful " + names[Math.floor(Math.random() * names.length)] + " is only " + distance*10 + " feet away </p>";
}

function setAnswer()
{
	var Board='';
	answer=wordList[Math.floor(Math.random() * wordList.length)];
	for (var i = 0; i < answer.length; i++) {
		gameBoard[i]="-";
		Board = Board+ gameBoard[i]+' ';
	}
	currentWord.innerHTML = "<p>" + Board + "</p>";
	//return newAnswer;
}
function reset (didWin)
{
	gameBoard=[""];
	playedLetters=[];
	distance=12;
	if(didWin)
	{
		thePage.innerHTML = "<p> the page says " + answer + "</p>"
	}
	else
	{
		thePage.innerHTML = "<p> Slenderman got you, better luck next time</p>"
	}
	setAnswer();
	lettersUsed.innerHTML = ""
	slendy();

}
document.onkeyup = function(event) {
	var isGoodInput=false;
	var userGuess = event.key;
	var isInWord=false;
	var hasWon=true;
	var Board='';
	var lettersOutput='';
	for (var i = 0; i < alphabet.length; i++) {
		if(alphabet[i]===userGuess&&!isGoodInput)
		{
			isGoodInput=true;
		}
	}
	for (var i = 0; i < playedLetters.length; i++) {
		if(playedLetters[i]===userGuess&&isGoodInput)
		{
			isGoodInput=false;
		}
	}
	if (!isGoodInput)
	{
		return;
	}
	for (var i = 0; i < answer.length; i++)
	{
		if (answer.charAt(i)===userGuess)
		{
			isInWord=true;
			gameBoard[i]=userGuess;
		}
	}
	playedLetters[playedLetters.length]=userGuess;
	if (isInWord)
	{
		for (var i = 0; i < gameBoard.length; i++)
		{
	 		Board = Board+ gameBoard[i]+' ';
	 		if (gameBoard[i]==='-'&&hasWon)
		 	{
		 		hasWon=false;
	 		}
		}
		currentWord.innerHTML = "<p>" + Board + "</p>";

	}
	else
	{
		distance--;
		hasWon=false;
	}
	for (var i = 0; i < playedLetters.length; i++) {
		lettersOutput= lettersOutput+ playedLetters[i] + ' ';	
	}
	lettersUsed.innerHTML = "<p>" + lettersOutput + "</p>";
	slendy();
	if (hasWon)
	{
		pages++;
		wins.innerHTML = "<p> Pages Collected: " + pages + "</p>";
		reset(true);
	}
	if (distance===0)
	{
		reset(false);
	}
}
