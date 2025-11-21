// Elements
const form = document.querySelector("#form");
// Infos
const fullName = document.querySelector("#full-name");
const roles = document.querySelector("#roles");
const profilePic = document.querySelector("#profile-picture");
const perVisualImage = document.querySelector("#img-visual");
const email = document.querySelector("#email");
const phoneNumber = document.querySelector("#telephone");
// Experience
const experienceName = document.querySelector("#experience-name");
const experiencePosition = document.querySelector("#experience-position");
const startDate = document.querySelector("#date-debut");
const finishDate = document.querySelector("#date-fin");
// Buttons
const addImages = document.querySelector("#add-image");
const addExperience = document.querySelector("#add-experience");
const addNewExperience = document.querySelector("#nouvelle-experience");
const submitBtn = document.querySelector("#submit-button");
const exitBtns = document.querySelectorAll(".exit1, .exit2");
const minimizeBtns = document.querySelectorAll(".minimize1");
const openBtns = document.querySelectorAll(".open1");
const addEmployee = document.querySelector("#add-employe");
// Display element
const addedExperieces = document.querySelector("#added-experiences");
const experienceForm = document.querySelector(".experience");
const sideBar = document.querySelector(".sibe-bar");
const profilesWrapper = document.querySelector(".profiles-wrapper");


// Retriving Data from local adding it to unssigned list
const storedEmployees = JSON.parse(localStorage.getItem('Employees')) || [];
let unssignedEmp = [];
storedEmployees.forEach(emp => {
    unssignedEmp.push(emp);   
})

// Displaying unssignedEmps
unssignedEmp.forEach(emp => {
    profilesWrapper.innerHTML += `
        <div class="box p-2 flex items-center gap-3 border-2 border-[#b9b9b9] rounded-3xl cursor-pointer">
            <img src="${emp.employeePic}" alt="imployee-image" class="border-2 border-[#b9b9b9] rounded-[15px] w-16 h-16">
            <div class="text-soft-white">
                <h2 class="text-2xl">${emp.employeeName}</h2>
                <p class="text-sm w-fit ml-3 opacity-70">${emp.employeeRole}</p>
            </div>
        </div>
    `
})

// Array to hold each object of experiences
let experiences = [];

// Hidding Added Experience 
if (experiences.length === 0) {
    addedExperieces.classList.remove("flex");
    addedExperieces.classList.add("hidden"); 
}

// Add a new experience
addNewExperience.addEventListener('click', () => {
    addNewExperience.classList.add("hidden");
    experienceForm.classList.remove("hidden");
})

// Add an experiece
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
    addedExperieces.style.display = 'flex';

    addedExperieces.classList.remove("hidden"); 
    addedExperieces.classList.add("flex");
    experienceForm.classList.add("hidden");
    addNewExperience.classList.remove("hidden");
})

let imagePath = null;
addImages.addEventListener('click', () => {
    // create img
    const image = document.createElement("img");
    image.classList.add("w-full", "h-full");
    image.src = profilePic.value
    perVisualImage.appendChild(image);
    perVisualImage.classList.remove("hidden");
    // sending img to the main obj

    document.querySelector("#valid-img").addEventListener('click', () => {
        imagePath = profilePic.value;
        perVisualImage.classList.add("hidden");
    })
})

// Submit the full object containing the img, experiences and other informations
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const employee = {
        employeeName: fullName.value,
        employeeRole: roles.value,
        employeePic: imagePath,
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
    imagePath = null;
    experiences = [];
    addedExperieces.innerHTML = "";
    addedExperieces.style.display = 'none';
});

// Functionality
exitBtns.forEach(btn => btn.addEventListener('click', () => exit(btn.parentElement)));
minimizeBtns.forEach(btn => btn.addEventListener('click', () => minimize(btn.parentElement)));
openBtns.forEach(btn => btn.addEventListener('click', () => open(sideBar)));
addEmployee.addEventListener('click', () => {open2(form); minimize(sideBar)});

// Functions
function exit(element) {
    element.classList.remove("flex");
    element.classList.add("hidden");
}
function minimize(element) {
    element.classList.remove("left-0");
    element.classList.add("left-[-100%]");
}
function open(element) {
    element.classList.remove("left-[-100%]");
    element.classList.add("left-0");
}
function open2(element) {
    element.classList.remove("hidden");
    element.classList.add("flex");
}