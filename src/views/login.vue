<style>
/*登录 @serge*/
.login-box {background: #f3f3f3;}
.login-box input.mobile {font-size: .7rem;width: 16rem;height: 2rem;padding: 0 .5rem;border: 1px solid #ddd;border-radius: 0;}
.login-box p {line-height: 2rem;padding: 0 .5rem;}
.login-box div {font-size: .7rem;line-height: 2rem;height: 2rem;padding: 0 .5rem;border-bottom: 1px solid #ddd;background: #fff;}
.login-box div input.user,
.login-box div input.password {width: 9.5rem; padding: 0 .5rem;border: none;border-radius: 0;}
.login-btn {margin-top: 1rem;}
	
</style>
<template>
<div class="login-box" id="login-box" style="padding-top: .5rem;" v-if="!show">
    <input class="mobile" v-model="mobile" type="tel" placeholder="请输入手机号码" @keyup.13="check"/>
    <p class="c_999">手机号码即为登陆账号，我们将发送验证短信到该号码</p>
    <p><a href="javascript:;" class="redbtn" @click="check">登&nbsp;&nbsp;录</a></p>
</div>
<div class="login-box" id="login-box" v-if="show">
    <p class="c_999" style="line-height: 1.5rem;">您的手机号码已注册，请直接登录</p>
    <div><label>帐号</label><input @keyup.13="login" v-model="mobile" class="user f14" type="tel"></div>
    <div><label>密码</label><input @keyup.13="login" v-model="password" class="password f14" type="password"><a v-link="{name: 'forget', params: {id: mobile}}" class="blue">忘记密码</a></div>
    <p class="login-btn"><a href="javascript:;" @click="login" class="redbtn">确&nbsp;&nbsp;定</a></p>
</div>
</template>
<script>
var tips = require('tips');
module.exports = {
	data: function(){
		return {
			mobile: '',
			password: '',
			show: false
		}
	},
	methods: {
		check: function(){
			var that = this;

			if(!/0?[1][3-8][0-9]{9}$/.test(that.mobile)){
				tips.msg('请输入正确的手机号码');
				return;
			}

			var load = tips.loading();

			that.$http.post('/api/member/check-mobile',{
				mobile: that.mobile
			})
			.then(
				function(res){
					if(res.data.flag == -1){
						that.show = true;
					}
					load.close();
				},
				function(res){
					load.close();
				}
			)
		},
		login: function(){
			var that = this;
			var load = tips.loading();

			that.$http.post('/api/member/login',{
				username: that.mobile,
                password: that.password
			})
			.then(
				function(res){
					if(res.data.flag == 1){
						history.go(-1);
					}else{
						tips.msg(res.data.msg);
					}
					load.close();
				},
				function(res){
					load.close();
				}
			)
		}
	}
}	
</script>