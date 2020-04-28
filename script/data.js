//front-end example so no server or ajax. using JS objects as a substitute.
//handling add elements to objects
function registerTrigger(name){
  var newTrigger = {
    "name": name,
    "event": [],
    "localVariables": [],
    "conditions": [],
    "actions":[],
    "comment":""
  }
  if (nameSpace == "arcade"){
    ARCADE_ELEMENTS["Triggers"].push(newTrigger);
  }
  else if (nameSpace == "current"){
    CURRENT_ELEMENTS["Triggers"].push(newTrigger);
  }
  nameSpace = null;
}

function registerFunction(name){
  var newFunction = {
    "name": name,
    "parameters": [],
    "returnType": [],
    "localVariables": [],
    "actions":[],
    "comment":""
  }
  if (nameSpace == "arcade"){
    ARCADE_ELEMENTS["Functions"].push(newFunction);
  }
  else if (nameSpace == "current"){
    CURRENT_ELEMENTS["Functions"].push(newFunction);
  }
  nameSpace = null;
}

function registerVariable(name, type){
  var newVariable = {
    "name": name,
    "type": type,
    "value": "NONE",
    "comment":""
  }
  if (nameSpace == "arcade"){
    ARCADE_ELEMENTS["Variables"].push(newVariable);
  }
  else if (nameSpace == "current"){
    CURRENT_ELEMENTS["Variables"].push(newVariable);
  }  
  nameSpace = null;
}

function getCurrentPageElement(){
  
}
  