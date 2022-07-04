<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<text class="tips-text">登陆后尽享更多权益</text>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		name: "my-login",
		data() {
			return {

			}
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			// 用户授权后，获取用户的基本信息
			getUserInfo(e) {
				if (e.detail.errMsg !== "getUserInfo:ok") return uni.$showMsg('您未进行登陆的授权')
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== "login:ok") return uni.$showMsg('登陆失败')
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					rawData: info.rawData,
					iv: info.iv,
					signature: info.signature
				}
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				if (loginResult.meta.status !== 200) {
					// 假数据
					this.updateToken('123456')
					uni.$showMsg('登陆成功')
					this.navigationBack()
					return
					// 假数据
					// return uni.$showMsg('登录失败')
				}
				uni.$showMsg('登陆成功')
			},
			navigationBack() {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 750rpx;
		background: #f8f8f8;
		overflow: hidden;

		.btn-login {
			margin: 20rpx 0;
			width: 90%;
			background: #c00000;
			border-radius: 100px;
		}

		.tips-text {
			font-size: 24rpx;
			color: gray;
		}

		&::after {
			position: absolute;
			bottom: 0;
			left: 0;
			content: '';
			display: block;
			width: 100%;
			height: 40px;
			background: white;
			border-radius: 100%;
			transform: translateY(50%);
		}
	}
</style>
