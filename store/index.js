export const state = () => ({
  selectedCategory: '',
  products: [],
  isCartOpen: false,
  cartItems: [],
})

export const getters = {
}

export const mutations = {
  updateSelectedCategory(state, val) {
    state.selectedCategory = val;
  },
  updateProducts(state, data) {
    state.products = data;
  },
  updateCartState(state, val) {
    state.isCartOpen = val;
  },
  updateCart(state, val) {
    state.cartItems = val;
  }
}

export const actions = {
}
