//Personalized greeting
let name = localStorage.getItem("name");
if (!name) {
  name = prompt("What's your name?") || "Anonymous";
  localStorage.setItem("name", name);
}
const greeting = document.getElementById("Greeting");
greeting.textContent = `${name}'s Notes`;

document.getElementById("name-change").addEventListener("click", () => {
  const newName = prompt("What's your name?")?.trim();
  if (newName) {
    name = newName;
    localStorage.setItem("name", name);
    greeting.textContent = `${name}'s Notes`;
  }
});

//notes
const modal = document.getElementById("announcementModal");
const txtArea = document.getElementById("announcementText");

let editingId = null;

function openModal(note) {
  if (note) {
    editingId = note.id;
    txtArea.value = note.content;
  } else {
    editingId = null;
    txtArea.value = "";
  }
  modal.style.display = "block";
  txtArea.focus();
}
const closeModal = () => {
  modal.style.display = "none";
  txtArea.value = "";
  editingId = null;
};

const getNotes = () => JSON.parse(localStorage.getItem("notes") || "[]");
const saveNotes = (notes) =>
  localStorage.setItem("notes", JSON.stringify(notes));

const notesContainer = document.getElementById("notes-container");

function renderNotes() {
  const notes = getNotes();
  notesContainer.innerHTML = "";

  const dark = document.body.classList.contains("darkmode");
  notes.forEach((note) => {
    const box = document.createElement("div");
    box.className = "note-box" + (dark ? "" : " light");
    box.dataset.id = note.id;

    const p = document.createElement("p");
    p.innerText = note.content;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-note-btn";
    delBtn.innerHTML = "&times;";
    delBtn.title = "Delete note";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteNote(note.id);
    });

    box.appendChild(p);
    box.appendChild(delBtn);
    box.addEventListener("click", () => openModal(note));
    notesContainer.appendChild(box);
  });
}

function saveFromModal() {
  const text = txtArea.value.trim();
  if (!text) {
    alert("Note content cannot be empty!");
    return;
  }

  const notes = getNotes();
  if (editingId) {
    const found = notes.find((n) => n.id === editingId);
    if (found) found.content = text;
  } else {
    notes.push({ id: Date.now(), content: text });
  }
  saveNotes(notes);
  renderNotes();
  closeModal();
}

function deleteNote(id) {
  const next = getNotes().filter((n) => n.id !== id);
  saveNotes(next);
  renderNotes();
}

//Light or Dark mode
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");
if (darkmode === "active") {
  document.body.classList.add("darkmode");
} else {
  document.body.classList.remove("darkmode");
}
const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

document
  .getElementById("createBtn")
  .addEventListener("click", () => openModal());
document
  .getElementById("modalSaveBtn")
  .addEventListener("click", saveFromModal);
document.getElementById("modalCancelBtn").addEventListener("click", closeModal);
document.getElementById("clearAllBtn").addEventListener("click", clearAllNotes);
document.addEventListener("DOMContentLoaded", renderNotes);
