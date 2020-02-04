import TokenService from '../services/token-service'
import config from '../config'

const GameApiService = {
  getGames() {
    return fetch(`${config.API_ENDPOINT}/games`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getUserGames() {
    return fetch(`${config.API_ENDPOINT}/users/${TokenService.getUserId('user_id')}/games`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
            .catch(error => {
        console.error(error)
      })
  },
  getGame(gameId) {
    return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postGame(gameId, course_name, date, course_par, front_score, back_score, notes) {
    return fetch(`${config.API_ENDPOINT}/games`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        game_id: gameId,
        course_name,
        date,
        course_par,
        front_score,
        back_score,
        notes
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postUserGame(gameId, course_name, date, course_par, front_score, back_score, notes) {
    return fetch(`${config.API_ENDPOINT}/users/${TokenService.getUserId('userId')}/games`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        game_id: gameId,
        course_name,
        date,
        course_par,
        front_score,
        back_score,
        notes
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteGame(gameId, cb) {
    fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(data => {
        cb(gameId)
      })
      .catch(error => {
        console.error(error)
      })
  },
  deleteUserGame(gameId, cb) {
    fetch(`${config.API_ENDPOINT}/users/${TokenService.getUserId('userId')}/games/${gameId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => Promise.reject(error))
      }
      return res.json()
    })
      .then(data => {
        cb(gameId)
        window.location.reload()
      })
      .catch(error => {
        console.error(error)
      })
  },
}

export default GameApiService