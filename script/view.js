//front-end example so no server or ajax. using JS objects as a substitute.
//handling the viewing layer and logic
var toggleBtns = $("ul, .active");
var addNewBtns = $(".fa-plus-square");
var setNameElement = $("body");

//global state that I'm editing a variable
var editName = false;

//bad practice. global variable for figuring out which list is being edited.
var nameSpace = null;

//trying to see if it's mousemove or mousedrag.
var dragging = 0;
$(document).mousedown(function() {
    dragging = 0;
    $(document).mousemove(function(){
       dragging = 1;
    });
});

//handles the adding button
function addBtnHandler(btn){
  //if there's no new list, create a new unordered list
  if (btn.closest("li").find("ul").length == 0){
    btn.parents("li").append(newULHTML);
    //and add toggle button
    btn.parent().prepend(toggleBtnHTML);
  }
  //add a temporary input for users to name there new trigger
  addInput(btn.closest("li").find("ul").first());
}
//toggle tree view
//for outer layer
$("ul").on("click", ".fa-caret-down", function(){
  $(this).parent().toggleClass("caret-down");
  $(this).closest("li").find(".active").toggleClass("nested");
});
//for inner layer
$(".active").on("click", ".fa-caret-down", function(){
  $(this).parent().toggleClass("caret-down");
  $(this).closest("li").find(".active").toggleClass("nested");
});

//add new trgger/variable... and so on
$(".fa-plus-square").on("click", function(){
  if ($(this).closest("li").find("ul").length == 0){
    $(this).parents("li").append(newULHTML);
    //and add toggle button
    $(this).parent().prepend(toggleBtnHTML);
  }  
  //add a temporary input for users to name there new trigger
  addInput($(this).closest("li").find("ul").first());
});

//add new trgger/variable... and so on
$(".active").on("click",".fa-minus-square", function(){
  ul = $(this).closest("ul");
  $(this).closest("li").remove();
  console.log(ul);
  console.log(ul.children().length);
  //if there's no element
  if (ul.children().length == 0){
    //remove the button
    console.log(ul.closest("li").find(".fa-caret-down"));
    ul.closest("li").find(".fa-caret-down").remove();
    //remove the list itself
    ul.remove();
  }  
});

//adding temporary input element
function addInput(ul, initHTML = "default"){
  if (initHTML == "default") initHTML = getInitHTML(ul);
  ul.append(initHTML);
  $("#newInput").select();
  $(".fa-plus-square").off();
  editName = true;
  //find out which list the input is being added
  nameSpace = ul.parents().eq(2).attr("class");
  //stop event bubbling
  event.stopPropagation();
}


//if user clicks outside of the input, set the name
//however, if the user drags outside of the input,
$(document).on("click", function(e){
  $('.is-checked').removeClass('is-checked');
  if (editName == true){
    //if clicked outside the input
    if (e.target.id != 'newInput' && dragging == 0) {
      addNewElement();
    }
  }
  else{
    clearElemDetail();
    clearCommentDetail()
  }
});

//if the user enters while there's an input, set the element
$(document).on('keydown',function(e){
    if(e.which == 13 && editName == true){
        addNewElement();
    }
    //up and down key's when there's an element selected
    else if(e.which == 38){
      if ($(".is-checked").length != 0){
        let current = $(".is-checked");
        if (current.closest("li").prev().length!=0){
          let prev = current.closest("li").prev()
          current.removeClass("is-checked");
          prev.find("span").addClass("is-checked");
        }
      }
    }
    else if(e.which == 40){
      if ($(".is-checked").length != 0){
        let current = $(".is-checked");
        if (current.closest("li").next().length!=0){
          let next = current.closest("li").next()
          current.removeClass("is-checked");
          next.find("span").addClass("is-checked");
        }
      }
    }
});


function addNewElement(){
      //store the input value
    let name = $("#newInput").val();
    //check the parent to see what type of input it is
    let elemClass = $("#newInput").parents().eq(2);
    if (elemClass.hasClass("variable")){
      var type = $("#type").val();
      console.log(name);
      console.log(type);
      $("#newInput").parent().replaceWith(getReplaceHTML(name, type));
      registerVariable(name, type);
    }
    else if (elemClass.hasClass("trigger")){
      $("#newInput").parent().replaceWith(getReplaceHTML(name));
      registerTrigger(name);
    }
    else if (elemClass.hasClass("function")){
      $("#newInput").parent().replaceWith(getReplaceHTML(name));
      registerFunction(name);
    }
    editName = false;
    $(".fa-plus-square").on("click", function(){
      addBtnHandler($(this));
    });
    //update the detail section on the left
    updateDetail();
    updateComment();
}

//double click on created variables will rename it
$(".active").on("dblclick", ".editable", function(e){
  let li = $(this).children().first();
  let name = li.text();
  li.replaceWith("<input id='newInput' value='"+name+"'>");
  editName = true;
})

//if click on an element, highlight it and update the right section
$('.active').on('click', 'li ul li', function() {
  event.stopPropagation();
  $('.is-checked').removeClass('is-checked');
  $(this).children("span").addClass('is-checked');
  updateDetail();
  updateComment();
});


/////////////////////////////////////////////////////////////
//View logic for displaying the details on the right side of the page
//https://stackoverflow.com/questions/1418050/string-strip-for-javascript
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
//update the info on the right side of the page
function updateDetail(){
  let obj;
  if (nameSpace == "arcade") obj = ARCADE_ELEMENTS;
  else obj = CURRENT_ELEMENTS;
  //check what type of element it is
  let elemClass = $('.is-checked').parents().eq(2);
  let name = $('.is-checked').first().text().trim();
  clearElemDetail();
   clearCommentDetail()
  if (elemClass.hasClass("variable")){
    $("#elemDetail").append(getVariableDetHTML(name));
  }
  else if (elemClass.hasClass("trigger")){
    $("#elemDetail").append(getTriggerDetHTML(name));
  }
  else if (elemClass.hasClass("function")){
    $("#elemDetail").append(getFunctionDetHTML(name));
  }
}
function clearElemDetail(){
  $("#elemDetail").children().not(':first-child').remove()
}
$("#elemDetail").on("click", ".fa-edit", function(){
  event.stopPropagation();
  prompt("Edit this element");
})

//////////////////////////////////////
//update comment
function updateComment(){
  clearCommentDetail();
  $('.is-checked').first().text().trim();
  $("#triggerComment").append(getTextAreaHTML(name));
  
}

function clearCommentDetail(){
  $("#triggerComment").children().not(':first-child').remove()
}
$("#triggerComment").on("click", ".fa-edit", function(){
  event.stopPropagation();
  prompt("Edit this element");
})