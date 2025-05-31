let notes = JSON.parse(localStorage.getItem('notes')) || [];

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

function showArchived() {
  alert("Archived notes coming soon!");
}

function editProfile() {
  alert("Edit profile feature coming soon!");
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function openEditor(noteId = null) {
  const editor = document.getElementById('editor');
  const contentEl = document.getElementById('editorContent');

  editor.style.display = 'flex';
  contentEl.innerHTML = '';

  if (noteId) {
    const note = notes.find(n => n.id == noteId);
    if (note) {
      contentEl.innerHTML = note.content;
      editor.dataset.noteId = note.id;
    }
  } else {
    editor.dataset.noteId = '';
  }
}

function closeEditor() {
  document.getElementById('editor').style.display = 'none';
  document.getElementById('editor').dataset.noteId = '';
}

function saveNote() {
  const noteId = document.getElementById('editor').dataset.noteId;
  const content = document.getElementById('editorContent').innerHTML.trim();

  if (!content) {
    alert("Cannot save an empty note!");
    return;
  }

  if (noteId) {
    const note = notes.find(n => n.id == noteId);
    if (note) note.content = content;
  } else {
    const note = {
      id: Date.now(),
      content: content
    };
    notes.push(note);
  }

  localStorage.setItem('notes', JSON.stringify(notes));
  closeEditor();
  renderNotes();
}

function renderNotes() {
  const container = document.getElementById('notesContainer');
  container.innerHTML = '';

  if (notes.length === 0) {
    container.innerHTML = '<p>No notes yet.</p>';
    return;
  }

  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `<p>${note.content}</p>`;
    div.onclick = () => openEditor(note.id);
    container.appendChild(div);
  });
  
  const previewText = stripHTML(note.content); // assuming note.content contains HTML
  const truncated = previewText.length > 300 ? previewText.slice(0, 300) + '…' : previewText;

noteElement.innerHTML = `<p>${truncated}</p>`;
}

function stripHTML(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

// Editor formatting
function format(command, value = null) {
  document.execCommand(command, false, value);
}

document.addEventListener('DOMContentLoaded', renderNotes);
