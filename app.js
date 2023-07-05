console.log("Welcome to Magic Notes");

shownotes();

// store the note in localStorage 
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt").value;
    let addTitle = document.getElementById("addTitle").value;

    let notes = localStorage.getItem('notes');
    let notesTitle = localStorage.getItem('notesTitle');
    
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    if (notesTitle == null) {
        notesTitleObj = [];
    }
    else {
        notesTitleObj = JSON.parse(notesTitle);
    }

    notesObj.push(addTxt);
    notesTitleObj.push(addTitle);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("notesTitle", JSON.stringify(notesTitleObj));

    shownotes();
    document.getElementById("addTxt").value = "";
    document.getElementById("addTitle").value = "";
})

function shownotes() {
    let notes = localStorage.getItem("notes");
    let notesTitle = localStorage.getItem("notesTitle");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if (notesTitle == null) {
        notesTitleObj = [];
    }
    else {
        notesTitleObj = JSON.parse(notesTitle);
    }

    let html = "";

    for(let index=0 ; index<notesTitleObj.length ; index++){
        let htmlTxt;
        if(notesObj[index] != undefined){
            htmlTxt = notesObj[index];
        }
        else{
            htmlTxt = "";
        }
        html += `
                <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${notesTitleObj[index]}</h5>
                        <p class="card-text">${htmlTxt}</p>
                        <button onclick="deleteNote(this.id)" class="btn btn-primary" id="${index}">Delete Note</button>
                    </div>
                </div>`;
    }
    let notesElem = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = `Nothing to show! Use "Add a Note" section to add notes.`;
    }
}

function deleteNote(index){
    let notesTitle = localStorage.getItem("notesTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if (notesTitle == null) {
        notesTitleObj = [];
    }
    else {
        notesTitleObj = JSON.parse(notesTitle);
    }
    notesTitleObj.splice(index, 1);
    notesObj.splice(index, 1);
    localStorage.setItem("notesTitle", JSON.stringify(notesTitleObj));
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputVal = search.value.toLowerCase();
    // console.log(inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    // console.log(noteCards);
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});