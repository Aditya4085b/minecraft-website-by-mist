// GET SELECTED SERVER

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

const serverTitle = document.getElementById("serverTitle");
const serverDescription = document.getElementById("serverDescription");
const shopHero = document.getElementById("shopHero");

// SURVIVAL PAGE
if (mode === "survival") {
    serverTitle.textContent = "🌲 SURVIVAL SMP STORE";
    serverDescription.textContent =
        "Explore beautiful worlds, build your kingdom and survive with friends!";
    shopHero.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.75)), url('https://images8.alphacoders.com/118/thumb-1920-1180524.jpg')";
}

// LIFESTEAL PAGE
else if (mode === "lifesteal") {
    serverTitle.textContent = "❤️ LIFESTEAL SMP STORE";
    serverDescription.textContent =
        "Fight players, steal hearts and become the strongest warrior!";
    shopHero.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.75)), url('https://wallpaperbat.com/img/70213278-red-minecraft-wallpaper.png')";
}

// DEFAULT PAGE
else {
    serverTitle.textContent = "⛏ MINECRAFT SMP STORE";
    serverDescription.textContent =
        "Choose your favourite server and explore exclusive rewards!";
    shopHero.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://images4.alphacoders.com/136/thumb-1920-1368460.png')";
}


// BUY ITEM

function buyItem(item, price) {

    alert(
        "Item: " + item +
        "\nPrice: ₹" + price +
        "\nServer: " + mode +
        "\n\nPayment system coming soon!"
    );

}

let selectedItem = null;
let selectedPrice = 0;

function buyItem(name, price) {
    selectedItem = name;
    selectedPrice = price;

    document.getElementById('modalItemTitle').innerText = `Buying: ${name}`;
    document.getElementById('modalItemPrice').innerText = `Amount: ₹${price}`;
    document.getElementById('statusMessage').innerText = '';
    document.getElementById('checkoutModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}

async function initiatePhonePePayment() {
    const username = document.getElementById('mcUsername').value.trim();
    const status = document.getElementById('statusMessage');

    if (!username) {
        alert("Please enter your Minecraft username!");
        return;
    }

    status.innerText = "Initiating payment...";

    try {
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                item: selectedItem,
                amount: selectedPrice,
                username: username
            })
        });

        const data = await response.json();

        if (data.redirectUrl) {
            // Option A: Redirect to PhonePe Standard Checkout Page
            window.location.href = data.redirectUrl;
        } else if (data.orderId) {
            // Option B: If QR is shown, start polling backend for status
            status.innerText = "Waiting for payment confirmation...";
            checkPaymentStatus(data.orderId, username);
        }
    } catch (err) {
        status.innerText = "Error initiating payment. Try again.";
    }
}

async function checkPaymentStatus(orderId, username) {
    const status = document.getElementById('statusMessage');
    const interval = setInterval(async () => {
        try {
            const res = await fetch(`/api/check-status?orderId=${orderId}&username=${encodeURIComponent(username)}`);
            const result = await res.json();

            if (result.status === 'COMPLETED') {
                clearInterval(interval);
                status.innerText = " Payment verified! Rank applied in-game.";
            } else if (result.status === 'FAILED') {
                clearInterval(interval);
                status.innerText = "❌ Payment failed or cancelled.";
            }
        } catch (e) {
            console.error("Polling check failed", e);
        }
    }, 3000);
}
let currentItem = "";
let currentPrice = 0;

// This function is triggered when a user clicks a "BUY NOW" button
function buyItem(name, price) {
    currentItem = name;
    currentPrice = price;

    // Update the text inside the popup
    document.getElementById("popupItemName").innerText = name;
    document.getElementById("popupItemPrice").innerText = `₹${price}`;
    
    // Clear old messages and inputs
    document.getElementById("popupMessage").innerText = ""; 
    document.getElementById("mcUsername").value = ""; 
    
    // Display the popup
    document.getElementById("purchasePopup").style.display = "flex";
}

// Closes the popup when the 'X' is clicked
function closePopup() {
    document.getElementById("purchasePopup").style.display = "none";
}

// Triggered when the "Proceed to Pay" button is clicked
function processPayment() {
    const username = document.getElementById("mcUsername").value.trim();
    const messageEl = document.getElementById("popupMessage");

    if (!username) {
        messageEl.style.color = "#ff4757"; // Red text for error
        messageEl.innerText = "Please enter your Minecraft username!";
        return;
    }

    messageEl.style.color = "#2ed573"; // Green text for success
    messageEl.innerText = "Redirecting to payment gateway...";
    
    // NEXT STEP: Send `username`, `currentItem`, and `currentPrice` to your backend server here.
}