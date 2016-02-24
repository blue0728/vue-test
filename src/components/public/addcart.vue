<style>
/*弹出购买*/
.popup_bg{width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; z-index: 100; opacity: 0.6; background: rgb(0, 0, 0);}
.popup { width: 100%; position: fixed; background: #fff; z-index: 200;left: 0; right: 0; overflow: hidden; }
.popup .product-info { padding: .5rem; border-bottom: 1px solid #eee; }
.popup .product-info img { border-radius: 3px; width: 2.5rem; height: 2.5rem; margin-right: .5rem; }
.popup .product-info a.close { position: absolute; top: .3rem; right: .3rem; display: block; width: 1.5rem; height: 1.5rem; background: url(../../assets/images/close.png) center no-repeat; background-size: 1rem; }
.popup .product-sku { padding: 0.3rem 0.5rem; border-bottom: 1px solid #eee; }
.product-sku .sku-attrname { margin-top: .3rem; }
.popup .product-sku i { display: inline-block; border: 1px solid #333; border-radius: 2px; margin-right: .2rem; margin-bottom: .2rem; padding: .2rem .5rem; }
.popup .product-sku i.current { border: 1px solid #ff5657; color: #fff; background: #ff5657;}
.popup .product-sku i.dis{border: 1px solid #e0e0e0; color: #fff; background: #e0e0e0;}
.popup .submit a.redbtn, .popup .submit a.orangebtn { border-radius: 0; width: 50%;}
.popup .buy-nums { padding: .35rem .5rem; }
.popup .buy-nums div.product-nums { width: 9.5rem; line-height: 1.5rem; height: 1.5rem }
.popup .buy-nums div.buy-count { border: 1px solid #d5d5d5; border-radius: 3px; line-height: 1.5rem; }
.popup .buy-nums div.buy-count button { display: block; height: 1.5rem; border: none; background: #fff; font-size: .7rem; font-weight: bold; }
.popup .buy-nums div.buy-count .dele { width: 1.5rem; text-align: center; border-right: 1px solid #d5d5d5; }
.popup .buy-nums div.buy-count .add { width: 1.5rem; text-align: center; border-left: 1px solid #d5d5d5; }
.popup .buy-nums div.buy-count input { width: 2rem; height: 1.5rem; display: block; border: none; text-align: center; }   
.expand-transition {transition: all .3s ease;bottom: 0;}
.expand-enter, .expand-leave {bottom: -300px;}
</style>
<template>
<div class="popup_bg" v-if="details" @click="close"></div>
<div class="popup" v-if="details" transition="expand" id="addcard">
    <div class="product-info cle">
        <img class="fl" :src="details.Pictures | qiniu '5' '100' '100' " />
        <div class="f12 fl">
            <p><span class="f14 red">&yen;&nbsp;{{details.FinalPrice}}</span>&nbsp;(库存<em>{{details.Stock}}</em>件)</p>
            <p class="specific" style="margin-top:.5rem;" v-if="details.AttrInfoArray != false" v-text="specifictext"></p>
        </div>
        <a href="javascript:;" class="close" @click="close"></a>
    </div>
    <div class="product-sku" v-if="details.AttrInfoArray != false && details.AttrInfoArray != null">
        <div v-for="items in details.AttrInfoArray" class="skus skus-{{$index}}" data-index={{$index}}>
            <p class="f14" v-text="items.AttrName"></p>
            <p class="sku-attrname cle"><i @click="selsku" class="f12 fl" v-for="item in items.AttrValues.split(',')">{{item}}</i></p>
        </div>
    </div>
    <div class="buy-nums cle">
        <div class="product-nums fl">
            <p>购买数量<i v-if="details.LimitBuy == 0">（不限）</i><i v-else>每人限购{{details.LimitBuy}}件</i></p>
        </div>
        <div class="buy-count fl">
            <button class="fl dele" @click="delenum">－</button><input v-model="nums" readonly class="fl" type="tel"/><button class="fl add" @click="addnum">＋</button>
        </div>
    </div>
    <div class="submit cle" id="submit" v-if="to">
        <a @click="submit" v-if="to == 'addcart'" data-from="addcart" href="javascript:;" style="width: 100%;" class="fl f14 goBuy redbtn">确定</a>
        <a @click="submit" v-else data-from="gobuy" href="javascript:;" style="width: 100%;" class="fl f14 goBuy redbtn">确定</a>
    </div>
    <div class="submit cle" id="submit" v-else>
        <a @click="submit" href="javascript:;" data-from="addcart" class="fl f14 addToCart orangebtn">加入购物车</a>
        <a @click="submit" href="javascript:;" data-from="gobuy" class="fl f14 goBuy redbtn">立即购买</a>
    </div>
</div> 
</template>
<script>
var tips = require('tips');
module.exports = {
    data: function(){
        return {
            allStock: 0,
            stock: 0,                     
            specifictext: '请选择规格',
            nums: 1
        }
    },
    methods: {
        close: function(){
            this.details = '';
        },
        selsku: function(e){
            var that = this;
            var _this = $(e.currentTarget);
            var curText = '';
            var $addcard = $('#addcard'),
                $skus = $addcard.find('.skus'),
                $submit = $('#submit a');

            var data = that.details;    

            if (_this.hasClass('dis')) {
                return;
            }

            if (_this.hasClass('current')) {

                _this.removeClass('current');

                that.specifictext = '请选择规格';

                that.details.Stock = that.allStock;

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
            $.each(data.SkuInfo, function(i, v) {
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

                    that.specifictext = '已选择 ' + arr.join(',');

                    that.details.Stock = v.Stock;

                    if (data.LimitBuy == 0 || data.LimitBuy > v.Stock) {
                        that.stock = v.Stock;
                    } else {
                        that.stock = data.LimitBuy;
                    }

                    if (v.Stock == 0) {
                        $submit.addClass('disbtnstock');
                    }
                }
            });

            that.nums = 1;
        },
        delenum: function(){
            var that = this;

            that.nums--;

            if (that.nums <= 0) {
                that.nums = 1;
            }
        },
        addnum: function(){
            var that = this;

            that.nums++;

            if (that.stock == 0) {
                return;
            }

            if (that.nums > that.stock) {
                tips.msg('最多购买' + that.stock + '件');
                that.nums = that.stock;
            }
        },
        submit: function(e){
            var that = this;
            var _this = $(e.currentTarget);
            var data = that.details; 
            var $addcard = $('#addcard'),
                $skus = $addcard.find('.skus');   

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

                sku.ProductID = data.ProductID;
                sku.Num = that.nums;

                var Specific = [];

                if (data.AttrInfoArray != '') {
                    $.each($skus, function(i, v) {
                        Specific.push(data.AttrInfoArray[i].AttrName + ':' + $(this).find('i.current').text());
                    });
                    sku.Specific = JSON.stringify(Specific);
                }

                var ajaxParmes = sku;

                ajaxParmes.platform = 'WSHOP';

                var from = _this.data('from');

                if (from == 'addcart') {
                    $.ajax({
                        url: '/api/cart/add',
                        type: 'post',
                        dataType: 'json',
                        data: ajaxParmes,
                        complete: function(){
                            load.close();
                        },
                        success: function(data) {
                            if (data.flag == 1) {
                                tips.msg('加入购物车成功');
                                that.details = '';
                                
                                that.$http.post('/api/cart/count',)
                                    .then(
                                        function(res){
                                            that.count = res.data.data;
                                        },
                                        function(res){
                                        }
                                    )


                            } else {
                                tips.msg(data.msg);
                            }
                        },
                        error: function(xhr) {
                            tips.msg('加入购物车失败，刷新后重试' + xhr.status);
                        }
                    })
                } else if (from == 'gobuy') {

                    $.ajax({
                        url: '/api/cart/checkout-single-to-order',
                        type: 'post',
                        dataType: 'json',
                        data: ajaxParmes,
                        complete: function(){
                            load.close();
                        },
                        success: function(data) {
                            if (data.flag == 1) {
                                location.href = '/shop/cart/confirm-order';
                            } else if (data.flag == -100) {
                                hm.login();
                            } else {
                                tips.msg(data.msg);
                            }
                        },
                        error: function(xhr) {
                            tips.msg('购买失败，刷新后重试' + xhr.status);
                        }
                    })
                }
        }
    },
    props: ['details', 'count'],
    watch: {
        'details': {
            handler: function(){
                var that = this;
                var data = that.details; 
                var $submit = $('#submit a');   

                if(data != ''){

                    that.allStock = data.Stock; 
                     
                    if (data.LimitBuy == 0) {
                        that.stock = data.Stock;
                    } else {
                        that.stock = data.LimitBuy;
                    }

                    if (data.LimitBuy != 0 && data.LimitBuy > data.Stock) {
                        that.stock = data.Stock;
                    }

                    if(data.Stock == 0){
                        $submit.addClass('disbtnstock');
                    }

                    if(data.AttrInfoArray != false && data.AttrInfoArray != null && data.Stock > 0){
                        $submit.addClass('disbtn');
                    }

                }else{
                    that.stock = 0;
                    that.specifictext = '请选择规格';
                    that.nums = 1;
                    that.allStock = 0; 
                }
            }
        }
    }
}   
</script>