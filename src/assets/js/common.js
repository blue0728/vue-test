/**
 *
 * @authors serge
 * @date    2015-06-23 13:33:45
 * @海蜜
 */

var hm = module.exports = (function($) {

    var hm = {};

    //正则系列
    hm.reg = {
        isTel: function(val) {
            var reg = /0?[1][3-8][0-9]{9}$/; //手机号吗 
            return reg.test(val);
        },
        checkNickName: function(val) {
            var reg = /^[\w\u4e00-\u9fa5_]{2,20}$/; //昵称 数字 大小写字母 _  中文 2-20
            return reg.test(val);
        },
        checkPassword: function(val) {
            var result = true;
            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(val)) { //密码 数字 大小写字母 6-20
                result = false;
            }
            return result;
        }
    }

    //默认参数
    hm.opt = {
        platform: 'WSHOP'
    };

    //七牛图片处理
    hm.qiniu = {
        addSize: function(url, w, h, m) {
            if (!url) {
                return '';
            }

            var m = m || 0;
            var strW = '/w/' + w;
            var strH = '/h/' + h;

            if (!w) {
                strW = '';
            }

            if (!h) {
                strH = ''
            }

            return url.split('?')[0] + '?imageView2/' + m + strW + strH;
        },
        unSize: function(url) {
            if (!url) {
                return '';
            }
            return url.split('?')[0];
        }
    };

    //用户未登录跳转
    hm.login = function() {
        /*require(['cookie'], function (cookie) {
            cookie('hm_login_back_url', location.href); //设置跳转后返回地址cookie
            if (Global.wx) {
                var appid = Global.wxAppid;   //微信里面跳转授权登录
                window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?' +
                    'appid=' + appid + '&' +
                    'redirect_uri=http%3A%2F%2F' + 'www.haimi.com' + '%2Fshop%2Flogin%2Fwxlogin&' +
                    'response_type=code&scope=snsapi_login&' +
                    'state=haimi#wechat_redirect');
            } else {
                location.href = '/shop/login';  //普通跳转登录
            }
        });*/
    };

    //滑动到顶部
    hm.scrollTop = function() {
        var html = '<div class="to-top"></div>';
        $(window).on('scroll', function() {
            var scrollTop = $(this).scrollTop();
            var winHeight = $(window).height();

            if (scrollTop >= winHeight) {
                if ($('body').find('.to-top').length > 0) {
                    return;
                }
                $('body').append(html);
            } else {
                $('body').find('.to-top').remove();
            }
        });

        function scroll(scrollTo, time) {
            var scrollFrom = parseInt(document.body.scrollTop),
                i = 0,
                runEvery = 5;
            scrollTo = parseInt(scrollTo);
            time /= runEvery;
            var interval = setInterval(function() {
                i++;
                document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
                if (i >= time) {
                    clearInterval(interval);
                }
            }, runEvery);
        }

        $(window).on('click', '.to-top', function() {
            scroll('0', 300);
        });
    };

    hm.scrollTop();

    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    //全局种cookie
    //require(['cookie'], function (cookie) {
    //    var platform = cookie('platform');  //WSHOP

    //    cookie('platform', hm.opt.platform);

    /*var channel_cookie = cookie('channel');  //渠道来源
    var channel_url = getUrlParam('channel');

    if (!channel_cookie && channel_url) {
        cookie('hm_channel', channel_url);
    }*/
    //});

    //隐藏微信分享菜单栏
    if (Global.wx) {
        var whiteList = ['/shop/cart/pay-success', '/shop', '/shop/product/detail']; //白名单订单完成、店铺首页、商品详情
        var pathname = location.pathname;
        var isShow = false;

        for (var i = 0, len = whiteList.length; i < len; i++) {
            if (pathname == whiteList[i]) {
                isShow = true;
            }
        }
        if (!isShow) {
            /*require(['wxapi'], function (wx) {
                wx.ready(function () {
                    wx.hideOptionMenu();
                });
            });*/
        }
    }

})(Zepto);