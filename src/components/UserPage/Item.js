import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    position: 'relative',
    margin: '20px 10%',
    height: '180px',
    width: '80%',
    padding: 0,
  },
  buttonBase: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  imgArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '180px',
    height: '180px',
    borderRight: '1px #afafaf solid',
  },
  imgSrc: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    maxHeight: '80%',
    maxWidth: '80%',
  },
  info: {
    position: 'absolute',
    left: '180px',
    top: 0,
    height: '180px',
    '& h3': {
      marginLeft: '40px',
      textAlign: 'left',
      fontWeight: '5px',
      fontSize: '25px',
    },
    '& p': {
      marginLeft: '40px',
      textAlign: 'left',
      fontWeight: '2px',
      fontSize: '16px',
    }
  }
});

@inject('store')
@observer
class Item extends Component {
  getInfo = (data) => {
    const store = this.props.store;
    let item_id, title, price, time, status, image;
    switch(data.id[0]) {
      case 'o':
        item_id = +data.item.substr(1);
        const itemInfo = store.getItemInfo(item_id);
        title = itemInfo.title;
        price = data.price;
        time = data.use_time;
        status = store.getOrderStatusNameByCode(data.status);
        image = itemInfo.images[0];
        break;
      case 'i':
        item_id = +data.id.substr(1);
        title = data.title;
        price = data.price;
        time = data.availableTime;
        status = store.getItemStatusNameByCode(data.status);
        image = data.images[0];
        break;
    }
    return {
      item_id: item_id,
      title: title,
      price: price,
      time: time,
      status: status,
      image: image,
    };
  };
  render() {
    const {classes} = this.props;
    const {location, goBack, push} = this.props.store.routing;
    const data = this.props.org_data;
    const restruct = this.getInfo(data);
    return (<Paper className={classes.root} elevation={4}>
      <Button className={classes.buttonBase} onClick={()=>{push('/item/'+restruct.item_id)}}>
        <div className={classes.imgArea}>
          <img className={classes.imgSrc} src={restruct.image} />
        </div>
        <div className={classes.info}>
          <h3>{restruct.title}</h3>
          <p>价　　格：￥{restruct.price}/天</p>
          <p>剩余时间：{restruct.time}天</p>
          <p>当前状态：{restruct.status}</p>
        </div>
      </Button>
    </Paper>);
  }
}

export default withStyles(styles)(Item);