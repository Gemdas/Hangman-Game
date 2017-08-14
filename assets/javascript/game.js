var wordList = ["abruptly","absurd","abyss","affix","askew","avenue","awkward","axiom","azure","bagpipes","bandwagon","banjo","bayou","beekeeper","bikini","blitz","blizzard","boggle","bookworm","boxcar","boxful","buckaroo","buffalo","buffoon","buxom","buzzard","buzzing","buzzwords","caliph","cobweb","cockiness","croquet","crypt","curacao","cycle","daiquiri","dirndl","disavow","dizzying","duplex","dwarves","embezzle","equip","espionage","euouae","exodus","faking","fishhook","fixable","fjord","flapjack","flopping","fluffiness","flyby","foxglove","frazzled","frizzled","fuchsia","funny","gabby","galaxy","galvanize","gazebo","giaour","gizmo","glowworm","glyph","gnarly","gnostic","gossip","grogginess","haiku","haphazard","hyphen","iatrogenic","icebox","injury","ivory","ivy","jackpot","jaundice","jawbreaker","jaywalk","jazziest","jazzy","jelly","jigsaw","jinx","jiujitsu","jockey","jogging","joking","jovial","joyful","juicy","jukebox","jumbo","kayak","kazoo","keyhole","khaki","kilobyte","kiosk","kitsch","kiwifruit","klutz","knapsack","larynx","lengths","lucky","luxury","lymph","marquis","matrix","megahertz","microwave","mnemonic","mystify","naphtha","nightclub","nowadays","numbskull","nymph","onyx","ovary","oxidize","oxygen","pajama","peekaboo","phlegm","pixel","pizazz","pneumonia","polka","pshaw","psyche","puppy","puzzling","quartz","queue","quips","quixotic","quiz","quizzes","quorum","razzmatazz","rhubarb","rhythm","rickshaw","schnapps","scratch","shiv","snazzy","sphinx","spritz","squawk","staff","strength","strengths","stretch","stronghold","stymied","subway","swivel","syndrome","thriftless","thumbscrew","topaz","transcript","transgress","transplant","triphthong","twelfth","twelfths","unknown","unworthy","unzip","uptown","vaporize","vixen","vodka","voodoo","vortex","voyeurism","walkway","waltz","wave","wavy","waxy","wellspring","wheezy","whiskey","whizzing","whomever","wimpy","witchcraft","wizard","woozy","wristwatch","wyvern","xylophone","yachtsman","yippee","yoked","youthful","yummy","zephyr","zigzag","zigzagging","zilch","zipper","zodiac","zombie"];
var hasWordUsed = [];
var names = ['Slender Man','The Tall Man','The Thin Man','Der Schlanker Mann','Fear Dubh','Schlankwald','Slendy','Slenderman','The Pale One','The White King','Master',' The Black King']
var pages=0;
var wins= document.getElementById('Wins');
var currentWord =document.getElementById('Current-Word');
var lettersUsed =document.getElementById('Letters-Used');
var lives= document.getElementById('Lives');
var thePage=document.getElementById('The-Page');
var slenderman=document.getElementById('Slenderman');
var distance = 80;
wins.innerHTML = "<p>You've collected " + pages + " of the eight pages</p>";
slenderman.innerHTML= '<img class="resize" src="assets/images/Slenderman.png">';
var gameBoard=[""];
var playedLetters =[];
for (var i = 0; i < wordList.length; i++) {
	hasWordUsed.push(false);
}
setAnswer();
slendy();
function slendy()
{
	lives.innerHTML ="<p> Be careful " + names[Math.floor(Math.random() * names.length)] + " is only " + distance*10 + " feet away </p>";
}

function setAnswer()
{
	var Board='';
	var random=0;
	var tempTrue=true;
	while(hasWordUsed[random]||tempTrue)
	{
		random=Math.floor(Math.random() * wordList.length);
		answer=wordList[random];
		tempTrue=false;
	}
	for (var i = 0; i < answer.length; i++) {
		gameBoard[i]="-";
		Board = Board+ gameBoard[i]+' ';
	}
	currentWord.innerHTML = "<p>" + Board + "</p>";
}
function reset (didWin)
{
	gameBoard=[""];
	playedLetters=[];
	//distance=12;
	if(didWin)
	{
		pages++;
		if (pages<8)
		{
			wins.innerHTML = "<p>You've collected " + pages + " of the eight pages</p>";
		}
		else
		{
			slenderman.innerHTML= '<a href="https://www.youtube.com/watch?v=yaoZ8lG-Ehs"> <img class="resize" src="assets/images/Slenderman.png"> </a>';
			wins.innerHTML = "<p>You've collected " + pages + " of the eight pages. You can now use your dagger to fight Slenderman, but how?</p>";
		}
		
		thePage.innerHTML = "<p>The page says " + answer + "</p>"
	}
	else
	{
		pages=0;
		wins.innerHTML = "<p>You've collected " + pages + " of the eight pages</p>";
		distance=80;
		thePage.innerHTML = "<p>Slenderman got you, better luck next time</p>"
		slenderman.innerHTML= '<img class="resize" src="assets/images/Slenderman.png">';
	}
	setAnswer();
	lettersUsed.innerHTML = ""
	slendy();
}
document.onkeyup = function(event) 
{
	var isGoodInput=false;
	var userGuess = event.key;
	var isInWord=false;
	var hasWon=true;
	var Board='';
	var lettersOutput='';
	if(userGuess.charCodeAt(0)<=122&&userGuess.charCodeAt(0)>=97)
	{
		isGoodInput=true;
	}
	for (var i = 0; i < playedLetters.length; i++) {
		if(isGoodInput&&playedLetters[i]===userGuess)
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
	playedLetters.push(userGuess);
	playedLetters.sort();
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
		reset(true);
	}
	if (distance===0)
	{
		reset(false);
	}
}