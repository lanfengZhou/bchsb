$.get('/crops/getName',function(data){
	var cropstype=$('#cropsType');
	for(var i=0;i<data.crops.length;i++){
		cropstype.append('<option value='+data.crops[i].id+'>'+data.crops[i].name+'</option>');
	}
});
$('#cropsType,#pestsType').click(function(){
	$(this).popover('hide');
	$(this).popover('destroy');
});
$('#reset').click(function(){
	$('#cropsType option:first,#pestsType option:first').prop('selected','selected');
	$('#pestImg').after($('#pestImg').clone().val(""));     
	$('#pestImg').remove(); 
	$('#cropsType,#pestImg').popover('hide');
	$('#cropsType,#pestImg').popover('destroy');
});
$("#addSumit").click(function(){
	if(/请选择农作物类型/g.test($('#cropsType option:selected').text())){
		$('#cropsType').popover('show');
	}else if(!$('#pestImg').val()){
		$('#pestImg').popover('show');
	}else{
		 	var formData=new FormData();
	//   // console.log(fileM.files);
	//   //获取文件对象，files是文件选取控件的属性，存储的是文件选取控件选取的文件对象，类型是一个数组
	// var fileObj=fileM.files[0];
	  //创建formdata对象，formData用来存储表单的数据，表单数据时以键值对形式存储的。
			formData.append('file',$('#pestImg')[0].files[0]);
			formData.append('pestsType',$('#pestsType option:selected').text());
			$("#overlay,.progress").show();
			$('.progress-bar').addClass('commit');
				// $('.progress-bar').text();
			$.ajax({
				url:'/idefc/uploadImg',
				type:'post',
				cache:false,
				data:formData,
				processData: false,
			    contentType: false,
			    // async: false,
				success:function(data){
					if(data.upload=='ok'){
						$('#overlay,.progress').hide();
						//$('#cropsType option:first,#pestsType option:first').prop('selected','selected');
						$('#pestImg').after($('#pestImg').clone().val(""));     
						$('#pestImg').remove(); 	
					}
				},
				error:function(){
					alert("请检查网络重试！！！")
				}
			});
	}
});
/** 
* 从 file 域获取 本地图片 url 
*/ 
function getFileUrl(sourceId) { 
	var url; 
	if (navigator.userAgent.indexOf("MSIE")>=1) { // IE 
	url = document.getElementById(sourceId).value; 
	} else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox 
	url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0)); 
	} else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome 
	url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0)); 
	} 
	return url; 
}
$('#pestImg').change(function(){
	var url = getFileUrl('pestImg');
	$("#showImg img").prop("src",url);
});
