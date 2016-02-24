/*
 ** 延迟加载图片 模块
 ** 
 */

var imglazyload = module.exports = function($elem) {

    var $window = $(window);
    var winheight = $window.height(),
        $images = null,
        _timeout = null;

    var $elem = $elem || $('body');

    $images = $elem.find("img").filter(function() {
        var _lazy = $(this).data("lazyload");
        return (_lazy !== undefined && _lazy !== '');
    });
    function showImg() {
        var _winStop = 0;

        if ($images.length < 1) {
            return;
        }

        _winStop = $window.scrollTop();

        $images.each(function() {
            var _this = $(this),
                _top = 0,
                _src = _this.data("lazyload");
            if (_src === '' || _src === null) {
                _this.addClass('img_error');
                return;
            }

            _top = _this.offset().top;

            if (_top >= (_winStop - _this.height()) && _top <= (winheight + _winStop)) {
                _this.attr('src', _src);
                _this.data("lazyload", "").removeAttr("data-lazyload");
                _this.error(function() {
                    this.src = '../assets/images/default.jpg';
                    _this.addClass('img_error');
                });
            }
        });
        $images = $images.filter(function() {
            var _lazy = $(this).data("lazyload");
            return (_lazy !== undefined && _lazy !== '');
        });
    }

    showImg();
    $window.on("scroll", function() {
        if (_timeout !== null) {
            clearTimeout(_timeout);
        }
        _timeout = setTimeout(function() {
            showImg();
        }, 50);
    });
}