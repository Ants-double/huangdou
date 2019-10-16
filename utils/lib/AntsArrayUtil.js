

module.exports = class AntsArrayUtil {
    constructor() {

    }
    

    // 拼接
    static write(array, split) {
        split = split || "#";
        return  this.checkArray(array,(value) => {
            return value.join(split);
        });
    }

    //去重
    static removeDuplicate(array) {
        return this.checkArray(array,(value) => {
            let set = new Set(value);
            return [...set];
        });
    }


    static maxValue(array) {
        return this.checkArray(array,(value) => {
            return Math.max(...value);
        });
    }


    static removeNullItem(array){
        return this.checkArray(array,(value) => {
            return value.flat(2);
        });
    }
    
    static reverseArray(array){
        return this.checkArray(array,(value) => {
            return value.reverse();
        });
    }


    static appendArray(array,appendArray){
        return this.checkArray(array,(value) => {
            return [...value,...appendArray];
        });
    }



    // 检查是不是数组
    static checkArray(array,callback) {
        if (Array.isArray(array)) {
            return callback(array);
        }
        else {
            return new Array();
        }
    };


}


