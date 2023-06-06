<template>
  <aside
    class="transform top-0 right-0 w-full md:w-[460px] fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 bg-white shadow-md"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="p-5">
      <div class="flex items-center justify-between">
        <div class="heading">Your Cart ({{getTotalItems}})</div>
        <div class="cursor-pointer" @click="closeDrawer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99958 10.8666L2.46624 17.4C2.2218 17.6444 1.91069 17.7666 1.53291 17.7666C1.15513 17.7666 0.844021 17.6444 0.599577 17.4C0.355132 17.1555 0.23291 16.8444 0.23291 16.4666C0.23291 16.0889 0.355132 15.7778 0.599577 15.5333L7.13291 8.99997L0.599577 2.46664C0.355132 2.2222 0.23291 1.91108 0.23291 1.53331C0.23291 1.15553 0.355132 0.844418 0.599577 0.599974C0.844021 0.355529 1.15513 0.233307 1.53291 0.233307C1.91069 0.233307 2.2218 0.355529 2.46624 0.599974L8.99958 7.13331L15.5329 0.599974C15.7774 0.355529 16.0885 0.233307 16.4662 0.233307C16.844 0.233307 17.1551 0.355529 17.3996 0.599974C17.644 0.844418 17.7662 1.15553 17.7662 1.53331C17.7662 1.91108 17.644 2.2222 17.3996 2.46664L10.8662 8.99997L17.3996 15.5333C17.644 15.7778 17.7662 16.0889 17.7662 16.4666C17.7662 16.8444 17.644 17.1555 17.3996 17.4C17.1551 17.6444 16.844 17.7666 16.4662 17.7666C16.0885 17.7666 15.7774 17.6444 15.5329 17.4L8.99958 10.8666Z"
              fill="#1C1B1F"
            />
          </svg>
        </div>
      </div>
      <div v-if="getTotalItems" class="body-wrap">
        <div v-for="(prd, idx) in products" :key="idx" class="flex pb-4 gap-4">
          <div class="img-wrap">
            <img :src="prd.image" :alt="prd.titile" />
          </div>
          <div class="flex flex-col py-4 gap-y-2 w-[70%]">
            <div class="title">{{ prd.title }}</div>
            <div class="content-wrap">
              <div class="cart-text">${{ prd.price }}</div>
              <div class="cart-text cursor-pointer" @click="onClickRemove(prd)">
                Remove
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="body-wrap pb-4 text-center">
        <div>
          Your shopping bag is empty.
        </div>
        <div class="pb-8">
          Start shopping now!
        </div>
        <a href="/" class="shopNow">Shop Now</a>
      </div>
      <div v-if="getTotalItems" class="flex items-center justify-between">
        <div class="heading">Total</div>
        <div class="heading">${{ totalCartValue }}</div>
      </div>
      <button v-if="getTotalItems" class="ctc">Continue to Checkout</button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AppCart',
  computed: {
    products() {
      return this.$store.state.cartItems;
    },
    isOpen() {
      return this.$store.state.isCartOpen;
    },
    getTotalItems() {
      return this.products?.length ?? 0;
    },
    totalCartValue() {
      return Number(this.products?.reduce((init, { price }) => {
        return init + price
      }, 0)).toFixed(2);
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) {
            document.body.style.setProperty('overflow', 'hidden')
            this.$store.commit('updateCart', JSON.parse(localStorage.getItem('cartItems')) ?? []);
          }
          else document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  methods: {
    closeDrawer() {
      this.$store.commit('updateCartState', false)
    },
    onClickRemove(prd) {
      const items = JSON.parse(window.localStorage.getItem('cartItems')) ?? [];
      const idx = items.findIndex(item => item.id === prd.id && item.title === prd.title);
      items.splice(idx, 1);
      this.$store.commit('updateCart', items);
      localStorage.setItem('cartItems', JSON.stringify(items));
    },
  },
}
</script>
<style lang="scss" scoped>
.heading {
  font-family: 'InstrumentSans-SemiBold';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  color: #1a1a1a;
}
.body-wrap {
  border-top: 1px solid rgba(26, 26, 26, 0.1);
  border-bottom: 1px solid rgba(26, 26, 26, 0.1);
  padding-top: 16px;
  margin: 16px 0;
  max-height: 78vh;
  overflow: scroll;
  .img-wrap {
    width: 102px;
    height: 102px;
    background: #ffffff;
    border: 1px solid rgba(26, 26, 26, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    img {
      width: 70px;
      height: 70px;
    }
  }
  .title {
    font-family: 'InstrumentSans-SemiBold';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #1a1a1a;
  }
  .content-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cart-text {
      font-family: 'InstrumentSans-Medium';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      text-align: right;
      color: rgba(26, 26, 26, 0.5);
    }
  }
}
.ctc {
  width: 100%;
  height: 59px;
  background: linear-gradient(0deg, #462ddf, #462ddf), #1a1a1a;
  border-radius: 8px;
  font-family: 'InstrumentSans-SemiBold';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  margin-top: 16px;
}
.shopNow {
  font-family: "InstrumentSans-SemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  color: #1a1a1a;
  text-decoration: underline;
}
</style>
