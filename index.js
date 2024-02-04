import productsComponent from "./components/productsComponent.js";
import cartComponent from "./components/cartComponent.js";
import orderComponent from "./components/orderComponent.js";
const { createApp } = Vue;

const apiUrl = "https://ec-course-api.hexschool.io/v2";
const apiPath = "jiayu";

// 驗證規則
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"), // 切換成中文版
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證 (原為 change 事件)
});
const app = createApp({
  data() {
    return {
      products: [],
      cart: {},
    };
  },
  components: {
    productsComponent,
    cartComponent,
    orderComponent,
  },
  mounted() {
    (async ()=>{
      try {
        const loader = this.$loading.show();
        await Promise.all([this.getProducts(), this.getCarts()]);
        loader.hide();
      } catch (error) {
        alert(error.data.message)
      }
    })()
  },
  methods: {
    async getProducts() {
      try {
        const url = `${apiUrl}/api/${apiPath}/products/all`;
        const { data } = await axios.get(url);
        this.products = data.products;
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },

    async getCarts() {
      try {
        const url = `${apiUrl}/api/${apiPath}/cart`;
        const { data } = await axios.get(url);
        this.cart = data.data;
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
  },
});

app.use(VueLoading.LoadingPlugin);

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");
