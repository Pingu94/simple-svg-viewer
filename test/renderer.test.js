/**
 * @jest-environment jsdom
 */

const { init, isSvg, renderSvg, onFileDrop } = require("../renderer");

document.body.innerHTML = `
<div id="dropArea">
  <h2>Drop your svg here 👇</h2>
</div>
<div id="logArea"></div>`;

test("test.svg should be a valid filename", () => {
  expect(isSvg("test.svg")).toBe(true);
});

test("test.SVG should be a valid filename", () => {
  expect(isSvg("test.SVG")).toBe(true);
});

test("test.txt should not be considered a valid filename", () => {
  expect(isSvg("test.txt")).toBe(false);
});

test("Every Svg is inside a container div which contains image and label", () => {
  const renderedElement = renderSvg("/path/to/image", "mySvgFile.svg");

  expect(renderedElement.nodeName).toBe("DIV");
  expect(renderedElement.childNodes.length).toBe(2);
});

test("Svg label is equal to filename", () => {
  const filename = "mySvgFile.svg";
  const renderedElement = renderSvg("/path/to/image", filename);
  const label = renderedElement.childNodes[1];

  expect(label.nodeName).toBe("SPAN");
  expect(label.textContent).toBe(filename);
});

test("Every Svg is inside a container div which contains image and label", () => {
  const renderedElement = renderSvg("/path/to/image", "mySvgFile.svg");

  expect(renderedElement.nodeName).toBe("DIV");
  expect(renderedElement.childNodes.length).toBe(2);
});

test("DropArea on drop happy path", () => {
  const dropArea = document.getElementById("dropArea");
  const files = [{ path: "/path", name: "super.svg" }];
  init();

  onFileDrop(files, dropArea);
  expect(dropArea).toBeDefined();
});

test("DropArea on drop invalid file", () => {
  const dropArea = document.getElementById("dropArea");
  const logArea = document.getElementById("logArea");
  const files = [{ path: "/path", name: "super.txt" }];
  init();

  onFileDrop(files, dropArea);
  expect(logArea.hasChildNodes()).toBeTruthy();
});
