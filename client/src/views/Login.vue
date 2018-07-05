<template>
       <section class="hero is-fullheight is-default is-bold">
        <div class="hero-head">
            <Navbar/>
        </div>
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="columns is-vcentered">
                    <div class="column is-5">
                        <h1 class="title is-2">
                            Write about your Livecoding
                        </h1>
                        <h2 class="subtitle is-4">
                            Tell us how hard it is
                        </h2>
                        <br>
                        <p class="has-text-centered">
                            <a class="button is-medium is-info is-outlined">
                               <router-link to='/'> Check Us Out!</router-link>
                            </a>
                        </p>
                        <!-- <figure class="image is-4by3">
                            <img src="https://picsum.photos/800/600/?random" alt="Description">
                        </figure> -->
                    </div>
                    <div class="column is-6 is-offset-1">
                        <div class="box">
                        <h3 class="title has-text-black">Login</h3>
                            <form>
                            <div class="field">
                                <div class="control">
                                    <input v-model="username" class="input is-large" type="text" placeholder="Your Username" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input v-model="password" class="input is-large" type="password" placeholder="Your Password">
                                </div>
                            </div>

                            <button type="button" @click="login" class="button is-block is-warning is-large is-fullwidth">Login</button>
                            
                        </form>
                        <br>
                        <a><router-link to="/register">Don't Have an Account? Register Here</router-link></a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>



<script>

import Navbar from '@/components/Navbar.vue'


export default {
    components:{
        Navbar
    },
    data: function () {
        return {
            username: '',
            password: ''
        }
    }, 
    methods: {
        login(){
                axios.post('http://localhost:8000/login',{
                    username :this.username,
                    password :this.password 
                })
                .then(({data})=>{
                    console.log("USER",data)
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('userid',data._id)
                    localStorage.setItem('username',data.username)
                    console.log("NAMANYA DAPET GA ",data.nama)
                    localStorage.setItem('name',data.nama)
                    this.$router.push('/')
                })
                .catch(err=>{
                    alert('incorrect username/password')
                    console.log(err)
                })
            },
        
    }
}
</script>
