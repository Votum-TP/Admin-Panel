import * as $ from "jquery"


let fileInput = $("#file-electores");
let fileList = $("#files-list");

fileInput.addEventListener("change", () => {
    alert();
    fileList.innerHTML = "";
    let reader = new FileReader();
    let listItem = document.createElement("li");
    let fileName = fileInput.name;
    let fileSize = (fileInput.size / 1024).toFixed(1);
    listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
    if (fileSize >= 1024) {
      fileSize = (fileSize / 1024).toFixed(1);
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
    }
    fileList.appendChild(listItem);
  
});