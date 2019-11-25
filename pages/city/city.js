// pages/city/city.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollNow:0,
    youtop:0,
    //绑定的数据优于css
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type=options.citytype;
    console.log(type);
    var citys = wx.getStorageSync("citys-storage")
    var cityAZ = wx.getStorageSync("cityAZ-storage")
    this.setData({
      citytype: type,
      citysresult: citys,
      cityAZ: cityAZ,
    })
  },
  bindaz:function(e){
    var that=this;
    var currentcityname=e.currentTarget.dataset.id;
    console.log(currentcityname);
    wx.createSelectorQuery().selectAll(".shouzimu").fields({
      //不要忘记.#等前缀
      //拿到每个首字母的也就27个
      dataset:true,
      size:true,
      rect:true
    },function(res){
      res.forEach(function(re){
        if (currentcityname==re.dataset.cityname){
          wx.pageScrollTo({
            scrollTop:re.top+that.data.scrollNow,
            duration:0
          })
          that.setData({
            youtop: re.top + that.data.scrollNow+"px",
          })
          console.log(re);
        }
      })
    }).exec();
  },
  onPageScroll:function(e){
    this.setData({
      scrollNow: e.scrollTop,
      youtop: e.scrollTop+ "px",
    })
    console.log(e)
  },
  backtop:function(){
    var that=this;
    wx.pageScrollTo({
      scrollTop: -that.data.youtop,
      duration: 0
    })
    this.setData({
      youtop: -that.data.youtop
    })
  },
  inputsearch:function(e){
    // if (app.globalData.dingshi){
    //   clearInterval(app.globalData.dingshi);
    // }
    var inputvalue=e.detail.value;
    var citysresulttemp=new Array();
    var citys = this.data.citysresult;
    if (inputvalue == null || inputvalue==""){
      this.setData({
        citysresult: citys,
      })
      return ;
    }
    for(var i=0;i<citys.length;i++){
      if (citys[i].cityName.indexOf(inputvalue) == 0 || citys[i].cityPinYin.indexOf(inputvalue.toLowerCase()) == 0 || citys[i].cityPY.indexOf(inputvalue.toLowerCase()) == 0){
        //去除热门
        if (citys[i].cityPinYin.indexOf('#')==0){
            continue;
            //跳出，再进行i判断，不会执行下面的代码
        }
        citysresulttemp.push(citys[i]);
      }
    }
    this.setData({
      citysresult: citysresulttemp,
    })
    console.log(citysresulttemp);
    console.log(e)
    // this.startjiance();
  },
  startjiance:function(){
    const query=wx.createSelectorQuery();
    query.select('#ceshi').fields({
      context: true,
      dataset: true,
      size: true,
    },function(res){
      console.log(res)
    }).exec()
    // app.globalData.dingshi=setInterval(function(){
    //   console.log(inputvalue);
    // },500);
  },
  quxiao:function(){
    var citys = wx.getStorageSync("citys-storage");
    this.setData({
      citysresult: citys,
      inputvalue:"",
    })
  },
  cityselect:function(e){
    var citynameTemp=e.currentTarget.dataset.cityname;
    if(this.data.citytype=='start'){
      app.globalData.trainstartcity = citynameTemp;
    }
    if (this.data.citytype == 'end'){
      app.globalData.trainendcity = citynameTemp;
    }
    console.log(citynameTemp);
    wx.navigateBack();
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