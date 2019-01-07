<template>
  <div class="page__contents__wrapper">
    <!--
      Component paths below ↓↓↓↓ import PageTitle from 'components/ui/PageTitle'
    -->
    <PageTitle :page="page"/>
    <!--
      Component paths below ↓↓↓↓ import PageSubTitle from 'components/ui/PageSubTitle'
    -->
    <PageSubTitle :SubTitle="SubTitle"/>
    <div class="page__contents shadow">
      <dl>
        <dt>보안서버(SSL)구축 의무 강화 안내</dt>
        <dd>1. 정보통신망법에 따라 보안서버(SSL) 구축 의무사항 위반 시 민원이 발생할 경우 사전경고없이 최고 3,000만원의 과태료가 부과됩니다.</dd>
        <dd class="page__contents__indent">(적용대상 : 온라인 쇼핑몰 및 회원가입/로그인/주문/결제/게시판 등의 이용과정에서 이름, 주민등록번호, 연락처 등을 취급하는 웹사이트)</dd>
        <dd class="page__contents__indent">운영하는 사이트의 개인정보 취급 여부를 반드시 확인하고, 의무사항 적용 대상에 해당하는 사이트는 보안서버 사용을 필수로 설정하여 주세요.</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import PageTitle from 'components/ui/PageTitle'
import PageSubTitle from 'components/ui/PageSubTitle'
export default {
  name: 'BasicSetting',
  components: {
    PageTitle,
    PageSubTitle
  },
  data () {
    return {
      page: {
        title: '기본설정',
        subTitle: '보안관리정책'
      },
      SubTitle: {
        title: '모바일쇼핑몰 보안서버 관리'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page__contents__wrapper{
    .page__contents{padding:30px; background:#fff; margin-top:56px;
      &__indent{padding-left:17px;}
      dt{font-size:18px; font-weight:bold; color:#333; padding-bottom:20px;}
      dd{line-height:1.8;}
    }
  }
</style>
