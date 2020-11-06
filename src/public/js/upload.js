function imgupload(files, isStory=false) {
    var data = new FormData();
    data.append('img', files[0]);
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if(xhr.status===200){
          if(isStory){ // story 인 경우
            var storyxhr = new XMLHttpRequest();
            storyxhr.onload = function() {
                if(storyxhr.status===200){
                    location.href = 'http://localhost:3001/story/' + JSON.parse(storyxhr.responseText).id;
                }
                else {
                    alert('failed to upload story');
                }
            }
            var _ = {
                "img": JSON.parse(xhr.responseText).url,
            }
            storyxhr.open('POST', '/story');
            storyxhr.setRequestHeader('Content-Type', 'application/json');
            storyxhr.send(JSON.stringify(_));
            }
          else {
              var modal = document.getElementById('uploadModal');
              modal.style.display= "block";
              
              document.img = JSON.parse(xhr.responseText).url;
          }
      }
    }
    xhr.open('POST', '/p/img');
    xhr.send(data);
}

window.addEventListener('load', function() {
    console.log('window onload');
    var modal = document.getElementById('uploadModal');
    var span = document.getElementsByClassName('postbutton')[0];
    span.onclick = function() {
        var xhr = new XMLHttpRequest();
        var data = {
            "content": document.getElementById('contents').value,
            "img": document.img,
        };
        xhr.onload = function() {
            if(xhr.status===200){
              location.href = 'http://localhost:3001/p/'+ JSON.parse(xhr.responseText).id;
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

    document.querySelectorAll('.postupload').forEach((e) => {
     e.onchange = function(event) {
         imgupload(event.target.files);
     }
    });

    document.querySelectorAll('.storyupload').forEach((e)=>{
    e.onchange = function(event) {
        imgupload(event.target.files, true);
    }
    });

    document.querySelectorAll('.fa-user')[0].addEventListener('click', function(e) {
      var usernav = document.querySelectorAll('.usernav')[0];
      usernav.style.display = usernav.style.display === 'none' ? 'initial' : 'none';
    });
    
});