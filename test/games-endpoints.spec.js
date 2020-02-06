const app = require('../src/app');
const knex = require('knex');
const helpers = require('./test-helpers');

describe(`Games service object`, function() {
 let db

 const testUsers = helpers.makeUsersArray();
 const testGames = helpers.makeGamesArray();

 before('make knex instance', () => {
  db = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })
  app.set('db', db)
 })

 after('disconnect from db', () => db.destroy());

 beforeEach('clean the table', () => db.raw(
  `TRUNCATE
    games,
    users
    RESTART IDENTITY CASCADE`
  )
  .then(() => {
  // insert test users into users table
    return db
      .into('users')
      .insert(testUsers)
      .then(() => {
        db.raw(
          `SELECT setval('users_id_seq', ?)`,
          [testUsers[testUsers.length - 1].id],
        )
      })
  })
  .then(() => {
  // insert test games into games table
    return db
      .into('games')
      .insert(testGames)
      .then(() => {
        db.raw(
          `SELECT setval('games_id_seq', ?)`,
          [testGames[testGames.length - 1].id],
        )
      })
  })
 );


 // post game
 describe('POST /api/games', () => {
  it(`adds game to game list, responding with 201`, () => {
    const newGame = {
        user_id: 1,
        course_name: 'Test',
        date: '2029-01-22T16:28:32.615Z',
        course_par: 50,
        front_score: 25,
        back_score: 25,
        notes: 'Test note',
    }
  return supertest(app)
    .post('/api/games')
    .set('Content-Type', 'application/json')
    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
    .send(newGame)
    .expect(201)
  })
 })

 //getgames by user id
 describe(`GET /api/games/user/:user_id`, () => {
  context(`Given no games for user id`, () => {
    it(`responds with 404`, () => {
    const userId = 123
    return supertest(app)
      .get(`/api/games/user/${userId}`)
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(404)
      })
    })
    context('Given there are games in the database', () => {
      it('responds with 200 and the specified game', () => {
        const gameId = 1
        const testUserId = testUsers[0].id
        testGames[0].id = 1
        return supertest(app)
          .get(`/api/games/user/${testUserId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, testGames)
    })
  })
 })

 // get game by id
 describe(`GET /api/games/:game_id`, () => {
  context(`Given no games`, () => {
    it(`responds with 404`, () => {
      const gameId = 123
      return supertest(app)
        .get(`/api/games/${gameId}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(404, { error: { message: "Game does not exist"} })
      })
    })
    context('Given there are games in the database', () => {
      it('responds with 200 and the specified game', () => {
        const gameId = 1
        const testGame = testGames[0]
        return supertest(app)
          .get(`/api/games/${gameId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200,testGame)
    })
  })
 })

 // update game
 describe('PATCH /api/games/:game_id', () => {
  it(`responds 204 when updated field is submitted`, () => {
    return supertest(app)
      .patch(`/api/games/1`)
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .send({ company: '123 Tech' })
      .expect(204)
  })
 })

 // delete game
 describe(`DELETE api/games/:game_id`, () => {
  it('responds with 204', () => {
  const gameId = 1
    return supertest(app)
      .delete(`/api/games/${gameId}`)
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(204)
  })
 })
})