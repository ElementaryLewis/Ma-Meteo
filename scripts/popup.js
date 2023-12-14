
let afficherPopup = document.getElementById("afficherPopup")
let overlay = document.getElementById("overlay")
let fermerPopup = document.getElementById("fermerPopup")
let input = document.getElementById("inputAgrandi")
let overlayFavoris = document.getElementById("overlayFavoris")
let popup_container = document.getElementById("popup_container")



//ouverture du popup au click sur "pour rechercher une ville,cliqué ici"
afficherPopup.addEventListener("click", () => {

    //permutation en visuel de "none" à "block"
    overlay.style.display = "block";

    //curseur sur l'input
    input.focus();
})

//fermeture du popup au clic sur bouton fermer
fermerPopup.addEventListener("click", () => {
    hideOverlay();
})

function hideOverlay() {
    overlay.style.display = "none";
    overlayFavoris.style.display = "none"
    popup_container.style.visibility = "visible"
}


export { hideOverlay }