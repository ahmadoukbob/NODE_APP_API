const { Pokemon } = require('../database/sequelize')
const auth = require('../authentification/auth')

//Créer un pokemon
module.exports = (app) => {
    app.post('/api/pokemons', auth, (req, res) => {
      Pokemon.create(req.body)
        .then(pokemon => {
          const message = 'Le pokémon '+req.body.name+ ' a bien été crée.'
          res.json({ message, data: pokemon })
        })
        .catch(error => {
          const message = "La liste des pokémons n'a pas pu être ajoutée. Réessayez dans quelques instants."
          res.status(500).json({message, data:error})
        })
    })
}

//Modifier un pokemon
module.exports = (app) => {
    app.put('/api/pokemons/:id', auth, (req, res) => {
      const id = req.params.id
      Pokemon.update(req.body, {
        where: { id: id }
      })
      .then(_ => {
        return Pokemon.findByPk(id).then(pokemon => {
          if(pokemon === null){
            const message = "Le pokemon demandé n'existe pas. Réessayez avec un autre identifiant"
            return res.status(404).json({message})
          }
          const message = 'Le pokémon '+pokemon.name+' a bien été modifié.'
          res.json({message, data: pokemon })
        })
        .catch(error => {
          const message = "La liste des pokémons n'a pas pu être modifiée. Réessayez dans quelques instants."
          res.status(500).json({message, data:error})
        })
      })
    })
}

//Supprimer un pokemon
module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req, res) => {
      Pokemon.findByPk(req.params.id).then(pokemon => {
        if(pokemon === null){
          const message = "Le pokemon demandé n'existe pas. Réessayez avec un autre identifiant"
          return res.status(404).json({message})
        }
  
        const pokemonDeleted = pokemon;
        Pokemon.destroy({
          where: { id: pokemon.id }
        })
        .then(_ => {
          const message = 'Le pokémon avec l identifiant n°'+pokemonDeleted.id+'a bien été supprimé.'
          res.json({message, data: pokemonDeleted })
        })
      })
      .catch(error => {
        const message = "Le pokémon n'a pas pu être supprimé. Réessayez dans quelques instants."
        res.status(500).json({message, data:error})
      })
    })
}

//Trouver l'ensemble des pokemons
module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
      Pokemon.findAll()
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants."
          res.status(500).json({message, data:error})
        })
    })
}

//FindAllByPK
module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, (req, res) => {
      Pokemon.findByPk(req.params.id)
        .then(pokemon => {
          const message = 'Un pokémon a bien été trouvé.'
          res.json({ message, data: pokemon })
        })
    })
}