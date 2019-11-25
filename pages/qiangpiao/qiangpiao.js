// pages/qiangpiao/qiangpiao.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    db.collection("qiangpiao").get({
      success(res) {
        that.setData({
          yunshuju:res.data
        })
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    setTimeout(function(){
      that.setData({
        dingdan:that.data.yunshuju,
      })
      console.log(that.data.dingdan);
    },2500);
  },
  qiangcancel:function(e){
    var that=this;
    var id=e.currentTarget.id;
    var itemid=e.currentTarget.dataset.itemid;
    db.collection("qiangpiao").doc(itemid).update({
      data: {
        shakedown: false
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: '取消成功',
          icon: '',
          image: '',
          duration: 1000,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: err => {
        console.log(err);
      }
    })
    var dingdan = this.data.dingdan;
    if(dingdan[id]._id.indexOf(itemid)==0){
      //indexOf可以检验字符串
      dingdan[id].shakedown=false;
      this.setData({
        dingdan: dingdan
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})