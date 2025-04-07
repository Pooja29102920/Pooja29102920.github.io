document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("course1").style.display = "block";
});

// Function to switch course sections
function showSection(sectionId) {
    let sections = document.querySelectorAll(".content-section");
    sections.forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}

// Function to move to the next section
function nextSection(sectionId) {
    showSection(sectionId);
}

// Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Quiz function
function checkQuiz() {
    let answer = document.getElementById("quizAnswer").value.toLowerCase();
    let result = document.getElementById("quizResult");
    if (answer === "enterprise applications") {
        result.innerHTML = "✅ Correct! You can now download your certificate.";
        document.getElementById("certificateBtn").style.display = "block";
    } else {
        result.innerHTML = "❌ Incorrect. Try again!";
    }
}

// Certificate generation
function generateCertificate() {
    let name = prompt("Enter your name for the certificate:");
    if (name) {
        document.getElementById("studentName").innerText = name;
        downloadCertificate();
    }
}

function downloadCertificate() {
    let certificate = document.getElementById("certificateContent");
    html2canvas(certificate).then(canvas => {
        let imgData = canvas.toDataURL("image/png");
        let pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 180, 80);
        pdf.save("Certificate.pdf");
    });
}
