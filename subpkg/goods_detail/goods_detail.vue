<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true"
			indicator-color="#ccc" indicator-active-color="#eee">
			<swiper-item v-for="(item, index) in goods_info.pics" :key="index">
				<image :src="item.pics_big_url" @click="preView(index)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 商品信息主题 -->
			<view class="goods-info-body">
				<!-- 商品名字 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yunfei">快递：免运费</view>
			<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		</view>

		<!-- 商品导航组件区域 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				goods_info: {},
				// 导航组件
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		computed: {
			...mapState('m_cart', []),
			...mapGetters('m_cart', ['total'])
		},
		watch: {
			total: {
				handler(newVal) {
					const finResult = this.options.find(item => item.text === '购物车')
					if (finResult) {
						finResult.info = newVal
					}
				},
				immediate: true
			}
		},
		onLoad(options) {
			let goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		},
		methods: {
			...mapMutations('m_cart', ['addToCart']),
			async getGoodsDetail(goods_id) {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()

				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display: block;"').replace(/webp/g, 'jpg')

				this.goods_info = res.message
			},
			preView(index) {
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map((item) => item.pics_big_url)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
					let goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			height: 100%;
			width: 100%;
		}
	}

	.goods-info-box {
		padding: 10rpx 20rpx;

		.price {
			margin: 20rpx 0;
			color: $shop-color;
			font-size: 36rpx
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px
			}

			.favi {
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
				width: 240rpx;
			}
		}

		.yunfei {
			margin: 20rpx 0;
			font-size: 24rpx;
			color: gray;
		}
	}

	.goods-nav {
		position: fixed;
		bottom: 0;
		font: 0;
		width: 100%;
	}

	.goods-detail-container {
		padding-bottom: 100rpx;
	}
</style>
