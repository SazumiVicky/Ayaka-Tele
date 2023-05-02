const uniqueString = require('unique-string');
const binaryText = 'Ayayak';
const asciiText = 'Ayaka always choose Viki';

const binary = asciiText.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');

console.log(binaryText.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));

console.log(asciiText);

console.log(binary);