let notes = [];

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

function createNote() {
  const text = prompt("Enter note content:");
  if (text) {
    const note = {
      id: Date.now(),
      content: text,
      image: null
    };
    notes.push(note);
    renderNotes();
  }
}

function renderNotes() {
  const container = document.getElementById('notesContainer');
  container.innerHTML = '';
  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `
      <p>${note.content}</p>
      <img src="${note.image || 'default.jpg'}" alt="" />
    `;
    div.onclick = () => editNote(note.id);
    container.appendChild(div);
  });
}

function editNote(id) {
  const note = notes.find(n => n.id === id);
  const newText = prompt("Edit your note:", note.content);
  if (newText) {
    note.content = newText;
    renderNotes();
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function showArchived() {
  alert("Archived notes coming soon!");
}

function editProfile() {
  alert("Edit profile feature coming soon!");
}
