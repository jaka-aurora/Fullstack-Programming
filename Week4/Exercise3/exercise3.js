let names = [];

async function fetchNames() {
    try {
        let response = await fetch('names.json');
        names = await response.json();
    } catch (error) {
        console.error(error);
    }
}

const nameInput = document.getElementById("nameInput");
const nameList = document.getElementById("nameList");

function filterNames(input) {
    return names.filter(name => name.toLowerCase().startsWith(input.toLowerCase()));
}

function displayNames(filteredNames) {
    nameList.innerHTML = "";

    filteredNames.forEach(name => {
        const listItem = document.createElement("li");
        listItem.textContent = name;
        listItem.addEventListener("click", () => selectName(name));
        nameList.appendChild(listItem);
    });

    if (filteredNames.length > 0) {
        nameList.style.display = "block";
    } else {
        nameList.style.display = "none";
    }
}

function handleArrowKeys(event) {
    const currentSelection = document.querySelector("#nameList li.selected");
    if (currentSelection) {
        currentSelection.classList.remove("selected");
    }

    const listItems = document.querySelectorAll("#nameList li");
    let selectedIndex = Array.from(listItems).indexOf(currentSelection);

    switch (event.key) {
        case "ArrowUp":
            selectedIndex = (selectedIndex - 1 + listItems.length) % listItems.length;
            break;
        case "ArrowDown":
            selectedIndex = (selectedIndex + 1) % listItems.length;
            break;
    }

    listItems[selectedIndex].classList.add("selected");
}
 
nameInput.addEventListener("input", () => {
    const inputValue = nameInput.value.trim();
    if (inputValue === "") {
        nameList.style.display = "none";
    } else {
        const filteredNames = filterNames(inputValue);
        displayNames(filteredNames);
    }
});

nameInput.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        handleArrowKeys(event);
    } else if (event.key === "Backspace" && nameInput.value.trim() === "") {
        nameList.style.display = "none";
    }
});

function selectName(selectedName) {
    nameInput.value = selectedName;
    nameList.style.display = "none";
}
fetchNames()