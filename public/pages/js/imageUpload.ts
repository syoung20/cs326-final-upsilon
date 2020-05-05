import { read } from "fs";

let imageb64 : string;

$('#imageFile').change(function() {
   
    var reader = new FileReader();
    reader.onload = function(image) {
        $(".imageUploadView").show(0);
        $("#imageUploaded").attr('src', image.target.result);
        imageb64 = image.target.result;
        

        var imageBase64 = document.createElement('textarea')
       // var imageBase64 = $("input")
        imageBase64.setAttribute('type', 'hidden')
        imageBase64.setAttribute('style', 'display: none;')
        imageBase64.setAttribute("name", 'imageB64')//.val(imageb64)
        imageBase64.innerText = imageb64
        $( "#imageInputGroup" ).append(imageBase64)

        
    }

    reader.readAsDataURL(this.files[0])
    
})









