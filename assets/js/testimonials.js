const TestSliderContain= document.getElementById("getTestSlider")
const TestModal= document.getElementById("testModals")

// buttons
const testnextBtn = document.getElementById("test-next-btn");
const testprevBtn = document.getElementById("test-prev-btn");
const openTestModal = document.getElementById("addEmployee");
const closeTestModal = document.getElementById("closeModal");
const addNewData = document.getElementById('addEmployeBtn')

// create Datas
class Employees {
static id = 1
constructor(fullName, position, comment, imgSrc) {
    this.fullName = fullName;
    this.position = position;
    this.comment = comment;
    this.imgSrc = imgSrc;
    this.id = Employees.id ++;
}
}

employe1 = new Employees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_1.jpg")
employe2 = new Employees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_2.jpg")
employe3 = new Employees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_3.jpg")
employe4 = new Employees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_4.jpg")
employe5 = new Employees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_1.jpg")
employe6 = new Employees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_2.jpg")
employe7 = new Employees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_3.jpg")
employe8 = new Employees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_4.jpg")

employesArr = [employe1, employe2, employe3, employe4, employe5, employe6, employe7, employe8]

// Events

// Youtubedan yazmisam  
testnextBtn.addEventListener("click", () => {
    const itemWidth = TestSliderContain.querySelector('.cards').offsetWidth;
    TestSliderContain.scrollBy({ left: itemWidth, behavior: "smooth" });
});
testprevBtn.addEventListener("click", () => {
    const itemWidth = TestSliderContain.querySelector('.cards').offsetWidth;
    
    TestSliderContain.scrollBy({ left: -itemWidth, behavior: "smooth" });
});

openTestModal.addEventListener('click',()=>{
    TestModal.classList.replace('d-none', 'd-block')
})
closeTestModal.addEventListener('click',()=>{
    TestModal.classList.replace('d-block','d-none')
})
addNewData.addEventListener('click',()=>{
    const testInps = document.querySelectorAll('.testInp')
testInps.forEach(inp => {
    inp.addEventListener("keyup",()=>{
        inp.nextElementSibling.classList.replace("d-block",'d-none')
    })
    if (inp.value == "") {
        inp.nextElementSibling.classList.replace('d-none',"d-block")
        return;
    }

});
   AddEmployee()
})
// Functions 

function AddTest() {
    // console.log("test");
    TestRenderData(employesArr)
}

function TestRenderData(arr) {
    TestSliderContain.innerHTML = '' 
    arr.forEach(employeee => {
        console.log(employeee);
        TestSliderContain.innerHTML += `
        <div class="cards">
        <div class="card_desc">
            <p>
                ${employeee.comment}
            </p>
        </div>
        <div class="author">
            <div class="d-flex align-items-center">
                <div class="author_img mr-3">
                    <img src="${employeee.imgSrc}" alt="Image" class="img-fluid">
                </div>
                <div class="justify-content-between d-flex w-100 align-items-center">
                    <div class="text">
                        <strong class="d-block">${employeee.fullName}</strong>
                        <span>${employeee.position}</span>
                    </div>
                    <div>
                        <a href="#" class="deleteBtn" data-id="${employeee.id}">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    });
cardDeleted()
}

function cardDeleted() {
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach(delBtns => {
        // console.log(delBtns);
        delBtns.addEventListener("click", function () {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    
                    const idToDelete = delBtns.getAttribute('data-id');
                    console.log(idToDelete);
                    const idx = employesArr.findIndex(employe => employe.id == idToDelete);
                    console.log(idx);
                    if (idx !== -1) {
                        console.log("test");
                        employesArr.splice(idx, 1);
                        TestRenderData(employesArr);
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

function AddEmployee() {

    const testFullname = document.getElementById("testFullname")
    const testposition = document.getElementById("testposition")
    const testComment = document.getElementById("testComment")
    const testImgSrc = document.getElementById("testImgSrc")

    if (testFullname.value.length === 0 || testposition.value.length === 0 || testComment.value.length === 0 || testImgSrc.value.length === 0) {
        console.log("not oke");
    }
    else{
        const newEmployeer = new Employees(testFullname.value,testposition.value,testComment.value,testImgSrc.value)
        employesArr.push(newEmployeer)
        TestRenderData(employesArr)
        testFullname.value = ''
        testposition.value = ''
        testComment.value = ''
        testImgSrc.value = ''
    }


    
}
AddTest()


