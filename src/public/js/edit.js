window.addEventListener('load', function() {
  document.querySelectorAll('.editform')[0].addEventListener('submit', function(e) {
    e.preventDefault();
    var target = e.target;
    var data = {
        'user_name': target.user_name.value,
        'id': target.id.value,
        'introduce': target.introduce.value,
        'email': target.email.value,
    }
    console.log(data);
  });
});