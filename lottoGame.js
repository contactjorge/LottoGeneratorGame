/*
 * Jorge L Lopez
 * lottoGame.js for generating a random Lotto number
 * Created: 01/20/2018
 * Updated: 01/20/2018
 * Version: 1.0
 */

const topLottoNumbers = [27, 11, 7, 21, 15, 16, 8, 2, 20, 6, 42, 10, 26, 37, 34, 19, 33, 9, 44, 13, 4, 28];
const topLuckyDayNumbers = [27, 2, 24, 22, 14, 45, 40, 33, 9, 1, 18, 30, 15, 7, 25, 13, 23, 20, 36, 28, 41];
const extraShot = [3, 23, 10, 25, 15, 2, 20, 24];

function getLottoNumbers (lottoCeiling, ticketSize, lottoGame) {
	//Get an array of lottery Numbers
	let numArray = [];
	for (let a = 0; a < ticketSize; a++) {
		if (a < 1) {
			let numRange = 8;
			for (let b = 0; b < numRange; b++){
				numArray[a] = getLottoNumber(lottoCeiling, numRange, lottoGame);
			}
		} else if (a < 3) {
			let numRange = 14;
			for (let b = 0; b < numRange; b++){
				numArray[a] = getLottoNumber(lottoCeiling, numRange, lottoGame);
			}
		} else {
			let numRange = 22;
			for (let b = 0; b < numRange; b++){
				numArray[a] = getLottoNumber(lottoCeiling, numRange, lottoGame);
			}
		}
	}
	
	return numArray;
}

function getLottoNumber(lottoCeiling, numRange, lottoGame) {
	//Get and individual lottery Number for the array
	let num = 0;
	let found = false;
	do {
		for (let i = 0; i < lottoCeiling; i++){
			num = Math.floor((Math.random() * lottoCeiling) + 1);
		}
		for (let a = 0; a < numRange; a++) {
			if (num === lottoGame[a]) {
				found = true;
			}
		}
	} while (!found);
	
	return num;
} //end get LottoNumberGenerator Number

function findDuplicateNumber(numArray, lottoCeiling, lottoGame, ticketSize) {
	let newNumArr = numArray;
	for (let a = 0; a < ticketSize; a++) {
		for (let b = a + 1 ; b <= (ticketSize-1); b++) {
			if (numArray[a] === numArray[b]) {
				console.log('duplicate found');
				if (b < 3) {
					newNumArr[b] = getLottoNumber(lottoCeiling, 14, lottoGame);
				} else {
					newNumArr[b] = getLottoNumber(lottoCeiling, 21, lottoGame);
				}
			} else {
				console.log('duplicate not found')
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
		let numberArray = getLottoNumbers(lottoCeiling, ticketSize, topLuckyDayNumbers);
		
		for (let i = 0; i < lottoCeiling; i++){
			numberArray = getLottoNumbers(lottoCeiling, ticketSize, topLuckyDayNumbers);
		}//End random number generator at the Array level. (Can't be too picky)
		
		for (let i = 0; i < ticketSize; i++){
			numberArray = findDuplicateNumber(numberArray, lottoCeiling, topLuckyDayNumbers, ticketSize);
		}//End find Duplicate loop. (Can't be too careful)
		
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
		
		for (let i = 0; i < lottoCeiling; i++){
			numberArray = getLottoNumbers(lottoCeiling, ticketSize, topLottoNumbers);
		}//End random number generator at the Array level. (Can't be too picky)
		
		for (let i = 0; i < ticketSize; i++){
			numberArray = findDuplicateNumber(numberArray, lottoCeiling, topLottoNumbers, ticketSize);
		}//End find Duplicate loop. (Can't be too careful)
		
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
		this.extraShot = getLottoNumbers(25, 1, extraShot);
	}
}