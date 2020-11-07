window.addEventListener('load', function() {
  var editform = document.querySelectorAll('.editform')[0];
  editform.addEventListener('submit', function(e) {
    e.preventDefault();
    var target = e.target;
    var data = {
        'user_name': target.user_name.value,
        'id': target.id.value,
        'introduce': target.introduce.value,
        'email': target.email.value,
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if(xhr.status===200){
        location.reload();
        alert('success to edit profile.');
      }
      else {
        alert('failed to edit profile');
      }
    }

    xhr.open('PUT', '/edit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  });
});