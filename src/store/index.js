import { observable, action } from 'mobx';
import img1 from './pic/pic1.jpg';
import img2 from './pic/pic2.jpg';
import img3 from './pic/pic3.png';
import img4 from './pic/pic4.png';

class Store {
  @observable HOMEPAGE = 0;
  @observable PUBLISHPAGE = 1;
  @observable USERPAGE = 2;

  @observable AppName = "共享闲置";
  @observable hasSignedIn = false;
  @observable pageCode = this.HOMEPAGE;
  @observable typeColumnsOnHomePage = [
    {
      icon: "Dashboard",
      title: "闲置分类",
      subtitles: [],
      align: "center",
    }, {
      icon: "Camera",
      title: "数码交易",
      subtitles: [
        {
          title: "手机",
          link: "",
        }, {
          title: "相机",
          link: "",
        }, {
          title: "笔记本",
          link: "",
        },
      ],
      align: "left",
    }, {
      icon: "ShoppingBasket",
      title: "生活点滴",
      subtitles: [
        {
          title: "自行车",
          link: "",
        }, {
          title: "日用杂物",
          link: "",
        },
      ],
      align: "left",
    }, {
      icon: "Alarm",
      title: "工作空间",
      subtitles: [
        {
          title: "打印机",
          link: "",
        },
      ],
      align: "left",
    }
  ];
  @observable pictureColumnOnHomePage = {
    selected: 0,
    pictures: [
    {
      title: "pic1",
      picSrc: img1,
      link: "",
    }, {
      title: "pic2",
      picSrc: img2,
      link: "",
    }, {
      title: "pic3",
      picSrc: img3,
      link: "",
    }, {
      title: "pic4",
      picSrc: img4,
      link: "",
    },
    ]
  };
  @observable itemsColumnsOnHomePage = [
    {
      title: "最新发布",
      startIndex: 0,
      items: [
        {
          picSrc: img1,
          title: "余",
        }, {
          picSrc: img2,
          title: "神",
        }
      ],
    }, {
      title: "猜你喜欢",
      startIndex: 0,
      items: [
        {
          picSrc: img1,
          title: "膜",
        }, {
          picSrc: img2,
          title: "拜",
        }, {
          picSrc: img3,
          title: "余",
        }, {
          picSrc: img4,
          title: "大",
        }, {
          picSrc: img1,
          title: "佬",
        },
      ],
    }, {
      title: "历史记录",
      startIndex: 0,
      items: [
        {
          picSrc: img1,
          title: "余",
        }, {
          picSrc: img1,
          title: "神",
        }, {
          picSrc: img2,
          title: "螺",
        }, {
          picSrc: img1,
          title: "旋",
        }, {
          picSrc: img1,
          title: "翻",
        }, {
          picSrc: img3,
          title: "滚",
        }, {
          picSrc: img1,
          title: "无",
        }, {
          picSrc: img1,
          title: "敌",
        }, {
          picSrc: img4,
          title: "棒",
        },
      ],
    },
  ];

  @observable userData = {
    portrait: img4,
    name: '余神强无敌',
  }
}

const STORE = new Store();

export default STORE;