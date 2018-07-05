<template>
<div class="author">
    <Navbar/>
    <Article/>
</div>
    
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Article from '@/components/Article.vue'

export default {
    components:{
        Navbar,
        Article
    }
}
</script>
