// Infos
const fullName = document.querySelector("#full-name");
const roles = document.querySelector("#roles");
const profilePic = document.querySelector("#profile-picture");
const email = document.querySelector("#email");
const phoneNumber = document.querySelector("#telephone");
// Experience
const experienceName = document.querySelector("#experience-name");
const experiencePosition = document.querySelector("#experience-position");
const startDate = document.querySelector("#date-debut");
const finishDate = document.querySelector("#date-fin");
// Buttons
const addExperience = document.querySelector("#add-experience");
const addNewExperience = document.querySelector("#nouvelle-experience");
const submitBtn = document.querySelector("#submit-button");
// Experience Display
const addedExperieces = document.querySelector("#added-experiences");
const experienceForm = document.querySelector(".experience");

// Retriving Data from local
const storedEmployees = JSON.parse(localStorage.getItem('Employees')) || [];
console.log(storedEmployees);


// Array to hold each object of experiences
let experiences = [];

// Hidding Added Experience 
if (experiences.length === 0) {
    addedExperieces.classList.remove("flex");
    addedExperieces.classList.add("hidden"); 
}

addNewExperience.addEventListener('click', () => {
    addNewExperience.classList.add("hidden");
    experienceForm.classList.remove("hidden");
})

addExperience.addEventListener('click', () => {
    // each experience object
    const experience = {
        employerName: experienceName.value,
        jobPosition: experiencePosition.value,
        dateOfStart: startDate.value,
        dateOfFinish: finishDate.value
    }   
    
    experienceName.value = '';
    experiencePosition.value = '';
    startDate.value = '';
    finishDate.value = '';

    let sDate = Number(experience.dateOfStart.slice(0, 4));
    let fDate = Number(experience.dateOfFinish.slice(0, 4));
    if (fDate < sDate) return;

    experiences.push(experience);
    
    let experieceBox = `
        <div class="exprerience text-soft-white border-2 border-[#b9b9b9] rounded-xl p-3 w-[90%] text-center">
            <h1>${experience.employerName}</h1>
            <h2>${experience.jobPosition}</h2>
            <div>From ${sDate} To ${fDate}</div>
        </div>
    `
    addedExperieces.innerHTML += experieceBox;

    addedExperieces.classList.remove("hidden"); 
    addedExperieces.classList.add("flex");
    experienceForm.classList.add("hidden");
    addNewExperience.classList.remove("hidden");
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const employee = {
        employeeName: fullName.value,
        employeeRole: roles.value,
        employeePic: profilePic.value,
        employeeEmail: email.value,
        employeePhoneNumber: phoneNumber.value,
        employeeExperiences: experiences
    }

    storedEmployees.push(employee);
    localStorage.setItem('Employees', JSON.stringify(storedEmployees));

    // empty values 
    fullName.value = "";
    roles.value = "";
    profilePic.value = "";
    email.value = "";
    phoneNumber.value = "";
    experienceName.value = '';
    experiencePosition.value = '';
    startDate.value = '';
    finishDate.value = '';
    experiences = [];
});