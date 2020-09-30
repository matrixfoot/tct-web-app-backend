const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/user');
const affilesRoutes = require('./routes/affiles');
const userRoutes = require('./routes/user');
mongoose.connect('mongodb+srv://matrixfoot:tct1234@cluster0.di2ih.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  
  const app = express();
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization,x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(async (req, res, next) => {
    if (req.headers["x-access-token"] ) {
      try {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, 'RANDOM_TOKEN_SECRET');
        // If token has expired
        if (exp < Date.now().valueOf() / 1000) {
          return res.status(401).json({
            error: "JWT token has expired, please login to obtain a new one"
          });
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
  app.use('/api/affiles', affilesRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/api/users', userRoutes);
  app.use(express.static(path.join(__dirname, 'images')));
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'adherentsfiche'));
  })
  
 
  
  

module.exports = app;