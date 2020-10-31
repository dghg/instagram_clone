function imgupload(files, isStory=false) {
    var data = new FormData();
    data.append('img', files[0]);
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if(xhr.status===200){
          if(isStory){ // story 인 경우
            var storyxhr = new XMLHttpRequest();
            storyxhr.onload = function() {
                location.href = 'http://localhost:3000/story' + JSON.parse(storyxhr.responseText).id;
            }
            storyxhr.open('POST', '/story');
            storyxhr.send(data);
            
          }
          else {
              var modal = document.getElementById('myModal');
              modal.style.display= "block";
              
              document.img = JSON.parse(xhr.responseText).url;
          }
      }
    }
    xhr.open('POST', '/p/img');
    xhr.send(data);
}

window.onload = function() {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('postbutton')[0];
    span.onclick = function() {
        var xhr = new XMLHttpRequest();
        var data = {
            "content": document.getElementById('contents').value,
            "img": document.img,
        };
        xhr.onload = function() {
            if(xhr.status===200){
              location.href = 'http://localhost:3000/p/'+ JSON.parse(xhr.responseText).id;
              // redirect to post if post created
            }
        }
        
        xhr.open('POST', '/p');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

    window.onclick = function(event) {
        if(event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
}