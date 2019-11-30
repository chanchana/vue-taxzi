<template>
    <div v-if="memberInfo">
        <button @click="isActive=!isActive" class="rectangle-member">
            <b style="float:left; font-size:16px;"> Members ({{numberMember}}/{{numberMax}})</b>
            <fa style="width: 20px; height: 20px; color:rgba(255, 107, 48, 1.0); float:right; display:inline;" icon="angle-right"/>
        </button>
        <div v-if="isActive" style="position: fixed; bottom:0px; left:0px; z-index:9; width:100%; height:100%; background-color:rgba(0,0,0,0.8);">
            <div class="member-dialog">
                <br>
                <button @click="isActive=!isActive" class="btn"><fa icon="times"/></button>
                <br>
                <h2 style="margin-top:0px; margin-left:120px;"><b>Members</b></h2>
                <div v-for="member in memberInfo" v-bind:key="member.id">
                    <button  class="rectangle-each-member">
                        <fa style="float:left; font-size:28;" icon="user-circle"/>
                        <b style="margin-right:0px;">&nbsp; {{member.name}}</b>
                        <fa style="width: 20px; height: 20px; color:rgba(255, 107, 48, 1.0); float:right; display:inline;" icon="angle-right"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: false,
        }
    },
    props: {
    memberInfo: Object,
    numberMember: Object,
    numberMax: Object,
    },

}
</script>

<style>
    .member-dialog {
        position: fixed;
        height: 360px;
        bottom: 0px;
        left: 0px;
        width: 100%;
        background-color: #F1F1F1;
        z-index: 10;
        border-radius: 40px 40px 0px 0px;
        overflow: scroll;
        padding-bottom: 30px;
    }
    .btn {
    background-color:  #F1F1F1;
    border: none;
    color: rgb(107, 104, 104);
    float: right;
    margin-top:0px;
    margin-right:12px;
    padding: 20px 16px;
    font-size: 24px;
    cursor: pointer;
    }

</style>