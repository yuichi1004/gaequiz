
const host = ""
//const host = "http://localhost:8080"

export const fetchQuiz = quiz => {
  return {
    type: 'FETCH_QUIZ',
    quiz
  }
}

export const initialize = () => {
  return (dispatch) => {
    return fetch(host + '/api/quiz')
      .then(
        response => response.json(),
        error => console.log('error', error)
      )
      .then(
        json => dispatch(fetchQuiz(json))
      )
  }
}

export const startQuiz = (name) => {
  return {
    type: 'START_QUIZ',
    name,
  }
}

const answer = id => {
  return {type: 'ANSWER', id}
}

export const doAnswer = id => {
  return (dispatch, getState) => {
    const last = getState().islast
    dispatch(answer(id))
    if (last) {
      dispatch(postScore(getState().name, getState().score))
    }
  }
}

const requestScore = () => {
  return {
    type: 'REQUEST_SCORE',
  }
}

const recieveScore = highscores => {
  return {
    type: 'RECIEVE_SCORE',
    highscores
  }
}

export const fetchScores = () => {
  return (dispatch) => {
    dispatch(requestScore)
    return fetch(host + '/api/scores')
      .then(
        response => response.json(),
        error => console.log('error', error)
      )
    .then(json =>
      dispatch(recieveScore(json))
    )
  }
}

export const postScore = (name, score) => {
  return (dispatch) => {
    dispatch(requestScore)
    const opt = {method: 'post', body: JSON.stringify({name: name, score:score})}
    return fetch(host + '/api/scores', opt)
      .then(
        response => response.json(),
        error => console.log('error', error)
      )
    .then(json => {
      dispatch(fetchScores())
      }
    )
  }
}


