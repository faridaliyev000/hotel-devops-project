const featSliderContain= document.getElementById("getFeatureSlider")


// buttons
const featnextBtn = document.getElementById("feature-next-btn");
const featprevBtn = document.getElementById("feature-prev-btn");


// create Datas
class FeatureEmp {
static id = 1
constructor(fullName, position, comment, imgSrc) {
    this.fullName = fullName;
    this.position = position;
    this.comment = comment;
    this.imgSrc = imgSrc;
    this.id = FeatureEmp.id ++;
}
}

featEmp1 = new FeatureEmp("Hannah White", "CEO, Co-Founder", "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", "https://preview.colorlib.com/theme/hotell/images/person_1.jpg")
featEmp2 = new FeatureEmp("John Doe", "Creative Director", "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", "https://preview.colorlib.com/theme/hotell/images/person_2.jpg")
featEmp3 = new FeatureEmp("Hannah White", "CEO, Co-Founder", "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", "https://preview.colorlib.com/theme/hotell/images/person_3.jpg")
featEmp4 = new FeatureEmp("John Doe", "Creative Director", "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", "https://preview.colorlib.com/theme/hotell/images/person_4.jpg")
featEmp5 = new FeatureEmp("Hannah White", "CEO, Co-Founder", "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", "https://preview.colorlib.com/theme/hotell/images/person_1.jpg")
featEmp6 = new FeatureEmp("John Doe", "Creative Director", "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.", "https://preview.colorlib.com/theme/hotell/images/person_2.jpg")


featemployesArr = [featEmp1, featEmp2, featEmp3, featEmp4, featEmp5, featEmp6]

// Events

// Youtubedan yazmisam  
featnextBtn.addEventListener("click", () => {
    const itemWidth = featSliderContain.querySelector('.cards').offsetWidth;
    featSliderContain.scrollBy({ left: itemWidth, behavior: "smooth" });
});
featprevBtn.addEventListener("click", () => {
    const itemWidth = featSliderContain.querySelector('.cards').offsetWidth; 
    featSliderContain.scrollBy({ left: -itemWidth, behavior: "smooth" });
});



// Functions 

function AddBlogs() {
    console.log("test");
    FeatrenderData(featemployesArr)
}

function FeatrenderData(arr) {
    featSliderContain.innerHTML = '' 
    arr.forEach(employeee => {
        
        featSliderContain.innerHTML += `
        <div class="cards">
        <div class="card_img">
            <img src="${employeee.imgSrc}" alt="">
        </div>
        <div class="card_desc">
            <h3>${employeee.fullName}</h3>
            <span>${employeee.position}</span>
            <p>${employeee.comment}</p>
            
        </div>
        <div class="learn_more">
            <a href="about.html">Learn More</a>

            <a href="#" class="deleteBtnFeat" data-id="${employeee.id}">Delete</a> 
        </div>
    </div>
    `
    });
cardDeleted()
}

function cardDeleted() {
    const deleteBtns = document.querySelectorAll(".deleteBtnFeat");
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
                        FeatrenderData(employesArr);
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


AddBlogs()


