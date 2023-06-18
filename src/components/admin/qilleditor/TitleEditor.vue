<script>
export default {
    props:{
        labelFor:{
            type: String
        },
        title:{
            type: String
        },
        placeholder:{
            type: String
        },
        value:{
            type: String
        },
        required:{
            type: Boolean
        }
    },
    data(){
      return{
          characterCount: 0,
          currentValue: this.value || ''
      }
    },
    methods:{
        countCharacters() {
            if (this.currentValue.length > 255) {
                this.currentValue = this.currentValue.slice(0, 255);
            }
            this.characterCount = this.currentValue.length;
        }
    },
    watch:{
        currentValue(newVal){
            this.$emit('changeValue', newVal)
        }
    }
}
</script>
<template>
    <div class="mangosteen-title-editor">
        <label :for="labelFor" class="mangosteen-title-editor__label form-label">{{title}}</label>
        <input v-model="currentValue" type="text" class="mangosteen-title-editor__input form-control" @input="countCharacters" :id="labelFor" :placeholder="placeholder" :required="required">
        <div class="mangosteen-title-editor__count">
            {{characterCount}}/255
        </div>
    </div>
</template>
<style lang="scss" scoped>
.mangosteen-title-editor{
    position: relative;
    &__label{
        margin-bottom: 4px;
        font-size: 14px;
        color: rgba(var(--nav-link-inerhit), 0.78);
    }
    &__count{
        position: absolute;
        bottom: 9px;
        right: 12px;
        color: rgba(var(--nav-link-inerhit), 0.78) !important;
        font-size: 14px;

    }
    &__input{
        height: 40px;
        box-shadow: none !important;
        color: rgba(var(--nav-link-inerhit), 0.78) !important;
        caret: rgba(var(--nav-link-inerhit), 0.78);
        border-color: rgba(var(--nav-link-inerhit), 0.18);
        font-weight: 500;
        padding-right: 80px;
        &::placeholder{
            border-color: rgba(var(--nav-link-inerhit), 0.28);
            font-weight: 400;
        }
        &:hover{
            border-color: rgba(var(--nav-link-inerhit), 0.48);
        }
        &:focus{
            box-shadow: 0 2px 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent !important;
            border-color: var(--vuexy-purple) !important;
        }
    }
}
</style>