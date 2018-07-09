import { observable, action, computed } from 'mobx';
import arrCity from './cities';

class Store {
  // for app
  @observable AppName = "共享闲置";
  // status code
  @observable ORDER_CONNECT = 0;
  @observable ORDER_LENT = 1;
  @observable ORDER_BACK = 2;
  @observable ORDER_FINISH = 3;
  @observable ORDER_OUTOFTIME = 4;
  @observable ITEM_PUBLISH = 0;
  @observable ITEM_HOLD = 1;
  @observable ITEM_LENT = 2;
  @observable MESSAGE = 0;

  @observable loading = false;
  @observable data = null;
  @observable error = null;

/* @brief: the constructor
 * @details: only containing some data or functions for test. It has no relation to the production.
 */
  constructor() {
    this.readCookie();
    // base data
    let itemList = [
      {
        front_id: 'i0',
        title: '山地自行车',
        description: '九成新的山地自行车，好看又好骑！',
        tags: ['运动', '生活'],
        owner: 'u0',
        price: 15,
        deposit: 100,
        city: ['浙江', '杭州'],
        availableTime: 3,
        images: ['i0_0.jpg', 'i0_1.jpg'],
        transfer: 4,
        status: this.ITEM_PUBLISH,
      },
      {
        front_id: 'i1',
        title: '相机',
        description: '索尼相机',
        tags: ['摄影', '生活'],
        owner: 'u1',
        price: 20,
        deposit: 100,
        city: ['浙江', '杭州', '西湖区'],
        availableTime: 3,
        images: ['i1_0.jpg'],
        transfer: 7,
        status: this.ITEM_LENT,
      },
      {
        front_id: 'i2',
        title: '连衣裙',
        description: '租的人穿了都说好！',
        tags: ['服装', '生活'],
        owner: 'u1',
        price: 30,
        deposit: 100,
        city: ['浙江', '杭州', '滨江区'],
        availableTime: 0,
        images: ['i2_0.jpg'],
        transfer: 3,
        status: this.ITEM_HOLD,
      },
    ];

    this.getAllItems = () => {
      return JSON.parse(JSON.stringify(itemList));
    };
    this.findSubCity = (cityList) => {
      let list = arrCity;
      for (let i = 0; i < cityList.length; i++) {
        if (list === undefined) return [];
        const name = cityList[i];
        for (let item of list)
          if (item.name === name)
            list = item.sub;
      }
      if (list === undefined) return [];
      else return list;
    };
  }

/* @brief: send a query to the back-end, with the API standard.
 * @params method: use which method in { GET, POST, PUT, DELETE, PATCH }
 * @params postfix: the uri, which represents a resource, we want to change/ get
 * @params body: the detail info, with format of json. Notice that GET/DELETE has no body.
 * @params callback: a function, which will be called after getting results from the back-end.
 * @return the result of query
 */
  @action callAPI(method, postfix, body, callback) {
    this.loading = true;
    return fetch(`/api/${postfix}`, {
      method: method,
      body: body === null ? undefined : JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(action(json => {
        console.log(json);
        this.data = json;
        if (callback !== undefined) callback(json);
        this.loading = false;
        return json;
      }))
      .catch(action(e => {
        console.error(e);
        this.error = e;
      }));
  }

  // for home page
  typeColumnsOnHomePage = [
    {
      icon: "Camera",
      title: "数码交易",
      subtitles: ["手机", "相机", "笔记本"],
    }, {
      icon: "ShoppingBasket",
      title: "生活点滴",
      subtitles: ["自行车", "日用杂物"],
    }, {
      icon: "Alarm",
      title: "工作空间",
      subtitles: ["打印机"],
    }
  ];
  pictureColumnOnHomePage = ['i0', 'i1', 'i2'];
  itemsColumnsOnHomePage = [
    {
      title: "最新发布",
      items: ['i0', 'i1'],
    }, {
      title: "猜你喜欢",
      items: ['i0', 'i1', 'i2', 'i1', 'i0'],
    }
  ];

  // record the id of user. If it is undefined, it means that no user login.
  @observable user = undefined;

/* @brief: send a query to the back-end, to get the data, which is to show on home page.
 * @return the result of query
 */
  getHomePageInfo() {
    return this.callAPI('get', 'item/random/10')
      .then(({list}) => {
        let typeColumns = this.typeColumnsOnHomePage;
        let pictureColumns = [];
        for (let {image, front_id} of list) {
          pictureColumns.push({
            picSrc: image[0],
            id: front_id,
          });
        }
        let itemsColumns = [];
        for (const [i, column] of this.itemsColumnsOnHomePage.entries()) {
          let items = [];
          for (let {name, image, front_id} of list) {
            items.push({
              title: name,
              picSrc: image[0],
              id: front_id,
            });
          }
          itemsColumns.push({
            title: column.title,
            items: items
          });

        }
        return {
          typeColumns: typeColumns,
          pictureColumn: pictureColumns,
          itemsColumns: itemsColumns
        }
      });

  }

/* @brief: send a query to the back-end, to get the data about user.
 * @params user_id: the id of user
 * @params callback: a function, which will be called after getting results from the back-end.
 * @return null
 */
  getUserInfo(user_id, callback) {
    this.callAPI("GET", "/user/" + user_id, null, user_info => {
      this.callAPI("POST", "/search", {
        user: user_id,
        name: '',
        category: '',
        startTime: new Date().getTime() / 1000,
        endTime: 0,
        lowPrice: 0,
        highPrice: 1 << 15,
      }, itemsList => {
        const items = [];
        for (const item of itemsList.list) {
          items.push({
            id: 'i' + item.front_id,
            front_id: item.front_id,
            title: item.name,
            description: item.description,
            tags: item.category.split(","),
            owner: item.user,
            price: item.price,
            deposit: item.deposit,
            city: (item.location.province + "," + item.location.city + "," + item.location.region).split(','),
            availableTime: parseInt((item.endTime - new Date().getTime() / 1000) / 86400),
            images: item.image,
            transfer: item.transfer,
            status: this.ITEM_PUBLISH,
          });
        }
        this.callAPI("POST", "/order/query", {
          user: user_id,
          startTime: 0,
          endTime: new Date().getTime(),
          role: 0,
          status: 0,
        }, orderList => {
          console.log(orderList);
          const usages = [];
          for (const item of orderList.list) {
            usages.push({
              id: "o" + item.front_id,
              front_id: item.front_id,
              borrower: item.borrower,
              lender: item.lender,
              item: item.item,
              status: item.status,
              time: item.time,
              use_time: parseInt((new Date().getTime() - item.time)/86400000),
            })
          }
          const cb = {
            user: {
              id: user_id,
              name: user_info.username,
              portrait: user_info.image,
              phone: user_info.phone,
              city: [],
              credit: user_info.credit,
              id_card: user_info.id_card,
              real_name: user_info.real_name,
            },
            myItems: items,
            myUsages: usages,
          };
          if (user_info.location.province.length !== 0) cb.user.city[0] = user_info.location.province;
          if (user_info.location.city.length !== 0) cb.user.city[1] = user_info.location.city;
          if (user_info.location.region.length !== 0) cb.user.city[2] = user_info.location.region;
          console.log(cb);
          callback(cb);
        });
      });
      // const items = this.getAllItems();
      // for (let i = items.length - 1; i >= 0; i--) {
      //   items[i].id = items[i].front_id;
      //   if (+items[i].owner.substr(1) !== +user_id) items.splice(i, 1);
      //   else {
      //     items[i].images[0] = require('./pic/'+items[i].images[0]);
      //   }
      // }
      // const usages = this.getAllOrders();
      // for (let i = usages.length - 1; i >= 0; i--) {
      //   usages[i].id = usages[i].front_id;
      //   if (+usages[i].borrower.substr(1) !== +user_id)
      //     usages.splice(i, 1);
      // }
    });
  }

/* @brief: send a query to the back-end, to make a user borrow an item
 * @params item: the id of item
 * @params user: the id of user
 * @return null
 */
  borrowItem(item, user) {
    this.callAPI("POST", "/order", {
      front_id: '',
      borrower: this.user,
      lender: user.id,
      item: item.front_id,
      time: new Date().getTime(),
      status: 0,
    })
  }

/* @brief: send a query to the back-end, to publish an item
 * @params user: the id of user
 * @params state: the information of this item
 * @params callback: a function, which will be called after getting results from the back-end.
 * @return null
 */
  publish(user, state, callback) {
    let transferCode = 0;
    if (state.transfer.indexOf("自取") > -1) transferCode += this.GET_BY_SELF;
    if (state.transfer.indexOf("邮寄") > -1) transferCode += this.SEND_BY_OWNER;
    if (state.transfer.indexOf("面交") > -1) transferCode += this.TRANSFER_BY_DATE;

    // error check
    if(state.title.length === 0) callback([this.WRONG, "标题不能为空！"]);
    else if(state.description.length === 0) callback([this.WRONG, "填写具体描述可以让别人更快地选中您的物品哦！"]);
    else if(state.price <= 0) callback([this.WRONG, "请输入正数价格！"]);
    else if(state.picSrc.length === 0) callback([this.WRONG, "请上传至少一张图片！"]);
    else if(state.time <= 0) callback([this.WRONG, "请输入正数可用时间！"]);
    else if(transferCode === 0) callback([this.WRONG, "请添加至少一种租借方式！"]);
    else if(state.location.province.length === 0) callback([this.WRONG, "请填写该物品的地址！"]);
    else if(state.phone.length !== 11) callback([this.WRONG, "请填写正确的手机号码！"]);
    else return this.callAPI('POST', '/item', {
      "name": state.title,
      "description": state.description,
      "user": user,
      "price": state.price,
      "deposit": 1,
      "image": state.picSrc,
      "startTime": parseInt(Math.round(new Date().getTime() / 1000)),
      "endTime": parseInt(Math.round(new Date().getTime() / 1000 + 86400 * state.time)),
      "transfer": transferCode,
      "location": {
        province: state.location.province,
        city: state.location.city,
        region: state.location.district,
      },
      "category": "",
      "phone": state.phone
    }, result=>callback([this.PASS, result.result]))
  }

/* @brief: send a query to the back-end, to get the information of a certain item
 * @params id: the id of the item
 * @return null
 */
  getItemInfo(id) {
    return this.callAPI('get', `/item/${id}`, null);
  }

/* @unfinished: query to the back-end
 * @brief: send a query to the back-end, to get the information of a certain item
 * @params key: a string for search
 * @params price: a string that describe a range for price
 * @params time: a string that describe a range for available time
 * @params city: a string that describe the location
 * @params callback: a function, which will be called after getting results from the back-end.
 * @return null
 */
  getItems(key, price, time, city) {
    let list = this.getAllItems();

    function matchKey(custom, origin) {
      // console.log("key", custom, origin);
      if (custom === '' || custom === undefined || custom === null) return 1;
      const len = custom.length;
      const val = 1 / len;
      let score = 0;
      for (let chr of custom)
        if (origin.indexOf(chr) !== -1)
          score += val;
      // console.log(score);
      return score;
    }

    function matchRange(custom, origin) {
      // console.log('range', custom, origin);
      if (custom === '' || custom === undefined || custom === null) return 1;
      const range = custom.split('~');
      // console.log(+range[0], +range[1], origin);
      if (+range[0] <= origin && (origin <= +range[1] || +range[1] === 0)) return 1;
      else return 0;
    }

    function matchList(custom, origin) {
      // console.log('list', custom, origin);
      if (custom === '' || custom === undefined || custom === null) return 1;
      const cityList = custom.split(' ');
      // console.log(cityList);
      for (let i = 0; i < cityList.length; i++) {
        // console.log(i, origin[i], cityList[i], origin[i] != cityList[i]);
        if (origin[i] === undefined || origin[i] === null || origin[i] === '') return 1 - 1 / Math.pow(2, i);
        else if (origin[i] !== cityList[i]) return 0;
      }
      return 1;
    }

    for (let i = list.length - 1; i >= 0; i--) {
      let item = list[i];
      let is_match = true;
      let match_level;
      item.id = item.front_id;
      item.matchLevel = 0;

      match_level = matchKey(key, item.title);
      if (match_level !== 0) {
        item.matchLevel += 5 * match_level;
      } else {
        is_match = false;
        for (const tag of item.tags) {
          match_level = matchKey(key, tag);
          if (match_level !== 0) {
            is_match = true;
            item.matchLevel += 3 * match_level;
          }
        }
      }

      if (is_match) {
        match_level = matchRange(price, item.price);
        if (match_level !== 0) item.matchLevel += 3 * match_level;
        else is_match = false;
      }

      if (is_match) {
        match_level = matchRange(time, item.availableTime);
        if (match_level !== 0) item.matchLevel += match_level;
        else is_match = false;
      }

      if (is_match) {
        match_level = matchList(city, item.city);
        if (match_level !== 0) item.matchLevel += match_level;
        else is_match = false;
      }

      if (!is_match) list.splice(i, 1);
      else {
        for (let [i, pic] of item.images.entries()) {
          item.images[i] = require('./pic/' + pic);
        }
      }
    }
    return list;
  }

  // to confirm user
  @observable PASS = 0;
  @observable WRONG = -1;
  @observable NO_USER = 1;
  @observable WRONG_PASSWORD = 2;

/* @brief: send a query to the back-end, to confirm the username & password of a user
 * @params username: a string, username
 * @params password: a string, password
 * @params callback: a function, which will be called to inform the consequence after getting results from the back-end.
 * @return null
 */
  confirmUser(username, password, callback) {
    this.callAPI("GET", "/user/" + username, null, get_json => {
      if (get_json.front_id !== get_json.username) callback(this.NO_USER);
      else
        this.callAPI("POST", "/user/session", {
          "username": username,
          "password": password
        }, post_json => {
          if (post_json.result === "Fail") callback(this.WRONG_PASSWORD);
          else {
            this.user = username;
            this.setCookie();
            callback(this.PASS);
          }
        })
    });
  }

/* @brief: send a query to the back-end, to add a user
 * @params username: a string, username
 * @params password: a string, password
 * @return null
 */
  registerUser(username, password) {
    this.callAPI("POST", "/user", {
      "username": username,
      "password": password,
      "front_id": username
    })
  }

/* @brief: to change the login information of store
 * @params username: a string, username
 * @params password: a string, password
 * @return null
 */
  loginUser(username, password) {
    this.callAPI("POST", "/user/session", {
      "username": username,
      "password": password
    }, json => {
    })
  }

/* @brief: send a query to the back-end, to change some information about the user
 * @params new_info: new information of the user
 * @return null
 */
  updateUserInfo = (new_info) => {
    this.callAPI("GET", "/user/" + this.user, null, old_info => {
      this.callAPI("PATCH", "/user", {
        front_id: this.user,
        phone: new_info.phone !== undefined ? new_info.phone : old_info.phone,
        image: new_info.image !== undefined ? new_info.image : old_info.image,
        credit: new_info.credit !== undefined ? new_info.credit : old_info.credit,
        password: new_info.password !== undefined ? new_info.password : old_info.password,
        location: new_info.city !== undefined ? {
          "province": new_info.city.province,
          "city": new_info.city.city,
          "region": new_info.city.district,
        } : old_info.location,
        // real_name: new_info.real_name !== undefined ? new_info.real_name:old_info.real_name,
        // id_card: new_info.id_card !== undefined ? new_info.id_card:old_info.id_card,
      }, () => {
        this.routing.push('/home');
        this.routing.push('/user/settings');
        alert("更新成功！");
      });
    });
  };

  // transfer code about item
  @observable GET_BY_SELF = 1;
  @observable SEND_BY_OWNER = 2;
  @observable TRANSFER_BY_DATE = 4;

/* @brief: change the transfer code into text
 * @params code: the transfer code
 * @return the text of the transfer code
 */
  getTransferMethodByTransferCode(code) {
    let str = '';
    // noinspection JSBitwiseOperatorUsage
    if (code & this.GET_BY_SELF) str += '自取 ';
    // noinspection JSBitwiseOperatorUsage
    if (code & this.SEND_BY_OWNER) str += '邮寄 ';
    // noinspection JSBitwiseOperatorUsage
    if (code & this.TRANSFER_BY_DATE) str += '面交 ';
    return str;
  }

/* @brief: change the order status into text
 * @params code: the order status
 * @return the text of the order status
 */
  getOrderStatusNameByCode(code) {
    switch (code) {
      case this.ORDER_CONNECT:
        return '已下订单，未交出物品';
      case this.ORDER_LENT:
        return '已借出，未归还';
      case this.ORDER_BACK:
        return '已归还，未付款';
      case this.ORDER_FINISH:
        return '已完成';
      case this.ORDER_OUTOFTIME:
        return '超时';
    }
  }

/* @brief: change the item status into text
 * @params code: the item status
 * @return the text of the item status
 */
  getItemStatusNameByCode(code) {
    switch (code) {
      case this.ITEM_PUBLISH:
        return '发布中';
      case this.ITEM_HOLD:
        return '未发布';
      case this.ITEM_LENT:
        return '已借出';
    }
  }

/* @brief: delete the login information in store
 * @return null
 */
  @action logout() {
    this.user = undefined;
    this.setCookie();
  }

/* @brief: set cookie, so we can use some information, like login information, when we use the app next time.
 * @return null
 */
  setCookie() {
    document.cookie = "user=" + this.user + "; domain=localhost; path=/;";
    console.log(document.cookie);
  }

/* @brief: read cookie, try to load the cookie, that we saved last time.
 * @return null
 */
  readCookie() {
    console.log(document.cookie);
    const cookieList = document.cookie.split(";");
    for (const cookie of cookieList) {
      const cookiee = cookie.split("=");
      if (cookiee[0].startsWith("user") || cookiee[0].startsWith(" user"))
        this.user = cookiee[1];
    }
  }
}

const STORE = new Store();

export default STORE;