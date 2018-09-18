<template>
    <div class="order-list">
        <OrderItem v-for="order in orders" v-bind:order="order" v-bind:key="order.id"/>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import OrderItem from './OrderItem.vue';
import { Order } from '../models/Order';

@Component({
  components: {
    OrderItem,
  },
})
export default class OrderList extends Vue {
  @Prop() public orders!: Order[];
}
</script>

<style lang="scss" scoped>
  .order-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>

