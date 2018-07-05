<template>
<div class ="itemcard">
  <div class="card">
  <div class="card-image">
    <figure class="image is-4by4">
      <img class="forimage" v-bind:src=article.pic_url alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
      <!-- <div class="content"> -->
        <p class="title is-4">{{article.title}}</p>
      <!-- </div> -->

        <p class="title is-6">{{article.content}}</p>
        Category: 
        {{article.category}}<br>
        Written by:
        {{article.author}}<br>

        <br><br>
        <!-- <button  @click="addToCart(item)" class="button">Add to Cart</button> -->
        <button  @click="deleteArticle(article._id)" class="button is-danger">Delete Article</button> 
        <button   class="button is-link">Update Article</button>

  </div>
</div>

</div>


</template>



<script>

import {mapState, mapActions} from 'vuex'
export default {
    props:['article'],
    data:function(){
        return{
         
        }
    },
    methods:{
        ...mapActions([
            'getArticlesByUser'
        ]),
        deleteArticle(article){
        console.log("JALAN GA")
          var config = {
            headers: {
                'auth': localStorage.getItem('token')
            } 
          }
         axios.delete(`http://localhost:8000/articles/delete/${article}`,config)
            .then(article=>{
                console.log("GA MASUK SINI YA")
                this.getArticlesByUser()
                
            })
            .catch(err=>{
                console.log(err)
            })

      }
    },
        
}
</script>

<style scoped>
.forimage{
    max-height: 300px;
    min-height: 300px;

}



.itemcard{
    padding-top: 30px;
}


</style>
