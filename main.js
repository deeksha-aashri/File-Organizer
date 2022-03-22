// entry point of my command line 

let helpFunc = require("./commands/help");            // the exported module of help commmand is catched and stored in helpFunc 
let orgFunc= require("./commands/organize");           //the exported module of organize command is catched and stored in orgFunc
let treeFunc=require("./commands/tree");
let inputArr = process.argv.slice(2);
let command = inputArr[0];                           // input at index 0 represents command
let path = inputArr[1];                              // input at first index represents the path of the file


switch (command) { 
    case "tree":
         treeFunc.tree(path);                                            //call tree function
        console.log("tree function called and executed succesfully on path " + path);
        break;
    case "organize":
        orgFunc.organize(path);                     //call organize function
                                                   //console.log("organize function called and executed succesfully on path "+ path);
        break;
    case "help":
        helpFunc.help();                            //call help function.Here we use helpFunc.keyoftheexportmodule
                                                   // console.log("help function called and executed succesfully");
        break;
    default:
        console.log("Command not recognized");
        break;
} 