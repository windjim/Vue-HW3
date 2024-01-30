import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "lovecorgi";
createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `VueHW2Token=${token}; expires=${new Date(
            expired
          )}`;
          window.location.href = "index.html";
        })
        .catch((err) => {
          alert(`${err.data.message}，請重新登入`);
        });
    },
  },
}).mount("#app");
