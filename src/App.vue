<template>
  <div id="app">
    <OrderFilter v-on:filter="filter($event)"/>
    <OrderSort v-on:sort="sort($event)"/>
    <OrderList v-bind:orders="orderListPrint"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Api } from './api/api';
import OrderList from './components/OrderList.vue';
import OrderSort from './components/OrderSort.vue';
import OrderFilter from './components/OrderFilter.vue';
import {OrderFilter as OrderFilterModel} from './models/OrderFilter';
import { Order, OrderResponse } from './models/Order';
import { Sort, SORT_FIELD_PRICE, SORT_ASC } from './models/Sort';
import { UserResponse } from './models/User';

@Component({
  components: {
    OrderFilter,
    OrderSort,
    OrderList,
  },
})
export default class App extends Vue {
  public api = new Api();
  public orderList: Order[] = [];
  public orderListPrint: Order[] = [];
  public filterQuery!: number;
  public sortQuery: Sort = new Sort(SORT_FIELD_PRICE, SORT_ASC);

  public created() {
    this.getAllOrders();
  }

  public getAllOrders() {
    this.api.getUser().then((users: UserResponse[]) => {
      this.api.getOrders().then((orders) => {
        orders.forEach((order: OrderResponse) => {
          const user = users.filter((userData) => userData.id === order.user)[0];

          this.orderList.push(Order.create(order, user));

          if (this.orderList.length === orders.length) {
            this.orderList = this.sortQuery.run(this.orderList);
          }
        });
      });
    }).then(() => {
      this.initOrderPrint();
    });
  }

  public filter(filterQuery: OrderFilterModel) {

    if (filterQuery.reset) {
      this.initOrderPrint();
      return;
    }

    if (filterQuery.priceFrom || filterQuery.priceTo) {
      this.orderListPrint = this.orderList.filter((data) => {
          if (filterQuery.priceFrom <= data.exchangeRate && filterQuery.priceTo >= data.exchangeRate) {
            return data;
          }
        });
    }

    if (filterQuery.weight) {
      this.orderListPrint = this.orderListPrint.filter((data) => {
        if (filterQuery.weight >= data.range[0] && filterQuery.weight <= data.range[1]) {
          return data;
        }
      });
    }

  }

  public sort(sort: Sort) {
    this.sortQuery = sort;
    this.orderListPrint = this.sortQuery.run(this.orderListPrint);
  }

  public initOrderPrint() {
    this.orderListPrint = this.orderList;
    this.orderListPrint = this.sortQuery.run(this.orderListPrint);
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 940px;
  margin: 0 auto;
  background: #fff;
  padding: 10px;
}
</style>
