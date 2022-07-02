<template>
	<view class="goods-item">
		<!-- 左侧 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧 -->
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | toFixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		data() {
			return {
				// 默认图片
				defaultPic: 'https://api.ixiaowai.cn/gqapi/gqapi.php'
			}
		},
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10rpx 20rpx;
		border: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 10rpx;

			.goods-pic {
				display: block;
				height: 200rpx;
				width: 200rpx;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px
			}

			.goods-info-box {
				.goods-price {
					font-size: 16px;
					color: $shop-color;
				}
			}
		}
	}
</style>
