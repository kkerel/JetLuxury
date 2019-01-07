<template>
  <div class="select">
    <div class="select__board border__gray">
      <select class="select__board--type" name="board_col" id="board_col" v-model="board_col" @change="change">
        <option v-for="item in items" :value="item.value">{{item.name}}</option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        selectViewStyle: {
          display: 'none'
        },
        pArrowUp: '',
        board_col: null
      }
    },
    methods: {
      change () {
        this.$emit('change', this.board_col)
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
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
