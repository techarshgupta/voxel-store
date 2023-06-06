<template>
  <div class="text-center border-b border-gray-200 px-4 lg:px-0">
    <ul class="flex-wrap -mb-px container mx-auto hidden md:flex">
      <li
        v-for="(tab, idx) in tabs"
        :key="idx"
        class="tabItem inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 cursor-pointer capitalize"
        :class="
          $store.state.selectedCategory === tab
            ? 'active border-b-4'
            : 'border-transparent'
        "
        @click="onClickCategory(tab)"
      >
        {{ tab }}
      </li>
    </ul>
    <select
      id="categories"
      v-model="active"
      class="md:hidden bg-gray-50 border text-sm border-gray-300 text-gray-900 rounded-lg w-full p-4 my-3 capitalize"
      @change="onClickCategory(active)"
    >
      <option v-for="(tab, idx) in tabs" :key="idx"  :value="tab" class="capitalize">
        {{ tab }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppTabs',
  data() {
    return {
      active: 'all',
      tabs: [
        'all',
        'electronics',
        'jewelery',
        "Men's Clothing",
        "Women's Clothing",
      ],
    }
  },
  created() {
    this.getProductCategories()
    this.onClickCategory('all')
  },
  methods: {
    async getProductCategories() {
      const res = await this.$axios.get('products/categories')
      this.tabs = ['all', ...res.data]
    },
    async getProductsByCategory(category) {
      let res
      if (category === 'all') {
        res = await this.$axios.get(`products`)
      } else {
        res = await this.$axios.get(`products/category/${category}`)
      }
      return res.data
    },
    async onClickCategory(tab) {
      const products = await this.getProductsByCategory(tab)
      this.$store.commit('updateSelectedCategory', tab)
      this.$store.commit('updateProducts', products)
    },
  },
}
</script>

<style lang="scss" scoped>
.tabItem {
  font-family: 'InstrumentSans-SemiBold';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: rgba(26, 26, 26, 0.5);
}
.active {
  color: rgba(26, 26, 26, 1) !important;
  border-color: rgba(26, 26, 26, 1);
}
</style>
