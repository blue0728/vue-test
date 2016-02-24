# 不再使用jquery作为核心库，使用zepto更加轻量级，和jq一样的api  lib.js 包含fastclick.js require.js zepto.min.js

# zepto.min.js 包含一下这些模块

+ [zepto](https://github.com/madrobby/zepto/blob/master/src/zepto.js#files)

  核心模块

+ [event](https://github.com/madrobby/zepto/blob/master/src/event.js#files)

  支持```on``` ```off```等绑定事件

+ [ajax](https://github.com/madrobby/zepto/blob/master/src/ajax.js#files)
 
  支持```ajax```方法和jQuery一样 

+ [ie](https://github.com/madrobby/zepto/blob/master/src/ie.js#files)

  支持IE10+ WP手机

+ [detect](https://github.com/madrobby/zepto/blob/master/src/detect.js#files)

  支持检测系统/浏览器```$.os``` ```$.browser```

+ [fx](https://github.com/madrobby/zepto/blob/master/src/fx.js#files)

  支持```animate()``` 方法css3动画

+ [fx_methods](https://github.com/madrobby/zepto/blob/master/src/fx_methods.js#files)

  支持```show``` ```hide``` ```toggle``` ```fade*()``` 方法

+ [data](https://github.com/madrobby/zepto/blob/master/src/data.js#files)

  支持```data``` 方法 

+ [deferred](https://github.com/madrobby/zepto/blob/master/src/deferred.js#files)

  支持```ajax```链式回调 

+ [callbacks](https://github.com/madrobby/zepto/blob/master/src/callbacks.js#files)

  支持```ajax```链式回调

+ [selector](https://github.com/madrobby/zepto/blob/master/src/selector.js#files)
  
  支持```visible``` ```hidden``` ```selected``` ```checked``` ```parent``` ```first``` ```last``` ```eq``` ```contains``` ```has``` 选择器

+ [touch](https://github.com/madrobby/zepto/blob/master/src/touch.js#files)

  支持```swipe```, ```swipeLeft```, ```swipeRight```, ```swipeUp```, ```swipeDown```,```doubleTap```, ```tap```, ```singleTap```, ```longTap```事件

+ [stack](https://github.com/madrobby/zepto/blob/master/src/stack.js#files)

  支持```.end()``` ```.andSelf()``` 方法 