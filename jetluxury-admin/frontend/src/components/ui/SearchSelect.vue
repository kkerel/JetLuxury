<template>
  <div class="select event_select">
    <div tabindex="-1" @blur="hide" class="select__list">
    <select name="search_col" id="search_col" v-model="search_col" @change="change" class="select__list--type border__gray">
      <option v-for="item in items" :value="item.value">{{item.name}}</option>
    </select>
    </div>
  </div>
</template>

<script>
    /* eslint-disable */
  export default {
    props: {
      items: {
        type: Array,
        default: () => []
      },
      initValue: {
        type: [String, Number],
        default: ''
      }
    },
    data () {
      return {
        selectViewStyle: {
          display: 'none'
        },
        pArrowUp: '',
        search_col: this.initValue
      }
    },
    methods: {
      change() {
        this.$emit('change', this.search_col);
      },
      onShow () {
        if (this.selectViewStyle.display === 'none') {
          this.pArrowUp = 'arrow_up'
          this.selectViewStyle.display = 'block'
        } else {
          this.pArrowUp = ''
          this.selectViewStyle.display = 'none'
        }
      },
      hide () {
        this.pArrowUp = ''
        this.selectViewStyle.display = 'none'
      },
      /*
     // Methods for the backend
        updateDateTerm:function() {
            this.$store.dispatch('updateOrderState', {
                date_term: this.$store.state.date_term,
                status:this.$store.state.status,
                offset:this.$store.state.offset,
                limit:this.$store.state.limit,
                search_col:this.search_col,
                search_keyword:this.$store.state.search_keyword,
            });
        },*/
    }
  }
</script>

<style lang="scss" scoped>
</style>
