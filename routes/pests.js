var express = require('express');
var router = express.Router();
var query = require('../lib/db/mysql');
var moment = require("moment");
var queryAll=require('./PestsServices');
var fs=require('fs');
var globaldir='./server/';
var rmdirSync=require('./rmdirSync');
/* GET users listing. */
router.get('/', function(req, res) {
    res.render('table',{'jsname':'pests','head':'添加病虫害','name':'病虫害名称','description':'描述'});
    // res.send("nihao");
});
/**
 * 查询病虫害类型
 * @param  {[type]} req  [description]
 * @param  {[type]} res) {	var        page [description]
 * @return {[type]}      [description]
 */
router.post('/query', function(req, res) {
	var page=req.body.page;
	var rows=req.body.rows;
	var start=rows*(page-1);
	var limit=rows*page;
	var filters=req.body.filters;
	var sql=queryAll(filters,start,limit);
	var total;
	var pages;
	query('select * from pests',function(err,vals,fileds){
		total=vals.length;
		pages=Math.ceil(total/rows);
		query(sql,function(err,vals,fileds){
			if(err==null){
				for (var i = 0; i < vals.length; i++) {
					vals[i].insertTime=moment(vals[i].insertTime).format('YYYY-MM-DD HH:mm:ss');
					// vals[i].updateTime=moment(vals[i].updateTime).format('YYYY-MM-DD HH:mm:ss');
				}
				res.json({'success':true,'total':total,'pages':pages,'pests':vals});
			}else{
				console.log(err);
			}
		});
	});
});
/**
 * 添加
 * @param  {[type]} req        [description]
 * @param  {[type]} res){	var alias         [description]
 * @return {[type]}            [description]
 */
router.post('/add',function(req,res){
	var alias=req.body.name;
	var cropsName=req.body.cropsName;
	var crops_id=req.body.crops_id;
	var description=req.body.description;
	var date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	query('insert into pests(alias,crops_id,description,insertTime) values (\"'
		+alias+'\",'+crops_id+',\"'+description+'\",\"'+date+'\")',function(err,vals,fileds){
			if(err){
				console.log(err);
				res.json({'success':true,'result':'failed'});
			}else{
				var pestsDirPath = globaldir+cropsName+'/'+alias;
				if (!fs.existsSync(pestsDirPath)) {
					fs.mkdirSync(pestsDirPath);
					console.log(alias+'目录创建成功');
				}
				res.json({'success':true,'result':'ok'});
			}
		})
});
/**
 * 删除
 * @param  {[type]} req        [description]
 * @param  {[type]} res){	var id            [description]
 * @return {[type]}            [description]
 */
router.post('/delete',function(req,res){
	var id=req.body.id;
	var alias=req.body.alias;
	var cropsName=req.body.cropsName;
	query('delete from pests where id='+id,function(err,vals,fileds){
		if(err){
			console.log(err);
			res.json({'success':true,'result':'failed'});
		}else{
			var pestsDirPath = globaldir+cropsName+'/'+alias;
			rmdirSync(pestsDirPath,function(){
				res.json({'success':true,'result':'ok'});
			});
		}
	});
});
/**
 * 修改
 * @param  {[type]} req        [description]
 * @param  {[type]} res){	var id            [description]
 * @return {[type]}            [description]
 */
router.post('/edit',function(req,res){
	var id=req.body.id;
	var alias=req.body.name;
	var description=req.body.description;
	var crops_id=req.body.crops_id;
	query('update pests set alias=\"'+alias+'\",description=\"'+description+'\",crops_id='+crops_id+' where id='+id,function(err,vals,fileds){
		if(err){
			console.log(err);
			res.json({'success':true,'result':'failed'});
		}else{
			res.json({'success':true,'result':'ok'});
		}
	});
});
router.post('/getPests',function(req,res){
	var id=req.body.id;
	query('select id,alias from pests where crops_id='+id,function(err,val,fileds){
		if(err){
			console.log(err);
			res.json({'success':true,'result':'failed'});
		}else{
			res.json({'success':true,'result':'ok','pests':val});
		}
	})
});

module.exports = router;
