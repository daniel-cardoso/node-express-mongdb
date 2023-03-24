import livros from '../models/Livro.js'

class LivroController {
  static listarLivros = (req, res) => {
    livros.find()
      .then((livros, err) => {res.status(200).json(livros)
    })
  }
  
  static buscarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros.findById(id)
      .then((livros) => {
        res.status(200).send(livros)
      })
      .catch((err) => {
        res.status(404).send({message: `${err.message} - id do livro não localizado.`})
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
      .then((err) =>{
        if(!err){
          res.status(200).send({message: 'Livro atualizado com sucesso!'})
        }
      })
      .catch((err) =>{
        res.status(500).send({message: `${err.message} - Não foi possível atualizar o livro!`})
      })

    
  }

  static removerLivro = (req,res) => {
    const id = req.params.id

    livros.findByIdAndRemove(id)
      .then((err) =>{
        if(!err){
          res.status(204).send({message: 'Livro excluído com sucesso!'})
        }
      })
      .catch((err) => {
        res.status(500).send({message: `${err.message} - Não foi possível remover o livro!`})
      })
        
  }
}

export default LivroController
