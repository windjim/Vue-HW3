import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "";

createApp({
  data() {
    return {
      products: [],
      displayProduct: {},
      bsModel: "",
      bsDeleteModel: "",
      addData: {
        imagesUrl: [],
      },
      confirmState: "",
    };
  },
  methods: {
    checkUser() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          this.productList();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location.href = "login.html";
        });
    },
    productList() {
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    showModel(state, item) {
      if (state === "edit") {
        this.addData = { ...item };
        if (!Array.isArray(this.addData.imagesUrl)) {
          this.addData.imagesUrl = [];
        }
        this.comfirmState = "put";
        this.bsModel.show();
      } else if (state === "new") {
        this.addData = {
          imagesUrl: [],
        };
        this.comfirmState = "post";
        this.bsModel.show();
      } else {
        this.addData = { ...item };
        this.comfirmState = "delete";
        this.bsDeleteModel.show();
      }
    },
    addImage() {},
    comfirmBtn() {
      axios[`${this.comfirmState}`](
        `${url}/api/${path}/admin/product/${this.addData.id}`,
        {
          data: this.addData,
        }
      )
        .then((res) => {
          this.bsModel.hide();
          this.productList();
        })
        .catch((err) => {
          alert(err.data.message.join());
        });
    },
    deleteBtn() {
      axios[`${this.comfirmState}`](
        `${url}/api/${path}/admin/product/${this.addData.id}`
      )
        .then((res) => {
          this.bsDeleteModel.hide();
          this.productList();
        })
        .catch((err) => {
          alert(err.data.message.join());
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)VueHW2Token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log(token);
    axios.defaults.headers.common["Authorization"] = token;
    this.bsModel = new bootstrap.Modal(this.$refs.productModal);
    this.bsDeleteModel = new bootstrap.Modal(this.$refs.delProductModal);
    this.checkUser();
  },
}).mount("#app");
