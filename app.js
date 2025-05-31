let notes = [];
let currentEditingNoteId = null;

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

function createNote() {
  const note = {
    id: Date.now(),
    content: "",
    image: null
  };
  notes.push(note);
  openEditor(note.id);
}

function renderNotes() {
  const container = document.getElementById('notesContainer');
  container.innerHTML = '';
  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note';
    div.onclick = () => openEditor(note.id);
    
    const preview = document.createElement('p');
    preview.innerText = note.content ? note.content.substring(0, 100) + '...' : 'New Note';
    
    const img = document.createElement('img');
    img.src = note.image || 'default.jpg';
    img.alt = '';
    
    div.appendChild(preview);
    div.appendChild(img);
    container.appendChild(div);
  });
}

function openEditor(noteId) {
  currentEditingNoteId = noteId;
  const note = notes.find(n => n.id === noteId);
  document.getElementById('editorContent').innerText = note.content || '';
  document.getElementById('editorOverlay').style.display = 'flex';
}

function closeEditor() {
  document.getElementById('editorOverlay').style.display = 'none';
}

function saveEditor() {
  const note = notes.find(n => n.id === currentEditingNoteId);
  note.content = document.getElementById('editorContent').innerText.trim();
  closeEditor();
  renderNotes();
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

// Initial render
renderNotes();
