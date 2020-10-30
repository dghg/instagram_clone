// modal function
var modal = document.getElementById('myModal');
document.querySelectorAll('.commentBtn').forEach((btn) => {
  btn.onclick = function() { // pass comment id to delete modal 
      document.getElementsByClassName('delete')[0].children[0].innerHTML = btn.parentElement.children[0].innerHTML;
      modal.style.display = "block";
  }
});

var span = document.getElementsByClassName('close')[0];
var d = document.getElementsByClassName('delete')[0];
span.onclick = function() {
    modal.style.display= "none";
}

d.onclick = function() { // delete comment function
  var comment_id = d.children[0].innerHTML; // get comment id
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
      if(xhr.status===200){
        location.reload();
      }
      else{
          alert('failed to delete comment.');
      }
  }
  xhr.open('DELETE', `/p/comment`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({id: comment_id})); 
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}