const noteButton = document.getElementById('save-note');

function saveHandler() {
    let noteTitle = document.getElementById("notetitle").value;
    let noteText = document.getElementById("notetext").value;

    const newNote = {noteTitle, noteText};

     // Fetch POST request to the server
     fetch('api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
    .then((res) => res.json())
    .then((data) => {
        //alert(data.status);
        noteTitle = '';
        noteText = '';
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    
}

noteButton.addEventListener("click", saveHandler);