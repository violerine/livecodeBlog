<template>
<div class="category">
    <Navbar/>
    <div class="container">
    <Article v-for="(article,index) in articles" :key="index" :article="article" />
    </div>  
</div>
    
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Article from '@/components/Article.vue'
import {mapActions,mapState} from 'vuex'


export default {
    components:{
        Navbar,
        Article
    },
    data:function(){
        return{
            articles:'',
            pageParam:this.$route.params.category,
            page:''
        }
    },
    created:function(){
        this.getArticlesByCategory()
    },
    watch:{
        pageParam:function(){
            this.getArticlesByCategory(pageParam)
            console.log("DI WATCH BERUBAH GA",this.pageParam)
        }
    },
    methods:{
        getArticlesByCategory(params){
            var getCategory = this.$route.params.category
            axios.get(`http://localhost:8000/articles/category/${getCategory}`)
            .then(({data})=>{
                this.articles=data
                // commit('articlePerCategory',data)
                console.log("GET DATA ARTICLES PER CATEGOry",data)
            })
            .catch(err=>{
                console.log(err)
            })
  },

    }
}
</script>

<style scoped>



/* .quotes{
  position: fixed;
  margin-top: 30px;
} */

</style>

