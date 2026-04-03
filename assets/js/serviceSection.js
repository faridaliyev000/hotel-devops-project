// Buttons
const addBtn = document.querySelector("#add");
const closeBtn = document.querySelector(".close");
const showAll = document.getElementById("show-all-btn")
const searchBtn = document.getElementById("search-btn")
const nextBtn = document.getElementById("next-btn")
const prevBtn = document.getElementById("prev-btn")
const sortByNameSelect = document.querySelector("#sort-by-name");
const addServiceBtn = document.getElementById("addService");


// Elements
const modal = document.getElementById("modal");
const serviceModal = document.getElementById("service-modal")
const swiperEl = document.querySelector('swiper-container')

// inputs
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const iconInput = document.getElementById("iconInput");
const services = document.getElementById("getServicesData")
const searchInput = document.getElementById("search-input")
const searchBtnSpan = document.getElementById("search-input-warn")
const titleWarning = document.getElementById("title-warning")
const contentWarning = document.getElementById("content-warning")
const iconWarning = document.getElementById("icon-warning")
const titleWarningMsg = document.getElementById("title-char-warning")
const contentCharWarning = document.getElementById("content-char-warning")

class Service {
    static id = 1;
    constructor(Cardtitle, Cardcontent, iconUrl) {
        this.title = Cardtitle;
        this.content = Cardcontent;
        this.icon = iconUrl;
        this.id = Service.id ++;
        this.created_at = new Date;
    }
}

// Add Data Defaults
const serviceCard1 = new Service(
    'Trekking',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/trekking.png'
);

const serviceCard2 = new Service(
    'The Map',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/worldMap.png'
);

const serviceCard3 = new Service(
    'Suitcase',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/suitcase.png'
);

const serviceCard4 = new Service(
    'Island Hoping',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/island.png'
);

const serviceCard5 = new Service(
    'World Round',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/worldMap.png'
);

const serviceCard6 = new Service(
    'Travel with Plane',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/island.png'
);
// add array with Data
const sliderCardArray = [serviceCard1,serviceCard2,serviceCard3,serviceCard4,serviceCard5,serviceCard6];
// console.log(sliderCardArray);

//Buttons
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    resetInputs();
});
searchInput.addEventListener('keyup', () => {
    if (searchInput.value.trim() !== "") {
        searchBtnSpan.classList.replace('d-flex', 'd-none');
    }
});

showAll.addEventListener('click', (e) => {
    searchInput.value = ''
    renderServices(sliderCardArray);
});

// Youtubedan baxmisam
nextBtn.addEventListener("click", () => {
    const itemWidth = services.querySelector('.slider_item').offsetWidth;
    services.scrollBy({ left: itemWidth, behavior: "smooth" });
});
prevBtn.addEventListener("click", () => {
    const itemWidth = services.querySelector('.slider_item').offsetWidth;
    console.log(itemWidth);
    services.scrollBy({ left: -itemWidth, behavior: "smooth" });
});


sortByNameSelect.addEventListener('change', function (e) {
    sortByName(this.value);
})

function resetInputs() {
    titleInput.value = "";
    contentInput.value = "";
    iconInput.value = "";
    titleWarning.classList.replace('d-block', 'd-none');
    contentWarning.classList.replace('d-block', 'd-none');
    iconWarning.classList.replace('d-block', 'd-none');
    titleWarningMsg.classList.replace('d-block', 'd-none');
    contentCharWarning.classList.replace('d-block', 'd-none');
}

function renderServices(array) {
    services.innerHTML = "";
    array.forEach(arr => {
        services.innerHTML += renderServiceData(arr);
    });
    cardDeleted();
    learnMore()
}


