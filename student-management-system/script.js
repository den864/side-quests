let students=[];
let currArr=[];

async function loadStudents(){
    try{
        const res=await fetch("https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json");
        const data=await res.json();
        students=data;
    }catch(err){
        console.log("error in loading student data: ",err);
    }
}

async function init(){
    await loadStudents();
    currArr=[...students];
    renderData(currArr);
}

init();

const searchbtn=document.querySelector(".searchbtn");
const searchInput=document.querySelector(".search-div input[type='text']");
const mainTable=document.querySelector("table");
const genderDiv=document.querySelector(".gender-table");

searchbtn.addEventListener("click",()=>{
    hideGenderSection();
    showMainTable();
    const target=document.querySelector(".search-div input[type='text']").value.trim().toLowerCase();
    giveSearchResult(target);
});
searchInput.addEventListener("input",()=>{
    hideGenderSection();
    showMainTable();
    const target=searchInput.value.trim().toLowerCase();
    giveSearchResult(target);

})


function giveSearchResult(target){
    if(!target){
        currArr=[...students];
    }else{
        currArr=students.filter((student)=>{
            return student.first_name.toLowerCase().includes(target) || student.last_name.toLowerCase().includes(target) || student.email.toLowerCase().includes(target);
        });
    }
    renderData(currArr);
}




document.querySelector(".asc").addEventListener("click",()=>{
    hideGenderSection();
    showMainTable();
    currArr.sort((a,b)=>{
        const nameA=(a.first_name+" "+a.last_name).toLowerCase();
        const nameB=(b.first_name+" "+b.last_name).toLowerCase();

        return nameA.localeCompare(nameB);
    });
    renderData(currArr);
});
document.querySelector(".desc").addEventListener("click",()=>{
    hideGenderSection();
    showMainTable();

    currArr.sort((a,b)=>{
        const nameA=(a.first_name+" "+a.last_name).toLowerCase();
        const nameB=(b.first_name+" "+b.last_name).toLowerCase();

        return nameB.localeCompare(nameA);
    });
    renderData(currArr);
});
document.querySelector(".byMarks").addEventListener("click",()=>{
    hideGenderSection();
    showMainTable();

    currArr.sort((a,b)=>{
        return a.marks-b.marks;
    });

    renderData(currArr);
});
document.querySelector(".byClass").addEventListener("click",()=>{
    hideGenderSection();
    showMainTable();

    currArr.sort((a,b)=>{
        return a.class-b.class;
    });
    renderData(currArr);
});
document.querySelector(".byPassing").addEventListener("click",()=>{
    hideGenderSection();
    showMainTable();

    const passedStudents=currArr.filter(student=>student.passing);
    renderData(passedStudents);
});
document.querySelector(".byGender").addEventListener("click",()=>{
    hideMainTable();
    showGenderSection();
    const male=currArr.filter(student=>student.gender==="Male");
    const female=currArr.filter(student=>student.gender==="Female");

    renderBothGender(male,female);
})



function renderData(arr){
    const tbody=document.querySelector("tbody");
    if(arr.length===0){
        tbody.innerHTML=`
        <tr>
            <td colspan="7" style="text-align:center;">No Data Found</td>
        </tr>`;
        return;
    }
    tbody.innerHTML=arr.map(studentRow).join("");
}


function renderBothGender(male,female){
    function createTable(arr,heading){
            return `<h1>${heading}</h1>
            <table border="1">
                <thead>
                <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Marks</th>
                        <th>Passing</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                
                ${arr.length===0
                    ?`<tr><td colspan="7" style="text-align:center;">No Data Found</td></tr>`
                    :arr.map(studentRow).join("")
                    }
                </tbody>
            </table>`;

    }

    genderDiv.innerHTML=createTable(male,"Male")+createTable(female,"Female");
    
}

function studentRow(student){
    return `<tr>
            <td>${student.id}</td>
            <td> <img src="${student.img_src}"> ${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "Passed" : "Failed"}</td>
            <td>${student.email}</td>
        </tr>`
}

function hideGenderSection(){
    genderDiv.style.display="none";
}
function hideMainTable(){
    mainTable.style.display="none";
}
function showMainTable(){
    mainTable.style.display="table"
}
function showGenderSection(){
    genderDiv.style.display="block";
}
