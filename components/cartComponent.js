const apiUrl = "https://ec-course-api.hexschool.io/v2";
const apiPath = "jiayu";

export default {
  template: `#cartComponent`,
  props: ["cart", "getCarts"],
  data() {
    return {
      loadingItem: "",
      timer: 0
    };
  },
  methods: {
    async delCart(id) {
      try {
        const swal = await Swal.fire({
          title: "確定要刪除嗎？",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "確定",
          cancelButtonText: "先不要",
        })
        if(swal.isConfirmed){
        this.loadingItem = id;

        const url = `${apiUrl}/api/${apiPath}/cart/${id}`;
        const { data } = await axios.delete(url);
        alert(data.message);
        this.getCarts();

        this.loadingItem = "";
        }
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    async delAllCart() {
      try {
        const swal = await Swal.fire({
          title: "確定要清空購物車嗎？",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "確定",
          cancelButtonText: "先不要",
        })
        if(swal.isConfirmed){
          const url = `${apiUrl}/api/${apiPath}/carts`;
          const { data } = await axios.delete(url);
          alert(data.message);
  
          this.getCarts();
        }
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
    debouncePutCart(item){
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        this.putCart(item);
      },300)
    }
  },
};
