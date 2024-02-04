const apiUrl = "https://ec-course-api.hexschool.io/v2";
const apiPath = "jiayu";
export default {
  template: `#cartComponent`,
  props: ["cart", "getCarts"],
  data() {
    return {
      loadingItem: "",
    };
  },
  methods: {
    async delCart(id) {
      try {
        this.loadingItem = id;

        const url = `${apiUrl}/api/${apiPath}/cart/${id}`;
        const { data } = await axios.delete(url);
        alert(data.message);
        this.getCarts();

        this.loadingItem = "";
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    async delAllCart() {
      try {
        const url = `${apiUrl}/api/${apiPath}/carts`;
        const { data } = await axios.delete(url);
        alert(data.message);

        this.getCarts();
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    async putCart(item) {
      try {
        const { product_id, qty, id } = item;
        this.loadingItem = id;

        const url = `${apiUrl}/api/${apiPath}/cart/${id}`;
        const data = { data: { product_id, qty } };

        const res = await axios.put(url, data);
        // alert(res.data.message);
        this.getCarts();

        this.loadingItem = "";
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
  },
};
