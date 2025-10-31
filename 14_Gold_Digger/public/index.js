const evenSource = new EventSource('/live-price');
const investmentForm = document.getElementById('invest-form');
const dialog = document.getElementById('output-dialog');
const investmentSummary = document.getElementById('investment-summary');
const closeDialogBtn = document.getElementById('close-dialog-btn');
const priceDisplay = document.getElementById('price-display');

let summary = {}

evenSource.onmessage = function(event) {
    const connectionStatus = document.getElementById('connection-status');
    connectionStatus.textContent = 'Live Price 🟢';
    priceDisplay.textContent = parseFloat(event.data).toFixed(2);
}

investmentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const amountInput = document.getElementById('investment-amount');
    const amount = parseFloat(amountInput.value);
    console.log(`User invested: £${amount.toFixed(2)}`);
    const weight = amount/priceDisplay.textContent;
    fetch('/invest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, weight })
    })
    .then(res => res.json())
    .then(data => {
        // Show dialog or confirmation
        investmentSummary.textContent = `You just bought ${weight.toFixed(5)} ounces (ozt) for £${amount.toFixed(2)}. You will receive documentation shortly.`;
        dialog.showModal();
    });
    investmentSummary.textContent = `You just bought ${weight.toFixed(5)} ounces (ozt) for £${amount.toFixed(2)}. You will receive documentation shortly.`;
    summary = { weight: weight.toFixed(5), amount: amount.toFixed(2) };
    dialog.showModal();
    
});

closeDialogBtn.addEventListener('click', () => {
    dialog.close();
});
