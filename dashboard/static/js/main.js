/*========= TOGGLE DROPDOWN =========*/
document.querySelectorAll(".toggle_dropdown").forEach((multiAction) => {
    const menuButton = multiAction.querySelector(".toggle_btn");
    const list = multiAction.querySelector(".toggle_dropdown_list");

    menuButton.addEventListener("click", () => {
        list.classList.toggle("active");
    });
});

document.addEventListener("click", (e) => {
    const keepOpen =
        e.target.matches(".toggle_dropdown_list") ||
        e.target.matches(".toggle_btn") ||
        e.target.matches(".toggle_btn_trigger");

    if (keepOpen) return;

    document.querySelectorAll(".toggle_dropdown_list").forEach((list) => {
        list.classList.remove("active");
    });
});

/*========= MENU SIDEBAR =========*/
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

/*========= MENU SHOW =========*/
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

/*========= MENU HIDE =========*/
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

/*========= REMOVE MENU MOBILE =========*/
const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
    navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*========= MODAL =========*/
/*===== SHOW MODAL =====*/
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");

openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("show-modal");
}

/*===== CLOSE MODAL =====*/
closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal_container");
        closeModal(modal);
    });
});

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("show-modal");
}
