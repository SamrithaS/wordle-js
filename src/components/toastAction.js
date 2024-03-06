export const updateToast = (msg, i = null) => {
  if (i !== null) {
    if (i === 0) {
      msg = "lucky! </br> reload for another word";
    } else if (i === 1) {
      msg = "smart! </br> reload for another word";
    } else if (i === 2) {
      msg = "amazing! </br> reload for another word ";
    } else if (i === 3) {
      msg = "great! </br> reload for another word";
    } else if (i === 4) {
      msg = "finally! </br> reload for another word ";
    }
  } else {
    setTimeout(() => {
      document.getElementById("toast").style.opacity = "0";
    }, 1200);
  }
  document.getElementById("toast").innerHTML = msg;
  document.getElementById("toast").style.opacity = "0.7";
};