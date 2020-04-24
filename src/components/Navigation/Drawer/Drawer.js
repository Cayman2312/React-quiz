import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

export default class Drawer extends Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            className={classes.Navlink}
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.closed);
    }

    const links = [
      {
        to: '/',
        label: 'Список',
        exact: true,
      },
    ];

    if (this.props.isAuthenticated) {
      links.push({
        to: '/quiz-creater',
        label: 'Создать тест',
        exact: false,
      });
      links.push({
        to: '/logout',
        label: 'Выйти',
        exact: false,
      });
    } else {
      links.push({
        to: '/auth',
        label: 'Авторизация',
        exact: false,
      });
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}
