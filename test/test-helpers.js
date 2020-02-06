const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'cwelch',
      password: 'Thinkful1!',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      user_name: 'zhenderson',
      password: 'Thinkful1!',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 3,
      user_name: 'lknox',
      password: 'Thinkful1!',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    }
  ];
}

function makeGamesArray() {
  return [
    {
      user_id: 1,
      course_name: 'Test',
      date: '2029-01-22T16:28:32.615Z',
      course_par: 50,
      front_score: 25,
      back_score: 25,
      notes: 'Test note',
      
    }
  ]
}

function seedUsers(users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 12),
  }));
  return preppedUsers
}

function seedTables(db, games) {
  return db
    .into('games')
    .insert([games])
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.email,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  seedUsers,
  makeGamesArray,
  seedTables,
  makeAuthHeader
};