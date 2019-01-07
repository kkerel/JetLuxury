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
          <div class="btn_type_01">검색하기</div>
          <!--
            Component paths below ↓↓↓↓  from 'components/ui/PageSubTitle'
          -->
          <PageSubTitle :SubTitle="SubTitle"/>
        </div>
        <!-- // subTitle search -->
        <!-- input , select -->
        <div class="search_contents box_type_01">
          <!-- 주문/결제분류 -->
          <div class="box_inner_wrap">
            <div class="box_title">주문/결제 분류</div>
            <div class="box_contents">
              <div class="btn_type_01">+ 분류추가</div>
              <!-- btn_type_01 click > .box_add 추가 -->
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[주문결제]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[증빙서류]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <!-- // btn_type_01 click > .box_add 추가 -->
            </div>
          </div>
          <!-- 주문/결제분류 -->
          <!-- 배송/분류 -->
          <div class="box_inner_wrap">
            <div class="box_title">배송 분류</div>
            <div class="box_contents">
              <div class="btn_type_01">+ 분류추가</div>
              <!-- btn_type_01 click > .box_add 추가 -->
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[배송]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <!-- // btn_type_01 click > .box_add 추가 -->
            </div>
          </div>
          <!-- 배송/분류 -->
          <!-- 취소/교환 분류 -->
          <div class="box_inner_wrap">
            <div class="box_title">취소/교환 분류</div>
            <div class="box_contents">
              <div class="btn_type_01">+ 분류추가</div>
              <!-- btn_type_01 click > .box_add 추가 -->
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[취소]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[교환/반품]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <!-- // btn_type_01 click > .box_add 추가 -->
            </div>
          </div>
          <!-- 취소/교환 분류 -->
          <!-- 회원 분류 -->
          <div class="box_inner_wrap">
            <div class="box_title">회원 분류</div>
            <div class="box_contents">
              <div class="btn_type_01">+ 분류추가</div>
              <!-- btn_type_01 click > .box_add 추가 -->
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[포인트]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[쿠폰]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[회원등급]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <!-- // btn_type_01 click > .box_add 추가 -->
            </div>
          </div>
          <!-- 회원 분류 -->
          <!-- 기타 -->
          <div class="box_inner_wrap">
            <div class="box_title">기타</div>
            <div class="box_contents">
              <div class="btn_type_01">+ 분류추가</div>
              <!-- btn_type_01 click > .box_add 추가 -->
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[상품]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <!-- // btn_type_01 click > .box_add 추가 -->
            </div>
          </div>
          <!-- 기타 -->
          <!-- 환불 -->
          <div class="box_inner_wrap">
            <div class="box_title">환불</div>
            <div class="box_contents">
              <div class="btn_type_01">+ 분류추가</div>
              <!-- btn_type_01 click > .box_add 추가 -->
              <div class="box_add">
                <input type="text" class="input_type_s" placeholder="[환불]">
                <div class="btn_type_03">- 삭제</div>
              </div>
              <!-- // btn_type_01 click > .box_add 추가 -->
            </div>
          </div>
          <!-- 기타 -->
        </div>
        <!-- // input , select -->
      </div>
    </section>
  </div>
</template>

<script>
  import PageTitle from 'components/ui/PageTitle'
  import PageSubTitle from 'components/ui/PageSubTitle'
  import SearchSelect from 'components/ui/SearchSelect'
  import Paging from 'components/ui/Paging'
  import SearchResult from 'components/ui/SearchResult'
  export default {
    name: 'DeliveryCompleted',
    components: {
      PageTitle,
      PageSubTitle,
      SearchSelect,
      Paging,
      SearchResult
    },
    data () {
      return {
        page: {
          title: '게시판',
          subTitle: 'FAQ 카테고리'
        },
        SubTitle: {
          title: 'FAQ 카테고리'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contents_wrap {
    .contents {
      .search_wrap{width:100%; display:table;
        .title_wrap{width:100%; display:table;
          h3{float:left; padding:8.5px 0px;}
          .btn_type_01{float:right;}
        }
        /* 기간 선택 */
        .term_choice_wrap{
          ul{letter-spacing:-5px;
            li{display:inline-block; vertical-align:middle; letter-spacing:0px; text-align:center;
              input{display:none;}
              input[type="radio"]:checked + label {background:#444857; color:#fff;}
              label{width:70px; height:44px; line-height:44px; display:inline-block; vertical-align:middle; border:1px solid #ccc; margin-left:-1px; cursor:pointer; box-sizing:border-box;}
            }
          }
        }
      }
    }
    .login_icon_wrap{
      ul{
        li{height:26px; display:inline-block; vertical-align:middle;
          img{width:26px;}
        }
      }
    }
    .box_inner_wrap{width:100%; height:auto; display:table;
      .box_title{position:static; height:100%; display:table-cell; vertical-align:middle; border-bottom:1px solid #ccc;}
      .box_contents{padding:13px; height:auto; display:table-cell; vertical-align:middle;
        .btn_type_01{width:99px; padding:0px; font-size:16px; margin:0px;}
      }
      .box_add{width:100%; height:40px; padding-bottom:0px; margin-top:10px; margin-bottom:0px;
        .btn_type_03{border-radius:0px; height:40px; line-height:38px; box-sizing:border-box; border: 1px solid #ccc;}
      }
    }
    .input_type_s{height:40px; line-height:40px; vertical-align:middle;}
  }
</style>
