import React from 'react';
import Button from '../UI/Button/Button';
import classes from './FinishedQuiz.module.scss';
import { Link } from 'react-router-dom';

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
      <p className={classes.counter}>
        Правильно {countSuccess} из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type={'primary'} disabled={false}>
          Повторить
        </Button>
        <Link to="/">
          <Button type={'success'} disabled={false}>
            Перейти в список тестов
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
