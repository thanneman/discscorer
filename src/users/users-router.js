const express = require('express')
const xss = require('xss')
const path = require('path')
const usersRouter = express.Router()
const jsonBodyParser = express.json()
const UsersService = require('./users-service')
const GamesService = require('../games/games-service')
const { requireAuth } = require('../middleware/jwt-auth')

const jsonParser = express.json()

const serializeUser = user => ({
    user_id: user.id,
    email: xss(user.email),
    password: xss(user.password),
    date_created: new Date(user.date_created),
})

const serializeGame = game => ({
    id: game.id,
    course_name: xss(game.course_name),
    date: game.date,
    course_par: game.course_par,
    front_score: game.front_score,
    back_score: game.back_score,
    notes: xss(game.notes),
  })
// All users
usersRouter
    .route('/')
    .get((req, res, next) => {
        UsersService.getAllUsers(req.app.get('db'))
            .then(users => {
                res.json(users.map(serializeUser))
            })
            .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
        const { email, password } = req.body
        for (const field of ['email', 'password'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Email or password required`
                })
        const passwordError = UsersService.validatePassword(password)

        if (passwordError)
            return res.status(400).json({ error: passwordError })

        UsersService.hasUserWithUserName(
            req.app.get('db'),
            email
        )
            .then(hasUserWithUserName => {
                if (hasUserWithUserName)
                    return res.status(400).json({ error: `Username already taken` })

                return UsersService.hashPassword(password)
                    .then(hashedPassword => {
                        const newUser = {
                            email,
                            password: hashedPassword,
                        }
                        return UsersService.insertUser(
                            req.app.get('db'),
                            newUser
                        )
                            .then(user => {
                                res
                                    .status(201)
                                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                    .json(UsersService.serializeUser(user))
                            })
                    })
            })
            .catch(next)
    })

// Individual users by id
usersRouter
    .route('/:user_id')
    .all((req, res, next) => {
        const { user_id } = req.params;
        UsersService.getById(req.app.get('db'), user_id)
            .then(user => {
                if (!user) {
                    return res
                        .status(404)
                        .send({ error: { message: `User does not exist.` } })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        res.json(UsersService.serializeUser(res.user))
    })
    .delete((req, res, next) => {
        const { user_id } = req.params;
        UsersService.deleteUser(
            req.app.get('db'),
            user_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

// Individual user, all games -- GET (all), POST, DELETE
usersRouter
    .route('/:user_id/games')
    .all(requireAuth)
    .all((req, res, next) => {
        const { user_id } = req.params;
        UsersService.getGamesById(req.app.get('db'), user_id)
            .then(game => {
                if (!game) {
                    return res
                        .status(404).json({ error: { message: `No games exist.` } })
                }
                res.game = game
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        res.json(res.game)
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
                    .json(serializeGame(game))
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        const { user_id } = req.params;
        UsersService.deleteUser(
            req.app.get('db'),
            user_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

// Individual user, individual game -- GET (game by id), DELETE (game by id)
usersRouter
    .route('/:user_id/game/:game_id')
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
    .get((req, res) => {
        res.json(res.game)
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

usersRouter
    .route('/:user_id/stats')
    .all(requireAuth)
    .all((req, res, next) => {
        const { user_id, course_name } = req.params;
        UsersService.getUserStats(req.app.get('db'), user_id, course_name)
            .then(data => {
                if (!data) {
                    return res
                        .send({ error: { message: `No statistic recorded yet.` } })
                }
                res.data = data
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        res.json(res.data)
    })

module.exports = usersRouter