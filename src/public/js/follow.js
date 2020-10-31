window.onload = function () {
  document.querySelectorAll('.followbutton').forEach(function (e) {
    
    e.innerHTML = '팔로우'
    e.onclick = function () {
      var followingId = document.getElementById('profile_id').innerHTML;
      var xhr = new XMLHttpRequest();
      var data = {
          followingId,
      };

      xhr.onload = function () {
          console.log(xhr.status);
          if(xhr.status===200){
              location.reload();
          }
          else {
              alert('failed to follow ');
          }
      }

      xhr.open('POST', '/follow');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
  }
  });
};

function follow_check(followedId, followingId) {
    
}