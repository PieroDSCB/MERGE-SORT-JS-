const create = document.getElementById("create");
const add = document.getElementById("add");
const substract = document.getElementById("substract");
const listContainer = document.getElementById("list");
const popUp = document.getElementById("popUp");
const buttonOK = document.getElementById("buttonOK");
const butonX = document.getElementById("butonX");
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const containerEdited = document.getElementById("container");

var count = 0;
var number = document.getElementById("inputNumber");

create.addEventListener("click", showPopUp);
butonX.addEventListener("click", hidePopUp);
substract.addEventListener("click", removeDiv);
add.addEventListener("click", createDiv);

buttonOK.addEventListener("click", () => {
    if (validateList()) {
        isSorting = false;
        putList(containerEdited);
        hidePopUp()
    } else {
        hidePopUp();
    }
})



function putList(container) {
    var boxes = document.getElementsByClassName("popUp__list__box");

    for (var i = container.children.length - 1; i >= 0; i--) {
        container.removeChild(container.children[i]);
    }

    container.style.gridTemplateColumns = `repeat(${boxes.length},1fr)`;

    for (var i = 0; i < boxes.length; i++) {

        boxes[i].classList.add("main__box");

        container.appendChild(boxes[i]);

    }
    /**mejorar logica de esto */
    Array.from(boxes).forEach(e => {
        e.classList.remove("popUp__list__box");
    })

}

function hidePopUp() {
    main.style.opacity = "1";
    footer.style.opacity = "1";
    popUp.classList.remove("show");

}



function showPopUp() {

    main.style.opacity = "0";
    footer.style.opacity = "0";
    popUp.classList.add("show");

}

function removeDiv() {
    if (count > 0) {
        var divs = document.getElementsByClassName("popUp__list__box");
        divs[divs.length - 1].remove();
        count--;
    } else {
        alert("ya no hay divs")
    }
}

function createDiv() {
    if (count != 10) {
        var div = document.createElement("div");
        div.innerText = number.value;
        div.classList.add("popUp__list__box");
        listContainer.appendChild(div);
        count++;
    } else {
        alert("MAXIMO 10 DIVS")
    }

}

function validateList() {
    return listContainer.children.length >= 2;
}