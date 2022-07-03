<template>
	<view>
		<view class="cart-container" v-if="cart.length !== 0">
			<!-- 收货地址组件 -->
			<my-address></my-address>

			<!-- 商品列表的标题区域 -->
			<view class="cart-title">
				<!-- 左侧图标 -->
				<uni-icons type="shop" size="24"></uni-icons>
				<!-- 右侧文本 -->
				<text class="cart-title-text">购物车</text>
			</view>

			<!-- 购物车商品列表 -->
			<uni-swipe-action>
				<block v-for="(item, index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="swipeItemHandler(item)">
						<my-goods :goods="item" :showRadio="true" :showNum="true" @changRadio="changRadio"
							@changeNum="changeNum" @goToDetail="goToDetail">
						</my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>

			<!-- 自定义结算组件 -->
			<my-settle></my-settle>
		</view>

		<!-- 空白购物车时显示 -->
		<view class="empty-cart" v-else>
			<image class="empty-img" src="/static/cart_empty@2x.png"></image>
			<text class="tip-text">空空如也~</text>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		mixins: [badgeMix],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			}
		},
		computed: {
			...mapState('m_cart', ['cart'])
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			changRadio(e) {
				this.updateGoodsState(e)
			},
			changeNum(e) {
				this.updateGoodsCount(e)
			},
			swipeItemHandler(goods) {
				this.removeGoodsById(goods.goods_id)
			},
			goToDetail(e) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + e
				})
			}
		}
	}
</script>

<style lang="scss">
	.cart-title {
		padding-left: 10rpx;
		display: flex;
		align-items: center;
		height: 80rpx;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 20rpx;
			font-size: 14px
		}
	}

	.cart-container {
		padding-bottom: 100rpx;
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 300rpx;

		.empty-img {
			width: 180rpx;
			height: 180rpx;
		}

		.tip-text {
			margin-top: 15px;
			font-size: 12px;
			color: gray;
		}
	}
</style>
