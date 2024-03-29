"use strict";
let EventEmitter = require('events').EventEmitter;
let StackBuffer = function (bufferLength) {
    let _event = new EventEmitter();
    let _dataWritePosition = 0;//数据存储起始位置
    let _dataReadPosition = 0;//数据存储结束位置
    let _dataHeadLen = 2;//数据包头长度
    let _dataLen = 0;//已经接收数据的长度

    let _bufferLength = bufferLength || 512;//buffer默认长度
    let _buffer = Buffer.alloc(bufferLength || _bufferLength);//申请内存

    let _readIntMethod = 'readInt16BE'

    /**
     * 设置大端接收
     * type:16  包头长度为2，short类型
     * type:32  包头长度为4，int类型
     */
    this.setReadIntBE = function (type) {
        _readIntMethod = 'readInt' + type + 'BE';
        (+type === 16) && (_dataHeadLen = 2);
        (+type === 32) && (_dataHeadLen = 4)
        return this
    }

    /**
     * 设置小端接收
     * type:16  包头长度为2，short类型
     * type:32  包头长度为4，int类型
     */
    this.setReadIntLE = function (type) {
        _readIntMethod = 'readInt' + type + 'LE';
        (+type === 16) && (_dataHeadLen = 2);
        (+type === 32) && (_dataHeadLen = 4)
        return this
    }

    // 数据包接收完整后触发事件
    this.onData = function (callback) {
        _event.on('data', callback)
    }

    // 数据包错误触发事件
    this.onError = function (callback) {
        _event.on('error', callback)
    }
    //2018-03-07测试
    this.putLidarData=function(data)
    {
        if (data === undefined) {
            return;
        }
        if(data.length<8)
        {
            console.log.error('程序有问题，data长度小于8');            
        }
        
    }

    // 往buffer填入数据
    this.putData = function (data) {
        // console.log('收到数据');
        if (data === undefined) {
            return;
        }

        //要拷贝数据的起始位置
        let dataSatrt = 0;
        // 要拷贝数据的结束位置
        let dataLength = data.length;
        // 缓存剩余可用空间
        let availableLen = this.getAvailableLen();

        // buffer剩余空间不足够存储本次数据
        if (availableLen < dataLength) {
            // 以512字节为基数扩展Buffer空间
            let exLength = Math.ceil((_dataLen + dataLength) / 512) * 512;
            let tempBuffer = Buffer.alloc(exLength);
            //_buffer.copy(tempBuffer);
            _bufferLength = exLength;

            // 数据存储进行了循环利用空间，需要进行重新打包
            // 数据存储在buffer的尾部+头部的顺序
            if (_dataWritePosition < _dataReadPosition) {
                let dataTailLen = _bufferLength - _dataReadPosition;
                _buffer.copy(tempBuffer, 0, _dataReadPosition, _dataReadPosition + dataTailLen);
                _buffer.copy(tempBuffer, dataTailLen, 0, _dataWritePosition);
            }
            // 数据是按照顺序进行的完整存储
            else {
                _buffer.copy(tempBuffer, 0, _dataReadPosition, _dataWritePosition);
            }

            _buffer = tempBuffer;
            tempBuffer = null;

            _dataReadPosition = 0;
            _dataWritePosition = _dataLen;
            data.copy(_buffer, _dataWritePosition, dataSatrt, dataSatrt + dataLength);
            _dataLen += dataLength;
            _dataWritePosition += dataLength;
        }

        // 数据会冲破buffer尾部
        else if (_dataWritePosition + dataLength > _bufferLength) {
            /*   分两次存储到buffer：
             *   1、存储在原数据尾部 
             *   2、存储在原数据头部
            */
            // buffer尾部剩余空间的长度
            let bufferTailLength = _bufferLength - _dataWritePosition;
            if (bufferTailLength < 0) {
                console.log.error('程序有漏洞，bufferTailLength < 0');
            }
            // 数据尾部位置
            let dataEndPosition = dataSatrt + bufferTailLength;
            data.copy(_buffer, _dataWritePosition, dataSatrt, dataEndPosition);

            _dataWritePosition = 0;
            dataSatrt = dataEndPosition;

            // data剩余未拷贝进缓存的长度
            let unDataCopyLen = dataLength - bufferTailLength;
            data.copy(_buffer, _dataWritePosition, dataSatrt, dataSatrt + unDataCopyLen);
            // 记录数据长度
            _dataLen = _dataLen + dataLength;
            // 记录buffer可写位置
            _dataWritePosition = _dataWritePosition + unDataCopyLen;
        }
        // 剩余空间足够存储数据 
        else {
            // 拷贝数据到buffer
            data.copy(_buffer, _dataWritePosition, dataSatrt, dataSatrt + dataLength);

            if (_dataWritePosition > _bufferLength) {
                console.log.error('程序有漏洞');
                
            }
            // 记录数据长度
            _dataLen = _dataLen + dataLength;
            // 记录buffer可写位置
            _dataWritePosition = _dataWritePosition + dataLength;
        }
        // 读取数据
        getData();
    }

    function getData() {
        while (true)
         {
            // 没有数据可读,不够解析出包头
            if (getDataLen() <= _dataHeadLen) {
                break;
            }
            // 解析包头长度
            // 尾部最后剩余可读字节长度
            let buffLastCanReadLen = _bufferLength - _dataReadPosition;
            let dataLen = 0;
            let headBuffer = Buffer.alloc(_dataHeadLen);
            // 数据包为分段存储，不能直接解析出包头
            if (buffLastCanReadLen < _dataHeadLen + 4) {
                if (buffLastCanReadLen < 4)//小于4说明最后没有长度消息
                {
                    let sourcestrart=4 - buffLastCanReadLen;
                    let sourceend=8- buffLastCanReadLen;
                    _buffer.copy(headBuffer, 0,sourcestrart, sourceend);

                }
                else {
                    // 取出第一部分头部字节
                    _buffer.copy(headBuffer, 0, _dataReadPosition + 4, _dataReadPosition+buffLastCanReadLen )
                    // 取出第二部分头部字节
                    let unReadHeadLen = _dataHeadLen -( buffLastCanReadLen - 4);
                    _buffer.copy(headBuffer, buffLastCanReadLen - 4, 0, unReadHeadLen)
                }

                // 默认大端接收数据
                dataLen = headBuffer[_readIntMethod]() + _dataHeadLen + 4;
              //  console.log.debug('尾部最后剩余可读字节长度' + buffLastCanReadLen);
                

            }
            else {
                _buffer.copy(headBuffer, 0, _dataReadPosition + 4, _dataReadPosition + 4 + _dataHeadLen);
                dataLen = headBuffer[_readIntMethod]() + 4;
                dataLen += _dataHeadLen
               // console.log.debug('解析出来的长度为' + dataLen +'总的字节长度：'+ _bufferLength +'存储位置:'+ _dataWritePosition );                
            }
            // 数据长度不够读取，直接返回
            if (getDataLen() < dataLen) {
                break;
            }
            // 数据够读，读取数据包 
            else {
                let readData = Buffer.alloc(dataLen);
                // 数据是分段存储，需要分两次读取
                if (_bufferLength - _dataReadPosition < dataLen) {

                    let firstPartLen = _bufferLength - _dataReadPosition;
                    // 读取第一部分，直接到字符尾部的数据
                    _buffer.copy(readData, 0, _dataReadPosition, firstPartLen + _dataReadPosition);
                    // 读取第二部分，存储在开头的数据
                    let secondPartLen = dataLen - firstPartLen;
                    _buffer.copy(readData, firstPartLen, 0, secondPartLen);
                    _dataReadPosition = secondPartLen;
                }
                // 直接读取数据
                else {
                    _buffer.copy(readData, 0, _dataReadPosition, _dataReadPosition + dataLen);
                    _dataReadPosition += dataLen;
                }

                try {
                    // console.console.log('emit data');
                    _event.emit('data', readData);
                    _dataLen -= readData.length;
                    // 已经读取完所有数据
                    if (_dataReadPosition === _dataWritePosition) {
                        break;
                    }
                } catch (e) {
                    _event.emit('error', e);
                }
            }
        }
    }

    // 获取缓存数据长度
    function getDataLen() {
        let dataLen = 0;
        // 缓存全满
        if (_dataLen === _bufferLength && _dataWritePosition >= _dataReadPosition) {
            dataLen = _bufferLength;
        }
        // 缓存全部数据读空
        else if (_dataWritePosition >= _dataReadPosition) {
            dataLen = _dataWritePosition - _dataReadPosition;
        }
        else {
            dataLen = _bufferLength - _dataReadPosition + _dataWritePosition;
        }

        if (dataLen !== _dataLen) {
            console.log.error('程序有漏洞,dataLen长度不合法');            
        }
        return dataLen;
    }

    // 获取buffer可用的空间长度
    this.getAvailableLen = function () {
        return _bufferLength - _dataLen;
    }
}

module.exports = exports = StackBuffer; 
