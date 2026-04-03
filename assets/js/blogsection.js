const SliderContain= document.getElementById("getBlogSlider")
const BlogModal= document.getElementById("blogModals")

// buttons
const blognextBtn = document.getElementById("blog-next-btn");
const blogprevBtn = document.getElementById("blog-prev-btn");

const blogs = []

class Blogs {
static id = 1
constructor(title, imgSrc) {
    this.title = title;
    this.imgSrc = imgSrc;
    this.id = Blogs.id ++;
}
}

const BlogData = [
    {
        title:"Far far away, behind the word mountains, far from the countries",
        Imgsrc:"https://preview.colorlib.com/theme/hotell/images/img_2.jpg"
    },
    {
        title:"Far far away, behind the word mountains, far from the countries",
        Imgsrc:"https://preview.colorlib.com/theme/hotell/images/img_3.jpg"
    },
    {
        title:"Far far away, behind the word mountains, far from the countries",
        Imgsrc:"https://preview.colorlib.com/theme/hotell/images/img_4.jpg"
    },
    {
        title:"Far far away, behind the word mountains, far from the countries",
        Imgsrc:"https://preview.colorlib.com/theme/hotell/images/img_3.jpg"
    },
    {
        title:"Far far away, behind the word mountains, far from the countries",
        Imgsrc:"https://preview.colorlib.com/theme/hotell/images/img_4.jpg"
    },
    {
        title:"Far far away, behind the word mountains, far from the countries",
        Imgsrc:"https://preview.colorlib.com/theme/hotell/images/img_2.jpg"
    },
]
// Events

// Youtubedan yazmisam  
blognextBtn.addEventListener("click", () => {
    const itemWidth = SliderContain.querySelector('.blogCards').offsetWidth;
    SliderContain.scrollBy({ left: itemWidth, behavior: "smooth" });
});
blogprevBtn.addEventListener("click", () => {
    const itemWidth = SliderContain.querySelector('.blogCards').offsetWidth;
    
    SliderContain.scrollBy({ left: -itemWidth, behavior: "smooth" });
});

// Functions 

function AddBlogs() {
    BlogData.forEach(el =>{
        const newBlog = new Blogs (el.title , el.Imgsrc)
        blogs.push(newBlog)
    })
    // console.log("salam");
    
    renderData(blogs)
    
}

function renderData(blogsArr) {
    SliderContain.innerHTML = '' 
    blogsArr.forEach(element => {
        
        SliderContain.innerHTML += `
    <div class="blogCards">
    <div>
                <div class="card_image">
                    <img src="${element.imgSrc}" alt="">
                    <div class="card_content">
                        <span class="iconPencilBlog" data-id="${element.id}"><i class="fa-solid fa-pencil" ></i></span>
                        <h3>${element.title}</h3>
                        <a href="">read more</a>
                    </div>
                </div>
            </div>
            </div>
    `
    });
    function openEditModal() {
        const editBtn = document.querySelectorAll(".iconPencilBlog")
        editBtn.forEach(btn =>{
            btn.addEventListener("click",()=>{
                const editedBlogs = blogsArr.find(editblog => editblog.id == btn.getAttribute("data-id"))
                console.log(editedBlogs);
                if (editedBlogs) {
                    BlogModal.classList.replace("d-none" , "d-block")
                    BlogModal.innerHTML = `
                    <div class="modalt">
    <div class="modal_img">
        <img src="${editedBlogs.imgSrc}" alt="">
    </div>
    <div class="modal_desc">
        <input value="${editedBlogs.title}" id="blogModalInp" type="text">
        <button id="editBtn">Edit</button>
        <button id ="cancelBtn">Cancel</button>
    </div>
</div>
                    `

                    const inp = document.getElementById("blogModalInp")
                    const editBtn = document.getElementById("editBtn")
                    const cancelBtn = document.getElementById("cancelBtn")

                    editBtn.addEventListener('click',()=>{
                        editedBlogs.title = inp.value
                        console.log(editedBlogs.title);
                        blogs.push(editedBlogs)
                        renderData(blogs)
                    })

                    cancelBtn.addEventListener('click',()=>{
                        BlogModal.classList.replace("d-block" , "d-none")
                    })
                }
                
            })
        })
    }
    openEditModal()
}
AddBlogs()


