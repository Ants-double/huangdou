
module.exports = class AntsStringUtil {
    constructor() {

    }

    // 去重
    static removeDuplicate(str) {
        return [...new Set(str)].join('');
    }
}