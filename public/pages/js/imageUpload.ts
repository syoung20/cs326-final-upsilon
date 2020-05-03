import { read } from "fs";

$('#imageFile').change(function() {
    console.log(this.files)
    var reader = new FileReader();
    reader.onload = function(image) {
        $(".imageUploadView").show(0);
        $("#imageUploaded").attr('src', image.target.result);
    }

    reader.readAsDataURL(this.files[0])
})

