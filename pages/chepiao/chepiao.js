// pages/chepiao/chepiao.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    station:"",
    endstation:"",
    departuretime:"",
    costtime:"",
    trainno:"",
    type:"",
    arrivaltime:"",
    huozuo: {
      numgr: "",
      numrw: "",
      numyw: "",
      numyz: "",
    },
    gaozuo:{
      numed: "",
      numyd: "",
      numsw: "",
    },
    priceyz:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var start=options.start;
    var end = options.end;
    var date = options.date;
    this.setData({
      start: start,
      end: end, 
      date: date,
    })
    this.chulishuju(date);
  },
  chulishuju: function (date){
    var that = this;
    wx.setNavigationBarTitle({
      title: this.data.start + '-' + this.data.end,
    })
    var url = "https://api.jisuapi.com/train/ticket?appkey=741f4e368288488a&start=" + this.data.start + "&end=" + this.data.end + "&date=" + date;
    // var chuliresult = [];
    // var temp = {
    //   station: "广州南",
    //   endstation: "北京西",
    //   departuretime: "07:47",
    //   costtime: "10小时35分",
    //   trainno: "G72",
    //   type: "G",
    //   arrivaltime: "18:22",
    //   priceyz: "11",
    // }
    // chuliresult.push(temp)
    // that.setData({
    //   chuliresult: chuliresult
    // })
    // return ;
    wx.request({
      url: url,
      header: {
        "content-type": "json"
      },
      method: "POST",
      success: (res) => {
        console.log(res);
        var chuliresult = [];
        var reslist = res.data.result.list;
        for (var idx in reslist) {
          var piao = reslist[idx];
          if (piao.type && piao.departuretime.indexOf("24")) {
            if (piao.type.indexOf('D') == 0 || piao.type.indexOf('G') == 0) {
              var piaotemp = {
                numed: piao.numed ? piao.numed : 0,
                numyd: piao.numyd ? piao.numyd : 0,
                numsw: piao.numsw ? piao.numsw : 0,
              }
              var piaotype = "gaozuo";
            }
            else {
              var piaotemp = {
                numgr: piao.numgr ? piao.numgr : 0,
                numrw: piao.numrw ? piao.numrw : 0,
                numyw: piao.numyw ? piao.numyw : 0,
                numyz: piao.numyz ? piao.numyz : 0,
              }
              var piaotype = "huozuo";
            }
            // var strs = piao.costtime.split(":");
            // var newstrs = strs[0] + "小时" + strs[1] + "分";
            var temp = {
              station: piao.station,
              endstation: piao.endstation,
              departuretime: piao.departuretime,
              costtime: piao.costtime,
              trainno: piao.trainno,
              type: piao.type,
              [piaotype]: piaotemp,
              arrivaltime: piao.arrivaltime,
              priceyz: piao.priceyz === '-' ? piao.priceed : piao.priceyz,
            }
            chuliresult.push(temp)
          }
        }
        console.log(chuliresult);
        that.setData({
          chuliresult: chuliresult
        })
      },
      fail: (error) => {
        console.log(error)
      },
    })
  },
  beforedate:function(){
    // var beforedate=this.data.date.split('-');
    // console.log(beforedate[2] - 1)
    // var newdate = beforedate[0] +"-"+ beforedate[1]+"-"+(beforedate[2]-1);
    var newdate = new Date(new Date(this.data.date).getTime() - 1000 * 3600 *24).toLocaleDateString().replace(/\//g,'-')
    this.setData({
      date: newdate
    })
    this.chulishuju(newdate);
    console.log(newdate);
  },
  afterdate:function(){
    // var afterdate = this.data.date.split('-');
    // var ri = parseInt(afterdate[2]) + 1;
    // var newdate = afterdate[0] + "-" + afterdate[1] + "-" + ri;
    var newdate = new Date(new Date(this.data.date).getTime() + 1000 * 3600 *24).toLocaleDateString().replace(/\//g,'-')
    this.setData({
      date: newdate
    })
    this.chulishuju(newdate);
    console.log(newdate);
  },
  qiangpiao:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    var qiaopiao=this.data.chuliresult[id];
    var startion=qiaopiao.station;
    var endstation=qiaopiao.endstation;
    var trainno = qiaopiao.trainno; //唯一
    var departuretime=qiaopiao.departuretime;
    var arrivaltime=qiaopiao.arrivaltime;
    var date=this.data.date;
    db.collection("qiangpiao").add({
      data:{
        startion: startion,
        endstation: endstation,
        trainno: trainno,
        departuretime: departuretime,
        arrivaltime: arrivaltime,
        date: date,
        shakedown:true
      },
      success:res=>{
        console.log(res);
        wx.showToast({
          title: '抢票成功',
          icon: '',
          image: '',
          duration: 1000,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },fail:err=>{
        console.log(err)
      }
    })
    console.log(qiaopiao);
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