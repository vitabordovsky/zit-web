// 1. Odečet času do Vánoc (na úvodní stránce)
const odpocetElement = document.querySelector("#odpocet");

function aktualizujOdpocet() {
    if (!odpocetElement) {
        return;
    }

    const nyni = new Date();
    let rok = nyni.getFullYear();
    let vanoce = new Date(rok, 11, 24, 0, 0, 0); // 11 = prosinec (měsíce jsou 0–11)

    if (nyni > vanoce) {
        vanoce = new Date(rok + 1, 11, 24, 0, 0, 0);
    }

    const rozdilMs = vanoce - nyni;
    const dny = Math.floor(rozdilMs / (1000 * 60 * 60 * 24));
    const hodiny = Math.floor((rozdilMs / (1000 * 60 * 60)) % 24);
    const minuty = Math.floor((rozdilMs / (1000 * 60)) % 60);
    const sekundy = Math.floor((rozdilMs / 1000) % 60);

    odpocetElement.textContent = `${dny} dní, ${hodiny} hod, ${minuty} min, ${sekundy} s`;
}

if (odpocetElement) {
    aktualizujOdpocet();
    setInterval(aktualizujOdpocet, 1000);
}

// 2. Validace kontaktního formuláře (na stránce Kontakt)
const formular = document.querySelector("#kontakt-form");

if (formular) {
    formular.addEventListener("submit", (event) => {
        event.preventDefault();

        const jmeno = document.querySelector("#jmeno").value.trim();
        const email = document.querySelector("#email").value.trim();
        const zprava = document.querySelector("#zprava").value.trim();
        const vystup = document.querySelector("#form-zprava");

        if (jmeno === "" || email === "" || !email.includes("@")) {
            vystup.textContent = "Chyba: Vyplňte prosím platné jméno a e-mail s @.";
            vystup.className = "stav-chyba";
            return;
        }

        if (zprava.length < 10) {
            vystup.textContent = "Chyba: Zpráva musí mít alespoň 10 znaků.";
            vystup.className = "stav-chyba";
            return;
        }

        vystup.textContent = `Děkujeme, ${jmeno}! Vaše zpráva byla úspěšně zkontrolována a odeslána.`;
        vystup.className = "stav-uspech";
        formular.reset();
    });
}

