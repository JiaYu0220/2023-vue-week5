const apiUrl = "https://ec-course-api.hexschool.io/v2";
const apiPath = "jiayu";
export default {
  template: `#orderComponent`,
  props: ['getCarts', 'carts'],
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "須為有效的手機號碼";
    },
    async onSubmit() {
      try {
        if(this.carts.length){
          const data = { data: this.form };
          const url = `${apiUrl}/api/${apiPath}/order`;
          const res = await axios.post(url, data);
          this.$refs.form.resetForm();
          this.getCarts();
          alert(res.data.message);
        } else {
          Swal.fire({
            icon: "error",
            title: '請先加入商品再送出表單'
          })
        }
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
  },
};
