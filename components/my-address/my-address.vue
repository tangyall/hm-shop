<template>
	<view>
		<!-- 选择收货地址 -->
		<view class="address-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>

		<!-- 渲染收获信息 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：{{address.userName}}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：{{address.telNumber}}</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addstr}}</view>
			</view>
		</view>

		<!-- 底部边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		name: "my-address",
		data() {
			return {
				// address: {}
			}
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			async chooseAddress() {
				let [err, succ] = await uni.chooseAddress().catch(err => err)
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					// this.address = succ
					this.updateAddress(succ)
				}
			}
		},
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addstr'])
		}
	}
</script>

<style lang="scss">
	.address-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90px;
	}

	.address-info-box {
		padding: 5px 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 24rpx;
		height: 180rpx;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				justify-content: space-between;
			}
		}

		.row2 {
			margin-top: 10px;
			display: flex;
			align-items: center;

			.row2-left {
				white-space: nowrap;
			}
		}
	}

	.address-border {
		display: block;
		width: 750rpx;
		height: 10rpx;
	}
</style>
