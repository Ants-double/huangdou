

module.exports=class AntsArrayUtil{
    constructor(){

    }
    // 拼接
    static write(array,split ){
        split=split||"#";
        return array.join(split);
    }
    //去重
    static removeDuplicate(array){
        let set=new Set(array);
        return [...set];
    }

}