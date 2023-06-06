<template>
  <section class="container py-5 mx-auto px-4 lg:px-0">
    <div class="flex flex-wrap gap-8">
      <div
        v-for="(prd, idx) in getProducts"
        :key="idx"
        class="lg:w-[23%] md:w-[47%] w-full product"
      >
        <div class="image-wrap">
          <img
            :alt="prd.title"
            class="object-contain object-center"
            :src="prd.image"
          />
        </div>
        <div class="content-wrap">
          <div>
            <div class="title">{{ prd.title }}</div>
            <div class="price">$ {{ prd.price }}</div>
          </div>
          <div class="addToCart-wrap">
          <button class="addToCart" @click="onClickATC(prd)">
            <img src="../assets/add.svg" alt="+" />
            <span>Add to Cart</span>
          </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppProducts',
  computed: {
    getProducts() {
      return this.$store.state.products
    },
  },
  methods: {
    onClickATC(prd) {
      const items = JSON.parse(window.localStorage.getItem('cartItems')) ?? [];
      localStorage.setItem('cartItems', JSON.stringify([prd, ...items]));
      this.$store.commit('updateCartState', true);
      this.$store.commit('updateCart', [prd, ...items]);
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 32px;
  height: 500px;
  border: 1px solid rgba(26, 26, 26, 0.1);
  border-radius: 12px;
  position: relative;
  .image-wrap {
    display: flex;
    margin: 0 auto;
    height: 250px;
  }
  .content-wrap {
    width: 100%;
    .title {
      font-family: 'InstrumentSans-SemiBold';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #1a1a1a;
    }
    .price {
      font-family: 'InstrumentSans-Medium';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: rgba(26, 26, 26, 0.5);
      padding-top: 8px;
    }
    .addToCart-wrap {
      position: absolute;
      bottom: 16px;
      left: 16px;
      right: 16px;
      .addToCart {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 16px 20px 16px 16px;
        gap: 6px;
        background: #f4f4f4;
        border-radius: 12px;
        width: 100%;
        &:hover {
          background: #dddcdc;
        }
      }
    }
  }
}
</style>
