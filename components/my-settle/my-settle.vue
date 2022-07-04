<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullChecked" /><text>全选</text>
		</label>

		<!-- 合计 -->
		<view class="amount-box">
			合计: <text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'

	export default {
		name: "my-settle",
		data() {
			return {
				seconds: 3,
				timer: null
			};
		},
		computed: {
			...mapState('m_user', ['token']),
			...mapGetters('m_user', ['addstr']),
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			isFullChecked() {
				return this.checkedCount === this.total
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState', ]),
			...mapMutations('m_user', ['updateRedirectInfo']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullChecked)
			},
			// 用户点击了结算按钮
			settlement() {
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				if (!this.addstr) return uni.$showMsg('请选择收货地址')
				if (!this.token) return this.delayNavigate()
			},
			// 展示倒计时的提示消息
			showTip(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算!将' + n + '秒后，自动跳转至登陆页面',
					mask: true,
					duration: 1500
				})
			},
			// 延时导航到my页面
			delayNavigate() {
				this.showTip(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						this.seconds = 3
						this.timer = null
						return uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
					}
					this.showTip(this.seconds)
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0 0 25rpx;
		font-size: 14px;
		width: 726rpx;
		height: 100rpx;
		background: white;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
			}
		}

		.btn-settle {
			padding: 0 25rpx;
			height: 100rpx;
			width: 200rpx;
			line-height: 100rpx;
			background: #c00000;
			color: white;
			text-align: center;
		}
	}
</style>
