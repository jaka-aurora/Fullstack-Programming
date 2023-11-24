async function fetchTalot() {
    try {
        let response = await fetch('talot.json');
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function renderTalot() {
    const talot = await fetchTalot();
    const talotDiv = document.getElementById("talot");
    talotDiv.innerHTML = "";

    const sizeCheck = document.getElementById("sizeCheck").checked;
    const priceCheck = document.getElementById("priceCheck").checked;

    let filteredTalot = talot;
    if (sizeCheck) {
        filteredTalot = filteredTalot.filter(house => house.size < 200);
    }
    if (priceCheck) {
        filteredTalot = filteredTalot.filter(house => house.price < 1000000);
    }

    filteredTalot.forEach(talo => {
        let taloContainer = document.createElement("div");
        taloContainer.classList.add("taloContainer");

        let taloImage = document.createElement("img");
        taloImage.src = talo.image;
        taloImage.classList.add("taloImage");

        let taloInfo = document.createElement("div");

        let address = document.createElement('p');
        address.classList.add('header');
        address.textContent = `Address: ${talo.address}`;

        let size = document.createElement("p");
        size.textContent = `Size: ${talo.size} sqm.`;

        let text = document.createElement('p');
        text.classList.add('text');
        text.textContent = talo.text;
        
        let price = document.createElement('p');
        price.textContent = `Price: ${talo.price} €`;

        taloInfo.appendChild(address);
        taloInfo.appendChild(size);
        taloInfo.appendChild(text);
        taloInfo.appendChild(price);

        taloContainer.appendChild(taloImage);
        taloContainer.appendChild(taloInfo);

        talotDiv.appendChild(taloContainer);
    });
}
renderTalot()