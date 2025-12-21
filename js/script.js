const API_BASE_URL = "https://portfolio-backend-hums.onrender.com";

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = form.elements["name"].value.trim();
        const email = form.elements["email"].value.trim();
        const message = form.elements["message"].value.trim();

        // Frontend validation
        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const submitBtn = form.querySelector("button[type='submit']");
        submitBtn.disabled = true;

        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Message sent successfully!");
                form.reset();
            } else {
                alert(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Unable to send message. Please try again later.");
        } finally {
            submitBtn.disabled = false;
        }
    });
}