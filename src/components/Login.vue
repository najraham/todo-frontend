<template>
    <div class="pt-5 mt-5">
        <form @submit.prevent="login" class=" container col-md-5 mt-5">
            <div class="form-group">
                <label for="email">Email address</label>
                <input v-model="form.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <button @click="login()" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import { Form } from 'vform'
import router from "../router";

export default {
    name: 'Login',
    data() {
        return {
            form: new Form({
                email:"",
                password:""
            })
        }
    },
    mounted() {
        if(localStorage.getItem("token") === null)
        {
            router.push("/login")
        }
    },
    methods: {
        login() {
            this.form.post('http://localhost:5000/api/login')
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                router.push('todos');
            })
        }
    }
}
</script>
