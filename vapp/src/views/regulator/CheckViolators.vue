<template>
  <div>
    <h1>Check Violators</h1>
    <hr>

    <table class="table">
      <thead style="background: #103B1D; color: white;">
      <tr style='width:18%'>
        <td class="border"><strong>Consumers</strong></td>
        <td class="border"><strong>Balance</strong></td>
        <td class="border"><strong>Emissions</strong></td>
        <td class="border"><strong>Credits diff</strong></td>
      </tr>
      </thead>

      <tbody>
      <tr v-for="item in itemsList" :key="item.user">
        <td class="border" style="width:18%">{{ item.user }}</td>
        <td class="border" style="width:18%">{{ item.balance }}</td>
        <td class="border" style="width:18%">{{ item.emissions }}</td>
        <td class="border" style="width:18%">{{ item.diff }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // sample data
      itemsList: [
        {
          user: 'Company A',
          balance: 100,
          emissions: 30,
          diff: 70
        },
        {
          user: 'Company B',
          balance: 100,
          emissions: 40,
          diff: 60
        }
      ]
    };
  }
};
</script>

<style scoped>
.table {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.border {
  border: solid 1px lightgrey
}

</style>