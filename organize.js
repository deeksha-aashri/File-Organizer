const fs=require("fs");
const path=require("path");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png','jpg','jpeg']
}
function organize(srcPath){
    if(srcPath==undefined){
     //console.log(srcPath);        //undefined
    srcPath=process.cwd();         //The process.cwd() method returns the current working directory of the Node.js process
}
let organizedFiles= path.join(srcPath,"organized_files");
// console.log("organized files folder path is ", organizedFiles);
if(!fs.existsSync(organizedFiles)){   
    fs.mkdirSync(organizedFiles);       // if the folder called organized_files does not exists at the path given by organizedFiles then it is created
}
else{
    console.log('Folder already exists');
}
    //Reads the contents of the directory.-> basically reads the names of files present in the directory
    let allFiles = fs.readdirSync(srcPath);
   // console.log(allFiles);

  //4.traverse over all the files and classify them on the basis of their extension 
    for (let i = 0; i < allFiles.length; i++){
      let fullPathOfFile=path.join(srcPath,allFiles[i]);   // ......srcpath.../allFiles[0] for i=0 and so on. Like....downloads/abc.txt
       
      //console.log(fullPathOfFile);                     // will print the comment written above for each file from i=0 to i<allFiles.length
    
    
        //1. check if  we have found a file or a folder at fullpathoffile
    let isFile = fs.lstatSync(fullPathOfFile).isFile();      //lstatSync is used to check(just analysis) if the file or folder exists at the given path while .file returns(a way to get the result of analysis by lstatsync) true if file is found there else returns false 
  //  console.log(allFiles[i]+" is "+ isFile);
    if (isFile) {
      //1.1 get ext name
      let ext = path.extname(allFiles[i]).split(".")[1];
      //  console.log(ext);
      //1.2 get folder name from extension
      let folderName = getFolderName(ext);
      // console.log(folderName)                     // The folder where this extension file will go.
      //1.3 copy from src folder (srcPath) and paste in dest folder (folder_name e.g. document, media etc)
                     
      copyFileToDest(srcPath, fullPathOfFile, folderName);     //copy from     file to be copied    paste to    Respectively
    }
  }
}


function getFolderName(ext) {
  for (let key in types) {
    // console.log(key);
    for (let i = 0; i < types[key].length; i++) {
      if (types[key][i] == ext) {
        return key;
      }
    }
  }
  return "miscellaneous" ;
}


 function copyFileToDest(srcPath, fullPathOfFile, folderName) {
//                                                                            //1. Construct a path for folderName
 let destFolderPath = path.join(srcPath, "organized_files", folderName); //....../downloads/organized_files/archives
                                                                        
//   console.log(destFolderPath)
 
 if (!fs.existsSync(destFolderPath)) {
     fs.mkdirSync(destFolderPath);                //2. check folder if exists, if it does not, then make folder
   }
                                               //3. copy file from src folder to dest folder
 let fileName = path.basename(fullPathOfFile);                        // Returns the last portion of a path that is, abc.zip   
let destFileName = path.join(destFolderPath, fileName);    
                         // src        dest
     fs.copyFileSync(fullPathOfFile, destFileName);
}
  
 //let srcPath="C:\\Users\\deeks\\OneDrive\\Desktop\\Web Development\\html\\NODE\\fileOrganizer\\downloads";
 //organize(srcPath);

 module.exports = {
    organize:organize
    }
