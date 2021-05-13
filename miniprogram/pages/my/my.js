// pages/my/my.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isLogin: false, //是否登录。 false 未登录  true，已经登录
    recipes: [{
        id: "1",
        recipeName: "烤苏格兰蛋",
        src: "../../imgs/1.jpg",
        opacity: 0, //遮罩层默认不显示
      },
      {
        id: "2",
        recipeName: "法国甜点",
        src: "../../imgs/2.jpg",
        opacity: 0, //遮罩层默认不显示
      },
      {
        id: "3",
        recipeName: "法式蓝带芝心猪排",
        src: "../../imgs/3.jpg",
        opacity: 0, //遮罩层默认不显示
      },
      {
        id: "4",
        recipeName: "菠萝煎牛肉扒",
        src: "../../imgs/4.jpg",
        opacity: 0, //遮罩层默认不显示
      },
      {
        id: "5",
        recipeName: "快手营养三明治",
        src: "../../imgs/5.jpg",
        opacity: 0, //遮罩层默认不显示
      },
      {
        id: "6",
        recipeName: "顶级菲力牛排",
        src: "../../imgs/6.jpg",
        opacity: 0, //遮罩层默认不显示
      }
    ],
    types: [{
        typename: "营养菜谱",
        'src': "../../static/type/type01.jpg"
      },
      {
        typename: "儿童菜谱",
        'src': "../../static/type/type02.jpg"
      },
      {
        typename: "家常菜谱",
        'src': "../../static/type/type03.jpg"
      },
      {
        typename: "主食菜谱",
        'src': "../../static/type/type04.jpg"
      },
      {
        typename: "西餐菜谱",
        'src': "../../static/type/type05.jpg"
      },
      {
        typename: "早餐菜谱",
        'src': "../../static/type/type06.jpg"
      },
    ],
    lists: [{
        src: "../../static/list/list01.jpg",
        name: "土豆小番茄披萨",
        userInfo: {
          nickName: "林总小图",
          pic: "../../static/list/users.png"
        },
        views: 999,
        follow: 100
      },
      {
        src: "../../static/list/list02.jpg",
        name: "草莓巧克力三明治",
        userInfo: {
          nickName: "林总小图",
          pic: "../../static/list/users.png"
        },
        views: 88,
        follow: 200
      },
      {
        src: "../../static/list/list03.jpg",
        name: "法师意大利面",
        userInfo: {
          nickName: "林总小图",
          pic: "../../static/list/users.png"
        },
        views: 999,
        follow: 100
      },
      {
        src: "../../static/list/list04.jpg",
        name: "自制拉花",
        userInfo: {
          nickName: "林总小图",
          pic: "../../static/list/users.png"
        },
        views: 999,
        follow: 100
      },
      {
        src: "../../static/list/list05.jpg",
        name: "营养早餐",
        userInfo: {
          nickName: "林总小图",
          pic: "../../static/list/users.png"
        },
        views: 999,
        follow: 100
      }
    ],
  },
  // 处理遮罩层显示问题
  _delStyle(e) {
    // 获取索引
    let index = e.currentTarget.dataset.index;
    // 将所有的列表都设置不显示
    this.data.recipes.map((item) => {
      item.opacity = 0;
    })
    // 将长按的列表项设置为选中
    this.data.recipes[index].opacity = 1;
    this.setData({
      recipes: this.data.recipes
    })
    
  },
  // 执行删除操作
  _doDelete(e){
    let index = e.currentTarget.dataset.index;
    // 如果没有显示删除图标，点击删除，直接返回
    if(!this.data.recipes[index].opacity)return;
    let _this = this;
    wx.showModal({
       title:"删除提示",
       content:"您确定删除么？",
       success(res){
            if(res.confirm){
              //执行删除
              console.log('执行删除')
            }else{
              //取消删除
              _this.data.recipes[index].opacity = 0;
              _this.setData({
                recipes: _this.data.recipes
              })
            }
       }
    })
  },
  onLoad(){
    let isLogin = wx.getStorageSync('isLogin')
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      isLogin,
      userInfo
    })
  },
  _dologin(){
    let that = this
    wx.getUserProfile({
      
        desc:"项目asd",
        success(e){
          console.log(e);
          let userInfo = e.userInfo 
          that.setData({
            isLogin:true,
            userInfo
          })
          wx.setStorageSync('isLogin', true)
          wx.setStorageSync('userInfo', userInfo)

           wx.cloud.callFunction({
            name:"login",
           success(resule){
              console.log(resule);
              let openid = resule.result.openid
              wx.setStorageSync('openid', openid)
              db.collection("B-user").add({
                data:{userInfo},
                success(addres){
                  console.log(addres);   
                }
              })
            
                wx.showToast({
                  title: '等路成功',
                  icon:"none"
                })
            
              
            }
          })
        },
        fail(){
         wx.showToast({
           title: '请登录',
           icon:"none"
         })
        }
  })
  }

})