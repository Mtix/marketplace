<template>
    <div class="order-sort">
      <div class="order-sort-in">
        Сортировка: 
        <span v-bind:class="getClassType" v-on:click="sort('price')" class="universal">По цене</span> 
        <span v-on:click="sort('rating')">По рейтингу</span>
      </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  Sort,
  SortField,
  SortType,
  SORT_ASC,
  SORT_DESC,
  SORT_FIELD_PRICE,
  SORT_FIELD_RATING,
} from '../models/Sort';

@Component({
})
export default class OrderSort extends Vue {
  public sortType: SortType = SORT_ASC;
  public activeField: SortField = SORT_FIELD_PRICE;

  public sort(field: SortField) {

    this.activeField = field;

    if (field === SORT_FIELD_PRICE) {
      this.sortType = (this.sortType === SORT_ASC ? SORT_DESC : SORT_ASC);
    }

    if (field === SORT_FIELD_RATING) {
      this.sortType = SORT_DESC;
    }

    this.$emit('sort', new Sort(field, this.sortType));
  }

  get getClassType() {
    if (this.activeField === SORT_FIELD_RATING) {
      return '';
    }
    if (this.sortType === SORT_ASC) {
      return 'asc';
    } else {
      return 'desc';
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-sort {
    padding: 5px 15px;
    text-align: left;
    .order-sort-in {
      background: #f3f3f3;
      padding: 5px;
      font-size: 14px;
      span {
        position: relative;
        margin: 0 5px;
        display: inline-block;
        padding: 5px 15px 5px 5px;
        cursor: pointer;
        font-size: 12px;
        &.universal:after {
          position: absolute;
          right: 0;
          top: 8px;
          width: 10px;
          height: 10px;
          content: '';
          background-image: url(../../public/sort.svg);
          background-repeat: no-repeat;
          background-position: 100% 50%;
          display: none;
        }
        &.asc:after {
          display: block;
          transform: rotate(270deg);
        }
        &.desc::after {
          display: block;
          transform: rotate(90deg);
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>

