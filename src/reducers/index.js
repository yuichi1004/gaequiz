
const screenLoad = 'LOAD'
const screenStart = 'START'
const screenQuiz = 'QUIZ'
const screenScore = 'SCORE'

const defaultState = {
  screen: screenLoad
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_QUIZ':
      return {
        quiz: action.quiz,
        screen: screenStart
      };
      
    case 'START_QUIZ':
      {
        const index = state.index + 1;
        return {
          quiz: state.quiz,
          name: action.name,
          index: 0,
          score: 0,
          screen: screenQuiz,
          islast: index === state.quiz.length -1
        };
      }

    case 'ANSWER':
      {
        let score = state.score
        if (action.id === state.quiz[state.index].answer) {
          score = score + 1
        }
        const index = state.index + 1;
        return {
          quiz: state.quiz,
          name: state.name,
          index: index,
          score: score,
          screen: index === state.quiz.length ? screenScore : screenQuiz,
          islast: index === state.quiz.length - 1
        };
      }

    case 'RECIEVE_SCORE':
      return {
        screen: screenScore,
        name: state.name,
        score: state.score,
        highscores: action.highscores,
      }

    default:
      return state;
  }
}

