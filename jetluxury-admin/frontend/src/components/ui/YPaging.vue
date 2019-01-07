<template>
  <section class="paging" v-if="totalCount > 0">
    <div  @click="previous" v-if="currentPage > 1" ><img src="../../assets/images/icon/paging_prev.svg" alt="Previous"
    ></div>
    <ul>
      <li v-for="page in pagingNumbers"
          :class="{active:currentPage === page}"
          @click="paginate(page)"
      >
        {{page}}</li>
    </ul>
    <div @click="next" v-if="currentPage < endPage" ><img
            src="../../assets/images/icon/paging_next.svg"
            alt="Next"
    ></div>
  </section>
</template>

<script>
    /*eslint-disable*/

    export default {
        name: 'Paging',
        props: {
          currentPage: {
            type: Number
          },
          pageSize: {
            type: Number
          },
          totalCount: {
            type: Number,
            default: 0
          },
          pageUnit: {
            type: Number,
            default: 10
          }
        },
        computed: {
          endPage () {
            return parseInt(this.totalCount / this.pageSize) + (((this.totalCount % this.pageSize) > 0) ? 1 :0)
          },
          pagingNumbers () {
            let offset = parseInt((this.currentPage - 1) / this.pageUnit)
            let startPage = (offset * 10) + 1
            let lastPage = (offset + 1 ) * 10
            return this.createRange(startPage, Math.min(this.endPage, lastPage))
          }
        },
        methods: {
            createRange (start, end) {
              return Array.from({length: end - start + 1}, (v, k) => k + start);
            },
            paginate: function (page) {
                this.$emit('change', page)
            },
            previous: function () {
              this.$emit('change', this.currentPage - 1)
            },
            next: function () {
              this.$emit('change', this.currentPage + 1)
            },

        }
    }
</script>

<style lang="scss" scoped>
  .paging{margin-top:41px;
    img{width:7px; margin:-2px 0px;}
    .active{width:25px; height:25px; line-height:25px; color:#fff; background:url(../../assets/images/icon/paging_active.svg) 0 0 no-repeat; }
  }
</style>
