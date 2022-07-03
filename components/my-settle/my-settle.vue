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
		<view class="btn-settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'

	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			isFullChecked() {
				return this.checkedCount === this.total
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullChecked)
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
