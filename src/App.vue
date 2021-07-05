/* eslint-disable no-console */
<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Pessoas</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="pessoa.nome" >
          <label>Sexo</label>
          <input type="text" placeholder="Sexo" v-model="pessoa.sexo" >
          <label>Email</label>
          <input type="text" placeholder="Email" v-model="pessoa.email" >
          <label>CPF</label>
          <input type="text" placeholder="CPF" v-model="pessoa.cpf" >
          <label>Data Nascimento</label>
          <input type="text" placeholder="Data Nascimento" v-model="pessoa.dataNascimento" >
          <label>Naturalidade</label>
          <input type="text" placeholder="Naturalidade" v-model="pessoa.naturalidade" >
           <label>Nacionalidade</label>
          <input type="text" placeholder="Nacionalidade" v-model="pessoa.nacionalidade" >

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>SEXO</th>
            <th>EMAIL</th>
            <th>CPF</th>
            <th>Data Nascimento</th>
            <th>Naturalidade</th>
            <th>Nacionalidade</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="pessoa of pessoas" :key="pessoa.id">

            <td>{{ pessoa.nome }}</td>
            <td>{{ pessoa.sexo }}</td>
            <td>{{ pessoa.email }}</td>
            <td>{{ pessoa.cpf }}</td>
            <td>{{ pessoa.dataNascimento }}</td>
            <td>{{ pessoa.naturalidade }}</td>
            <td>{{ pessoa.nacionalidade }}</td>           
            <td>
              <button @click="editar(pessoa)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(pessoa)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import pessoa from './services/pessoa'

export default {
  name: 'app',
  data () {
    return {
      pessoa:{
        id: '',
        nome: '',
        sexo: '',
        email: '',
        dataNascimento: '',
        cpf: '',
        naturalidade: '',
        nacionalidade: ''
      },
      pessoas: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    
    listar(){
      pessoa.listar().then(resposta => {
        this.pessoas = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.pessoa.id){

        pessoa.salvar(this.pessoa).then(resposta => {
          this.pessoa = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        pessoa.atualizar(this.pessoa).then(resposta => {
          this.pessoa = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
      

    },

    editar(pessoa){
      this.pessoa = pessoa
    },

    remover(p){

      if(confirm('Deseja excluir a pessoa?')){

        pessoa.apagar(p).then(resposta => {
          this.pessoa = {}
          this.errors = {}
          alert('Excluído com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    }
  }

}
</script>

<style>



</style>
