/**
 * 添加到购物车/立即购买
 * Created by serge on 2015/10/28.
 */
define(['tpl/public/popup', 'tips', 'mDialog', 'css!./mDialog', 'css!./addCart'], function(popup, tips, mDialog) {

    /*弹出添加 data 商品详情  to 添加到购物车还是立即购买addcart  or gobuy*/
    function addCart(data, to) {
        data.to = to || '';
        var html = popup(data);
        var _mDg = mDialog({
            content: '<div id="addcard" style="width:100%;background:#fff;">' + html + '</div>',
            isBottom: true,
            onshow: function() {
                var $addcard = $('#addcard'),
                    $input = $addcard.find('input[type=tel]'),
                    $skus = $addcard.find('.skus'),
                    $specific = $addcard.find('.specific'),
                    $em = $addcard.find('em'),
                    $submit = $('#submit a'),
                    stock = 0;
                var allStock = data.data.Stock;

                if (data.data.LimitBuy == 0) {
                    stock = data.data.Stock;
                } else {
                    stock = data.data.LimitBuy;
                }

                if (data.data.LimitBuy != 0 && data.data.LimitBuy > data.data.Stock) {
                    stock = data.data.Stock;
                }

                $addcard.off('click').on('click', 'div.product-sku i', function() {

                    var _this = $(this);
                    var curText = '';

                    if (_this.hasClass('dis')) {
                        return;
                    }

                    if (_this.hasClass('current')) {
                        _this.removeClass('current');
                        $specific.html('请选择规格');
                        $em.html(allStock);
                        $submit.addClass('disbtn');
                        curText = '';
                    } else {
                        _this.addClass('current').siblings().removeClass('current');
                        curText = _this.text();
                    }

                    var arr = [];

                    $.each($skus, function() {
                        var val = $(this).find('.current').text();
                        if (val) {
                            arr.push(val);
                        }
                    });
                    $.each(data.data.SkuInfo, function(i, v) {
                        var skuArr = v.SkuName.split(',');


                        var isIn = $.inArray(curText, skuArr);
                        var _index = _this.closest('.skus').data('index');

                        _index = _index == 1 ? 0 : 1;
                        if (isIn != -1 && v.Stock == 0) {
                            skuArr.splice($.inArray(curText, skuArr), 1);

                            $skus.eq(_index).find('i').filter(function(){
                                return $(this).text() === skuArr.toString();
                            }).addClass('dis').removeClass('current');

                           
                        }else{
                            $skus.eq(_index).find('i').eq(i).removeClass('dis');
                        }
                        if (arr.length == 0) {
                            $skus.find('i').removeClass('dis')
                        }

                        if (v.SkuName == arr.join(',')) {

                            $submit.removeClass('disbtnstock disbtn');

                            $specific.html('已选择 ' + arr.join(','));

                            $em.html(v.Stock);
                            if (data.data.LimitBuy == 0 || data.data.LimitBuy > v.Stock) {
                                stock = v.Stock;
                            } else {
                                stock = data.data.LimitBuy;
                            }

                            if (v.Stock == 0) {
                                $submit.addClass('disbtnstock');
                            }
                        }
                    });

                    $input.val(1);

                }).on('click', 'button.dele', function(e) {

                    var _val = $.trim($input.val());
                    _val--;
                    if (_val <= 0) {
                        $input.val(1);
                    } else {
                        $input.val(_val);
                    }

                }).on('click', 'button.add', function(e) {

                    var _val = $.trim($input.val());
                    _val++;

                    if (stock == 0) {
                        return;
                    }

                    if (_val > stock) {
                        tips.msg('最多购买' + stock + '件');
                    } else {
                        $input.val(_val);
                    }

                }).on('keyup', 'input[type=tel]', function() {
                    var _val = $.trim($input.val());
                    if (!/^[1-9]\d*$/.test(_val)) {
                        $input.val(1);
                    }
                    if (_val > stock) {
                        tips.msg('最多购买' + stock + '件');
                        $input.val(stock);
                    }
                });

                $submit.on('click', function() {
                    var _this = $(this);

                    if (_this.hasClass('disbtn')) {
                        tips.msg('请选择规格');
                        return;
                    }

                    if (_this.hasClass('disbtnstock')) {
                        tips.msg('当前规格商品暂无库存');
                        return;
                    }

                    var load = tips.loading();
                    var sku = {};

                    sku.ProductID = data.data.ProductID;
                    sku.Num = $input.val();

                    var Specific = [];

                    if (data.data.AttrInfoArray != '') {
                        $.each($skus, function(i, v) {
                            Specific.push(data.data.AttrInfoArray[i].AttrName + ':' + $(this).find('i.current').text());
                        });
                        sku.Specific = JSON.stringify(Specific);
                    }
                    //var ajaxParmes = $.extend({}, sku, {hm_source: data.data.source});
                    var ajaxParmes = sku;

                    ajaxParmes.platform = 'WSHOP';


                    var from = _this.data('from');

                    if (from == 'addcart') {
                        $.ajax({
                            url: '/api/cart/add',
                            type: 'post',
                            dataType: 'json',
                            data: ajaxParmes,
                            success: function(data) {
                                load.close();
                                if (data.flag == 1) {
                                    tips.msg('加入购物车成功');
                                    hm.getCartNums();
                                    _mDg.close();
                                } else {
                                    tips.msg(data.msg);
                                }
                            },
                            error: function(xhr) {
                                load.close();
                                tips.msg('加入购物车失败，刷新后重试' + xhr.status);
                            }
                        })
                    } else if (from == 'gobuy') {

                        $.ajax({
                            url: '/api/cart/checkout-single-to-order',
                            type: 'post',
                            dataType: 'json',
                            data: ajaxParmes,
                            success: function(data) {
                                if (data.flag == 1) {
                                    location.href = '/shop/cart/confirm-order';
                                } else if (data.flag == -100) {
                                    hm.login();
                                } else {
                                    load.close();
                                    tips.msg(data.msg);
                                }
                            },
                            error: function(xhr) {
                                load.close();
                                tips.msg('购买失败，刷新后重试' + xhr.status);
                            }
                        })
                    }
                });
            }
        });
        _mDg.show();
    }

    return addCart;
});