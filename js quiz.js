let quiz = {
    currentQuestion: 0,
    questions: 5,
    timeLeft: 600,
    answers: new Array(5).fill(null),
    timer: null,

    init() {
        this.setupEventListeners();
        this.startTimer();
    },

    setupEventListeners() {
        let prevBtn = document.getElementById('prevBtn');
        let nextBtn = document.getElementById('nextBtn');
        let submitBtn = document.getElementById('submitBtn');

        prevBtn.addEventListener('click', () => this.navigate(-1));
        nextBtn.addEventListener('click', () => this.navigate(1));
        submitBtn.addEventListener('click', () => this.submitQuiz());

        // Setup radio button listeners
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.answers[this.currentQuestion] = e.target.value;
            });
        });
    },

    navigate(direction) {
        this.currentQuestion += direction;
        this.updateUI();
    },

    updateUI() {
        // Update question visibility
        document.querySelectorAll('.question').forEach((q, index) => {
            q.classList.toggle('hidden', index !== this.currentQuestion);
        });

        // Update progress bar
        let progress = ((this.currentQuestion + 1) / this.questions) * 100;
        document.querySelector('.progress').style.width = `${progress}%`;
        document.querySelector('.question-count').textContent = 
            `Question ${this.currentQuestion + 1}/${this.questions}`;

        // Update navigation buttons
        document.getElementById('prevBtn').disabled = this.currentQuestion === 0;
        document.getElementById('nextBtn').classList.toggle('hidden', 
            this.currentQuestion === this.questions - 1);
        document.getElementById('submitBtn').classList.toggle('hidden', 
            this.currentQuestion !== this.questions - 1);

        // Restore any previously selected answer
        let selectedAnswer = this.answers[this.currentQuestion];
        if (selectedAnswer !== null) {
            document.querySelector(`input[name="q${this.currentQuestion + 1}"][value="${selectedAnswer}"]`).checked = true;
        }
    },

    startTimer() {
        let timerDisplay = document.getElementById('time');
        this.timer = setInterval(() => {
            this.timeLeft--;
            let minutes = Math.floor(this.timeLeft / 60);
            let seconds = this.timeLeft % 60;
            timerDisplay.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.submitQuiz();
            }
        }, 1000);
    },

    submitQuiz() {
        clearInterval(this.timer);
        // Calculate score and redirect to results page
        let score = this.calculateScore();
        localStorage.setItem('quizScore', score);
        window.location.href = 'quiz-results.html';
    },

    calculateScore() {
        let correctAnswers = ['c', 'b', 'b', 'a', 'b'];
        return this.answers.reduce((score, answer, index) => {
            return answer === correctAnswers[index] ? score + 1 : score;
        }, 0);
    }
};

document.addEventListener('DOMContentLoaded', () => quiz.init());