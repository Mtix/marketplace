<template>
    <div class="order-item">
      <div class="row">
        <span>Цена:</span>
        <span>{{order.exchangeRate}} руб./г.</span>
      </div>
      <div class="row">
        <span>Объем продаж:</span>
        <span>от {{order.range[0]}} г. до {{order.range[1]}} г.</span>
      </div>
      <div class="row">
        <span>Продавец:</span>
        <span>     
          {{order.user.name}} <span class="rate" v-bind:class="rateClass()">{{order.user.rating}}</span>
      </span>
      </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Order } from '../models/Order';

@Component({
})
export default class OrderItem extends Vue {
  @Prop() public order!: Order;

  public rateClass() {
    const rating = this.order.user.rating;

    if (rating === 0) {
      return 'none';
    }

    if (rating >= 4.5) {
      return 'good';
    } else if (rating < 3) {
      return 'bad';
    } else if (rating >= 3 && rating < 4.5) {
      return 'middle';
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-item {
    flex-basis: 260px;
    padding: 10px;
    margin: 15px;
    border-color: #bbc5cf;
    box-shadow: 0 3px 9px 0 rgba(50, 60, 70, 0.12);
    text-align: left;
    .row {
      font-size: 14px;
      margin-bottom: 15px;
      & > span:nth-child(1) {
        font-weight: bold;
        margin-right: 2px;
      }
      .rate {
        background: #000;
        display: inline-block;
        color: #fff;
        font-size: 10px;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border-radius: 50%;
        &.good {
          background: #0f9816;
        }
        &.bad {
          background: rgb(224, 0, 0);
        }
        &.middle {
          background: rgb(229, 255, 0);
        }
        &.none {
          background: #00d1e0;
        }
      }
    }
  }
</style>

