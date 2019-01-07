<template>
    <div class="search_result">
      <div>검색<span>{{searchCount}}</span>개&nbsp;/&nbsp;</div>
      <div>전체{{totalCount}}개</div>
    </div>
</template>

<script>

export default {
  name: 'SearchResult',
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    searchCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
