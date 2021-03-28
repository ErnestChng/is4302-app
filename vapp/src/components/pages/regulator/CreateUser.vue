<template>
  <div>
    <h1>Create User</h1>
    <hr>

    <form class="form" >
      <label class="required drop">User Type:</label>
      <select id="dropdown" v-model="userType" name="'userType">
        <option value="consumer">Consumer</option>
        <option value="generator">Generator</option>
      </select><br>

      <label class="required">ID:</label>
      <input required v-model="id" name='id' type="text"/><br>
      <label class="required">Name:</label>
      <input required v-model='name' name='name' type="text"/><br><br>

      <label></label>
      <input style='font-weight: bold;' type="submit" value="Send" onclick="return confirm('Submit form?')">
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      userType:'',
      id: '',
      name: ''
    };
  }
}
</script>

<style scoped>
label {
  padding: 8px;
  display: inline-block;
  margin: 20px 0 10px;
  width: 15%;
  align-content: left;
  text-align: left;
  font-weight: bold;
}

input[type="text"], input[type="submit"], select{
  display: inline-block;
  padding: 8px;
  width: 30%;
  border-radius: 10px;
  border: 1px solid #2d3f55;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 15px;
}

select {
  height: 30px;
}

input[type="submit"] {
  cursor: pointer;
}

input[type="submit"]:hover {
  background: #103B1D;
  border: solid 1px #2d3f55;
  color: white;
}

div {
  padding: 30px;
}

</style>