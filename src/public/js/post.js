var modal = document.getElementById('commentModal');
window.addEventListener('load', function (){
  // Add Eventlistener commentbtn onclick
  var modal = document.getElementById('deleteModal');

  document.querySelectorAll('.commentBtn').forEach((btn) => {
    btn.addEventListener('click', function() {
      var deletebtn = document.getElementsByClassName('delete')[0];
      deletebtn.innerHTML = '댓글 삭제';
      deletebtn.info = {
        "deleted": "comment",
        "id": btn.parentNode.children[0].innerHTML,
      };
      modal.style.display = 'block';
    });
  });

  document.querySelectorAll('.postBtn').forEach((btn) => {
    btn.addEventListener('click', function() {
      var deletebtn = document.getElementsByClassName('delete')[0];
      deletebtn.innerHTML = '게시물 삭제';
      deletebtn.info = {
        "deleted": "post",
        "id": btn.parentNode.children[0].innerHTML,
      };
      modal.style.display = 'block';
    });
  });


  // Add Eventlistener close
  window.addEventListener('click', function(e) {
    if(e.target === modal){
      e.target.style.display='none';
    }
  });

  var span = document.getElementsByClassName('close')[0];
  span.addEventListener('click', function(){
    modal.style.display='none';
  });
  
  var deletebtn = document.getElementsByClassName('delete')[0];
  deletebtn.addEventListener('click', function() {
    var info = deletebtn.info;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if(xhr.status===200){
        if(info.deleted==='comment'){
          location.reload();
        }
        else{
          location.href = '/';
        }
      }
      else {
        alert('failed to delete');
      }
    }
    
    xhr.open('DELETE', info.deleted === 'comment' ? '/p/comment' : '/p');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({id: info.id})); 
  });

});