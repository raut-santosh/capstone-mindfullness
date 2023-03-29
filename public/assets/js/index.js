const form = document.getElementById('contact-form');
function sendEmail(e) {
    e.preventDefault();
        const name = document.getElementById('contact-name'),
        email = document.getElementById('contact-email'),
        msg = document.getElementById('contact-message'),
        phone = document.getElementById('contact-phone')

        var templateParams = {
            name: name.value,
            notes: 'Check this out!',
            message: msg.value,
            phone: phone.value,
            email: email.value
        };
         
        emailjs.send('service_uwb9epo', 'template_lhhw60s', templateParams)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
               console.log('FAILED...', error);
            });
}

form.addEventListener('submit',sendEmail)


