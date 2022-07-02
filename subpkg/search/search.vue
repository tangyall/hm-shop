<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar focus="true" :radius="100" cancelButton="none" @input="input"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResult.length !== 0">
			<view class="sugg-item" v-for="(item, index) in searchResult" :key="item.goods_id"
				@click="goToDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="forward" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="clean"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" inverted="true" v-for="(item, index) in histories" :key="index"
					@click="goToGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				// 用户曾经搜索的词汇
				kw: '',
				// 搜索建议
				searchResult: [],
				// 搜索历史
				historyList: []
			}
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchResult()
				}, 500)
			},
			async getSearchResult() {
				if (this.kw.trim() === '') {
					this.searchResult = []
					return
				}
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
				this.saveSearchHistory()
			},
			goToDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			saveSearchHistory() {
				if (this.kw.trim() != '') {
					let set = new Set(this.historyList)
					set.delete(this.kw)
					set.add(this.kw)
					this.historyList = Array.from(set)
				}
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			clean() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			goToGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
		background: $shop-color;
	}

	.sugg-list {
		padding: 10rpx 16rpx;

		.sugg-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			font-size: 27rpx;
			border-bottom: 1px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.history-box {
		padding: 0 10rpx;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin: 10rpx;
			}
		}
	}
</style>
