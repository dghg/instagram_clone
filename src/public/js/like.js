window.addEventListener('load', function () {
  document.querySelectorAll('.fa-heart').forEach((icon)=> {
    var id = icon.parentNode.children[0].innerHTML;
    var xhr = new XMLHttpRequest();
    var method;
    xhr.onload = function () {
        if(xhr.status===200){ // already clicked like
          icon.style.color= '#ff0000';
          method = 'DELETE';
        }
        else if(xhr.status===404){
          method = 'POST';
        }
    }

    xhr.open('GET', `http://localhost:3001/api/v1/like/${id}`);
    xhr.send();

    icon.addEventListener('click', function () {
        var xhr_ = new XMLHttpRequest();
        xhr_.onload = function () {
            if(xhr_.status===200){
              if(method==='POST'){
                  method = 'DELETE';
                  icon.style.color = '#ff0000';
              }
              else {
                  method = 'POST';
                  icon.style.color = '#000000';
              }
            }
            else {
                alert('failed to like');
            }
        }

        xhr_.open(method, `http://localhost:3001/api/v1/like`);
        xhr_.setRequestHeader('Content-Type', 'application/json');
        xhr_.send(JSON.stringify({"id": id}));
    });
  });
});