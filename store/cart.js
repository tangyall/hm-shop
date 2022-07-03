export default {
	namespaced: true,

	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	mutations: {
		addToCart(state, goods) {
			let findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		// 本地持久化存储数据
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车的勾选状态
		updateGoodsState(state, goods) {
			let findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新购物车商品的数量
		updateGoodsCount(state, goods) {
			let findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
			}
			this.commit('m_cart/saveToStorage')
		},
		// 滑动删除购物车中的商品
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		// 更新购物车中所有商品的勾选状态
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},

	getters: {
		total(state) {
			// let sum = 0
			// state.cart.forEach(item => sum += item.goods_count)
			// return sum
			return state.cart.reduce((sum, item) => sum += item.goods_count, 0)
		},
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state === true).reduce((total, item) => total += item.goods_count, 0)
		},
		// 已勾选商品的总价
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state === true).reduce((total, item) => total += item.goods_count *
				item.goods_price, 0).toFixed(2)
		}
	}
}
