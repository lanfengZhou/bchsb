$(function(){
    $('.filePath>a').click(function () {
        var path = $.trim($(this).data('name'));
        console.log(path);
        $.post('/learnFolder/getSecond', {secondPath: path}, function (data) {
            $('.zoomimage').hide();
            $('#changeHtml').html(data);
        });
    });
    $('.delete').click(function(e){
       var filePath=$(this).prev().find('img').data("path");
        $.post('/learnFolder/deleteImg',{filePath:filePath},function(data){
            var path = $.trim($('.imgFiles').data('path'));
            $.post('/learnFolder/getImg', {imgPath: path}, function (data) {
                $('#changeHtml').html(data);
            });
        })
    });
    $2('a.preimg').zoomimage();
    $("#addSumit").click(function(){
        if($('#pestImg').val()) {
            var path = $.trim($('.imgFiles').data('path'));
            var formData = new FormData();
            //   // console.log(fileM.files);
            //   //获取文件对象，files是文件选取控件的属性，存储的是文件选取控件选取的文件对象，类型是一个数组
            // var fileObj=fileM.files[0];
            //创建formdata对象，formData用来存储表单的数据，表单数据时以键值对形式存储的。
            formData.append('file', $('#pestImg')[0].files[0]);
            formData.append('imgFilesPath', path);
            $("#overlay,.progress").show();
            $('.progress-bar').addClass('commit');
            $.ajax({
                url: '/learnFolder/uploadImg',
                type: 'post',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.upload == 'ok') {
                        $('#overlay,.progress').hide();
                        $.post('/learnFolder/getImg', {imgPath: path}, function (data) {
                            $('#changeHtml').html(data);
                        });
                    }
                },
                error: function () {
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
})
