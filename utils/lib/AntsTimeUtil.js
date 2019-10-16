
let moment = require('moment');

module.exports = class AntsTimeUtil {
    constructor() {

        this.commonType = 'YYYY-MM-DD HH:mm:ss';

    }

    static add(time, value, type) {
        return moment(time).add(value, type).toDate();
    }

    static subtract(time, value, type) {
        return moment(time).subtract(value, type).toDate();
    }

    static dateFormat(date, format) {
        return moment(new Date(date)).format(format);
    }

    static timeString(timeStamp) {
        return moment(timeStamp).format(this.commonType);
    }
    static timeStampToDate(timeStamp) {
        return moment(timeStamp).toDate();
    }

    static getNow() {
        return moment(Date.now()).format(this.commonType);
    }

    static timeStampFormat(timeStamp, format) {

        return moment(timeStamp).format(format);
    }

}