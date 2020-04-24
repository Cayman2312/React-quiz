import { CREATE_QUIZ_QUESTION, FINISH_CREATE_QUIZ } from './actionTypes';

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}

export function finishCreateQuiz() {
  return {
    type: FINISH_CREATE_QUIZ,
  };
}
