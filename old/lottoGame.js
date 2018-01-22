/*
 * Jorge L Lopez
 * lottoGame.js for generating a random Lotto number
 * Created: 01/20/2018
 * Updated: 01/20/2018
 * Version: 1.0
 */

const topLottoNumbers = [27, 11, 7, 21, 15, 16, 8, 2, 20, 6, 42, 10, 26, 37, 34, 19, 33, 9, 44, 13, 4, 28, 43, 24, 28, 47, 30, 31];
const extraShot = [3, 23, 10, 25, 15, 2, 20, 24];
const topLuckyDayNumbers = [2, 24, 27, 22, 14, 45, 9, 40, 33, 1, 18, 30, 13, 7, 20, 25, 23, 36, 41, 28, 10, 32, 3, 35, 12, 4, 5];

function getLuckyLottoNumbers (lottoCeiling, ticketSize, lottoGame) {
	//Get an array of lottery Numbers
	let numArray = [];
	let numStart = 0;
	let numEnd = 0;
	for (let a = 0; a < ticketSize; a++) {
		if (a < 1) {
			numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, false);
		} if (a < 4) {
			let numStart = 7;
			let numEnd = 24;
			numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, true);
		} else {
			let numStart = 0;
			let numEnd = 9;
			numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, true);
		}
	}
	
	return numArray;
}

function getLottoNumbers (lottoCeiling, ticketSize, lottoGame) {
	//Get an array of lottery Numbers
	let numArray = [];
	for (let a = 0; a < ticketSize; a++) {
		if (a < 2) {
			let numStart = 0;
			let numEnd = 10;
			for (let b = 0; b < 1; b++) {
				numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, true);
			}
		} else if (a < 4) {
			let numStart = 5;
			let numEnd = 15;
			for (let b = 0; b < numStart; b++){
				numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, true);
			}
		} else {
			let numStart = 10;
			let numEnd = 29;
			for (let b = 0; b < numStart; b++){
				numArray[a] = getLottoNumber(lottoCeiling, numStart, numEnd, lottoGame, false);
			}
		}
	}
	
	return numArray;
}

function getExtraShot (lottoCeiling, ticketSize, lottoGame) {
	//Get an array of lottery Numbers
	let num = 0;
	let numStart = 0;
	let numEnd = 7;
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
					newNumArr[b] = getLottoNumber(lottoCeiling, 0, 9, lottoGameNumSet, false);
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
					if (b < 2) {
						newNumArr[b] = getLottoNumber(lottoCeiling, 0, 12, lottoGameNumSet, true);
					} else {
						newNumArr[b] = getLottoNumber(lottoCeiling, 8, 29, lottoGameNumSet, false);
					}
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
	if (lottoGame === "lucky") {
		let numberArray = getLuckyLottoNumbers(lottoCeiling, ticketSize, topLuckyDayNumbers);
		
		for (let i = 0; i < 2; i++){
			numberArray = getLuckyLottoNumbers(lottoCeiling, ticketSize, topLuckyDayNumbers);
		}//End random number generator at the Array level. (Can't be too picky)
		
		numberArray = findDuplicateNumber(numberArray, lottoCeiling, topLuckyDayNumbers, ticketSize, "lucky");
		//End find Duplicate loop. (Can't be too careful)
		
		numberArray.sort(function(a, b){return a + b}); //sort in reverse order
		numberArray = findDuplicateNumber(numberArray, lottoCeiling, topLuckyDayNumbers, ticketSize); //check for duplicate one more time
		numberArray.sort(function(a, b){return a - b}); //sort in order
		
		//assign values manually. For now...
		this.num0 = numberArray[0];
		this.num1 = numberArray[1];
		this.num2 = numberArray[2];
		this.num3 = numberArray[3];
		this.num4 = numberArray[4];
	} else if (lottoGame === "illinois") {
		let numberArray = getLottoNumbers(lottoCeiling, ticketSize, topLottoNumbers);
		
		for (let i = 0; i < 2; i++){
			numberArray = getLottoNumbers(lottoCeiling, ticketSize, topLottoNumbers);
		}//End random number generator at the Array level. (Can't be too picky)
		
		numberArray = findDuplicateNumber(numberArray, lottoCeiling, topLottoNumbers, ticketSize);
		numberArray.sort(function(a, b){return a + b});
		numberArray = findDuplicateNumber(numberArray, lottoCeiling, topLottoNumbers, ticketSize);
		numberArray.sort(function(a, b){return a - b});
		
		//assign values manually. For now...
		this.num0 = numberArray[0];
		this.num1 = numberArray[1];
		this.num2 = numberArray[2];
		this.num3 = numberArray[3];
		this.num4 = numberArray[4];
		this.num5 = numberArray[5];
		this.extraShot = getExtraShot(25, 1, extraShot);
	}
}