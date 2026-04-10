
const seeVideo = document.getElementById("seeVideo")
const bannermodal = document.querySelector(".bannermodal")

seeVideo.addEventListener('click',()=>{
bannermodal.classList.replace('d-none','d-block')
})

bannermodal.addEventListener('click',(e)=>{
    e.stopPropagation()
    bannermodal.classList.replace('d-block','d-none')
})