const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frame = new Image();
frame.src = "twibbon.png";

let photo = new Image();

upload.addEventListener("change", function(e){
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(event){
        photo.onload = function(){
            draw();
        }
        photo.src = event.target.result;
    }
    reader.readAsDataURL(file);
});

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // hitung supaya foto memenuhi canvas
    const ratio = Math.max(
        canvas.width / photo.width,
        canvas.height / photo.height
    );

    const newWidth = photo.width * ratio;
    const newHeight = photo.height * ratio;

    const x = (canvas.width - newWidth) / 2;
    const y = (canvas.height - newHeight) / 2;

    ctx.drawImage(photo, x, y, newWidth, newHeight);

    frame.onload = () => {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }

    if(frame.complete){
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }
}

document.getElementById("download").addEventListener("click", function(){
    const link = document.createElement("a");
    link.download = "twibbon_siswa.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
