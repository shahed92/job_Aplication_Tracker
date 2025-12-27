
const companyName = document.querySelector('#company');
const jobPosition = document.querySelector('#role');
const aplicationStatus = document.querySelector('#status');
const submitButton = document.querySelector('#btn');
const jobList = document.querySelector('#jobList');
const jobForm = document.querySelector('#jobForm');


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
    jobs = data?JSON.parse(data):[]
 jobList.innerHTML = '';
    jobs.forEach((job,index)=>{
      

        jobList.insertAdjacentHTML('beforeend',
        `
         <tr>
    <td>${job.company}</td>
    <td>${job.role}</td>
    <td>${job.status}</td>
    <td>
      <button class="action-btn edit" onclick="updateJob(${index})">Edit</button>
      <button class="action-btn delete" onclick="deleteJob(${index})">Delete</button>
    </td>
  </tr>
        
        `)
        
    })
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
    jobs.push(job);

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