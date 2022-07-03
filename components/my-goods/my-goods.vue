<template>
	<view class="goods-item">
		<!-- 左侧 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="changRadio"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic" @click="goToDetail"></image>
		</view>
		<!-- 右侧 -->
		<view class="goods-item-right">
			<view class="goods-name" @click="goToDetail">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price" @click="goToDetail">￥{{goods.goods_price | toFixed}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="changeNum"></uni-number-box>
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
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			changRadio() {
				this.$emit('changRadio', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			// 监听到number-box组件数量的变化
			changeNum(num) {
				this.$emit('changeNum', {
					goods_id: this.goods.goods_id,
					goods_count: num + 0
				})
			},
			goToDetail() {
				this.$emit('goToDetail', this.goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10rpx 20rpx;
		width: 710rpx;
		border: 1px solid #f0f0f0;

		.goods-item-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 10rpx;

			.goods-pic {
				display: block;
				height: 200rpx;
				width: 200rpx;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					font-size: 16px;
					color: $shop-color;
				}
			}
		}
	}
</style>
