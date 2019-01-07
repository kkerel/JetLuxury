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
  /*.select{margin:0 10px;*/
    /*p{background:url(../../assets/images/icon/select_down.svg) center right no-repeat; margin-right:10px; font-size:13px; background-size:13px; text-indent:10px; text-align:left;}*/
    /*p.arrow_up{background:url(../../assets/images/icon/select_up.svg) center right no-repeat; background-size:13px;}*/
    /*.input_type_s{width:100%; height:36px; line-height:36px; margin:0 auto; padding:0px; position:relative; cursor:pointer; outline:none;*/
      /*.select_view{width:100%; position: absolute; top:35px; background: #fff; z-index:1; min-height:40px; font-size:13px; color:#333; text-align:left;*/
        /*li{height: 44px; line-height: 44px; cursor: pointer;*/
          /*label{ display:block; cursor:pointer; }*/
          /*&:hover{background: #282c38; color: #fff;}*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/
</style>
