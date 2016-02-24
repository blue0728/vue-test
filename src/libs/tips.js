/**
 *
 * @authors 简化版弹窗
 * @date    2015-10-23 17:32:31
 * @version $Id$
 */

var mDialog = require('mDialog');

exports.loading = function() {
    var _mDg = mDialog({
        content: '<div class="loading"></div>',
        backdropOpacity: 0
    });

    _mDg.show();
    return _mDg;
}

exports.msg = function(text, callback) {
    var text = text || '我是MSG';
    var _mDg = mDialog({
        content: '<div style="padding:.6rem;background:rgba(0,0,0,.6);color:#fff;border-radius:5px;max-width:12rem;font-size:0.7rem;">' + text + '</div>',
        backdropOpacity: 0,
        onshow: function() {
            setTimeout(function() {
                _mDg.close();
                callback && callback();
            }, 1500);
        }
    });

    _mDg.show();
    return _mDg;
}

exports.html = function(html, callback) {
    var html = html || '<div>我是任意HTML</div>';
    var _mDg = mDialog({
        content: html,
        onshow: function() {
            callback && callback();
        }
    });

    _mDg.show();
    return _mDg;
}

exports.ok = function(text, callback) {
    var _mDg = mDialog({
        content: '<div style="max-width:13rem;padding:1rem;text-align:center;font-size:0.7rem;">' + text + '</div>',
        button: [{
            value: '确定',
            callback: function() {
                callback && callback();
                _mDg.close();
            }
        }]
    });

    _mDg.show();

    return _mDg;
}

exports.confirm = function(text, callback, callback2) {
    var _mDg = mDialog({
        content: '<div style="max-width:14rem;text-align:center;font-size:0.7rem;">' + text + '</div>',
        onshow: function() {
            callback2 && callback2();
            return false;
        },
        button: [{
            value: '确定',
            callback: function() {
                callback && callback();
                return false;
            }
        }, {
            value: '取消',
            callback: function() {
                _mDg.close();
            }
        }]
    });

    _mDg.show();

    return _mDg;
}