import livros from '../models/Livro.js'

class LivroController {
  static listarLivros = (req, res) => {
    livros.find()
      .populate('autor')
      .then((livros, err) => {res.status(200).json(livros)
    })
  }
  
  static buscarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros.findById(id)
      .populate('autor', 'nome')
      .then((livros) => {
        res.status(200).send(livros)
      })
      .catch((err) => {
        res.status(404).send({message: `Id do livro não localizado.`})
      })
  }

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body)

    livro.save()
      .then(livro => {res.status(201).send(livro.toJSON())})
      .catch(err => {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.`})
      })
  }

  static atualizarLivro = (req,res) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, {$set: req.body})
      .then((livro) =>{
      if(!livro) {
        return res.status(404).send({ message: 'Livro não encontrado' });
      }
      res.status(200).send({message: 'Livro atualizado com sucesso.'});
      })
      .catch((err) =>{
        res.status(500).send({message: `${err.message} - Não foi possível atualizar o livro!`})
      })
      
    
  }

  static removerLivro = (req,res) => {
    const id = req.params.id

    livros.findByIdAndRemove(id)
    .then((livro) =>{
      if(!livro) {
        return res.status(404).send({ message: 'Livro não encontrado' });
      }
      res.status(200).send({message: 'Livro removido com sucesso.'});
    })
      .catch((err) => {
        res.status(500).send({message: `${err.message} - Não foi possível remover o livro!`})
      })
        
  }

  static listarLivrosPorEditora = (req,res) => {
    const editora = req.query.editora

    livros.find({'editora': editora})
      .then((localizado) =>{
        if(!localizado || localizado.length == 0){
          return res.status(404).send({ message: 'Editora não encontrada' });
        }
        res.status(200).send(localizado)
      })
      .catch((err)=>{
        return res.status(500).send({ message: `${err.message}`});
      })
     
      
  }
}

export default LivroController
