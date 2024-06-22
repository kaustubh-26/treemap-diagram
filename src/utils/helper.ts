export const convertToInternationalCurrencySystem = (number: string) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(number)) >= 1.0e+9
      ? (Math.abs(Number(number)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions
      : Math.abs(Number(number)) >= 1.0e+6
      ? (Math.abs(Number(number)) / 1.0e+6).toFixed(2) + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(number)) >= 1.0e+3
      ? (Math.abs(Number(number)) / 1.0e+3).toFixed(2) + "K"
      : Math.abs(Number(number));
}

export const colors = [
    'orange',
    'lightgreen',
    'coral',
    'lightblue',
    'pink',
    'khaki',
    'tan',
  ];

export const splitString = (str: string, maxLength = 20) => {
  const result = [];
  while (str.length > maxLength) {
      let breakPoint = str.lastIndexOf(' ', maxLength);
      if (breakPoint === -1) {
          breakPoint = maxLength;
      }
      result.push(str.substring(0, breakPoint).trim());
      str = str.substring(breakPoint).trim();
  }
  result.push(str);
  return result;
}