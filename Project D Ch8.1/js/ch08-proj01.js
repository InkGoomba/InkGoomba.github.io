document.addEventListener('DOMContentLoaded', function() {
   const tax_rate = prompt('Enter tax rate (0.10)');
   const shipping_threshold = prompt('Enter shipping threshold (1000)');
   const table = document.querySelector("tbody");

   let subtotal = 0;
   let tax = 0;
   let shipping = 0;
   let grandTotal = 0;

   for (const item of cart) {
      let total = calculateTotal(item.quantity, item.product.price);
      subtotal += total;
      table.appendChild(outputCartRow(item, total));
   }

   table.appendChild(outputTotalsRow(subtotal, "Subtotal"));
   tax = subtotal*tax_rate;
   table.appendChild(outputTotalsRow(tax, "Tax"));
   if (cart.length>shipping_threshold){
      shipping = 40;
   }
   table.appendChild(outputTotalsRow(shipping, "Shipping"));
   grandTotal = subtotal + shipping + tax;
   table.appendChild(outputTotalsRow(grandTotal, "Grand Total"));

});