<template>
	<view class="my-userinfo-container">
		<!-- 头像和名称区域 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>

		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第一个 -->
			<view class="panel panel1">
				<view class="panel1-item">
					<text>6</text>
					<text>收藏的店铺</text>
				</view>
				<view class="panel1-item">
					<text>3</text>
					<text>收藏的商品</text>
				</view>
				<view class="panel1-item">
					<text>23</text>
					<text>关注的商品</text>
				</view>
				<view class="panel1-item">
					<text>11</text>
					<text>足迹</text>
				</view>
			</view>

			<!-- 第二个 -->
			<view class="panel panel2">
				<view class="panel2-title">
					我的订单
				</view>
				<view class="panel2-body">
					<view class="panel2-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel2-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel2-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel2-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>

			<!-- 第三个 -->
			<view class="panel panel3">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		name: "my-userinfo",
		data() {
			return {

			}
		},
		computed: {
			...mapState('m_user', ['userinfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateAddress', 'updateUserInfo', 'updateToken']),
			async logout() {
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				if (succ && succ.confirm) {
					this.updateAddress({})
					this.updateUserInfo({})
					this.updateToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		height: 100%;
		background: #f4f4f4;

		.top-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 400rpx;
			background: $shop-color;

			.avatar {
				box-sizing: border-box;
				height: 180rpx;
				width: 180rpx;
				border-radius: 50%;
				border: 6rpx solid #fff;
				box-shadow: 0 2rpx 10rpx black;
			}

			.nickname {
				margin-top: 20rpx;
				font-size: 16px;
				color: #fff;
				font-weight: bold;
				transform: translateX(-6%);
			}
		}

		.panel-list {
			position: relative;
			top: -20rpx;
			padding: 10rpx 20rpx;

			.panel {
				padding: 20rpx;
				background: #fff;
				border-radius: 6rpx;
				margin-bottom: 20rpx;
				font-size: 13px;

				.icon {
					width: 35px;
					height: 35px;
				}
			}

			.panel1 {
				display: flex;
				justify-content: space-between;

				.panel1-item {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
				}
			}

			.panel2 {
				.panel2-title {
					font-size: 16px;
					line-height: 45px;
					border-bottom: 1px solid #f4f4f4;
				}

				.panel2-body {
					margin-top: 15rpx;
					display: flex;
					justify-content: space-between;

					.panel2-item {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: center;
					}
				}
			}

			.panel3 {
				.panel-list-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 15px;
					line-height: 35px;
					border-bottom: 1px solid #f4f4f4;
				}
			}
		}
	}
</style>
