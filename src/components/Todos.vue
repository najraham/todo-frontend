<template>
    <div class="container">
        <form class="card container col-md-7 mt-3">
            <h4 v-if="edit" class="mt-3 mb-3">Edit Item</h4>
            <h4 v-else class="mt-3 mb-3">Add Item</h4>
            <div class="row pr-3">
                <span for="email" class="col-md-2 pt-1"><b>Title</b> : </span>
                <input v-model="todo.title" type="email" class="form-control col-md-10" id="email" aria-describedby="emailHelp" placeholder="Enter title">
            </div>
            <div class="container mt-3">
                <button v-if="edit" type="button" class="btn btn-primary float-right col-md-2 mb-2"  @click="editTodo()"><i class="fa fa-edit" aria-hidden="true"></i>Edit</button>
                <button v-else type="button" class="btn btn-success float-right col-md-2 mb-2"  @click="addTodo()"><i class="fa fa-plus-circle mr-1" aria-hidden="true"></i>Add</button>
            </div>
        </form>
  
        <h2 class="mt-2">Todo List</h2>

        <ul class="list-group list-group-flush mt-3">
            <li v-for="(todo) in todos" :key="todo._id" class="list-group-item">
                <div class="row">
                    <div class="custom-control custom-checkbox col-md-10">
                        <input type="checkbox" class="custom-control-input" @click="changeStatus(todo._id)" :id="todo._id" v-model="todo.complete">
                        <label class="custom-control-label" :for="todo._id"><h5>{{todo.title}}</h5></label>
                    </div>
                    <div class="col-md-2">
                        <button type="button" class="btn btn-secondary ml-4"  @click="loadModalForEdit(todo._id)"><i class="fa fa-edit" aria-hidden="true"></i></button>
                        <button type="button" class="btn btn-danger float-right"  @click="deleteTodo(todo._id)"><i class="fa fa-trash-alt" aria-hidden="true"></i></button>
                    </div>
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
            todo: new Form({
                title:""
            }) ,
            edit:false
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
            axios.patch(`http://localhost:5000/api/todos/${id}`,{}, {
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
        },
        loadModalForEdit(id) {
            let todoItem = this.todos.find(todo => todo._id === id)
            this.todo.title = todoItem.title
            this.todo._id = todoItem._id
            this.edit = true
        },
        editTodo() {
            this.todo.put(`http://localhost:5000/api/todos/${this.todo._id}`, {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            .then(() => {
                this.getTodos()
                this.edit = false
                this.todo.reset()
            })
        }
    }
}
</script>
