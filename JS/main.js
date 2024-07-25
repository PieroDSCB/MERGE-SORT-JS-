var mainContainer = document.getElementById("container");
var x = mainContainer.getBoundingClientRect().x;
var y = mainContainer.getBoundingClientRect().y;
const boton = document.getElementById("sort");
var isSorting = false;

boton.addEventListener("click", () => {
    if (isSorting) {
        alert("Wait for it be organized before pressing the button");
        return;
    }
    isSorting = true;

    var divs = document.getElementsByClassName("main__box");
    var array = Array.from(divs).map(e => {
        return parseInt(e.textContent);
    });

    mergeSort(array, mainContainer).then(() => {
        isSorting = false;
    });
})


async function mergeSort(array, container) {

    if (array.length <= 1) {
        return array;
    } else {
        var middle = Math.floor(array.length / 2);
        var left = array.slice(0, middle);
        var right = array.slice(middle);
        var nodeL = crearFilaI(left, container);
        var nodeR = crearFilaD(right, container);
        await goDownL(nodeL);
        await goDownR(nodeR);
        left = await mergeSort(left, nodeL);
        right = await mergeSort(right, nodeR);
        await wait(1000);
        return await merge(left, right, nodeL, nodeR, container);
    }

}

var crearFilaI = (array, container) => {

    var dad = document.createElement("div");
    dad.classList.add("main__containerLeft");
    array.forEach(element => {
        var divs = document.createElement("div");
        divs.classList.add("main__box");
        divs.innerText = element;
        dad.appendChild(divs);
    });

    dad.style.gridTemplateColumns = `repeat(${array.length},1fr)`;
    dad.style.justifySelf = "start";
    container.appendChild(dad);
    return dad;

}
var crearFilaD = (array, container) => {
    var dad = document.createElement("div");
    dad.classList.add("main__containerRight");
    array.forEach(element => {
        var divs = document.createElement("div");
        divs.classList.add("main__box");
        divs.innerText = element;
        dad.appendChild(divs);
    });
    dad.style.gridTemplateColumns = `repeat(${array.length},1fr)`;
    dad.style.justifySelf = "end";
    container.appendChild(dad);
    return dad;


}
async function goDownL(node) {
    await wait(1000);
    node.style.transform = `translate(-20px,100px)`
}
async function goDownR(node) {
    await wait(1000);
    node.style.transform = `translate(20px,100px)`
}

var wait = (ms) => {
    return new Promise(resul => {
        setTimeout(resul, ms);
    })
}
async function merge(left, right, nodeL, nodeR, target) {

    var arrayFinal = [];
    var i = 0, j = 0, z = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {

            arrayFinal.push(left[i]);
            await goUp(nodeL.children[i], target.children[z++]);
            i++;


        } else {
            arrayFinal.push(right[j]);
            await goUp(nodeR.children[j], target.children[z++]);
            j++;
        }
    }

    while (i < left.length) {
        arrayFinal.push(left[i]);
        await goUp(nodeL.children[i], target.children[z++]);
        i++;
    }

    while (j < right.length) {
        arrayFinal.push(right[j]);
        await goUp(nodeR.children[j], target.children[z++]);
        j++;
    }

    return arrayFinal;
}

async function goUp(node, target) {

    const dx = target.getBoundingClientRect().x - node.getBoundingClientRect().x;
    const dy = target.getBoundingClientRect().y - node.getBoundingClientRect().y;
    node.style.transition = 'transform 1s';
    node.style.transform = `translate(${dx}px, ${dy}px)`;

    await wait(1000);
    target.innerText = node.innerText;
    target.style.backgroundColor = "blue";
    node.style.opacity = "0";


}
