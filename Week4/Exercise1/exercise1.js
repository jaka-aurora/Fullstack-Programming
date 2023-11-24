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
    let talot = await fetchTalot();
    let reList = document.getElementById("reList");
    
    talot.forEach(talo => {
        let taloContainer = document.createElement("div");
        taloContainer.classList.add("taloContainer");

        let taloImage = document.createElement("img");
        taloImage.src = talo.image;
        taloImage.alt = talo.address;
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

        reList.appendChild(taloContainer);
    });
}
renderTalot()