/*
Функция для проверки длины строки.
Она принимает строку, которую нужно проверить на максимальную длину,
и возвращает true,
если строка меньше или равна указанной длине,
и false, если строка длиннее.*/
/* eslint-disable no-console */
const isStringWithinLimit = (str, maxLength) => str.length <= maxLength;

// Строка короче 20 символов
console.log(isStringWithinLimit('проверяемая строка', 20));// eslint-disable-next-line no-console
// Длина строки ровно 18 символов
console.log(isStringWithinLimit('проверяемая строка', 18));// eslint-disable-next-line no-console
// Строка длиннее 10 символов
console.log(isStringWithinLimit('проверяемая строка', 10));// eslint-disable-next-line no-console

/*Функция для проверки, является ли строка палиндромом.
Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево*/
const isPalindrome = (string) => {

  const formattedString = string.toLowerCase().replaceAll(' ', '');
  return formattedString === formattedString.split('').reverse().join('');
};

// Строка является палиндромом
console.log(isPalindrome('топот'));// eslint-disable-next-line no-console
// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('ДовОд'));// eslint-disable-next-line no-console
console.log(isPalindrome('Кекс'));// eslint-disable-next-line no-console
// Это палиндром
console.log(isPalindrome('Лёша на полке клопа нашёл '));// eslint-disable-next-line no-console

/*Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN*/

const filterDigitsFromString = (str) => {

  const stringInput = String(str);

  /* переменная для накопления цифр*/
  let digits = '';

  /*цикл — для перебора полученной строки*/
  for (let i = 0; i < stringInput.length; i++) {
    const char = stringInput[i];
    if (char >= '0' && char <= 9) {
      digits += char;
    }
  }

  return digits ? parseInt(digits, 10) : NaN;
};

console.log(filterDigitsFromString('2023 год')); // eslint-disable-next-line no-console
console.log(filterDigitsFromString('ECMAScript 2022')); // eslint-disable-next-line no-console
console.log(filterDigitsFromString('1 кефир, 0.5 батона')); // eslint-disable-next-line no-console
console.log(filterDigitsFromString('агент 007')); // eslint-disable-next-line no-console
console.log(filterDigitsFromString('а я томат')); // eslint-disable-next-line no-console
console.log(filterDigitsFromString(2023)); // eslint-disable-next-line no-console
console.log(filterDigitsFromString(-1)); // eslint-disable-next-line no-console
console.log(filterDigitsFromString(1.5)); // eslint-disable-next-line no-console
/* eslint-disable no-console */
