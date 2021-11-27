<template>
  <div style="padding: 50px 0 0">
    <img src="../assets/logo.png" alt="" />
    <h1 style="font-size: 50px; font-weight: bolder">Vite-Demo</h1>
  </div>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    label-width="80px"
    class="login"
    @keyup.enter.native="submitForm('loginForm')"
  >
    <el-form-item label="帐号" prop="email">
      <el-input v-model="loginForm.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "blur",
          },
          {
            min: 12,
            max: 30,
            message: "Length should be 12 to 30",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // axios
          //   .post("https://partner.apptutti.com/api/partner/login",
          this.$http
            .post("/api/partner/login", {
              email: this.loginForm.email,
              password: this.loginForm.password,
              remember: 0,
            })
            .then((res) => {
              res = res.data;
              // console.log(res);
              if (res.code === 200) {
                localStorage.setItem("Token", res.data.token);
                this.$message.success("Login successfully! Welcome!");
                this.$router.push("/");
              } else {
                alert(res.msg);
                this.$message.error("Oops, error submit.");
                if (res.code === 401) {
                  localStorage.removeItem("Token");
                  this.$router.push("/login");
                }
              }
            });
        } else {
          this.$message.error("Oops, error submit.");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  width: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 50px auto;
  padding: 50px;
  box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.1);
}
h1 {
  color: var(--el-color-primary);
}
</style>
