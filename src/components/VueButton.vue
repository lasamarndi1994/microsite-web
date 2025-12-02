<template>
    <button :type="'type'" class="btn btn-secondary fs-14" :class="classStyle"  v-if="!progress" :disabled="isDisabled">
        {{ title }} 
    </button>

    <button type="button" class="btn btn-secondary text-white  fs-14" :class="classStyle" disabled v-else>
        <span class="spinner-border spinner-border-sm  " role="status" aria-hidden="true"></span>
        Processing...
    </button>
    
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: "Continue"
    },
    type:{
        type: String,
        default: "button"
    },
    progress: {
        type: Boolean,
        default: false
    },
    classStyle:{
        type: String,
        default: ""
    },
    fontSize:{
        type:Number,
        default: 14
    },
    isDisabled:{
        type:Boolean,
        default:false
    }
});
</script>