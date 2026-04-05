// 📞 CONTACT FORM
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");

    const data = {
        name: inputs[0].value,
        email: inputs[1].value,
        message: inputs[2].value
    };

    try {
        const res = await fetch("http://localhost:4000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert("Message sent successfully!");
            form.reset();
        } else {
            alert("Failed to send message");
        }

    } catch (err) {
        alert("Server error");
    }
});