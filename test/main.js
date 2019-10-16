const {AntsArrayUtil,SocketBuffer,AntsTimeUtil}=require('../index.js');


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

var arr4 = [1, 2, , 4, 5];
// console.log(AntsArrayUtil.removeNullItem(arr4));
console.log(AntsArrayUtil.reverseArray(arr4));

console.log(AntsTimeUtil.getNow());
console.log(AntsTimeUtil.timeStampFormat(Date.now(),'YYYY-MM-DD HH:mm:ss'));
console.log(AntsTimeUtil.timeString(Date.now()));
console.log(AntsTimeUtil.timeStampToDate(Date.now().getNow));
console.log(AntsTimeUtil.dateFormat("2019-06-08",'YYYY-MM-DD HH:mm:ss'));
console.log(AntsTimeUtil.add("2019-06-08",12,"day"));



