const form = document.getElementById('applicationForm');
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwPMO78TBpufWEfrmdyTbMtHGakAUbo1U-cFtts-29W0kYeBfdc8zCXnBAfTL9ciuJxcw/exec'; // You'll need to replace this with your actual Google Script URL

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        work: formData.get('work'),
        curiosity: formData.get('curiosity'),
        contact: formData.get('contact'),
        timestamp: new Date().toISOString()
    };

    // Disable submit button and show loading state
    const submitButton = form.querySelector('.submit-btn');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Show success message
        form.innerHTML = `
            <div class="success-message">
                <h3>Thank you for your interest!</h3>
                <p>We'll be in touch soon.</p>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        alert('There was an error submitting your application. Please try again.');
    });
}); 