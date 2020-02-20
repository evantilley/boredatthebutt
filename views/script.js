function rotate(){
    anime({
        targets: '#wheel',
          rotate: '1turn',
         loop:true,
         easing: 'linear',
        duration: 21500,
      });
}
function rotate1(){
    anime({
        targets: '#ferris',
          rotate: '1turn',
         loop:true,
         easing: 'linear',
        duration: 21500,
      });
}



$(document).ready(function(){
    rotate()
    rotate1()
    $("#tire").click(function(){
        console.log("asdfsad")
        var img = document.querySelector("#ferris");
        var currWidth = img.clientWidth;
        var currHeight = img.clientHeight;
        console.log("width of ferris wheel" + currWidth)
        console.log("height of ferris wheel" + currHeight)
        var userImage = document.querySelector("#tire");
        var customWidth = userImage.clientWidth;
        var customHeight = userImage.clientHeight;
        img.style.width = (currWidth) + "px";
        img.style.height = (currHeight) + "px"
        $(".image3").attr("src", "images/tires.png")
        console.log("width of custom image" + customWidth)
        console.log("height of current image" + customHeight)
    })
    $("#ferris_wheel_select").click(function(){
        var img = document.querySelector("#ferris");
        var currWidth = img.clientWidth;
        var currHeight = img.clientHeight;
        var userImage = document.querySelector("#tire");
        var customWidth = userImage.clientWidth;
        var customHeight = userImage.clientHeight;
        img.style.width = (currWidth) + "px";
        img.style.height = (currHeight) + "px"
        $(".image3").attr("src", "images/ferris_wheel.png")
        console.log("width of custom image" + customWidth)
        console.log("height of current image" + customHeight)
    })

    $("#lemon").click(function(){
        var img = document.querySelector("#ferris");
        var currWidth = img.clientWidth;
        var currHeight = img.clientHeight;
        var userImage = document.querySelector("#tire");
        var customWidth = userImage.clientWidth;
        var customHeight = userImage.clientHeight;
        img.style.width = (currWidth) + "px";
        img.style.height = (currHeight) + "px"
        $(".image3").attr("src", "images/lemon.png")
        console.log("width of custom image" + customWidth)
        console.log("height of current image" + customHeight)
    })
    $("#columbia").click(function(){
        var img = document.querySelector("#ferris");
        var currWidth = img.clientWidth;
        var currHeight = img.clientHeight;
        var userImage = document.querySelector("#tire");
        var customWidth = userImage.clientWidth;
        var customHeight = userImage.clientHeight;
        img.style.width = (currWidth) + "px";
        img.style.height = (currHeight) + "px"
        $(".image3").attr("src", "images/columbia_logo_circle.png")
        console.log("width of custom image" + customWidth)
        console.log("height of current image" + customHeight)
    })
})   
   
   
