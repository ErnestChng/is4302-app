<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <form action="#" @submit.prevent="submit">
          <div class="form-group row">
            <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
            <div class="col-md-6">
              <input
                  id="email"
                  type="email"
                  class="form-control"
                  name="email"
                  value
                  required
                  autofocus
                  v-model="form.email"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
            <div class="col-md-6">
              <input
                  id="password"
                  type="password"
                  class="form-control"
                  name="password"
                  required
                  v-model="form.password"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="role" class="col-md-4 col-form-label text-md-right">Role</label>
            <div class="col-md-6">
              <select id="role" required v-model="form.role">
                <option value="regulator">Regulator</option>
                <option value="validator">Validator</option>
                <option value="consumer">Consumer</option>
                <option value="generator">Generator</option>
              </select>
            </div>
          </div>
          <div class="form-group row mb-0">
            <div class="col-md-8 offset-md-3">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        role: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => {
            this.$router.replace({path: `/${this.form.role}`});
          })
          .catch(err => {
            this.error = err.message;
          });
    }
  }
};
</script>

<style scoped>
.container {
  min-height: calc(100vh - 100px - 80px);
  padding: 50px 0;
}

.card-header {
  font-weight: bold;
}

.form-group {
  padding: 15px;
}

select, button {
  display: inline-block;
  width: 30%;
  border-radius: 10px;
  border: 1px solid #2d3f55;
  height: 35px;
}

button {
  background: #DCDCDC;
  color: black;
}

button:hover {
  background: #103B1D;
  border: solid 1px #2d3f55;
  color: white;
}
</style>