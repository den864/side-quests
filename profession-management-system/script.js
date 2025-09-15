const userArr=[];
const cls=['display_id','display_name','display_prof','display_age']; 
let id=1;

const form=document.querySelector("form");

form.addEventListener("submit",(event)=>{
    event.preventDefault();

    const data=new FormData(form);

    const name=data.get("username").trim();
    const profession=data.get("userprofession").trim();
    const age=data.get("userage").trim();

    if(!name || !profession || !age){
        document.querySelector(".success").style.display="none";
        document.querySelector(".error").style.display="block";
        return;
    }else{
        document.querySelector(".error").style.display="none";
    }
    
    const obj={
        id:id,
        name:name,
        profession:profession,
        age:age
    }
    id++;
    userArr.push(obj);
    document.querySelector(".success").style.display="block";
    
    renderData();
    form.reset();
})

renderData();


function renderData(){
    const target=document.querySelector(".employee-data");
    target.innerHTML="";

    if(userArr.length===0){
        const div=document.createElement("div");
        div.textContent="No Employee added";
        target.appendChild(div);
        return;
    }

    userArr.forEach(user=>{
        const div=document.createElement("div");
        div.classList.add("employee-details");

        let html="";
        let i=1;
        for(let key in user){
        
            if(key==='id'){
                html+=`<div class='${cls[0]}'>${user[key]}</div>`;
            }else{
                html+=`<div class='${cls[i++]}'>${key}: ${user[key]}</div>`;
            }
        }
        div.innerHTML=html;


        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.addEventListener("click",()=>{
            deleteUser(user.id);
        })

        div.appendChild(deleteBtn);

        target.appendChild(div);
    })
}

function deleteUser(userid){
    const index=userArr.findIndex(user=>user.id===userid);

    if(index!=-1){
        userArr.splice(index,1);
    }
    renderData();
}