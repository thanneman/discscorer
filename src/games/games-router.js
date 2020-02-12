const path = require('path')
const express = require('express')
const xss = require('xss')
const GamesService = require('./games-service')
const { requireAuth } = require('../middleware/jwt-auth')

const gamesRouter = express.Router()
const jsonParser = express.json()

const serializeGame = game => ({
  id: game.id,
  course_name: xss(game.course_name),
  date: game.date,
  course_par: game.course_par,
  front_score: game.front_score,
  back_score: game.back_score,
  notes: xss(game.notes),
})

// All users GET, POST
gamesRouter
  .route('/')
  .get((req, res, next) => {
    GamesService.getAllGames(req.app.get('db'))
      .then(games => {
        res.json(games)
      })
      .catch(next)
  })
  .post(requireAuth, jsonParser, (req, res, next) => {
    const { course_name, course_par, front_score, back_score, notes } = req.body
    const newGame = { course_name, course_par, front_score, back_score, notes }

    for (const [key, value] of Object.entries(newGame))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newGame.user_id = req.user.id

    GamesService.insertUserGame(
      req.app.get('db'),
      newGame
    )
      .then(game => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${game.id}`))
          .json(serializeGame(game))
      })
      .catch(next)
  })

  gamesRouter	
  .route('/:game_id')	
  .all(requireAuth)	
  .all((req, res, next) => {	
    GamesService.getById(	
      req.app.get('db'),	
      req.params.game_id	
    )	
      .then(game => {	
        if (!game) {	
          return res.status(404).json({	
            error: { message: `Game does not exist` }	
          })	
        }	
        res.game = game	
        next()	
      })	
      .catch(next)	
  })	
  .get((req, res, next) => {	
    res.json(serializeGame(res.game))	
  })	
  .delete((req, res, next) => {	
    GamesService.deleteGame(	
      req.app.get('db'),	
      req.params.game_id	
    )	
      .then(() => {	
        res.status(204).end()	
      })	
      .catch(next)	
  })

module.exports = gamesRouter