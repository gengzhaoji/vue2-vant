<template>
    <van-overlay
        :show="show"
        class="juzhong"
    >
        <div>
            <van-loading
                size="24px"
                vertical
            >加载中...</van-loading>
        </div>
    </van-overlay>
</template>
 
<script>
export default {
    name: 'login',
    props: {
        show: false
    }
}
</script>
