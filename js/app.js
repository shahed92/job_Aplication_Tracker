
const companyName = document.querySelector('#company');
const jobPosition = document.querySelector('#role');
const aplicationStatus = document.querySelector('#status');
const submitButton = document.querySelector('#btn');
const jobList = document.querySelector('#jobList');
const jobForm = document.querySelector('#jobForm');
const downloadBtn = document.querySelector('#sheetjsexport');

let jobs = [{
    company: "",
    role: "",
    status: ""
}];

//Save data to local storage
function svaeData(){
    localStorage.setItem("jobs", JSON.stringify(jobs));
}
//display Data

function diplayData(){
 let data = localStorage.getItem("jobs");
    jobs = data?JSON.parse(data):[];
 jobList.innerHTML = '';
    [...jobs].reverse().forEach((job,index)=>{
       const realIndex = jobs.length - 1 - index;
      

        jobList.insertAdjacentHTML('beforeend',
        `
         <tr>
    <td>${job.company}</td>
    <td>${job.role}</td>
    <td>${job.status}</td>
    <td>
      <button class="action-btn edit" onclick="updateJob(${realIndex})">Edit</button>
      <button class="action-btn delete" onclick="deleteJob(${realIndex})">Delete</button>
    </td>
  </tr>
        
        `)
        
    })
    if(jobs.length===0){
        downloadBtn.disabled = true;
        downloadBtn.textContent = "Disabled"
    }else{
        downloadBtn.textContent = "Export as XLSX";
        downloadBtn.disabled = false;
    }
}
// Edit Job
let editIndex = null;

function updateJob(index){
    editIndex = index;
    let job = jobs[index];


    companyName.value = job.company;
    jobPosition.value= job.role;
    aplicationStatus.value = job.status;

    submitButton.textContent = "Update Job";
       

}

// add new job
submitButton.addEventListener('click', (e)=>{
    e.preventDefault();
   
    
    if(editIndex===null){
         let job = {
       company: companyName.value,
    role: jobPosition.value,
    status: aplicationStatus.value
    }
    if(job.company.length !==0 || job.role.length !==0){
jobs.push(job);
    }
    
    

    }else{
        jobs[editIndex]={
            company: companyName.value,
    role: jobPosition.value,
    status: aplicationStatus.value
        }
        editIndex = null;
    }
   submitButton.textContent = "Add Application"
    svaeData()
diplayData()
        // clear the JobForm fields
    jobForm.reset();
});

//delete job
function deleteJob(index){
    console.log(index);
    
    jobs.splice(index,1);
    svaeData();
    diplayData()
}

diplayData()

// export as an Excel file

downloadBtn.addEventListener('click', ()=>{
    
    if(jobs.length !== 0){
        let col_length = jobs.map((elm)=> elm.company.length)

    console.log(Math.max(...col_length));
    const worksheet = XLSX.utils.json_to_sheet(jobs);
    worksheet["!cols"]=[{
        wch: Math.max(...col_length)+2,
        wch:Math.min(10),
        wch:Math.min(10)
    }]
    const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
XLSX.writeFile(workbook,'jobs.xlsx')
    }else{
        
        alert('There is No Data to Download')
    }
})