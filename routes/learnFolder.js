var express = require('express');
var router = express.Router();
var query = require('../lib/db/mysql');
var moment = require("moment");
var formidable=require('formidable');
var queryAll=require('./CropsServices');
var fs=require('fs');
var rmdirSync=require('./rmdirSync');
var globaldir='./server';

var getAllFolersAndFiles = (function(){
    function iterator(url, folders, files){
        var stat = fs.statSync(url);
        if(stat.isDirectory()){
            folders.push(url);//收集目录
            inner(url,folders, files);
        }else if(stat.isFile()){
            files.push(url);//收集文件
        }
    }
    function inner(path,folders,files){
        var arr = fs.readdirSync(path);
        for(var i = 0, el ; el = arr[i++];){

            iterator(path+"/"+el,folders,files);
        }
    }
    return function(dir){
        var folders = [], files = [];
        try{
            iterator(dir,folders,files);
        }catch(e){
        }finally{
            return {
                folders : folders
                //files   : files
            }
        }
    }
})();
function getAllFiles(root) {
    var result = [], files = fs.readdirSync(root)
    files.forEach(function(file) {
        var pathname = root+"/" + file
            , stat = fs.lstatSync(pathname);
        if (stat === undefined)return

        // 不是文件夹就是文件
        if (!stat.isDirectory()) {
            result.push(pathname)
            // 递归自身
        }else {
            result = result.concat(getAllFiles(pathname))
        }
    });
    return result
}

/* GET users listing. */
router.get('/', function(req, res) {
    var folders=getAllFolersAndFiles(globaldir);
    var folderName=[];
    var folderPath=[];
    for(var i=1;i<folders.folders.length;i++){
       var matchFolder=folders.folders[i];
        if(matchFolder.match(/^.\/server\/([\u4e00-\u9fa5]+)$/g)){
            folderName.push(RegExp.$1);
            folderPath.push(matchFolder);
        }
    }
    res.render('folder',{'folderName':folderName,'folderPath':folderPath,'name':'getFirst'});
});
router.post('/getSecond',function(req,res){
    var secondPath=req.body.secondPath;
    var folders=getAllFolersAndFiles(secondPath);
    console.log(folders);
    var folderName=[];
    var folderPath=[];
    for(var i=1;i<folders.folders.length;i++){
        var matchFolder=folders.folders[i];
        if(matchFolder.match(/^.\/server\/[\u4e00-\u9fa5]+\/([\u4e00-\u9fa5]+)$/g)){
            folderName.push(RegExp.$1);
            folderPath.push(matchFolder);
        }
    }
    res.render('folder',{'folderName':folderName,'folderPath':folderPath,'name':'getSecond'});
});
router.post('/getImg',function(req,res){
    var filePath=req.body.imgPath;
    var secondPath=filePath.match(/.\/server\/[\u4e00-\u9fa5]+/g);
    var imgFiles=getAllFiles(filePath);
    //console.log(imgFiles);
    var imgPath=[];
    imgFiles.forEach(function(item,index,arr){
        imgPath.push(item.substr(8,item.length))
    });
    res.render('imglist',{'name':'getImgFile','secondPath':secondPath[0],'imgFiles':imgPath,'filePath':filePath});
});
/**
 * delete
 */
router.post('/deleteImg',function(req,res){
   var filePath=globaldir+decodeURI(req.body.filePath);
    rmdirSync(filePath,function(){
        res.json({'success':true,'result':'ok'});
    });

});
router.post('/uploadImg',function(req,res){
    var form = new formidable.IncomingForm();   //创建上传表单
    form.uploadDir='./';
    form.encoding = 'utf-8';		//设置编辑
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.json({'success':true,"upload":'failed'});
            return;
        }
        var extName = '';  //后缀名
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length == 0){
            res.locals.error = '只支持png和jpg格式图片';
            res.json({'success':true,"upload":'failed'});
            return;
        }
        var commonPath=fields.imgFilesPath.slice(2)+'/';
        var newPath =commonPath+files.file.name;
        fs.renameSync(files.file.path,newPath);
        for(var i=0;i<10;i++){
            var newname=commonPath+(i+1)+'.jpg';
            if(!fs.existsSync(newname)){
                fs.renameSync(newPath,newname);
                break;
            }
        }
            res.locals.success = '上传成功';
            res.json({'success':true,"upload":'ok'});
        });

});

module.exports = router;