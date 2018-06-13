import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Item from '../Common/Item';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
  root: {
    margin: '10px',
    position: 'relative'
  },
  content: {
    width: '800px',
    margin: 'auto',
    left: 0,
    right: 0,
  },
  title: {
    lineHeight: '20px',
    fontSize: '15px',
    borderBottom: '1px black solid',
  },
  items: {
    width: 'auto',
    height: '200px',
    margin: '5px 0',
    position: 'relative',
  },
  left: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: '-40px',
  },
  right: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    right: '-40px',
  },
});

@inject('store')
@observer
class ItemsColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSlider: false,
      start: 0,
    };
  }

  render() {
    const {classes} = this.props;
    const data = this.props.org_data;
    const {location, goBack, push} = this.props.store.routing;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.title}>{data.title}</div>
          <div className={classes.items} onMouseEnter={this.showSlider.bind(this)}
               onMouseLeave={this.hideSlider.bind(this)}>
            {
              data.items.map((item, i) => {
                return (i >= this.state.start && i < this.state.start + 5) && (
                  <Item width={140} height={200} title={item.title} pic={item.picSrc}
                        link={`/item/${item.id.substr(1)}`} key={i} margin={'0 10px'} />
                );
              })
            }
            {this.state.showSlider && this.state.start > 0 &&
            (<IconButton className={classes.left} color="secondary" onClick={this.slideLeft.bind(this)}>
              <KeyboardArrowLeft />
            </IconButton>)
            }
            {this.state.showSlider && this.state.start + 5 < data.items.length &&
            (<IconButton className={classes.right} color="secondary" onClick={this.slideRight.bind(this)}>
              <KeyboardArrowRight />
            </IconButton>)
            }
          </div>
        </div>
      </div>
    );
  }

  showSlider() {
    this.setState({
      showSlider: true,
    })
  }

  hideSlider() {
    this.setState({
      showSlider: false,
    })
  }

  slideLeft() {
    if (this.state.start > 0) this.setState({start: this.state.start - 1});
  }

  slideRight() {
    const data = this.props.org_data;
    if (this.state.start + 5 < data.items.length) this.setState({start: this.state.start + 1});
  }
}

export default withStyles(styles)(ItemsColumn);
