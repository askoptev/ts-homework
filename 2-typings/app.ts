
// let makeOrdinal = require("./makeOrdinal");
// let isFinite = require("./isFinite");
// let isSafeNumber = require("./isSafeNumber");

let makeOrdinal = (words: string): string => {
  return 'other data'
};
let isFinite = (num: number): boolean => {
  return true
};
let isSafeNumber = (num: number): boolean => {
  return true;
};


let TEN: number = 10;
let ONE_HUNDRED: number = 100;
let ONE_THOUSAND: number = 1000;
let ONE_MILLION: number = 1000000;
let ONE_BILLION: number = 1000000000; //         1.000.000.000 (9)
let ONE_TRILLION: number = 1000000000000; //     1.000.000.000.000 (12)
let ONE_QUADRILLION: number = 1000000000000000; // 1.000.000.000.000.000 (15)
let MAX: number = 9007199254740991 + 1; // 9.007.199.254.740.992 (15)

let LESS_THAN_TWENTY: string[] = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

let TENTHS_LESS_THAN_HUNDRED: string[] = ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
export function toWords(number: string, asOrdinal: string): string {
  let words: string;
  let num: number = parseInt(number, 10);

  if (!isFinite(num)) {
    throw new TypeError("Not a finite number: " + number + " (" + typeof number + ")");
  }
  if (!isSafeNumber(num)) {
    throw new RangeError("Input is not a safe number, it’s either too large or too small.");
  }
  words = generateWord(num);
  return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, word?: string[]): string {
  return 'other data'
}

function generateWord(number: number): string {
  let remainder: number = 0;
  let word: string = '';
  let words: string[] = ['', ''];

  // We’re done
  if (number === 0) {
    return !words ? "zero" : words.join(" ").replace(/,$/, "");
  }
  // First run
  if (!words) {
    words = [];
  }
  // If negative, prepend “minus”
  if (number < 0) {
    words.push("minus");
    number = Math.abs(number);
  }

  if (number < 20) {
    remainder = 0;
    word = LESS_THAN_TWENTY[number];
  } else if (number < ONE_HUNDRED) {
    remainder = number % TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
    // In case of remainder, we need to handle it here to be able to add the “-”
    if (remainder) {
      word += "-" + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }
  } else if (number < ONE_THOUSAND) {
    remainder = number % ONE_HUNDRED;
    word = generateWords(Math.floor(number / ONE_HUNDRED)) + " hundred";
  } else if (number < ONE_MILLION) {
    remainder = number % ONE_THOUSAND;
    word = generateWords(Math.floor(number / ONE_THOUSAND)) + " thousand,";
  } else if (number < ONE_BILLION) {
    remainder = number % ONE_MILLION;
    word = generateWords(Math.floor(number / ONE_MILLION)) + " million,";
  } else if (number < ONE_TRILLION) {
    remainder = number % ONE_BILLION;
    word = generateWords(Math.floor(number / ONE_BILLION)) + " billion,";
  } else if (number < ONE_QUADRILLION) {
    remainder = number % ONE_TRILLION;
    word = generateWords(Math.floor(number / ONE_TRILLION)) + " trillion,";
  } else if (number <= MAX) {
    remainder = number % ONE_QUADRILLION;
    word = generateWords(Math.floor(number / ONE_QUADRILLION)) + " quadrillion,";
  }

  words.push(word);
  return generateWords(remainder, words);
}


