window.addEventListener('load', function() {
  document.querySelectorAll('.post').forEach((el)=>{
    var hover = el.lastElementChild;
    el.addEventListener('mouseover', function(event) {
      hover.style.display = 'flex';
    });
    el.addEventListener('mouseout', function(event){
      hover.style.display = 'none';
    });
  });
});