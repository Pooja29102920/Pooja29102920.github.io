document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('#menu-btn');
    const navItems = document.querySelector('.nav-items');

    menuBtn.addEventListener('click', function() {
        navItems.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navItems.classList.remove('active');
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navItems.classList.remove('active');
        }
    });
});

let authModal = document.getElementById('authModal');
let loginForm = document.getElementById('login-form');
let registerForm = document.getElementById('register-form');
let tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let tab = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (tab === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        } else {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        }
    });
});

// Course Progress
let enrollBtns = document.querySelectorAll('.enroll-btn');
enrollBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!isLoggedIn()) {
            authModal.style.display = 'block';
            return;
        }
        
        let card = btn.closest('.course-card');
        let progress = card.querySelector('.progress');
        progress.style.width = '0%';
        
        // Simulate progress
        let width = 0;
        let interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                return;
            }
            width++;
            progress.style.width = width + '%';
        }, 100);
    });
});

// Quiz System
class Quiz {
    letructor(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 600; 
    }

    startTimer() {
        let timerDisplay = document.getElementById('time');
        this.timer = setInterval(() => {
            this.timeLeft--;
            let minutes = Math.floor(this.timeLeft / 60);
            let seconds = this.timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.showResults();
            }
        }, 1000);
    }

    displayQuestion() {
        let questionEl = document.getElementById('question');
        let choicesEl = document.getElementById('choices');
        let current = this.questions[this.currentQuestion];

        questionEl.textContent = `Question ${this.currentQuestion + 1}: ${current.question}`;
        choicesEl.innerHTML = '';

        current.choices.forEach(choice => {
            let button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choice-btn');
            button.addEventListener('click', () => this.selectAnswer(choice));
            choicesEl.appendChild(button);
        });
    }

    selectAnswer(choice) {
        let buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(btn => {
            btn.classList.remove('selected');
            if (btn.textContent === choice) {
                btn.classList.add('selected');
            }
        });
    }

    showResults() {
        clearInterval(this.timer);
        let percentage = (this.score / this.questions.length) * 100;
        
        if (percentage >= 70) {
            this.generateCertificate();
        }
        
        // Show results modal
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Quiz Results</h2>
                <p>Score: ${this.score}/${this.questions.length}</p>
                <p>Percentage: ${percentage}%</p>
                ${percentage >= 70 ? '<p>Congratulations! You can now download your certificate.</p>' : ''}
                <button onclick="location.reload()">Try Again</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    generateCertificate() {
        let certificateData = {
            studentName: "Student Name", // Get from user profile
            courseName: "Course Name",
            completionDate: new Date().toLocaleDateString(),
            score: this.score
        };

        // Generate PDF using jsPDF
        let doc = new jsPDF();
        
        // Add certificate design
        doc.setFontSize(30);
        doc.text("Certificate of Completion", 105, 30, { align: "center" });
        
        doc.setFontSize(15);
        doc.text(`This is to certify that`, 105, 60, { align: "center" });
        
        doc.setFontSize(25);
        doc.text(certificateData.studentName, 105, 80, { align: "center" });
        
        doc.setFontSize(15);
        doc.text(`has successfully completed the course`, 105, 100, { align: "center" });
        
        doc.setFontSize(20);
        doc.text(certificateData.courseName, 105, 120, { align: "center" });
        
        doc.setFontSize(12);
        doc.text(`Completion Date: ${certificateData.completionDate}`, 105, 140, { align: "center" });
        doc.text(`Score: ${certificateData.score}/${this.questions.length}`, 105, 150, { align: "center" });
        
        // Add signature line
        doc.line(70, 180, 140, 180);
        doc.text("Instructor Signature", 105, 190, { align: "center" });
        
        doc.save("certificate.pdf");
    }
}


// Dark Mode Toggle
let darkModeToggle = document.getElementById('darkModeToggle');
let body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    darkModeToggle.innerHTML = body.dataset.theme === 'dark' ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Helper functions
function isLoggedIn() {
    // Implement actual authentication check
    return false;
}

