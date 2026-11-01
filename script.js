// SURVIVAL AND LIFESTEAL BUTTONS


function joinServer(mode) {
    window.location.href = "shop.html?mode=" + mode;
}


// DISCORD SERVER

function joinDiscord() {
    window.open(
        "https://discord.gg/6DWbQexFSh",
        "_blank",
        "noopener,noreferrer"
    );
}

function openSurvival() {
    document.body.className = "survival-bg";
}

function openLifesteal() {
    document.body.className = "lifesteal-bg";
}

function goHome() {
    document.body.className = "";
}
