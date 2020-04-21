import React from 'react';
import classes from './MenuToggle.module.scss';

const MenuToggle = (props) => {
  const cls = [classes.MenuToggle, 'fa'];

  if (props.isOpen) {
    cls.push('fa-times', classes.open);
  } else {
    cls.push('fa-bars');
  }

  return <i className={cls.join(' ')} onClick={props.onToggle}></i>;
};

export default MenuToggle;
