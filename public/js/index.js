$(".list").click(function(){
	$(this).closest('li').find('ul').slideToggle("slow");
	// $(this).closest('li').toggleClass('selected');
	$(this).closest('li').find('span').toggleClass('glyphicon-minus');
});
$("#pests,#crops,#learnFolder,#idefc").click(function(){
	$('.zoomimage').hide();
	var name=$(this).prop('name');
	$.get('/'+name,function(data){
		$("#changeHtml").html(data);
	});
});

