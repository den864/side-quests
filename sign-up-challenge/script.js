const form=document.querySelector("#myForm");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const confirmSubmission=confirm("Are you ready to submit form?");

    if(confirmSubmission){
        alert("Successful signup!");
    }else{
        form.reset();
        window.location.href = ""; // for reloading page
    }
    
})



const emailE=document.getElementById("email");
const passwordE=document.getElementById("password");
let okpass=false,okemail=false;

emailE.addEventListener("change",(event)=>{
    const usermail=event.target.value;

    if(usermail.length>3 && usermail.includes('@') && usermail.includes('.')){
        document.querySelector(".emailErrorMsg").style.display="none";
        okemail=true;
    }else{
        document.querySelector(".emailErrorMsg").style.display="block";
        okemail=false;
    }

    validateData(okemail,okpass);

})

passwordE.addEventListener("change",(event)=>{
    const userpass=event.target.value;

    if(userpass.length>8){
        document.querySelector(".passwordErrorMsg").style.display="none";
        okpass=true;
    }else{
        document.querySelector(".passwordErrorMsg").style.display="block";
        okpass=false;
    }

    validateData(okemail,okpass);

})


function validateData(validEmail,validPassword){
    if(validEmail && validPassword){
        document.querySelector(".successMsg").style.display="block";
    }else{
        document.querySelector(".successMsg").style.display="none";
    }
}


