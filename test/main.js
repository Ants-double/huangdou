const {AntsArrayUtil,SocketBuffer}=require('../index.js');

var fruits = ['Apple', 'Banana'];
let stick= new SocketBuffer(8888).setReadIntLE('32');
stick.putData(Buffer.from("This is test"));
console.log(stick);
console.log(AntsArrayUtil.write(fruits,"%"));
let array=[1, 2, 3, 4, 5, 5, 5, 5];
let arrayFill=new Array(7).fill(8);
console.log(AntsArrayUtil.appendArray(array,arrayFill)+ "push");

console.log(AntsArrayUtil.write(array));
console.log(AntsArrayUtil.write(arrayFill));
console.log(  AntsArrayUtil.removeDuplicate(array));
console.log(  AntsArrayUtil.removeDuplicate(arrayFill));
console.log(AntsArrayUtil.maxValue(array));
console.log(AntsArrayUtil.appendArray(array,arrayFill)+"push");

