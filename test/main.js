const { AntsArrayUtil, SocketBuffer, AntsTimeUtil, AntsMapUtil } = require('../index.js');


// socket
var fruits = ['Apple', 'Banana'];
let stick = new SocketBuffer(8888).setReadIntLE('32');
stick.putData(Buffer.from("This is test"));
console.log(stick);
// array
console.log(AntsArrayUtil.write(fruits, "%"));
let array = [1, 2, 3, 4, 5, 5, 5, 5];
let arrayFill = new Array(7).fill(8);
console.log(AntsArrayUtil.appendArray(array, arrayFill) + "push");

console.log(AntsArrayUtil.write(array));
console.log(AntsArrayUtil.write(arrayFill));
console.log(AntsArrayUtil.removeDuplicate(array));
console.log(AntsArrayUtil.removeDuplicate(arrayFill));
console.log(AntsArrayUtil.maxValue(array));
console.log(AntsArrayUtil.appendArray(array, arrayFill) + "push");

var arr4 = [1, 2, , 4, 5];
// console.log(AntsArrayUtil.removeNullItem(arr4));
console.log(AntsArrayUtil.reverseArray(arr4));
// time
console.log(AntsTimeUtil.getNow());
console.log(AntsTimeUtil.timeStampFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss'));
console.log(AntsTimeUtil.timeString(Date.now()));
console.log(AntsTimeUtil.timeStampToDate(Date.now().getNow));
console.log(AntsTimeUtil.dateFormat("2019-06-08", 'YYYY-MM-DD HH:mm:ss'));
console.log(AntsTimeUtil.add("2019-06-08", 12, "day"));

// map
let strJson = { "name": "iphone", "price": 666 };
console.log(AntsMapUtil.write(AntsMapUtil.jsonToMap(JSON.stringify(strJson))));
console.log(AntsMapUtil.mapToJson(AntsMapUtil.jsonToMap(JSON.stringify(strJson))));
const myMap = new Map()
    .set(true, 7)
    .set({ foo: 3 }, ['abc']);
console.log(AntsMapUtil.mapToArray(myMap));
console.log(AntsMapUtil.arrayToMap(array));



