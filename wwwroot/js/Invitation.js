const weddingDate = new Date("2027-01-03T11:00:00");

function updateCountdown() {

    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";

        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (diff / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (diff / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (diff / 1000) % 60
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();

setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.2
    }
);

document
    .querySelectorAll(".animate-section")
    .forEach((section) => {
        observer.observe(section);
    });


    function openModal(id) {

        const modal = document.getElementById(id);
    
        const isVisible =
            modal.style.display === "block";
    
        closeAllModals();
    
        if (!isVisible) {
    
            document.getElementById("overlay")
                .style.display = "block";
    
            modal.style.display = "block";
        }
    }
    
    function closeAllModals() {
    
        document.getElementById("overlay")
            .style.display = "none";
    
        document
            .querySelectorAll(".popup-card")
            .forEach(card => {
    
                card.style.display = "none";
    
            });
    }

    window.addEventListener("load", () => {
        const shouldPlay =
            sessionStorage.getItem("playMusic");
            if (shouldPlay === "true") {
                const music =
                document.getElementById("bgMusic");
            if (music) {
                music.play().catch(() => {
                console.log("Autoplay blocked by browser.");});
            }
        sessionStorage.removeItem("playMusic");
        }
    });

    function addWish() {

        const name =
            document.getElementById("wishName").value;
    
        const message =
            document.getElementById("wishMessage").value;
    
        if (!name || !message) {
    
            alert("Sila isi nama dan ucapan.");
            return;
        }
    
        const wishes =
            JSON.parse(localStorage.getItem("wishes")) || [];
    
        wishes.unshift({
            name,
            message
        });
    
        localStorage.setItem(
            "wishes",
            JSON.stringify(wishes)
        );
    
        renderWishes();
    
        document.getElementById("wishName").value = "";
        document.getElementById("wishMessage").value = "";
    }


    function renderWishes() {

        const container =
            document.getElementById("wishContainer");
    
        container.innerHTML = "";
    
        const wishes =
            JSON.parse(localStorage.getItem("wishes")) || [];
    
        wishes.forEach(wish => {
    
            container.innerHTML += `
    
                <div class="wish-card">
    
                    <div class="wish-name">
                        ${wish.name}
                    </div>
    
                    <div class="wish-message">
                        ${wish.message}
                    </div>
    
                </div>
    
            `;
        });
    }