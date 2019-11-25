// pages/huoche/huoche.js
const app=getApp()
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      swiperheight:"",
      qiangheight:"",
      id:0,
      start:null,
      end:null,
  },
  //根据字符串的第二个字符为空,追加0
  formatNumber:function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = util.formatTime(new Date());
    var datetemp=date.map(this.formatNumber).join('-');
    var yearEnd = date[1] + 3 > 12 ? date[0] + 1 : date[0];
    var monthEnd = date[1] + 3 > 12 ? date[1] + 3 - 12 : date[1];
    var enddate = [yearEnd, monthEnd , 1].map(this.formatNumber).join('-');
    console.log(datetemp);
    console.log(enddate);
    var that=this;
    var swiper = wx.getStorageSync("swiper-storage");
    var jilu = wx.getStorageSync("jilu-storage");
    this.setData({
      swiper: swiper,
      datetemp: datetemp,
      startdate: datetemp,
      enddate: enddate,
      jilu:jilu,
    })
    console.log(swiper);
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        that.setData({
          swiperheight: res.screenHeight/5+"px",
          qiangheight:res.screenHeight/2+"px",
          //不要忘记px
        })
      },
    })
  },
  qiehuannav:function(e){
      var id=e.currentTarget.id;
      console.log(id);
      this.setData({
        id: id,
      })
      // var id=
  },
  xuancitystart:function(){
    wx:wx.navigateTo({
      url: '../city/city?citytype=start'
    })
  },
  xuancityend: function () {
    wx: wx.navigateTo({
      url: '../city/city?citytype=end'
    })
  },
  riqichange:function(e){
    var date=e.detail.value;
    this.setData({
      startdate: date,
    })
  },
  formsubmit:function(e){
    console.log(e);
    var start = e.detail.value.startstation;
    var end = e.detail.value.endstation;
    var date = e.detail.value.date;
    var ishigh = e.detail.value.gaotie?1:0;
    var jilu = start + "-" + end;
    var jilutemp = this.data.jilu;
    jilutemp.push(jilu);
    jilutemp.shift();
    this.setData({
      jilu: jilutemp
    })
    console.log(jilutemp);
    var url = "../chepiao/chepiao?start=" + start + "&end=" + end + "&date=" + date + "&ishigh=" + ishigh;
    console.log(url)
    wx.navigateTo({
      url: url,
    })
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
    this.setData({
      start:app.globalData.trainstartcity,
      end:app.globalData.trainendcity,
    })
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