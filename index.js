const express = require('express')
//Import de la dépendance morgan(pour les middlewares)
const morgan = require('morgan')
//importation de la favicon avec serve-favicon
const favicon = require('serve-favicon')
//import bodyPArser
const bodyParser = require('body-parser')
const sequelize = require('./src/database/sequelize')




const app = express()
const port = 3000





//MIDDLEWARE
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

//Ici, nous placerons nos futurs points de terminaison
//require('./src/routes/findAllPokemon')(app)
//require('./src/routes/findPokemonByPk')(app)
//require('./src/routes/createPokemon')(app)
//require('./src/routes/updatePokemon')(app)
//require('./src/routes/deletePokemon')(app)
require('./src/routes/routes')(app)
require('./src/routes/login')(app)

//On ajoute la gestionn des erreurs
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer un autre url.'
    res.status(404).json(message)
})



app.listen(port, () => console.log('Notre application NODE est démarrée sur : http://localhost : '+port))