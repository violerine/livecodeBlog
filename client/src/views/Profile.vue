<template>
  <div class="home">
    <Navbar/>
    <section class="hero is-info is-medium is-bold">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">Here you can see what you've written <br></h1>
            </div>
        </div>
    </section>
 

  <div class="container">
    <section class="articles">
      <div class = "column is-12 ">
          <button @click="activateModal" class="button is-info">Add new article</button>
     
    <!-- <Article v-for="(article,index) in articles" :key='index' :article="article"></Article> -->
    <!-- {{articles}} -->
    <div class="container">
        <div class="columns is-multiline">
            <div v-for="(article,index) in articlesByUser" :key="index" in class="column is-half">
            <Card :article="article"/>
            </div>
        </div>
    </div>
      </div>



<!--MODAL-->

<div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Create Article</p>
      <button @click="closeModal" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <div class="control">
          Title : 
          <input v-model="title" class="input is-info" type="text" placeholder="Title">
        </div>
      </div>
       <div class="field">
        <div class="control">
Category:<br>
<!--DROPDOWN-->

<div class="select">
<select v-model="category">
  <option disabled value="">Please select category</option>
  <option>
      Politics
  </option>
  <option>News</option>
  <option>Health</option>
</select>
</div><br><br>

<!-- DROPDOWN END-->

<!--DROPDOWN-->
Author: <br>
<div class="select">
<select v-model="author">
  <option disabled value="">Please select author</option>
  <option>
      Erwin
  </option>
  <option>Ryan</option>
  <option>Icha</option>
</select>
</div><br>

<!-- DROPDOWN END-->

        </div>
      </div>

      <div class="field">
        <div class="control">
          Content : 
          <textarea v-model="content" class="textarea" placeholder="e.g. Hello world"></textarea>
        </div>
      </div>
      <div class="file has-name is-fullwidth">
        <label class="file-label">
          <input  @change="previewFile"  class="file-input" type="file" name="resume">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            {{this.filename}}
          </span>
        </label>
      </div>
      <p>{{pleasewait}}</p>
    </section>
    <footer class="modal-card-foot">
      <button @click="addNewArticle" class="button is-warning">Create Article</button>
      <button @click="closeModal" class="button">Cancel</button>
    </footer>
  </div>
</div>


<!--MODAL END-->
     
    </section>
  </div>
  </div>

  
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Article from '@/components/Article.vue'
import Card from '@/components/Card.vue'
import { mapActions, mapState} from 'vuex'

export default {
    components:{
        Navbar,
        Card
    },
    data:function(){
        return{
            formdata: new FormData(),
            title:'',
            author:'',
            category:'',
            content:'',
            pleasewait:'',
            filename:''

        }
    },
    
    created:function(){
        this.getArticlesByUser()
        console.log("ARTICLE BY USER",this.articlesByUser)
    },
    computed:{
        ...mapState([
          'articlesByUser'  
        ])
    },
    methods:{
        ...mapActions([
            'getArticlesByUser'
        ]),
        previewFile(file){
          var filedata = file.target.files[0]
          this.filename = filedata.name
          this.formdata.append('image',filedata)
        },
        activateModal(){
          $(".modal").addClass("is-active")
        },
        closeModal(){
          $(".modal").removeClass("is-active")
        },
        addNewArticle(){
          console.log(this.formdata)
          let self=this
          if (this.formdata) {
            self.formdata.set('userid',localStorage.getItem('userid'))
            self.formdata.set('title',self.title)
            self.formdata.set('content',self.content)
            self.formdata.set('author',self.author)
            self.formdata.set('category',self.category)
          } else {
            self.formdata.append('userid',localStorage.getItem('userid'))
            self.formdata.append('title',self.title)
            self.formdata.append('content',self.content)
            self.formdata.set('author',self.author)
            self.formdata.set('category',self.category)
          }

          self.pleasewait='Please wait...'
            var config = {
                headers: {
                    'auth': localStorage.getItem('token')
                } 
            };
          axios.post('http://localhost:8000/articles/add',self.formdata,config)
          .then(article=>{
            console.log("DAPET GA",article);
            self.pleasewait=''
            self.title=''
            self.content=''
            self.category=''
            self.author=''
            self.formdata.delete('title')
            self.formdata.delete('content')
            self.formdata.delete('author')
            self.formdata.delete('category')
            self.formdata.delete('image')
            self.filename=''
            console.log("FORM DATANYA KEDELETE ga",this.formdata.entries())
            // for (var pair of this.formdata.entries()) {
            //     console.log("MUNCUL Ga",pair[0]+ ', ' + pair[1]); 
            // }
            swal('New Article Created')
            self.closeModal()
            self.getArticlesByUser()
          })
          .catch(err=>{
            console.log(err);
          })
        },
    }
}
</script>

