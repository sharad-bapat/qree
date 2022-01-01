//Get the button
var mybutton = document.getElementById("gotop");
document.body.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";   
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  // document.getElementById('mainContent').scrollTop = 0;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
