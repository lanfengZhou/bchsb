$('.firstlist a').click(function(){
    //console.log($.trim($(this).data ('name')));
    $.post('/learnFolder/getSecond',{secondPath:$.trim($(this).data('name'))},function(data){
        $('#changeHtml').html(data);
    });
});
$('.secondPath a').click(function(){
    $.get('/learnFolder',function(data){
        $("#changeHtml").html(data);
    });
});
$('.secondlist a').click(function(){
    //console.log($.trim($(this).data ('name')));
    $.post('/learnFolder/getImg',{imgPath:$.trim($(this).data('name'))},function(data){
        $('#changeHtml').html(data);
    });
});