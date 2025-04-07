document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('certificate-modal');
    const certificateImg = document.getElementById('certificate-full');
    const closeBtn = document.querySelector('.close-btn');
    const viewBtns = document.querySelectorAll('.view-btn');
    const downloadBtns = document.querySelectorAll('.download-btn');

    // View certificate
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const certCard = e.target.closest('.certificate-card');
            const certImg = certCard.querySelector('img').src;
            certificateImg.src = certImg;
            modal.classList.remove('hidden');
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Download certificate
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const certCard = e.target.closest('.certificate-card');
            const certTitle = certCard.querySelector('h3').textContent;
            // Implement download functionality
            downloadCertificate(certCard.querySelector('img').src, certTitle);
        });
    });

    function downloadCertificate(imgSrc, title) {
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-certificate.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});