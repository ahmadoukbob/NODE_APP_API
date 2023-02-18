const { User } = require('../database/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const privatekey = require('../authentification/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => {
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {

        if(!user){
            const message = "L'utilisateur n'existe pas !"
            return res.status(404).json({message})
        }
        if(!isPasswordValid) {
          const message = 'Le mot de passe est incorrect';
          return res.status(401).json({message})
        }

        //JWT
        const token = jwt.sign(
            { userId : user.id },
            privatekey,
            { expiresIn: '24h' }
            )

        const message = "L'utilisateur est connecté avec succès";
        return res.json({ message, data:user, token })
      })
    })
    .catch(error => {
        const message = "L'utilisateur n'a pas été connecté. Please retry";
        return res.json({ message, data: error })
    })
  })
}