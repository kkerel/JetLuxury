<template>
    <section class="paging" v-if="this.$store.state.pagination_no">
        <div  @click="previous" v-if="this.$store.state.pagination_no>1" ><img src="../../assets/images/icon/paging_prev.svg" alt="Previous"
       ></div>
        <ul>
            <li v-for="item in this.$store.state.pagination_no"
                v-bind:class="{active:isActive==item}"
                @click="paginate(item)"
            >
                {{item}}</li>
        </ul>
        <div @click="next" v-if="this.$store.state.pagination_no>1" ><img
                src="../../assets/images/icon/paging_next.svg"
                                                                alt="Next"
                   ></div>
    </section>
</template>

<script>
    /*eslint-disable*/

    export default {
        name: 'Paging2',
        data() {
            return {
                isActive: 1,
                pagination: this.$store.state.pagination_no,
                perPage: this.$store.state.perPage,
                start: 0
            }
        },
        methods: {
            paginate: function (item) {
                this.isActive = item;
                let start = this.isActive * this.perPage - this.perPage;
                let end = this.isActive * this.perPage;
                this.$store.dispatch("paginate", {
                    start: start,
                    end: end,
                    data: this.$store.state.result,
                });
            },
            previous: function () {
                if (this.isActive > 1) {
                    this.isActive -= 1;
                    let start = this.isActive * this.perPage - this.perPage;
                    let end = this.isActive * this.perPage;
                    this.$store.dispatch("paginate", {
                        start: start,
                        end: end,
                        data: this.$store.state.result,
                    });
                }
            },
            next: function () {
                if (this.isActive < this.$store.state.pagination_no) {
                    this.isActive += 1;
                    let start = this.isActive * this.perPage - this.perPage;
                    let end = this.isActive * this.perPage;
                    this.$store.dispatch("paginate", {
                        start: start,
                        end: end,
                        data: this.$store.state.result,
                        active: start,
                    });
                }

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
