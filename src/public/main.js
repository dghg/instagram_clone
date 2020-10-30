function getComments(id){

}

document.querySelectorAll('.comment-form').forEach(function(e) {
  var id = e.children[0].innerHTML;

  e.addEventListener('submit', function(el) {
    el.preventDefault(); 
    var comment = el.target.comment.value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if(xhr.status===201){ // If created
          window.location.href=`/p/${id}`
        }
        else{
            alert('Error on posting comment');
        }
    }
    xhr.open('POST', `/p/comment`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({id, comment}));
    el.target.comment.value='';
  });
});

function clickLike(){

}


function comment_onchange(text){
    var e = document.getElementById('commentpost');
    if(text.value){
      e.style.color= '#0095f6';
      e.disabled = false;
    }
    else{
      e.style.color = '#bfe3f1';
      e.disabled = true;
    }
  }