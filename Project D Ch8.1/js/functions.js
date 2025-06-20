function calculateTotal(quantity, price){
    return quantity*price;
}

function outputCartRow(item, total){
    let cartRow = document.createElement("tr");
    let imageData = document.createElement("td");
    let image = document.createElement("img");
    let descData = document.createElement("td");
    let quantityData = document.createElement("td");
    let priceData = document.createElement("td");
    let rowTotalData = document.createElement("td");

    image.src = `images/${item.product.filename}`;
    imageData.appendChild(image);
    descData.appendChild(document.createTextNode(item.product.title));
    quantityData.appendChild(document.createTextNode(item.quantity));
    priceData.appendChild(document.createTextNode(`$${item.product.price}`));
    rowTotalData.appendChild(document.createTextNode(`$${total}`))

    cartRow.appendChild(imageData);
    cartRow.appendChild(descData);
    cartRow.appendChild(quantityData);
    cartRow.appendChild(priceData);
    cartRow.appendChild(rowTotalData);

    return cartRow;
}

function outputTotalsRow(total, type){
    let totalRow = document.createElement("tr");
    let title = document.createElement("td");
    let price = document.createElement("td");

    title.appendChild(document.createTextNode(type));
    title.colSpan = 4;
    price.appendChild(document.createTextNode(`$${total}`));

    if(type=="Grand Total"){
        price.classList.add("focus");
    }

    totalRow.appendChild(title);
    totalRow.appendChild(price);
    totalRow.classList.add("totals");

    return totalRow;

}
