export default {
  template: "#userProductModal",
  props: ["product", "loadingItem"],
  data() {
    return {
      quantity: 1,
      productModal: "",
    };
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.productModal);
  },
  methods: {
    openProductModal() {
      this.productModal.show();
      this.quantity = 1;
    },
    closeProductModal() {
      this.productModal.hide();
      this.$emit("emitCart", this.product.id, this.quantity);
    },
  },
};
