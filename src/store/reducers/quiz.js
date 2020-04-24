import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ,
} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: true,
  error: null,
  results: {}, // {[id]: success error}
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return { ...state, loading: true };
    case FETCH_QUIZES_SUCCESS:
      return { ...state, loading: false, quizes: action.quizes };
    case FETCH_QUIZES_ERROR:
      return { ...state, loading: false, error: action.error };
    case FETCH_QUIZ_SUCCESS:
      return { ...state, loading: false, quiz: action.quiz };
    case FINISH_QUIZ:
      return { ...state, isFinished: true };
    case QUIZ_NEXT_QUESTION:
      return { ...state, activeQuestion: action.active + 1, answerState: null };
    case RETRY_QUIZ:
      return {
        ...state,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };

    default:
      return state;
  }
}
