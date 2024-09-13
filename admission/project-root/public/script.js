document.getElementById('admissionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        tenthMarks: document.getElementById('tenthMarks').value,
        twelfthMarks: document.getElementById('twelfthMarks').value,
        fatherName: document.getElementById('fatherName').value,
        dob: document.getElementById('dob').value,
        aadhaar: document.getElementById('aadhaar').value
    };

    const response = await fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        document.getElementById('successMessage').classList.remove('hidden');
        document.getElementById('admissionForm').reset();
    } else {
        alert('Error submitting form.');
    }
});
