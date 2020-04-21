import React from 'react';
import classes from './Layout.module.scss';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';

class Layout extends React.Component {
  state = {
    menu: false,
  };

  loggleMenuHandler = () => {
    this.setState({ menu: !this.state.menu });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <MenuToggle
          onToggle={this.loggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
