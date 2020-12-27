const init = () => {
  const dropArea = document.getElementById("dropArea");

  if (dropArea) {
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer.files;

      onFileDrop(files, dropArea);
    });
  }
};

const onFileDrop = (files, dropArea) => {
  const dropHereText = document.querySelector("#dropArea h2");
  if (dropHereText) {
    dropArea.innerHTML = "";
  }

  for (const { path, name } of files) {
    if (!isSvg(name)) {
      logError(`${name} is not a valid SVG file.`);
      // window.api.send("toMain", { path, name });
    } else {
      const image = renderSvg(path, name);
      dropArea.appendChild(image);
    }
  }

  // if all files were invalid, show again drop area message
  if (!dropArea.hasChildNodes()) {
    dropArea.innerHTML = "<h2>Drop your svg here 👇</h2>";
  }
};

const renderSvg = (path, name) => {
  const container = document.createElement("div");
  container.classList = "img-container";

  const img = document.createElement("img");
  img.src = path;

  const label = document.createElement("span");
  label.textContent = name;

  container.appendChild(img);
  container.appendChild(label);

  return container;
};

const isSvg = (file) => {
  const regExp = new RegExp(/^.*\.svg/, "i");
  return regExp.test(file);
};

const logError = (errMessage) => {
  const logArea = document.getElementById("logArea");
  const log = document.createElement("p");
  log.textContent = errMessage;
  logArea.appendChild(log);
};

// const clearLogArea = () => {
//   const logArea = (document.getElementById("logArea").innerHTML = "");
// };

init();

module.exports = { init, isSvg, onFileDrop, renderSvg };
