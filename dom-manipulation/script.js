
const valElement=document.querySelector(".val");
const incBtn=document.querySelector(".inc");
const decBtn=document.querySelector(".dec");
const clearBtn=document.querySelector(".clear");
const errorElement=document.querySelector(".error");

let val=Number(valElement.textContent);
check(val);


decBtn.addEventListener("click",()=>{
    val--;
    valElement.textContent=val;
    check(val);
    
})

incBtn.addEventListener("click",()=>{
    val++;
    valElement.textContent=val;
    check(val);
})

clearBtn.addEventListener("click",()=>{
    val=0;
    valElement.textContent=val;
    check(val);
})



function check(val){
    if(val<=0){
        clearBtn.style.display="none";
        errorElement.style.display="block";
        decBtn.disabled=true;
    }else{
        decBtn.disabled=false;
        clearBtn.style.display="inline-block";
        errorElement.style.display="none";
    }
}