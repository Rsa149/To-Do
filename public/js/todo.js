

class user{
 
    constructor(name, password) {
       this.name = name;
       this.password = password;
     }
   }
   

   
let user_arr = new user("Raman",1996);
var tasklist=[];

 // This will add elemts to the array 
function push(){
    var input = document.getElementById("input").value;
    tasklist.push(input);
    display();
}

// This function diplays the array in output div
function display(){
    
    var s = tasklist.length;
    var output = document.getElementById("output");

    while(output.hasChildNodes()){
        output.removeChild(output.lastChild)
    }

    for(var i = 0; i < s ; i++) {
        var div = document.createElement("div");   // create a new div
        div.innerHTML= "<form class='p-2' ><div class='input-group mb-2 rounded'><span style='width:400px'><input type='text' class='form-control bg-white' placeholder='" + tasklist[i] + "' disabled/></span><span><button onclick='myFunction()' id='claim' type='button' class='btn btn-outline-secondary' > Claim </button> </span></div></form>"; 
        output.appendChild(div);   // to refresh the table every time
    }
    
}








