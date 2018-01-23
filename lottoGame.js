/*
 * Jorge L Lopez
 * lottoGame.js for generating a random Lotto number
 * Created: 01/20/2018
 * Updated: 01/20/2018
 * Version: 1.0
 */
const C_topLottoNumbers = [27, 7, 21, 11, 8, 16, 15, 6, 10, 2, 42, 20, 26, 33, 37, 34, 19,
	9, 28, 13, 4, 44, 24, 38, 43, 47, 30, 31, 5, 36]; //top 30 numbers
const C_extraShot = [3, 23, 10, 25, 15, 2, 20, 24, 4, 19, 13]; //Picked 7 times of more.
const C_topLuckyDayNumbers = [24, 2, 27, 22, 14, 45, 9, 40, 33, 1, 18, 30, 13, 7, 20, 23,
	36, 28, 41, 10, 32, 3, 35, 37, 12, 8, 26]; //top 27

function getLuckyLottoNumbers (lottoCeiling, ticketSize, lottoGame) {
	//Get an array of lottery Numbers
	let numArray = [];
	let numStart = 0;
	let numEnd = 0;
	for (let a = 0; a < ticketSize; a++) {
		if (a < 1) {
			numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, false);
		} else if (a < 4) {
			let numStart = 4;
			let numEnd = 26;
			numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, true);
		} else {
			let numStart = 0;
			let numEnd = 13;
				numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, true);
		}
	}
	
	return numArray;
}

function getLottoNumbers (lottoCeiling, ticketSize, lottoGame) {
	//Get an array of lottery Numbers
	let numArray = [];
	let numStart = 0;
	let numEnd = 0;
	for (let a = 0; a < ticketSize; a++) {
		if (a < 1) {
			numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, false);
		} else if (a < 5) {
			let numStart = 4;
			let numEnd = 29; //19 was better
			for (let b = 0; b < 2; b++){
				numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, true);
			}
		} else {
			let numStart = 0;
			let numEnd = 14;
			for (let b = 0; b < 2; b++){
				numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, true);
			}
		}
	}
	
	return numArray;
}

function getExtraShot (lottoCeiling, ticketSize, lottoGame) {
	//Get an array of lottery Numbers
	let num = 0;
	let numStart = 0;
	let numEnd = 5;
	for (let b = 0; b < numEnd; b++) {
		num = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, true);
	}


	return num;
}


function getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, firstThree) {
	//Get and individual lottery Number for the array
	let num = 0;
	let found = false;

	if (firstThree) {
		do {
			num = Math.floor((Math.random() * lottoCeiling) + 1);
			for (let a = numStart; a <= numEnd; a++) {
				if (num === lottoGame[a]) {
					found = true;
				}
			}
		} while (!found);
	} else {
		for (let i = 0; i < 3; i++) {
			num = Math.floor((Math.random() * lottoCeiling) + 1);
			
		}
	}
	return num;
} //end get LottoNumberGenerator Number

function findDuplicateNumber(numArray, lottoCeiling, lottoGameNumSet, ticketSize, game) {
	let newNumArr = numArray;
	
	if (game === "lucky"){
		console.log("Lucky Day Duplicate Check");
		for (let a = 0; a < ticketSize; a++) {
			for (let b = a + 1 ; b <= (ticketSize-1); b++) {
				if (numArray[a] === numArray[b]) {
					console.log('Lucky Day duplicate found');
					newNumArr[b] = getLottoNumber(lottoCeiling, 0, 19, lottoGameNumSet, false);
				} else {
					console.log('Luck Day duplicate not found')
				}
			}
		}
	} else {
		for (let a = 0; a < ticketSize; a++) {
			for (let b = a + 1; b <= (ticketSize - 1); b++) {
				if (numArray[a] === numArray[b]) {
					console.log('Lotto duplicate found');
					newNumArr[b] = getLottoNumber(lottoCeiling, 0, 29, lottoGameNumSet, true);
				} else {
					console.log('Lotto duplicate not found')
				}
			}
		}
	}
	
	return newNumArr;
}


function LottoDraw(lottoCeiling, ticketSize, lottoGame) {
	//Main function for the LottoNumberGenerator Draw object
	this.lottoCeiling = lottoCeiling;
	this.ticketSize = ticketSize;
	this.lottoGame = lottoGame;
	this.setLucky = function setLucky () {
		let numberArray = getLuckyLottoNumbers(lottoCeiling, ticketSize, C_topLuckyDayNumbers);
		numberArray.sort(function(a, b){return a + b}); //sort in reverse order
		numberArray = findDuplicateNumber(numberArray, lottoCeiling, C_topLuckyDayNumbers, ticketSize, "lucky");
		
		//find Duplicate loop. (Can't be too careful)
		numberArray.sort(function(a, b){return a - b}); //sort in order
		
		//assign values manually. For now...
		this.num0 = numberArray[0];
		this.num1 = numberArray[1];
		this.num2 = numberArray[2];
		this.num3 = numberArray[3];
		this.num4 = numberArray[4];
	};
	
	this.setLotto = function setLotto () {
		let numberArray = getLottoNumbers(lottoCeiling, ticketSize, C_topLottoNumbers);
		numberArray.sort(function (a, b) {
			return a + b
		});
		numberArray = findDuplicateNumber(numberArray, lottoCeiling, C_topLottoNumbers, ticketSize);
		
		//find Duplicate loop. (Can't be too careful)
		numberArray.sort(function (a, b) {
			return a - b
		});
		
		//assign values manually. For now...
		this.num0 = numberArray[0];
		this.num1 = numberArray[1];
		this.num2 = numberArray[2];
		this.num3 = numberArray[3];
		this.num4 = numberArray[4];
		this.num5 = numberArray[5];
		this.extraShot = getExtraShot(25, 1, C_extraShot);
		this.displayLotto = function displayLotto() {
		};
		
	}
}