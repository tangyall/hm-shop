<template>
	<view>
		<!-- 自定义搜索组件 -->
		<my-search @searchHandler="searchHandler"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, index) in cateList" :key="index">
					<view :class="['left-scroll-view-item', index === active ? 'active': '']"
						@click="changeActive(index)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, index2) in cateLevel2" :key="index2">
					<!-- 二级标题 -->
					<view class="cate-lv2-title" id="aaaaaaaa">
						/{{item2.cat_name}}/
					</view>
					<!-- 三级分类 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3, index3) in item2.children" :key="index3"
							@click="goToGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用高度
				wh: 0,
				active: 0,
				// 一级分类
				cateList: [],
				// 二级分类
				cateLevel2: [],
				scrollTop: 0
			}
		},
		onLoad() {
			let sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			this.getCateList()
		},
		methods: {
			// 获取分类列表的数据
			async getCateList() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				// 为二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			changeActive(index) {
				this.active = index
				// 重新为二级分类赋值
				this.cateLevel2 = this.cateList[index].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			goToGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			searchHandler() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 240rpx;

			.left-scroll-view-item {
				background: #f7f7f7;
				line-height: 120rpx;
				text-align: center;
				font-size: 24rpx;

				&.active {
					position: relative;
					background: #fff;

					&::before {
						content: '';
						display: block;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
						width: 3px;
						height: 60rpx;
						border-radius: 2rpx;
						background: #c00000;
					}
				}
			}
		}

		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}

		.cate-lv3-list {
			display: flex;
			flex-wrap: wrap;

			.cate-lv3-item {
				margin: 10rpx 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 33%;

				image {
					margin-bottom: 15rpx;
					width: 160rpx;
					height: 160rpx;
					border-radius: 12rpx;
				}

				text {
					font-style: 24rpx;
					font-size: 24rpx
				}
			}
		}
	}
</style>
