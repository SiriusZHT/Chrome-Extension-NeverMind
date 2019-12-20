//开机动画
  loadingAn()
  function loadingAn() {
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
    })
  }