window.addEventListener('load',function(){
    let cat = document.getElementById('keyS1');
    var meower = function(){cat.style="background: red"};
    cat.addEventListener('click', meower);

// dog = document.getElementById('textinput');
// woofer = function(event){
//     if (event.key === "Enter") {
//         // Cancel the default action, if needed
//         event.preventDefault();
//         console.log(dog.value);
//       }
// };
// dog.addEventListener('keypress', woofer);
});