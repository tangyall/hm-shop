<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, index) in goodsList" :key="index" @click="goToDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				// 节流阀
				isLoading: false
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods: {
			// 获取商品数据的方法
			async getGoodsList(cb) {
				this.isLoading = true
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				this.isLoading = false
				cb && cb()
			},
			goToDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		},
		onReachBottom() {
			if (this.isLoading) return
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	.goods-list {}
</style>
