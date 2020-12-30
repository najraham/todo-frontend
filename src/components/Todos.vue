<template>
    <div class="container">

        <form class="card container col-md-7 mt-4">
            <h4 class="mt-3 mb-3">Add Item</h4>
            <div class="row pr-3">
                <span for="email" class="col-md-2 pt-1"><b>Title</b> : </span>
                <input v-model="todo.title" type="email" class="form-control col-md-10" id="email" aria-describedby="emailHelp" placeholder="Enter title">
            </div>
            <div class="container mt-3">
            <button type="button" class="btn btn-success float-right col-md-2"  @click="addTodo()"><i class="fa fa-plus-circle mr-3" aria-hidden="true"></i>Add</button>

            </div>
        </form>
  
        <h1>Todo List</h1>

        <ul class="list-group list-group-flush mt-5">
            <li v-for="(todo) in todos" :key="todo._id" class="list-group-item">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" @click="changeStatus(todo._id)" :id="todo._id" v-model="todo.complete">
                    <label class="custom-control-label" :for="todo._id"><h5>{{todo.title}}</h5></label>
                    <button type="button" class="btn btn-danger float-right col-md-2"  @click="deleteTodo(todo._id)"><i class="fa fa-trash-alt mr-3" aria-hidden="true"></i>Delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import Form from 'vform'

export default {
    name: 'Todos',
    data() {
        return {
            todos:[],
            showModal: false,
            todo: new Form({
                title:""
            }) 
        }
    },
    mounted() {
        this.getTodos()
    },
    methods: {
        getTodos() {
            axios.get('http://localhost:5000/api/todos', {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            .then((res) => {
                this.todos = res.data
            })
        },
        changeStatus(id) {
            axios.put(`http://localhost:5000/api/todos/${id}`,{}, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
        },
        addTodo() {
            this.todo.post('http://localhost:5000/api/todos/', {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            .then(() => {
                this.getTodos()
            })
        },
        deleteTodo(id) {
            axios.delete(`http://localhost:5000/api/todos/${id}`, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            .then(() => {
                this.getTodos()
            })
        }
    }
}
</script>
