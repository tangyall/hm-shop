<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-box">
			<my-search @searchHandler="searchHandler"></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" mode="" class="nav-img"></image>
			</view>
		</view>

		<!-- 楼层区域 -->
		<!-- 楼层容器 -->
		<view class="floor-list">
			<!-- 每一个楼层的item项 -->
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<!-- 楼层的标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view class="floor-img-box">
					<navigator :url="item.product_list[0].url" class="left-img-box">
						<image :src="item.product_list[0].image_src" mode=""
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator :url="item2.url" class="right-img-item" v-for="(item2, index2) in item.product_list"
							:key="index2" v-if="index2!==0">
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				// 轮播图的数据列表
				swiperList: [],
				// 分类导航的数据
				navList: [],
				// 楼层的数据
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			// 获取轮播图数据
			async getSwiperList() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			async getNavList() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 获取首页楼层数据
			async getFloorList() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 对数据进行处理
				res.message.forEach(floor => {
					floor.product_list.forEach(item => {
						item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			// 搜索跳转
			searchHandler() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 30rpx 0;

		.nav-img {
			width: 128rpx;
			height: 124rpx;
		}
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
