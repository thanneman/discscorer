const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function() {
  let db

  let testUsers = [
    {
      // id: 1,
      user_name: 'kpassarella',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      // id: 2,
      user_name: 'dexner',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z'
    },
    {
      // id: 3,
      user_name: 'mghere',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z'
    }
  ]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db.raw(`TRUNCATE games, users RESTART IDENTITY CASCADE`));

  before('insert users', () => db.into('users').insert(testUsers));

  afterEach('clean the table', () => db.raw(`TRUNCATE games, users RESTART IDENTITY CASCADE`));

  describe(`POST /api/users`, () => {
    context(`Happy path`, () => {
      it(`responds 201, serialized user, storing bcryped password`, () => {
        const newUser = {
          user_name: 'test_user_name',
          password: '11AAaa!!',
        }
        return supertest(app)
          .post('/api/users')
          .set('Content-Type', 'application/json')
          .set('Authorization', helpers.makeAuthHeader(newUser))
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id')
            expect(res.body.user_name).to.eql(newUser.user_name)
            expect(res.body).to.not.have.property('password')
            expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
          })
          .expect(res =>
            db
              .from('users')
              .select('*')
              .where({ id: res.body.id })
              .first()
              .then(row => {
                expect(row.user_name).to.eql(newUser.user_name)
                expect(row.full_name).to.eql(newUser.full_name)

                return bcrypt.compare(newUser.password, row.password)
              })
              .then(compareMatch => {
                expect(compareMatch).to.be.true
              })
          )
      })
    })
  })
})