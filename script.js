document.addEventListener("DOMContentLoaded", () => {
  const explorer = document.getElementById("file-explorer");

  const mockFiles = [
    { name: "FamilyPhoto.jpg", type: "image" },
    { name: "VacationVideo.mp4", type: "video" },
    { name: "Document.pdf", type: "doc" }
  ];

  mockFiles.forEach(file => {
    const item = document.createElement("div");
    item.className = "file-item";
    item.textContent = file.name;
    explorer.appendChild(item);
  });
});
