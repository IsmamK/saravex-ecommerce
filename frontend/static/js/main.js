/*========= TOGGLE DROPDOWN =========*/
document.querySelectorAll(".toggle_dropdown").forEach(multiAction => {
    const menuButton = multiAction.querySelector(".toggle_btn");
    const list = multiAction.querySelector(".toggle_dropdown_list");

    menuButton.addEventListener("click", () => {
        list.classList.toggle("active");
    });
});

document.addEventListener("click", e => {
    const keepOpen = (
        e.target.matches(".toggle_dropdown_list")
        || e.target.matches(".toggle_btn")
        || e.target.matches(".toggle_btn_trigger")
    );

    if (keepOpen) return;

    document.querySelectorAll(".toggle_dropdown_list").forEach(list => {
        list.classList.remove("active");
    });
});

/*========= MENU SIDEBAR =========*/
const navMenu = document.getElementById('nav-menu'),
   navToggle = document.getElementById('nav-toggle'),
   navClose = document.getElementById('nav-close')

/*========= MENU SHOW =========*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*========= MENU HIDE =========*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*========= REMOVE MENU MOBILE =========*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*========= category slider =========*/
var swiper = new Swiper(".banner_slider", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    centeredSlides: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
});

/*========= category slider =========*/
var swiper = new Swiper(".product_category_slider", {
    slidesPerView: 3,
    spaceBetween: 16,
    breakpoints: {
        768: {
            slidesPerView: 4,
        },

        1024: {
            slidesPerView: 7,
            spaceBetween: 24,
        },
    },
});

/*========= MODAL =========*/
/*===== SHOW MODAL =====*/
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('show-modal')
}

/*===== CLOSE MODAL =====*/
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal_container')
        closeModal(modal)
    })
})

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('show-modal')
}

/*========= SELECT INPUT =========*/
const selectedBox = document.querySelectorAll('.select_box')

/*===== SELECT BOX TOGGLE =====*/
selectedBox.forEach((select) => {
    const selected = select.querySelector('.option_selected')

    selected.addEventListener('click', () => {
        const openSelect = document.querySelector('.select-active')

        toggleSelect(select)

        if (openSelect && openSelect!= select) {
            toggleSelect(openSelect)
        }

        /*===== OPTION SELECT =====*/
        const optionList = select.querySelectorAll('.option')
        optionList.forEach( o => {
            o.addEventListener('click', () => {
                selected.innerHTML = o.querySelector('label').innerHTML;
                select.classList.remove('select-active')
                selected.classList.add('active')
            })
        })

        /*===== SEARCH OPTION =====*/
        const selectSearch = select.querySelector('.option_search input')
        selectSearch.addEventListener('keyup', function(e) {
            filterList(e.target.value);
        })
        
        const filterList = searchTerm => {
            searchTerm = searchTerm.toLowerCase();
            optionList.forEach( option => {
                let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
                if (label.indexOf(searchTerm) != -1) {
                    option.style.display = 'block';
                } else {
                    option.style.display = 'none';
                }
            })
        }

        selectSearch.value = '';
        filterList('');
    })
})

const toggleSelect = (select) => {
    const optionContainer = select.querySelector('.option_container')

    if (select.classList.contains('select-active')) {
        select.classList.remove('select-active')
    } else {
        select.classList.add('select-active')
    }
}

/*=============== SHOW / HIDDEN PASSWORD ===============*/
function showHiddenPassword(passInputId, passInputIcon) {
    const passInput = document.getElementById(passInputId),
        iconEye = document.getElementById(passInputIcon);
    
    // Change password to text
    if(passInput.type === 'password'){
        // Switch to text
        passInput.type = 'text'

        // Change icon
        iconEye.classList.remove('fa-eye-slash');
        iconEye.classList.add('fa-eye');
    }else{
        // Change to password
        passInput.type = 'password'

        // Remove icon
        iconEye.classList.remove('fa-eye');
        iconEye.classList.add('fa-eye-slash');
    }
};

/*=============== counter input ===============*/
const incBtns = document.getElementsByClassName('counter_increment'),
    decBtns = document.getElementsByClassName('counter_decrement');

for (const incBtn of incBtns) {
    incBtn.addEventListener('click', (event) => {
        const counterInput = event.target.parentElement.children[1];
        
        // get input value
        const counterInputValue = counterInput.value;

        // get input max value
        const counterInputMax = counterInput.getAttribute('max');

        // increment input value
        const newValue = parseInt(counterInputValue) + 1;

        if (counterInputMax >= newValue) {
            counterInput.value = newValue;
        } else {
            alert("This is max number");
        }
    });
}

for (const decBtn of decBtns) {
    decBtn.addEventListener('click', (event) => {
        const counterInput = event.target.parentElement.children[1];
        
        // get input value
        const counterInputValue = counterInput.value;

        // get input min value
        const counterInputMin = counterInput.getAttribute('min');

        // increment input value
        const newValue = parseInt(counterInputValue) - 1;

        if (counterInputMin <= newValue) {
            counterInput.value = newValue;
        } else {
            alert("This is min number");
        }
    });
}

/*=============== price range input ===============*/
const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

/*=============== mobile filter toggle ===============*/
const mobileFilterToggle = document.querySelector('#mobile-filter-toggle'),
    mobileFilterSection = document.querySelector('#side-filter-section');

mobileFilterToggle.addEventListener('click', function() {
    mobileFilterSection.classList.toggle('active');
});