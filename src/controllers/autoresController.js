import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res) => {
    autores.find()
      .then((autores, err) => {res.status(200).json(autores)
    })
  }
  
  static buscarAutorPorId = (req, res) => {
    const id = req.params.id;

    autores.findById(id)
      .then((autores) => {
        res.status(200).send(autores)
      })
      .catch((err) => {
        res.status(404).send({message: `${err.message} - id do autor não localizado.`})
      })
  }

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body)

    autor.save()
      .then(autor => {res.status(201).send(autor.toJSON())})
      .catch(err => {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar autor.`})
      })
  }

  static atualizarAutor = (req,res) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id, {$set: req.body})
      .then((autor) =>{
        if(!autor) {
          return res.status(404).send({ message: 'Autor não encontrado' });
        }
        res.status(200).send({message: 'Autor atualizado com sucesso.'});
      })
      .catch((err) =>{
        res.status(500).send({message: `Não foi possível atualizar o autor!`})
      })
  }

  static removerAutor = (req,res) => {
    const id = req.params.id

    autores.findByIdAndRemove(id)
      .then((autor) =>{
        if(!autor){
          return res.status(404).send({ message: 'Autor não encontrado' });
        }
        res.status(204).send({message: 'Autor excluído com sucesso!'});
      })
      .catch((err) => {
        res.status(500).send({message: `Não foi possível remover o autor!`})
      })
        
  }
}

export default AutorController