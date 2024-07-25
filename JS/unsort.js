const containerUnsorted = document.getElementById("container");
const unsortButton = document.getElementById("unsort");
unsortButton.addEventListener("click", () => {
    if (isSorting) {
        alert("Wait for it to be organized first before unsorting it")
        return;
    }
    unsort(containerUnsorted);
})

function unsort(node) {


    for (var i = 0; i < node.children.length; i++) {

        var random = Math.floor(Math.random() * 10) + 1;

        node.children[i].innerText = random;

    }
}