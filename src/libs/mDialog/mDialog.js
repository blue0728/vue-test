/**
 * @authors serge
 * @date    2015-10-22 16:59:31
 * @version 1.0.0
 */

require('./mDialog.css');

var mDialog = module.exports = (function($){
    var Dialog = {};
    var $window = $(window);
    var $document = $(document);
    var config = {

        //弹出层内容
        content: '',

        //是否居于底部
        isBottom: false,

        //按钮组
        button: [],

        // 设置遮罩背景颜色
        backdropBackground: '#000',

        // 设置遮罩透明度
        backdropOpacity: 0.6,

        //弹出回调 ajax 之类
        onshow: null

    };

    //阻止默认事件
    function preventDefault(e) {
        e.preventDefault();
    }

    Dialog.creat = function(options) {
        this.options = $.extend({}, config, options);
        this.options.id = new Date().getTime();
    }

    Dialog.creat.prototype = {

        __dialog: null,

        __backdrop: null,

        //创建遮罩
        backdrop: function() {
            var that = this,
                $backdrop = $('<div />');

            $backdrop.css({
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1024,
                background: that.options.backdropBackground,
                opacity: that.options.backdropOpacity
            }).addClass('mDialog-backdrop');

            that.__backdrop = $backdrop;
        },

        //创建弹出层
        popup: function() {
            var that = this,
                $popup = $('<div />');

            $popup.addClass('mDialog-box').html(that.options.content);

            return $popup;
        },

        //创建按钮
        button: function() {
            var that = this,
                $btn = $('<div />');

            if (that.options.button == '') {
                return;
            }

            var html = '',
                len = that.options.button.length;

            $.each(that.options.button, function(i, v) {
                var className = 'mDialog-btn',
                    btn = '';
                if (i == 0 && len == 1) {
                    className = 'mDialog-btn mDialog-btn-ok mDialog-btn-focus';
                } else if (i == 0 && len == 2) {
                    className = 'mDialog-btn mDialog-btn-ok';
                } else if (i == 1 && len == 2) {
                    className = 'mDialog-btn mDialog-btn-cancle ';
                } else {
                    $btn.addClass('mDialog-btns-flex')
                }

                html += '<div class="' + className + '"><a href="javascript:;">' + v.value + '</a></div>';
            });

            $btn.addClass('mDialog-btns').html(html);
            return $btn;
        },

        //show 方法
        show: function() {
            var that = this,
                $body = $('body'),
                $div = $('<div />'),
                $Popup = that.popup(),
                $Btn = that.button(),
                ww = $window.width(),
                wh = $window.height();

            that.backdrop();

            that.__dialog = $div.attr('id', 'mDialog_' + that.options.id);

            $body.append(that.__backdrop);

            $div.css({
                zIndex: 1025,
                position: 'fixed'
            });

            if ($Btn != undefined) {
                $Popup.addClass('mDialog-ui');
            }

            $div.append($Popup).append($Btn).appendTo('body');

            var ow = $div.width(),
                oh = $div.height();

            if (that.options.isBottom) {

                $div.css({
                    width: '100%',
                    left: 0,
                    bottom: 0
                });

            } else {

                $div.css({
                    left: (ww - ow) / 2,
                    top: (wh - oh) * 382 / 1000 //黄金比例
                })

            }

            $div.off('click').on('click', 'div.mDialog-btn', function() {
                var i = $(this).index();
                that.options.button[i].callback && that.options.button[i].callback();
            });

            $div.on('click', function(e) {
                e.stopPropagation();
            })


            that.options.onshow && that.options.onshow();

            document.addEventListener('touchmove', preventDefault, false);
            document.addEventListener('mousewheel', preventDefault, false);

            that.__backdrop.off('click').on('click', function() {
                that.close();
            })

            return that;
        },

        //close 方法
        close: function() {
            this.__backdrop.remove();
            this.__dialog.remove();
            document.removeEventListener('touchmove', preventDefault, false);
            document.removeEventListener('mousewheel', preventDefault, false);
        }
    }

    return mDialog = function(options) {
        return new Dialog.creat(options);
    }
})(Zepto)
