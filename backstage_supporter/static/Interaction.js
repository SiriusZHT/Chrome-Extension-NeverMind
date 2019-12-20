window.onload = function () {
  //获取DOM元素
  var arrow = document.querySelector("#head .headMain > .arrow")
  /*
  *在设置样式时，li的position为relative，其offsetLeft和offsetTop是相对于其最近的定位父级(祖先)来算的，也就是headMain
  * 和arrow是一致的
  */
  var liNodes = document.querySelectorAll("#head .headMain > nav > .list > li")
  var firstNode = liNodes[0]
  var upNodes = document.querySelectorAll("#head .headMain > nav > .list > li .up")
  var firstUp = upNodes[0]
  var head = document.querySelector("#head ")
  var content = document.querySelector("#content ")
  var cLiNodes = document.querySelectorAll("#content .list >li")
  var cList = document.querySelector("#content .list")

  var home2LiNodes = document.querySelectorAll("#content > .list > .home .home2 > li")
  var home1LiNodes = document.querySelectorAll("#content > .list > .home .home1 > li")
  var home1 = document.querySelector("#content > .list > .home .home1 ")
  var aboutUls = document.querySelectorAll("#content > .list > .about .about3 > .item > ul")
  var liNavNodes = document.querySelectorAll("#content > .listNav > li")
  var picLiNodes = document.querySelectorAll("#content > .list > .team .team3 > ul > li")
  var picList = document.querySelector("#content > .list > .team .team3 > ul")
  var music = document.querySelector("#head .headMain > .player")
  var audio = document.querySelector("#head .headMain > .player > audio")
  //var team3 = document.querySelector("#content > .list > .team .team3")
  var line = document.querySelector("#mask > .line")
  var sides = document.querySelectorAll("#mask > div")
  var mask = document.querySelector("#mask")
  //同步当前屏的索引，this.index 会同步到 now，但是now不会同步到 this.index
  var now = 0
  var timer = 0
  var time1 = 0
  var time2 = 0
  //触发入场动画屏幕的上一屏索引
  var preIndex = 0

  //开机动画
  loadingAn()
  function loadingAn() {
    //模拟图片加载进度
    var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
    var flag = 0
    for (var i = 0; i < arr.length; i++) {
      var img = new Image()
      img.src = "img/" + arr[i]
      img.onload = function () {
        flag ++
        line.style.width = flag/arr.length * 100 + "%"
      }
    }
    /*注意：transitionend，而不是transitioned*/
    line.addEventListener("transitionend",function () {
      /*console.log("hiuhiu")*/
      if (flag === arr.length){
          sides[0].style.height = 0 + "px"
          sides[1].style.height = 0 + "px"
        }
        this.style.display = "none"
    })
    sides[0].addEventListener("transitionend",function () {
      //console.log(mask)
      //mask.parentNode.removeChild(mask)
      mask.remove()
      audio.play()
      home3D()
    })
  }


  //背景音乐事件
  //audio.play()
  music.onclick = function () {
    if(audio.paused){
      audio.play()
      music.style.background = "url(img/musicon.gif) no-repeat"
      //console.log(audio.currentTime)
    }else{
      audio.pause()
      music.style.background = "url(img/musicoff.gif) no-repeat"
    }
  }

  //动画效果
  //每一屏的出入场动画
  //定义一个数组，用于储存所有屏的出入场动画状态
  var anArr = [
    //第1屏
    {
      //入场动画
      inAn:function () {
        var home1 = document.querySelector("#content > .list > .home .home1 ")
        var home2 = document.querySelector("#content > .list > .home .home2 ")

        home1.style.transform = "translateY(0)"
        home2.style.transform = "translateY(0)"
        home1.style.opacity = 1
        home2.style.opacity = 1
      },
      //出场动画
      outAn:function () {
        var home1 = document.querySelector("#content > .list > .home .home1 ")
        var home2 = document.querySelector("#content > .list > .home .home2 ")

        home1.style.transform = "translateY(-200px)"
        home2.style.transform = "translateY(200px)"
        home1.style.opacity = 0
        home2.style.opacity = 0
      }
    },
    //第2屏
    {
      //入场动画
      inAn:function () {
        var plan1 = document.querySelector("#content > .list > .course .plane1")
        var plan2 = document.querySelector("#content > .list > .course .plane2")
        var plan3 = document.querySelector("#content > .list > .course .plane3")

        plan1.style.transform = "translate(0px,0px)"
        plan2.style.transform = "translate(0px,0px)"
        plan3.style.transform = "translate(0px,0px)"
      },
      //出场动画
      outAn:function () {
        var plan1 = document.querySelector("#content > .list > .course .plane1")
        var plan2 = document.querySelector("#content > .list > .course .plane2")
        var plan3 = document.querySelector("#content > .list > .course .plane3")

        plan1.style.transform = "translate(-200px,-200px)"
        plan2.style.transform = "translate(-200px,200px)"
        plan3.style.transform = "translate(200px,-200px)"
      }
    },
    //第3屏
    {
      //入场动画
      inAn:function () {
        var pencil1 = document.querySelector("#content > .list > .works .pencel1")
        var pencil2 = document.querySelector("#content > .list > .works .pencel2")
        var pencil3 = document.querySelector("#content > .list > .works .pencel3")

        pencil1.style.transform = "translateY(0px)"
        pencil2.style.transform = "translateY(0px)"
        pencil3.style.transform = "translateY(0px)"
      },
      //出场动画
      outAn:function () {
        var pencil1 = document.querySelector("#content > .list > .works .pencel1")
        var pencil2 = document.querySelector("#content > .list > .works .pencel2")
        var pencil3 = document.querySelector("#content > .list > .works .pencel3")

        pencil1.style.transform = "translateY(-100px)"
        pencil2.style.transform = "translateY(100px)"
        pencil3.style.transform = "translateY(100px)"
      }
    },
    //第4屏
    {
      //入场动画
      inAn:function () {
        var pic1 = document.querySelector("#content > .list > .about .about3 > .item:nth-of-type(1)")
        var pic2 = document.querySelector("#content > .list > .about .about3 > .item:nth-of-type(2)")

        pic1.style.transform = "rotate(0deg)"
        pic2.style.transform = "rotate(0deg)"
      },
      //出场动画
      outAn:function () {
        var pic1 = document.querySelector("#content > .list > .about .about3 > .item:nth-of-type(1)")
        var pic2 = document.querySelector("#content > .list > .about .about3 > .item:nth-of-type(2)")

        pic1.style.transform = "rotate(30deg)"
        pic2.style.transform = "rotate(-30deg)"
      }
    },
    //第5屏
    {
      //入场动画
      inAn:function () {
        var text1 = document.querySelector("#content > .list > .team .team1")
        var text2 = document.querySelector("#content > .list > .team .team2")

        text1.style.transform = "translateX(0px)"
        text2.style.transform = "translateX(0px)"
      },
      //出场动画
      outAn:function () {
        var text1 = document.querySelector("#content > .list > .team .team1")
        var text2 = document.querySelector("#content > .list > .team .team2")

        text1.style.transform = "translateX(-200px)"
        text2.style.transform = "translateX(200px)"
      }
    }
  ]

  for (var i = 0; i < anArr.length; i++) {
    //anArr[i].outAn()
    anArr[i]["outAn"]()
    setTimeout(function () {
      anArr[0].inAn()
    },2000)
  }
/*测试
 anArr[4].outAn()
  setTimeout(function () {
    anArr[4].inAn()
  },2000)*/

  //第5屏气泡效果
  bubble()
  function bubble() {
    var oc = null
    for (var i = 0; i < picLiNodes.length; i++) {
      picLiNodes[i].onmouseenter = function () {
        for (var j = 0; j < picLiNodes.length; j++) {
          picLiNodes[j].style.opacity = 0.5
        }
        this.style.opacity = 1
        addCanvas()
        oc.style.left = this.offsetLeft + "px"
      }
      /*onmouseleave不能绑在picLiNodes上面，因为触发onmouseenter事件之后，会生成一个canvas在li上面，此时鼠标在canvas上面，会触发onmouseleave
      * 事件，从而导致li的opacity一直为1*/
     /* picLiNodes[i].onmouseleave = function () {
        for (var j = 0; j < picLiNodes.length; j++) {
          picLiNodes[j].style.opacity = 1
        }
      }*/
    }
    function addCanvas() {
      if(!oc){
        oc = document.createElement("canvas")
        /*team3.appendChild(oc)*/
        //oc.style.background = "pink"
        oc.width = picLiNodes[0].offsetWidth
        oc.height = picLiNodes[0].offsetHeight * 0.8
        oc.onmouseleave = function () {
            for (var j = 0; j < picLiNodes.length; j++) {
              picLiNodes[j].style.opacity = 1
            }
            removeCanvas()
          }
        //console.log(oc.width,oc.height)
        picList.parentNode.appendChild(oc)
        drawBubble()
      }
    }

    //移除canvas
    function removeCanvas() {
      oc.remove();
      oc = null;
      clearInterval(time1)
      clearInterval(time2)
    }
    //在canvas上绘制气泡
    function drawBubble() {
      if(oc && oc.getContext){
        var ctx = oc.getContext("2d")

        //定义一个数组arr，存放每一个气泡相关的数据
        var arr = []

        //定义一个定时器，不断生成每个气泡的参数
        time1 = setInterval(function () {
          var r = Math.random() * 6 + 2
          var x = Math.random() * oc.width
          var y = oc.height - r
          var step = Math.random() * 20 + 10
          var red = Math.round(Math.random() * 255)
          var yellow = Math.round(Math.random() * 255)
          var blue = Math.round(Math.random() * 255)
          var startX = x
          var startY = y
          var deg = 0
          var alp = 1
          arr.push({
            x:x,
            y:y,
            r:r,
            red:red,
            yellow:yellow,
            blue:blue,
            deg:deg,
            startX:startX,
            startY:startY,
            step:step,
            alp:alp
          })
          //console.log(arr)
        },50)

        //定义另一个定时器，不断地在画布上绘制气泡
        time2 = setInterval(function () {
          ctx.clearRect(0,0,oc.width,oc.height)
          //定义一个循环，取出每个气泡的参数，并进行操作，来实现动态效果
          for (var j = 0; j < arr.length; j++) {
            if(arr[j].y < 50) {arr.splice(j,1)}
            arr[j].deg += 5
            console.log(arr[j].deg)
            //debugger
            arr[j].y = arr[j].startY - (arr[j].deg*Math.PI/180)*arr[j].step/2
            arr[j].x = arr[j].startX + Math.sin(arr[j].deg*Math.PI/180)*arr[j].step*1.5
          }
          //定义另一个循环，绘制气泡
          for (var i = 0; i < arr.length; i++) {
            ctx.save()
            ctx.fillStyle = "rgba("+ arr[i].red + "," + arr[i].yellow + "," + arr[i].blue + "," + arr[i].alp + ")"
            ctx.beginPath()
            ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI)
            ctx.fill()
            ctx.restore()
          }
        },500/60)
      }
    }
  }


  //第4屏图片炸裂效果
  picSplit()
  function picSplit() {
    for (var i = 0; i < aboutUls.length; i++) {
      change(aboutUls[i])

    }

    function change(Ul) {
      var src = Ul.dataset.src
      var w = Ul.offsetWidth/2
      var h = Ul.offsetHeight/2
      for (var i = 0; i < 4; i++) {
        var liNode = document.createElement("li")
        //var img = new Image()
        var imgNode = document.createElement("img")
        liNode.style.width = w + "px"
        liNode.style.height = h + "px"

        /*
        *1、left:0 top:0
        * 2、left:-width top:0
        * 3、left:0 top:-height
        * 4、left:-width top:-height
        */
        //+ "px"不能掉
        imgNode.style.left = i % 2 == 0 ? 0 : -w + "px"
        imgNode.style.top = i / 2 == 0 ? 0 : -h*Math.floor(i/2) + "px"
        imgNode.src = src
        liNode.appendChild(imgNode)
        Ul.appendChild(liNode)
      }
      //不能直接取imgNodes，在这里取imgNodes会将两幅图片中所有的imgNode都取出来
      //var imgNodes = document.querySelectorAll("#content > .list > .about .about3 > .item > ul > li > img")
      Ul.onmouseenter = function () {
        /*
        *1、left:0 top:height
        * 2、left:-2width top:0
        * 3、left:width top:-height
        * 4、left:-width top:-2height
        */
        /*console.log("hahaha ")*/
        var imgNodes = this.querySelectorAll("li > img")
        imgNodes[0].style.top = h + "px"
        imgNodes[1].style.left = -2*w + "px"
        imgNodes[2].style.left = w + "px"
        imgNodes[3].style.top = -2*h + "px"
      }
      Ul.onmouseleave = function () {
        var imgNodes = this.querySelectorAll("li > img")
        imgNodes[0].style.top = 0 + "px"
        imgNodes[1].style.left = -w + "px"
        imgNodes[2].style.left = 0 + "px"
        imgNodes[3].style.top = -h + "px"
      }
    }
  }


  //第一屏3D效果
  var oldIndex = 0
  var timer3D = 0
  var autoIndex = 0
  /*home3D()*/
  function home3D(){
    for (var i = 0; i < home2LiNodes.length; i++) {
      home2LiNodes[i].index = i
      home2LiNodes[i].onclick = function () {
        clearInterval(timer3D)
        for (var j = 0; j < home2LiNodes.length; j++) {
          home2LiNodes[j].classList.remove("active")
        }
        this.classList.add("active")
        //从左往右，当前索引大于上一次索引 rightShow leftHide,相应的状态样式已经定义在css文件中
        if(this.index > oldIndex){
          home1LiNodes[this.index].classList.remove("rightShow")
          home1LiNodes[this.index].classList.remove("leftHide")
          home1LiNodes[this.index].classList.remove("rightHide")
          home1LiNodes[this.index].classList.remove("leftShow")
          home1LiNodes[this.index].classList.add("rightShow")

          home1LiNodes[oldIndex].classList.remove("rightShow")
          home1LiNodes[oldIndex].classList.remove("leftHide")
          home1LiNodes[oldIndex].classList.remove("rightHide")
          home1LiNodes[oldIndex].classList.remove("leftShow")
          home1LiNodes[oldIndex].classList.add("leftHide")
        }
        //从右向左，当前索引小于上一次索引 rightHide leftShow
        if (this.index < oldIndex){
          home1LiNodes[this.index].classList.remove("rightShow")
          home1LiNodes[this.index].classList.remove("leftHide")
          home1LiNodes[this.index].classList.remove("rightHide")
          home1LiNodes[this.index].classList.remove("leftShow")
          home1LiNodes[this.index].classList.add("leftShow")

          home1LiNodes[oldIndex].classList.remove("rightShow")
          home1LiNodes[oldIndex].classList.remove("leftHide")
          home1LiNodes[oldIndex].classList.remove("rightHide")
          home1LiNodes[oldIndex].classList.remove("leftShow")
          home1LiNodes[oldIndex].classList.add("rightHide")
        }
        oldIndex = this.index
        //手动同步自动轮播
        autoIndex = this.index

        //重新开始自动轮播
        //autoCarousel()
      }
    }
    autoCarousel()
    //从左向右自动轮播
    function autoCarousel() {
      clearInterval(timer3D)
      timer3D = setInterval(function () {
        autoIndex ++
        //无缝轮播
        if (autoIndex == home1LiNodes.length){autoIndex = 0}
        //小圆点同步
        for (var j = 0; j < home2LiNodes.length; j++) {
          home2LiNodes[j].classList.remove("active")
        }
        home2LiNodes[autoIndex].classList.add("active")
        //自动轮播
        home1LiNodes[autoIndex].classList.remove("rightShow")
        home1LiNodes[autoIndex].classList.remove("leftHide")
        home1LiNodes[autoIndex].classList.remove("rightHide")
        home1LiNodes[autoIndex].classList.remove("leftShow")
        home1LiNodes[autoIndex].classList.add("rightShow")

        home1LiNodes[oldIndex].classList.remove("rightShow")
        home1LiNodes[oldIndex].classList.remove("leftHide")
        home1LiNodes[oldIndex].classList.remove("rightHide")
        home1LiNodes[oldIndex].classList.remove("leftShow")
        home1LiNodes[oldIndex].classList.add("leftHide")


        //自动轮播同步手动轮播图的index
        oldIndex = autoIndex
      },2000)
    }
    home1.onmouseenter = function () {
      clearInterval(timer3D)
    }
    home1.onmouseleave=function(){
      autoCarousel();
    }
  }

  //内容区
  window.onresize = function(){
    /*
    * 调整分辨率（百分比没关系，如果单位是"px"需要调整）
    *   1、没有点击时，视口中只能出现一屏
    *   2、点击后，视口中也只能出现一屏，在第1步的基础上对每一屏的偏移量进行调整
    *   3、小箭头的位置也需要调整
    */
    contentBind()
    cList.style.top = -now * (document.documentElement.clientHeight - head.offsetHeight) + "px"
    arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth/2 - arrow.offsetWidth/2 + "px"
  }
  /*内容区交互*/
  /*鼠标滚轮*/
  if(content.addEventListener){
    content.addEventListener("DOMMouseScroll",function (ev) {
      /*让fn的逻辑在DOM事件被频繁触发的时候，只执行一次*/
      ev = ev || event
      //只要是在100ms内，多次滑动鼠标并不会多次触发fn
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn(ev)
      },100)

    })
  }
  content.onmousewheel = function (ev) {
    ev = ev || event
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn(ev)
    },200)
  }
  /*回调函数*/
  function fn(ev){
    ev = ev || event
    var dir = "";
    if(ev.wheelDelta){
      dir = ev.wheelDelta > 0?"up" : "down";
    }
    if (ev.detail){
      dir = ev.detail < 0? "up" : "down"
    }
    preIndex = now
    switch (dir){
      case "up":
        if (now > 0){
          now--
          move(now)
        }
        /*if (cList.offsetTop > 0){cList.style.top = "0px"}*/
        break
      case "down":

        if (now < cLiNodes.length-1){
          now++
          move(now)
        }

        break
    }
    if(ev.preventDefault){
      ev.preventDefault()
    }
    return false
  }
  /*调整尺寸*/
  contentBind()
  function contentBind() {
    content.style.height = document.documentElement.clientHeight - head.offsetHeight + "px"
    for (var i = 0; i < cLiNodes.length; i++) {
      cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight + "px"
      /*console.log(cLiNodes[i].style.height)*/
    }
  }

  /*头部交互*/
  headBind()
  function headBind(){
    /*console.log(firstNode.width)*/
    //arrow的偏移量 = li.offsetLeft + li.offsetWidth/2 - offsetWidth/2
    firstUp.style.width = "100%"
    arrow.style.left = firstNode.offsetLeft + firstNode.offsetWidth/2 - arrow.offsetWidth/2 + "px"

    //为所有的li节点绑定单击响应函数
    for (var i = 0; i < liNodes.length; i++) {
      liNodes[i].index = i
      liNodes[i].onclick = function (){
        /*注意：应该将upNodes[i].style.width设为空，因为style.width设置的是内联样式，特殊性最大，如果设置为0，则会点击之后再hover时，
        hover样式会失效，为空则不影响，也可以用！important，但是在开发中尽量不要使用！important
        */
        //将所有upNodes的style.width设为空，保证每次只有点击的那个li的字体变为黑色
        preIndex = now
        move(this.index)
        now = this.index
      }
    }
    //侧边栏导航按钮点击事件
    for (var j = 0; j < liNavNodes.length; j++) {
      liNavNodes[j].index = j
      liNavNodes[j].onclick = function (){
        this.classList.add("active")
        preIndex = now
        move(this.index)
        now = this.index
      }
    }
  }

  /*将公共的代码抽取出来，写成函数*/
  /*异步代码，因为是在异步流程中被调用*/
  /*点击菜单栏、滚动鼠标都要涉及到move函数，move是动画的关键*/
  /*move(4)*/
  function move(index){
    for (var j = 0; j< upNodes.length; j++) {
      upNodes[j].style.width = ""
    }
    upNodes[index].style.width = "100%"
    arrow.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth/2 - arrow.offsetWidth/2 + "px"
    cList.style.top = -index * (document.documentElement.clientHeight - head.offsetHeight) + "px"
    for (var i = 0; i < liNavNodes.length; i++) {
      liNavNodes[i].className = ""
    }
    liNavNodes[index].className = "active"

    //出入场动画
    if(anArr[index] && typeof anArr[index]["inAn"] === "function"){
      anArr[index].inAn()
    }
    if(anArr[preIndex] && typeof anArr[preIndex]["inAn"] === "function"){
      anArr[preIndex].outAn()
    }
  }
}