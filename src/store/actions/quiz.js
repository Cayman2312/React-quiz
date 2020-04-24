import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ,
} from './actionTypes';

export function fetchQuizes() {
  return async (dispatch) => {
    try {
      dispatch(fetchQuizesStart());
      const response = await axios.get('quizes.json');
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`quizes/${quizId}.json`);
      const quiz = response.data;
      // this.setState({ quiz: response.data, loading: false });
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}

export function quizSetState(answerState, results) {
  return { type: QUIZ_SET_STATE, answerState, results };
}
export function finishQuiz() {
  return { type: FINISH_QUIZ };
}
export function quizNextQuestion(active) {
  return { type: QUIZ_NEXT_QUESTION, active };
}

export function retryQuiz() {
  return { type: RETRY_QUIZ };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      if (Object.values(state.answerState)[0] === 'success') {
        return;
      }
    }

    const active = state.activeQuestion;
    const question = state.quiz[active];
    const results = state.results;

    if (answerId === question.rightAnswerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      dispatch(
        quizSetState(
          {
            [answerId]: 'success',
          },
          results
        )
      );

      const timeout = setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(active));
        }

        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(
        quizSetState(
          {
            [answerId]: 'error',
          },
          results
        )
      );
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
