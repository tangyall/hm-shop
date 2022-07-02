<template>
	<view class="my-search-container" :style="{'background':bgColor}" @click="searchHandler">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="20"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			}
		},
		props: {
			// 背景颜色
			bgColor: {
				type: String,
				default: '#c00000'
			},
			// 圆角尺寸
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			searchHandler() {
				this.$emit('searchHandler')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 16px;

		.my-search-box {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 72rpx;
			width: 100%;
			background: #fff;

			.placeholder {
				margin-left: 10rpx;
				font-size: 30rpx
			}
		}
	}
</style>
