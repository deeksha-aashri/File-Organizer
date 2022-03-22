const fs= require("fs");
const path= require("path");

function tree(srcPath){
    if((srcPath)==undefined){
        srcPath=process.cwd;
       
    }
    // Reading the content at the srcPath location
let contentatsrc= fs.readdirSync(srcPath);
//console.log(contentatsrc);
let openingpath=path.basename(srcPath);
console.log(openingpath);
//Now we begin traversing each file/folder at the the srcPath one by one
for(let i=0;i<contentatsrc.length;i++){
    let  updatedPath=path.join(srcPath,contentatsrc[i]);
   let  isFile=fs.lstatSync(updatedPath).isFile();
     if(isFile==true){
       
         console.log("\t |_"+contentatsrc[i]);  // Print the name if a file exists at the index while traversing
     }
     else {
        
          isFolder=fs.lstatSync(updatedPath).isDirectory();
           if(isFolder==true){
               console.log("|- "+ contentatsrc[i]);
             tree(updatedPath);
         }
        }
}
}

//srcPath="C:\\Users\\deeks\\OneDrive\\Desktop\\Web Development\\html\\NODE\\fileOrganizer\\downloads"
//tree(srcPath);
module.exports = {
    tree:tree
    }