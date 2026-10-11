console.log("JS LOADED");

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

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl)
        return;

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

    if (
        document.getElementById("days") &&
        document.getElementById("hours") &&
        document.getElementById("minutes") &&
        document.getElementById("seconds")
    ) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

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

    async function addWish() {

        const name =
            document.getElementById("wishName")
                .value
                .trim();

        const message =
            document.getElementById("wishMessage")
                .value
                .trim();

        if (!name || !message) {

            alert(
                "Sila isi nama dan ucapan terlebih dahulu."
            );

            return;
        }

        const response = await fetch(

            `${SUPABASE_URL}/rest/v1/wishes`,

            {
                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    apikey: SUPABASE_KEY,

                    Authorization:
                        `Bearer ${SUPABASE_KEY}`

                },

                body: JSON.stringify({

                    name: name,

                    message: message

                })

            }
        );

        if (response.ok) {

            document.getElementById(
                "wishName"
            ).value = "";

            document.getElementById(
                "wishMessage"
            ).value = "";

            alert(
                "Terima kasih atas ucapan anda 🤍"
            );

            wishesSection.style.display = "none";

            wishesBtn.style.display = "inline-block";

            loadWishes();

        } else {

            alert(
                "Gagal menghantar ucapan."
            );

            const errorText =
                await response.text();

            console.log(errorText);

            alert(errorText);

        }

    }

    const openInvitation =
    document.getElementById("openInvitation");

    const coverScreen =
        document.getElementById("coverScreen");

    const invitationContent =
        document.getElementById("invitationContent");

    const music =
        document.getElementById("bgMusic");

    if (
        openInvitation &&
        coverScreen &&
        invitationContent &&
        music
    ) {

        openInvitation.addEventListener("click", async () => {

            try {

                await music.play();

            } catch (err) {

                console.log(err);

            }

            coverScreen.style.display = "none";

            invitationContent.style.display = "block";

        });

    }

    const wishesBtn =
    document.getElementById("wishesBtn");

    const wishesSection =
        document.getElementById("wishesSection");

    if (wishesBtn && wishesSection) {

        wishesBtn.addEventListener("click", () => {

            if (wishesSection.style.display === "none") {

                wishesSection.style.display = "block";

                wishesBtn.style.display = "none";

                wishesSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    }

    const closeWishes =
        document.getElementById("closeWishes");

    if (closeWishes && wishesSection) {

        closeWishes.addEventListener("click", () => {

            wishesSection.style.display = "none";

            wishesBtn.style.display = "inline-block";

        });

    }

    const SUPABASE_URL =
        "https://yunbkroxaorimdnqdenb.supabase.co";

    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bmJrcm94YW9yaW1kbnFkZW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3MTEyNDUsImV4cCI6MjEwNzI4NzI0NX0.-CdoFCIbxzuK-aO9pYspS24YygkjEK87mfwSaBm9V5g";
    
    async function loadWishes() {
        const response = await fetch(

            `${SUPABASE_URL}/rest/v1/wishes?select=*&order=created_at.desc`,

            {
                headers: {

                    apikey: SUPABASE_KEY,

                    Authorization:
                        `Bearer ${SUPABASE_KEY}`

                }
            }
        );

        const wishes = await response.json();

        const container =
            document.getElementById(
                "wishesCarouselContainer"
            );

        if (!container) return;

        container.innerHTML = `
            <div id="wishesCarousel"
                class="carousel slide">

                <div class="carousel-inner">

                    ${wishes.map((wish, index) => `

                        <div class="carousel-item ${index === 0 ? "active" : ""}">

                            <div class="glass-card text-center">

                                <h5 class="carousel-wish-name">

                                    ${wish.name}

                                </h5>

                                <p class="carousel-wish-message">

                                    ${wish.message}

                                </p>

                            </div>

                        </div>

                    `).join("")}

                </div>

                <button class="carousel-control-prev"
                        type="button"
                        data-bs-target="#wishesCarousel"
                        data-bs-slide="prev">

                    <span class="carousel-control-prev-icon"></span>

                </button>

                <button class="carousel-control-next"
                        type="button"
                        data-bs-target="#wishesCarousel"
                        data-bs-slide="next">

                    <span class="carousel-control-next-icon"></span>

                </button>

            </div>
        `;
            const carouselElement =
            document.querySelector("#wishesCarousel");

        if (carouselElement) {

            new bootstrap.Carousel(
                carouselElement,
                {
                    interval: 3000,
                    ride: "carousel",
                    pause: false,
                    wrap: true
                }
            );

        }

    }
    loadWishes();
    console.log("JS FINISHED");