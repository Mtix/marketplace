<template>
    <div class="order-filter">
        <input type="number" v-model="priceFrom" placeholder="цена от">
        <input type="number" v-model="priceTo" placeholder="цена до">
        <input type="number" v-model="weight" placeholder="вес">
        <button v-on:click="filter()">Фильтр</button>
        <button v-on:click="filter('reset')">Сбросить</button>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Order } from '../models/Order';
import { OrderFilter as OrderFilterModel } from '../models/OrderFilter';

type filterType = '' | 'reset';

const RESET = 'reset';

@Component({
})
export default class OrderFilter extends Vue {
  public priceFrom: string = '';
  public priceTo: string = '';
  public weight: string = '';

  public filter(type?: filterType) {
    const priceFrom = Number(this.priceFrom);
    const priceTo = Number(this.priceTo);
    const weight = Number(this.weight);
    const filter = new OrderFilterModel(priceFrom, priceTo, weight);

    if ((priceFrom + priceTo + weight) === 0 || type === RESET) {
      filter.reset = true;
      this.clear();
    }

    this.$emit('filter', filter);
  }

  public clear() {
    this.priceFrom = '';
    this.priceTo = '';
    this.weight = '';
  }
}
</script>

<style lang="scss" scoped>
  .order-filter {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    input {
      display: block;
      height: 14px;
      margin-right: 10px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
      -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
      -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }
    button {
      height: 30px;
      padding: 0 20px;
      line-height: 30px;
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      background: #ED3237;
      border: 1px solid #ED3237;
      text-transform: uppercase;
      outline: none !important;
      -webkit-border-radius: 42px;
      -moz-border-radius: 42px;
      border-radius: 42px;
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      -o-transition: all 0.3s ease;
      transition: all 0.3s ease;
      cursor: pointer;
      margin-right: 5px;
      &:hover {
        background: #FF6060;
        border-color: #FF6060;
      }
    }
  }
  @media screen and (max-width: 940px) {
    .order-filter {
      justify-content: center;
      input {
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
</style>

