$(function(){
 
    
    var paint = false; //are u painting/earasing or not
    var paint_erase = "paint"; //are u painting or erasing
    var canvas = document.getElementById("paint"); //get canvas and its context
    var ctx = canvas.getContext('2d');
    var container = $("#container"); //get canvas container
    var mouse ={x:0, y:0}; //mouse position
    
    //set the initial drawing parameters( linewidth, linejoin, linecap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap ="round";
    
    //click inside the container
    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x= e.pageX-this.offsetLeft;
        mouse.y= e.pageY-this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    });
    
    //moving inside the contaier with the mouse key holded
    container.mousemove(function(e){
        mouse.x= e.pageX-this.offsetLeft;
        mouse.y= e.pageY-this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                //getcolor input
                ctx.strokeStyle = $("#paintColor").val() ;
            }else{
                //white color
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
    
    //onloading load the saved work from local storage
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };
    
    //mouse-up... we re not painting/erasing anymore
    container.mouseup(function(){
        paint = false;
    });
    
    //if we leave the container we are not painting/erasing anymore
    container.mouseup(function(){
        paint = false;
    });
    
    //reset button
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase="paint";
        $("#erase").removeClass("eraseMode");
    });
    
    
    //click on erase button
    $("#erase").click(function(){
        if(paint_erase=="paint"){
            paint_erase="erase";
        }else{
            paint_erase="paint";
        }
        $(this).toggleClass("eraseMode");
    });
    
    //click on save button
    
    $("#save").click(function(){
        if(typeof(localStorage)!=null){
            localStorage.setItem("imgCanvas",canvas.toDataURL());
            
        }else{
            window.alert("Your browser does not support local storage. Sorry!!");
        }
    });
    
    $("#slider").slider({
       min:3,
       max:30,
       slide: function(event, ui){
           $("#circle").height(ui.value);
           $("#circle").width(ui.value);
           ctx.lineWidth = ui.value;
       }
   });
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());
    });
    
    
    /*var canvas=document.getElementById("paint");
    var context = canvas.getContext('2d');
    
    //draw a line
    //declare new path
    context.beginPath();
    
    //set line width
    context.lineWidth = 10;
    //set color of line
    context.strokeStyle = '#11c9f2';
    
    //set cap to line(round,butt, square)
    context.lineCap = "round";
    
    //set line join stle(bevel, round, square)
    context.lineJoin="round";
    
    //positioned the context point
    context.moveTo(50,50);
    
    //draw a straight line from starting pt to new position
    context.lineTo(200,200);
    
    //draw another line
    context.lineTo(400,100);
    
    //to make like visible
    context.stroke();*/
    
});