function renderServiceData(element) {
    cardDeleted()
    return `
    <div class="slider_item">
    <div class="cards text-start w-100">
    <div class="card_img">
    <img src="${element.icon}" alt="">
    </div>
    <div class="card_desc">
    <h5>${element.title}</h5>
    <p>${element.content}</p>
    </div>
    <div class="card_btn">
    <span>${element.created_at}</span>
    <div class="d-flex links">
    <a href="" class="learn-more-btn" data-id="${element.id}">Learn more</a>
    <button  class="del" data-id="${element.id}">Delete</button>
    </div>
    </div>
    </div>
    </div>
    `;
    
    
}
function addService() {
    const titleValue = titleInput.value.trim();
    const contentValue = contentInput.value.trim();
    const iconURL = iconInput.value.trim();

    if (!titleValue || !contentValue || !iconURL) {
        if (!titleValue) titleWarning.classList.replace('d-none', 'd-block');
        if (!contentValue) contentWarning.classList.replace('d-none', 'd-block');
        if (!iconURL) iconWarning.classList.replace('d-none', 'd-block');
        return;
    }
    if (titleValue.length < 3) {
        titleWarningMsg.classList.replace('d-none', 'd-block');
        return;
    }
    if (contentValue.length < 10) {
        contentCharWarning.classList.replace('d-none', 'd-block');
        return;
    }

    const newService = new Service(titleValue, contentValue, iconURL);
    sliderCardArray.push(newService);
    resetInputs();
    modal.style.display = "none";
    renderServices(sliderCardArray);
    cardDeleted();
    Swal.fire({
        position: "center",
        icon: "success",
        title: "New Service Card Added Succesfully!",
        showConfirmButton: false,
        timer: 2000
    });
}

function cardDeleted() {
    const deleteBtns = document.querySelectorAll(".del");
    deleteBtns.forEach(delBtns => {
        // console.log(delBtns);
        delBtns.addEventListener("click", function (e) {
        e.preventDefault()
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    
                    const idToDelete = parseInt(this.dataset.id);
                    console.log(idToDelete);
                    const idx = sliderCardArray.findIndex(service => service.id === idToDelete);
                    console.log(idx);
                    if (idx !== -1) {
                        console.log("tres");
                        sliderCardArray.splice(idx, 1);
                        renderServices(sliderCardArray);
                    }
                Swal.fire({
                    title: "Deleted!",
                    text: "Service Card has been deleted succesfully!",
                    icon: "success"
                });
                }
            });
        
        });
    });
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (searchInput.value === "") {
        searchBtnSpan.classList.replace('d-none', 'd-flex');
    } else {
        services.innerHTML = "";
        const filteredServices = sliderCardArray.filter(service =>
            service.title.trim().toLowerCase().includes(searchInput.value.trim().toLowerCase())
        );
        filteredServices.forEach(service => {
            services.innerHTML += renderServiceData(service);
        });
        searchInput.value = "";
    }
});

function learnMore() {
    const learnMoreBtns = document.querySelectorAll(".learn-more-btn");
    learnMoreBtns.forEach(learnMoreBtn => {
        learnMoreBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const idToLearn = parseInt(this.dataset.id);
            const service = sliderCardArray.find(service => service.id === idToLearn);
            console.log(service);
            serviceModal.classList.replace('d-none', 'd-flex')
            window.addEventListener('click', serviceoutsideClick);
            function serviceoutsideClick(e) {
                if (e.target === serviceModal) {
                    serviceModal.classList.replace('d-flex', 'd-none')
                    window.removeEventListener('click', serviceoutsideClick);
                }
            }
            if (service) {
                serviceModal.innerHTML = renderServiceData(service)
            }
        });
    });
}





function sortByName(value) {
    let newSortArr = [...sliderCardArray]
    if (value == 'a-z') {
        newSortArr = newSortArr.sort((x, y) => x.title.localeCompare(y.title));
        renderServices(newSortArr)
    }
    else if (value == 'z-a') {
        newSortArr = newSortArr.sort((x, y) => y.title.localeCompare(x.title));
        renderServices(newSortArr)
    }
}




addServiceBtn.addEventListener("click", addService);

iconInput.addEventListener('keyup', () => {
    if (iconInput.value.trim() !== "") {
        iconWarning.classList.replace('d-block', 'd-none');
    }
});

contentInput.addEventListener('keyup', () => {
    if (contentInput.value.trim() !== "") {
        contentWarning.classList.replace('d-block', 'd-none');
    }
    if (contentInput.value.trim().length > 10) {
        contentCharWarning.classList.replace('d-block', 'd-none');
    }
});

titleInput.addEventListener('keyup', () => {
    if (titleInput.value.trim() !== "") {
        titleWarning.classList.replace('d-block', 'd-none');
    }
    if (titleInput.value.trim().length > 3) {
        titleWarningMsg.classList.replace('d-block', 'd-none');
    }
});
renderServices(sliderCardArray);
cardDeleted();