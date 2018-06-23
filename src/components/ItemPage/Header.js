import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    borderBottom: '2px #40a9ff solid',
    height: '56px',
    display: 'flex',
  },
  grid: {
    borderRight: '2px #40a9ff solid',
    height: '50px',
    paddingLeft: '10px',
    paddingRight: '10px',
    margin: '3px 0',
    display: 'flex',
    textAlign: 'center',
  },
  avatar: {
    margin: 5,
  },
  flex: {
    flex: 1
  },
  button: {
    height: '50px',
    padding: 0,
  }
});

@inject('store')
@observer
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "user",
      portrait: undefined,
    }
  }

  componentWillMount() {
    const {store} = this.props;
    const item = this.props.org_data;
    store.getUserInfo(item.owner, user_info=>{
      this.setState(user_info.user);
    });
  }

  render() {
    const {classes, store} = this.props;
    return (<div className={classes.root}>
      <div id='item_header_owner' className={classes.grid} style={{lineHeight: '50px'}}>
        <Button className={classes.button}>
          <Avatar alt={this.state.name} src={this.state.portrait} className={classes.avatar} />
          {this.state.name}
        </Button>
      </div>
      <div id='item_header_owner' className={classes.grid} style={{lineHeight: '25px'}}>
        浏览次数<br/>50
      </div>
      <div id='item_header_owner' className={classes.grid} style={{lineHeight: '25px'}}>
        最近编辑<br/>2018-06-01 15：36：44
      </div>
      <div className={classes.flex}/>
      <Button className={classes.button}>举报该物品</Button>
    </div>);
  }
}

export default withStyles(styles)(Header);