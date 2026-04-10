// Accodion'un basliq content ve icon'unu deyisenler
const contentHeader = document.querySelectorAll('.content-header')
const content = document.querySelectorAll('.content')
const arrows = document.querySelectorAll('.fa-chevron-down')

// Functions
contentHeader.forEach(element => {
    element.addEventListener('click',()=>{ //Accordion'a click etdikde diger Accordion'lari baglamasi ucun
        contentHeader.forEach(elemen =>{
            if (element !== elemen) {
            elemen.lastElementChild.classList.remove('rotate-animation') // Ozunden basqa diger icon'larin 'rotate-animation' classini silir
            }
        })
        content.forEach(e => {
            
            if (element.nextElementSibling!==e) {
                e.classList.remove('open') // Ozunden basqa diger Accordion'larin 'open' classini silir
            }
            
        });
        element.lastElementChild.classList.toggle('rotate-animation') 
        element.nextElementSibling.classList.toggle('open')
    })
});