const {AntsArrayUtil,SocketBuffer}=require('../index.js');

var fruits = ['Apple', 'Banana'];
let stick= new SocketBuffer(8888).setReadIntLE('32');
stick.putData(Buffer.from("This is test"));
console.log(stick);
console.log(AntsArrayUtil.write(fruits));