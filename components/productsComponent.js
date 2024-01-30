import productModal from "./productModal.js";

const apiUrl = "https://ec-course-api.hexschool.io/v2";
const apiPath = "jiayu";

export default {
  template: "#productsComponent",
  props: ["products", "getCarts"],
  data() {
    return {
      loadingItem: "",
      tempProduct: {},
    };
  },
  components: { productModal },
  methods: {
    async getProduct(id) {
      try {
        const url = `${apiUrl}/api/${apiPath}/product/${id}`;
        const { data } = await axios.get(url);
        this.tempProduct = data.product;
        this.$refs.productModal.openProductModal();
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    async postCart(productId, qty = 1) {
      try {
        // loading
        this.loadingItem = productId;

        // api
        const url = `${apiUrl}/api/${apiPath}/cart`;
        const data = {
          data: {
            product_id: productId,
            qty,
          },
        };

        const res = await axios.post(url, data);
        alert(res.data.message);
        this.getCarts();

        // loading
        this.loadingItem = "";
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
  },
};
