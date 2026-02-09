/*
Функция для проверки длины строки.
Она принимает строку, которую нужно проверить на максимальную длину,
и возвращает true,
если строка меньше или равна указанной длине,
и false, если строка длиннее.*/
const isStringWithinLimit = (str, maxLength) => str.length <= maxLength;

isStringWithinLimit();

/*Функция для проверки, является ли строка палиндромом.
Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево*/
const isPalindrome = (string) => {

  const formattedString = string.toLowerCase().replaceAll(' ', '');
  return formattedString === formattedString.split('').reverse().join('');
};

isPalindrome();

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

filterDigitsFromString();

const isMeetingWithinWorkingHours = (startWork, endWork, meetingStart, durationMinutes) => {
  // Функция преобразует строку формата "чч:мм" в количество минут с начала суток
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Переводим все временные точки в минуты
  const startWorkMinutes = timeToMinutes(startWork);
  const endWorkMinutes = timeToMinutes(endWork);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  // Вычисляем время окончания встречи
  const meetingEndMinutes = meetingStartMinutes + durationMinutes;

  // Проверяем, что встреча начинается не раньше начала рабочего дня
  // и заканчивается не позже конца рабочего дня
  return (
    meetingStartMinutes >= startWorkMinutes &&
    meetingEndMinutes <= endWorkMinutes
  );
};
isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkingHours('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkingHours('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkingHours('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkingHours('8:00', '17:30', '08:00', 900); // false
