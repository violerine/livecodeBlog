import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles:'',
    articlesByUser:'',
    articlesByCategory:''
  },
  mutations: {
    allArticles(state,payload){
      state.articles=payload
    },
    articlesPerUser(state,payload){      
      state.articlesByUser=payload
    },
    articlePerCategory(state,payload){
      state.articlesByCategory=payload
    }
  },
  actions: {
    getAllArticles({commit}){
      axios.get('http://localhost:8000/articles/')
      .then(({data})=>{
        commit('allArticles',data)
      })
      .catch(err=>{
        console.log("ERRORNYA DI STORE GET ALL ARTICLES",err)
      })
    },
    getArticlesByUser({commit}){
      const user= localStorage.getItem('userid')
      const token= localStorage.getItem('token')
      axios.get(`http://localhost:8000/articles/${user}`)
      .then(({data})=>{
        console.log("DATA DI GET ARTICLES BY USER",data)
        commit('articlesPerUser',data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getArticlesByCategory({commit},category){
      var getCategory = this.$route.params.category
      axios.get(`http://localhost:8000/articles/category/${getCategory}`)
      .then(({data})=>{
          commit('articlePerCategory',data)
          console.log("GET DATA ARTICLES PER CATEGOry",data)
      })
      .catch(err=>{
          console.log(err)
      })
  },
  }
})
