import  http  from './config'


export default	{

	salvar:(pessoa)=>{
		return http.post('pessoas',pessoa);
  },
    
	atualizar:(pessoa)=>{
		return http.put('pessoas/'+pessoa.id,pessoa);
  },

 
  listar:()=>{
		return http.get('pessoas')
  },
    
   apagar:(pessoa)=>{
		return http.delete('pessoas/'+pessoa.id);
	},
}