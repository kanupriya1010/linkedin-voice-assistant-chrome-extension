// Check if the LinkedIn header exists before proceeding
let ulHeader = document.querySelector("ul.global-nav__primary-items");
if (ulHeader) {
    createSavedPostsLink();
}

function createSavedPostsLink() {
    let liViewPosts = document.createElement("li");
    liViewPosts.classList.add("global-nav__primary-item");

    let aViewPosts = document.createElement("a");
    aViewPosts.setAttribute("target", "_blank");
    aViewPosts.setAttribute("href", "https://www.linkedin.com/my-items/saved-posts/");
    aViewPosts.classList.add("app-aware-link", "global-nav__primary-link");
    aViewPosts.addEventListener("click", handleViewPostsClick);

    let divOuter = document.createElement("div");
    divOuter.classList.add("ivm-image-view-model", "global-nav__icon-ivm");

    let divInner = document.createElement("div");
    divInner.classList.add("ivm-view-attr__img-wrapper", "display-flex");

    let img = document.createElement("img");
    img.src = chrome.runtime.getURL("images/save.png");
    img.setAttribute("id", "imgSaved");

    divInner.appendChild(img);
    divOuter.appendChild(divInner);
    aViewPosts.appendChild(divOuter);

    let spanViewPosts = document.createElement("span");
    spanViewPosts.classList.add("t-12", "break-words", "block", "t-black--light", "t-normalglobal-nav__primary-link-text");
    spanViewPosts.innerHTML = "Saved";

    aViewPosts.appendChild(spanViewPosts);
    liViewPosts.appendChild(aViewPosts);
    ulHeader.appendChild(liViewPosts);

    // Add keyboard shortcut listener
    document.addEventListener("keydown", handleKbdShortcut);
}

function handleViewPostsClick(event) {
    // Handle click event
    window.open("https://www.linkedin.com/my-items/saved-posts/", "_blank");
}

function handleKbdShortcut(event) {
    if (event.shiftKey && event.altKey && event.code === "KeyO") {
        event.preventDefault();
        let viewPostsLink = document.querySelector("a[href='https://www.linkedin.com/my-items/saved-posts/']");
        if (viewPostsLink) {
            viewPostsLink.click();
        }
    }
}

// Speech recognition
let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.lang = "en-us";
speechRecognition.start();

speechRecognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    if (transcript.includes("open post")) {
        let viewPostsLink = document.querySelector("a[href='https://www.linkedin.com/my-items/saved-posts/']");
        if (viewPostsLink) {
            viewPostsLink.click();
        }
    }
};


