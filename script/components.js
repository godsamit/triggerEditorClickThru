//front-end example so no server or ajax. using JS objects as a substitute.
var ARCADE_ELEMENTS = {
    "Triggers": [],
    "Variables": [],
    "Functions": []
}

var CURRENT_ELEMENTS = {
    "Triggers": [],
    "Variables": [],
    "Functions": []
};

var toggleBtnHTML = `<i class="fas fa-caret-down"></i>  `
var newULHTML = `<ul class='active'></ul>`
var addNewTriggerHTML=`
  <li><input id='newInput' value="New Trigger"></li>
`
var addNewFunctionHTML=`
  <li><input id='newInput' value="New Function"></li>
`
var addNewVariableHTML=`
  <li><input id="newInput" value="New Variable">
    <select id="type">
      <option value="NUMBER">NUMBER</option>
      <option value="STRING">STRING</option>
      <option value="UNIT">UNIT</option>
      <option value="BOOLEAN">BOOLEAN</option>
      <option value="FLOAT2">FLOAT2</option>
      <option value="FLOAT3">FLOAT3</option>
    </select>
  </li>
`

//when an input is added, returns the correct type of input
function getInitHTML(ul){
  let li = ul.parent();
  if (li.hasClass("function")){
    return addNewFunctionHTML;
  }
  else if (li.hasClass("trigger")){
    return addNewTriggerHTML;
  }
  else if (li.hasClass("variable")){
    return addNewVariableHTML;
  }
  else return "<input id='newInput' value='New Element'>"
}

//when an input is being replaced with a span, return the HTML
function getReplaceHTML(name, type = null){
  //for functions and triggers, only display the name
  if (type == null){
    return "<li><span class='editable is-checked'>"+name+"  </span><i class='fas fa-minus-square'></i></li>"
  }
  //for variables, display the data type as well.
  else return "<li><span class='editable is-checked'>"+name+"</span><span class='type is-checked'>  | "+type+"</span> <i class='fas fa-minus-square'></i></li>"
}

///////////////////////////////////////////
//get details of elements for the right side of the page

function getVariableDetHTML(name){
//  console.log(ARCADE_ELEMENTS["Variables"]);
//  console.log(ARCADE_ELEMENTS);
  let variable;
  if (nameSpace == "arcade") 
    variable = ARCADE_ELEMENTS["Variables"].filter(obj => { return obj.name == name})[0];
  else 
    variable = CURRENT_ELEMENTS["Variables"].filter(obj => { return obj.name == name})[0];
  console.log(CURRENT_ELEMENTS["Variables"][0].name)
  console.log(name)
  console.log(variable)
  let HTML = `
    <h2 class="title">` + name + `
      <ul class="detail">
        <li class="edit">Type: ` +  variable.type + `  <i class="fas fa-edit"></i></li>
        <li class="edit">Value: ` + variable.value + `  <i class="fas fa-edit"></i></li>   
      </ul>
    </h2>
`
  return HTML;
}

function getTriggerDetHTML(name){
  let trigger;
  if (nameSpace == "arcade") 
    trigger = ARCADE_ELEMENTS["Triggers"].filter(obj => { return obj.name == name})[0];
  else 
    trigger = CURRENT_ELEMENTS["Triggers"].filter(obj => { return obj.name == name})[0];
  
  let HTML = `
    <h2 class="title">` + name + `
      <ul class="detail">
        <li class="edit">Events  <i class="fas fa-edit"></i> </li>
        <li class="edit">Local Variables  <i class="fas fa-edit"></i> </li>   
        <li class="edit">Conditions  <i class="fas fa-edit"></i> </li>   
        <li class="edit">Actions  <i class="fas fa-edit"></i> </li>   
      </ul>
    </h2>
`
  return HTML;
}

function getFunctionDetHTML(name){
  let funct;
  if (nameSpace == "arcade") 
    funct = ARCADE_ELEMENTS["Functions"].filter(obj => { return obj.name == name})[0];
  else 
    funct = CURRENT_ELEMENTS["Functions"].filter(obj => { return obj.name == name})[0];
  
  let HTML = `
    <h2 class="title">` + name + `
      <ul class="detail">
        <li class="edit">` +  funct.type+ `  <i class="fas fa-edit"></i></li>
        <li class="edit">` +  funct.name+ `  <i class="fas fa-edit"></i></li>   
      </ul>
    </h2>
`
  return HTML;
}

//////////////////////////
//attach textarea

function getTextAreaHTML(name){
  return`
      <textarea rows="4" cols="50" default = "Comment for"` + name + `></textarea>
      <button>Add comment</button
`
}