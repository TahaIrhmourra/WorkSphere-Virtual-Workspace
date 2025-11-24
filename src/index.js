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
const exitBtns = document.querySelectorAll(".exit1, .exit2, .exit3");
const minimizeBtns = document.querySelectorAll(".minimize1");
const openBtns = document.querySelectorAll(".open1");
const addEmployee = document.querySelector("#add-employe");
const openListBtns = document.querySelectorAll(".open-list");
// Display element
const addedExperieces = document.querySelector("#added-experiences");
const experienceForm = document.querySelector(".experience");
const sideBar = document.querySelector(".sibe-bar");
const profilesWrapper = document.querySelector(".profiles-wrapper");

// Array to hold each object of experiences
let experiences = [];
// Store employees
const storedEmployees = JSON.parse(localStorage.getItem('Employees')) || [];
let currentId = JSON.parse(localStorage.getItem('currentId'));

// update Users
updateUsers();

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
    let valid = {
        expName: /^[a-zA-Z ]{1,16}$/.test(experienceName.value),
        expPositon: /^[a-zA-Z ]{1,16}$/.test(experiencePosition.value)
    }

    let val = Object.values(valid).every(rule => rule === true);

    if (val) {
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
        addedExperieces.classList.add("flex");

        addedExperieces.classList.remove("hidden"); 
        addedExperieces.classList.add("flex");
        experienceForm.classList.add("hidden");
        addNewExperience.classList.remove("hidden");
    } else {
        if (valid.expName === false) {
            alert("Le nom de l'employeur ne peut pas etre vide");
        }
        if (valid.expPositon === false) {
            alert("La position ne peut pas etre vide");
        }
    }
})

// Adding img
let imagePath = '';
addImages.addEventListener('click', () => {
    if (perVisualImage.querySelector("img")) {
        perVisualImage.querySelector("img").remove();
    } 
    if (perVisualImage.querySelector("img") == null) {
        const image = document.createElement("img");
        // create img
        image.classList.add("w-full", "h-full");
        image.src = profilePic.value
        perVisualImage.appendChild(image);
        perVisualImage.classList.remove("hidden");
        // sending img to the main obj
    
        document.querySelector("#valid-img").addEventListener('click', () => {
            imagePath = profilePic.value;
            perVisualImage.classList.add("hidden");
        })
    }
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let valid = {
        empName: /^[a-zA-Z ]{8,24}$/.test(fullName.value),
        empRole: roles.value !== '',
        empPic: imagePath !== '',
        empEmail: /^[a-zA-Z.]+@[a-zA-Z.]+\.(com|fr|net|org)$/.test(email.value),
        empPhoneNum: /^06\d{8}$/.test(phoneNumber.value),
    }

    val = Object.values(valid).every(rule => rule === true);
    if (val === true) {
        const employee = {
            employeeId: ++currentId,
            employeeName: fullName.value,
            employeeRole: roles.value,
            employeePic: imagePath,
            employeeEmail: email.value,
            employeePhoneNumber: phoneNumber.value,
            employeeExperiences: experiences
        }
    
        storedEmployees.push(employee);
        localStorage.setItem('Employees', JSON.stringify(storedEmployees));
        localStorage.setItem('currentId', JSON.stringify(currentId));
        profilesWrapper.innerHTML = '';
        updateUsers();
        
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
        imagePath = '';
        experiences = [];
        addedExperieces.innerHTML = "";
        addedExperieces.style.display = 'none';
    
        exit(form);
    } else {
        if (valid.empName === false) {
            alert("Ton nom ne doit contenir que des lettres majuscules, minuscules et des espaces");
        }
        if (valid.empRole === false) {
            alert("Veuillez choisir un role");
        }
        if (valid.empPic === false) {
            imagePath = 'https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg';
        }
        if (valid.empEmail === false) {
            alert("Assurez-vous que votre email contient '@' et '.'");
        }
        if (valid.empPhoneNum === false) {
            alert("Assurez-vous que votre numero de tel commence par 06 et comporte un total de 10 chiffres (y compris le 06)");
        }
    }
});

// open profile
const empProfileDisplay = document.querySelector("#emp-profile");

profilesWrapper.addEventListener('click', (e) => {
    const box = e.target.closest(".box");

    const selectedEmp = box.id;
    const selectedData = storedEmployees.find(emp => emp.employeeId == selectedEmp);
    let empExperiences = selectedData.employeeExperiences;   
    
    minimize(sideBar);

    empProfileDisplay.querySelector("#profiles-wrapper").innerHTML = `
        <div class="w-[175px] h-[175px] rounded-full border-2 border-[#b9b9b9] overflow-hidden flex-shrink-0">
        <img src="${selectedData.employeePic}" alt="employee-profile-image" class="w-full h-full object-cover">
        </div>
        <div class="text-soft-white w-full text-center flex flex-col gap-3 mt-2 text-xl border-2 border-[#b9b9b9] rounded-2xl p-6">
            <p class="line-clamp-1">${selectedData.employeeName}</p>
            <p class="line-clamp-1">${selectedData.employeeRole}</p>
            <p class="line-clamp-1">${selectedData.employeeEmail}</p>
            <p class="line-clamp-1">${selectedData.employeePhoneNumber}</p>
        </div>
        <div class="experiences-wrapper text-soft-white w-full text-center flex flex-col gap-4 mt-2 text-xl border-2 border-[#b9b9b9] rounded-2xl p-4">
            <p>Les experiences</p>
            ${empExperiences.map(exp => {
                return `
                    <div class="border-2 border-[#b9b9b9] rounded-2xl p-4">
                        <p>Chez: <span class="text-teal"><span>${exp.employerName}</span></p>            
                        <p>Position: <span class="text-teal">${exp.jobPosition}</span></p>
                        <p class="text-teal max-w-[150px] m-auto">
                        <span class="text-soft-white font-momo-trust">De</span> ${exp.dateOfStart}
                        <span class="text-soft-white font-momo-trust">A</span> ${exp.dateOfFinish}
                        </p>
                    </div>
                `
            }).join('')}
        
    </div> 
    `

    empProfileDisplay.classList.remove("hidden");
})

// openListBtns.forEach(btn => btn.addEventListener('click', (e) => {
//     const currentRoom = e.currentTarget.parentElement.dataset.room;
//     const eligibleEmps = storedEmployees.filter(emp => emp.employeeRole === currentRoom) 
//     console.log(eligibleEmps)
//     // if (currentRoom.classList.contains("conference-room")) console.log("yes")
// }))


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
function updateUsers() {
    // Displaying unssignedEmps
    storedEmployees.forEach(emp => {
        profilesWrapper.innerHTML += `
            <div id=${emp.employeeId} class="box p-2 flex items-center gap-3 border-2 border-[#b9b9b9] rounded-3xl cursor-pointer">
                <img src="${emp.employeePic}" alt="imployee-image" class="border-2 border-[#b9b9b9] rounded-[15px] w-16 h-16">
                <div class="text-soft-white">
                    <h2 class="text-2xl">${emp.employeeName}</h2>
                    <p class="text-sm w-fit ml-3 opacity-70">${emp.employeeRole}</p>
                </div>
            </div>
        `
    })
}

{/* <div class="box w-6 h-6 overflow-hidden rounded-full cursor-pointer border border-soft-white duration-300 hover:border-dark-black">
<img src="https://intranet.youcode.ma/storage/users/profile/1774-1760996459.png" alt="img-profile" class="w-full h-full hover:scale-125 duration-300">
</div> */}
