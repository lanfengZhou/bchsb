var express = require('express');
var router = express.Router();
var fs=require('fs');
var formidable=require('formidable');
// var request = require("request");
router.get('/', function(req, res) {
	res.render('msg',{'jsname':'commitMsg'});
});
router.post('/uploadImg',function(req,res){
	var form = new formidable.IncomingForm();   //创建上传表单
	form.uploadDir='./server';
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
		var newPath=form.uploadDir+'/'+'sample.jpg';
		fs.renameSync(files.file.path,newPath);
		res.locals.success = '上传成功';
		res.json({'success':true,"upload":'ok'});
	});

});
module.exports=router;