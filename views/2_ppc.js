employees = [
    "Phyllis",
    "Angela",
    "Dwight",
    "Oscar",
    "Creed",
    "Pam",
    "Jim",
    "Stanley",
    "Michael",
    "Kevin",
    "Kelly"
    ]

var ppc = []

var nonPpc = []


function updateUI(){

    nonPpcCount = 0
    code = ""
    console.log(nonPpc)
    for (var i = 0; i < nonPpc.length; i++){
        code += "<div class = 'draggable-nonPpc' id =" + nonPpcCount + ">" + (i+1) + ": " + nonPpc[i] + "</div>";
        nonPpcCount++
    }
    $("#non-ppc").html(code)

    ppcCount = 0
    //code = "<div class = 'margin-left'>"
    code = "<div class = margin-left>"
    for (var i = 0; i < ppc.length; i++){
        code += "<div class = 'draggable-ppc' id =" +  ppcCount + '>' + (i+1) + ": " + ppc[ppcCount] + "</div>";
        ppcCount ++;
    }
    $("#ppc").html(code)
    reset()

    
}

function reset(){

    
    $('#ppc-label').droppable({

        accept: ".draggable-nonPpc",
        classes: {
            'ui-droppable-hover': 'even-darker-blue'
          },
        drop: function( event, ui ) {
            $("#ppc-label").removeClass("darker-blue")
            // clone item to retain in original "list"
            console.log(ui.draggable.attr('id'))
            if (ui.draggable.hasClass("draggable-ppc") == false){
            ppc.unshift(nonPpc[ui.draggable.attr('id')])
            nonPpc.splice(ui.draggable.attr('id'),1);
            }    
            updateUI()
        }
    });


    
    $(".draggable-ppc").draggable({
        //thanks to this comment on stackoverflow for this info: https://stackoverflow.com/a/5848800
        revert: function(event,ui){
            $(this).originalPosition = {
                top : 0,
                left : 0,
            };
            // return boolean
            return !event;
        },
        end: function(){
            console.log("asdfasdfefae")
        },
        
        stack: ".draggable-ppc",
        start: function(){
            $(this).addClass("yellow")
            console.log("asdfsda")
            $("#non-ppc-label").addClass("darker-blue")
        },
        cursor: 'move',
        containment: "document"
        }
    );
    $(".draggable-ppc").hover(function(){
        console.log("hovered over")
        if ($(this).hasClass('yellow')){
            $(this).removeClass("yellow")
        } else{
            $(this).addClass("yellow")
        }
    })


    $( ".draggable-nonPpc" ).mouseup(function() {
        $("#ppc-label").removeClass("darker-blue")
      });

      $( ".draggable-ppc" ).mouseup(function() {
        $("#non-ppc-label").removeClass("darker-blue")
      });



    $(".draggable-nonPpc").draggable({
        //thanks to this comment on stackoverflow for this info: https://stackoverflow.com/a/5848800
        revert: function(event,ui){
            console.log("asdfsda")
            $(this).originalPosition = {
                top : 0,
                left : 0,
            };
            // return boolean
            return !event;
        },

        stop: function(){
            $("#ppc-label").removeClass("darker-blue")
        },


        stack: ".draggable",
        start: function(){
            $(this).addClass("yellow")
            console.log("asdfsda")
            $("#ppc-label").addClass("darker-blue")
        },
        cursor: 'move',
        containment: "document"
        }
    );
    $(".draggable-nonPpc").hover(function(){
        console.log("hovered over")
        if ($(this).hasClass('yellow')){
            $(this).removeClass("yellow")
        } else{
            $(this).addClass("yellow")
        }
    })




    
    $('#non-ppc-label').droppable({
        accept: ".draggable-ppc",
        classes: {
            'ui-droppable-hover': 'even-darker-blue'
          },

        drop: function( event, ui ) {
            $("#non-ppc-label").removeClass("darker-blue")
            // clone item to retain in original "list"
            if (ui.draggable.hasClass("draggable-nonPpc") == false){
                nonPpc.unshift(ppc[ui.draggable.attr('id')])
                ppc.splice(ui.draggable.attr('id'),1);  
            }
  
            updateUI()
        }
    });

}

$(document).ready(function(){
    nonPpc = employees;
    reset()
    updateUI()
})
