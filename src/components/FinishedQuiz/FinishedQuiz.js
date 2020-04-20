import React from 'react';
import classes from './FinishedQuiz.module.scss';

const FinishedQuiz = (props) => {
  let countSuccess = 0;
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          if (props.results[quizItem.id] === 'success') {
            countSuccess++;
          }
          const cls = [
            'fa',
            props.results[quizItem.id] === 'success' ? 'fa-check' : 'fa-times',
            classes[props.results[quizItem.id]],
          ];
          return (
            <li key={index}>
              <b>{quizItem.id}. </b>
              {quizItem.question}
              <i className={cls.join(' ')}></i>
            </li>
          );
        })}
      </ul>
      Правильно {countSuccess} из {props.quiz.length}
      <div>
        <button onClick={props.onRetry}>Повторить</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
