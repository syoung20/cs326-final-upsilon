"use strict";
exports.__esModule = true;
var imageb64;
$('#imageFile').change(function () {
    var reader = new FileReader();
    reader.onload = function (image) {
        $(".imageUploadView").show(0);
        $("#imageUploaded").attr('src', image.target.result);
        imageb64 = image.target.result;
        var imageBase64 = $("textarea")
            .attr('type', 'hidden')
            .attr('style', 'display: none;')
            .attr("name", 'imageB64').val(imageb64);
        $("#imageInputGroup").append(imageBase64);
    };
    reader.readAsDataURL(this.files[0]);
});
