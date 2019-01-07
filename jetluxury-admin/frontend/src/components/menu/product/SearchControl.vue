<template>
  <div class="contents_wrap">
    <!--
      Component paths below ↓↓↓↓  from 'components/ui/PageTitle'
    -->
    <PageTitle :page="page"/>
    <section class="contents">
      <div class="search_wrap">
        <!-- subTitle search -->
        <div class="title_wrap">
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/PageSubTitle'
          -->
          <PageSubTitle :SubTitle="SubTitle"/>
        </div>
        <div class="search_contents box_type_02">
          <!-- 검색어 -->
          <div class="box_inner_wrap">
            <div class="box_title">검색어</div>
            <div class="box_contents">
              <button class="search_add_btn">+ 검색어 추가</button>
              <ul class="search_add_wrap">
                <li>
                  <div>
                    <input type="text" class="input_type_m">
                  </div>
                  <div class="mbtn_type_01">- 삭제</div>
                </li>
                <li>
                  <div>
                    <input type="text" class="input_type_m">
                  </div>
                  <div class="mbtn_type_01">- 삭제</div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 검색어 -->
        </div>
        <p class="page_prologue">* 검색 페이지 내 인기 검색어를 노출하여 주력상품, 이벤트 상품 등을 검색할 수 있도록 유도합니다.</p>
      </div>
    </section>
  </div>
</template>

<script>
import PageTitle from 'components/ui/PageTitle'
import PageSubTitle from 'components/ui/PageSubTitle'
export default {
  name: 'SearchControl',
  components: {
    PageTitle,
    PageSubTitle
  },
  data () {
    return {
      page: {
        title: '상품',
        subTitle: '검색창관리'
      },
      SubTitle: {
        title: '인기검색어 설정'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .box_type_02{
    .search_add_btn{width:114px; height:44px; line-height:42px; background:#444857; color:#fff; text-align:center; font-size:16px; border:0px;}
    .search_add_wrap{
      li{width:100%; display:table; margin-top:10px; clear:both;
        div{float:left;
          &:first-child{margin-right:10px;}
          input{font-size:16px; text-indent:10px;}
        }
      }
    }
  }
  .page_prologue{color:#888; margin-top:20px;}
  .box_inner_wrap{width:100%; height:auto; display:table;
    .box_title{position:static; height:100%; display:table-cell; vertical-align:middle; border-bottom:1px solid #ccc;}
    .box_contents{padding:13px; height:auto; display:table-cell; vertical-align:middle;}
  }
</style>
