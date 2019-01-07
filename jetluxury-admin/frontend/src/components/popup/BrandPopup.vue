<template>
  <div class="modal-mask">
    <transition name='modal'>
      <NoticePopup :popup="popup" v-if="savePop" @close="closeNotice"></NoticePopup>
    </transition>
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="layer-pop-widget">
          <div class="popup-widget">
            <div class="popup-contents">
              <div class="close" @click="$emit('close')"><img src="../../assets/images/icon/close_btn.svg" alt=""></div>
              <div class="title_wrap">
                <div class="contents_title">&nbsp;&middot;&nbsp;브랜드 배너 등록</div>
                <div class="btn_type_01" @click="editBanner">저장</div>
              </div>
              <div class="search_contents box_type_01">
                <div class="box_inner_wrap">
                  <div class="box">
                    <div class="box_title">브랜드명</div>
                    <div class="box_contents">
                      <p>{{banner.brand_name}}</p>
                    </div>
                  </div>
                  <div class="box">
                    <div class="box_title">브랜드국가</div>
                    <div class="box_contents">
                      <p>{{banner.brand_coname_en}}</p>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box full_box">
                    <div class="box_title">등록일</div>
                    <div class="box_contents">
                      <p>{{formatDate(banner.brand_created)}}</p>
                    </div>
                  </div>
                </div>
                <div class="box_inner_wrap">
                  <div class="box full_box">
                    <div class="box_title">배너이미지</div>
                    <div class="box_contents">
                      <p><input type="file" id="file" ref="file" :name="uploadFieldName" @change="filesChange()" accept="image/*"
                       ></p>
                      <span v-if="error">
                        <p style="color:red;">{{message}}</p>
                      </span>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NoticePopup from 'components/popup/NoticePopup'
  import moment from 'moment'
  export default {
    name: 'BrandPopup',
    props: {
      banner: {
        type: Object,
        default: null
      }
    },
    components: {
      NoticePopup
    },
    data () {
      return {
        savePop: false,
        uploadFieldName: 'photos',
        file: null,
        formData: new FormData(),
        brand_id : this.banner.brand_id,
        popup: {
          prologue: '저장 되었습니다.'
        },
        error:false,
        message:''
      }
    },
    methods: {

      formatDate: function (date) {
        return moment(date).format('YYYY-MM-DD')
      },
      filesChange() {
         this.file = this.$refs.file.files[0];
      },
     async closeNotice() {

        this.savePop = false;

       const allowedTypes = ["image/png","image/jpeg",'image/gif'];
       const MAX_SIZE = 200000;
       const tooLarge = this.file.size>MAX_SIZE;
       if(allowedTypes.includes(this.file.type)&&!tooLarge){

         this.error = false;
         this.message = '';
         let formData = new FormData();
         formData.append('file', this.file);
         formData.append('brand_id', this.banner.brand_id);
         //console.log(formData.getPath)
         const url = '/back';

         try {
           await this.$http.post(`${url}/brand/admin/create`, formData, {
             headers: {
               'Content-Type': 'multipart/form-data'
             }
           }).then(result=>{

             // upload success
              this.$emit('saveBanner');
           }).catch(error => {
             console.log(error);
           });
         }
         catch (err) {
           console.log(err)

         }


       }
       else{
         this.error = true;
         this.message = tooLarge?`Too Large Please Consider That , Max size to upload is ${MAX_SIZE/1000}kb`:"Only images are allowed, please browse images only";
       }
      },
      editBanner() {
        this.savePop = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* 모달 팝업 */
  .modal-mask{ position: fixed; z-index: 9998; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .6); display: table; transition: opacity .6s ease;
    .modal-wrapper{width: 100%; height: 100%; display: table; vertical-align: middle;
      .modal-container{display:table-cell; vertical-align:middle; border-radius: 2px; box-shadow: 0 2px 8px rgba(0, 0, 0, .33); transition: all .6s ease;}
      .layer-pop-widget {height:100%; position:relative; display: table; margin: 0 auto; z-index:100;
        .popup-widget{display:table-cell; vertical-align:middle;
          .popup-contents{position:relative; width:1600px; background:#fff; padding:30px;
            .close{position:absolute; top:-40px; right:0px; cursor:pointer;
              img{width:30px;}
            }
            .contents_title{padding:8px 0px; font-weight:bold; font-size:20px;}
          }
        }
      }
    }
  }
  .search_contents{
    .box_inner_wrap{width:100%; display:table;
      .box{position:relative; float:left; width:50%;}
      .full_box{width:100%; float:none;}
      .box_contents{background:#fff;
        p{background:#fff; letter-spacing:0px; line-height:68px; font-size:14px;}
      }
    }
  }
  .title_wrap{width:100%; height:43px; display:table; position:relative;
   .btn_type_01{position:absolute; top:0px; right:0px; z-index:10;}
  }
</style>
