


module.exports = class AntsMapUtil {
    constructor() {

    }
    static jsonToMap(json) {

        let obj = JSON.parse(json);
        let map = new Map();
        for (let k of Object.keys(obj)) {
            map.set(k, obj[k]);
        }
        return map;
    }

    static mapToJson(map) {

        let obj = Object.create(null);
        for (let [k, v] of map) {
            obj[k] = v;
        }
        return JSON.stringify(obj);

    }

    static mapToArray(map) {
        return [...map];
    }

    static arrayToMap(array) {
        try {
            return new Map(array);
        } catch (error) {
            return new Map();
        }

    }

    static mapToObject(map) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    static objectToMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }

    static write(map) {
        let result = "";
        for (let item of map.entries()) {

            result += 'key:' + item[0] + ",value:" + item[1] + "\n";

        }
        return result;
    }


}