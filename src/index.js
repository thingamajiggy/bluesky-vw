import "./style.scss"
import { Carousel, Modal } from 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
    new Carousel('#vw-header-carousel');

    const navbar = document.getElementById('vw-navbar')
    const registerModal = Modal.getOrCreateInstance(document.getElementById('vw-register-interest'), {
        backdrop: true,
    })

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 0) {
                navbar.classList.add('bg-light', 'shadow', 'border-bottom', 'border-primary', 'border-2');
            } else {
                navbar.classList.remove('bg-light', 'shadow', 'border-bottom', 'border-primary', 'border-2');
            }
        })
    })

    document.querySelectorAll('.vw-open-register-modal').forEach((registerModalButton) => {
        registerModalButton.addEventListener('click', () => {
            registerModal.toggle()
        })
    })

    document.getElementById('vw-submit-register').addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        let hasInvalidInput = false;
        const firstNameInput = document.getElementById('vw-first-name');
        const lastNameInput = document.getElementById('vw-last-name');
        const emailInput = document.getElementById('vw-email');
        const termsInput = document.getElementById('vw-terms-check');

        if (!firstNameInput.value) {
            firstNameInput.classList.add('is-invalid');
            hasInvalidInput = true;
        } else {
            firstNameInput.classList.remove('is-invalid');
        }

        if (!lastNameInput.value) {
            lastNameInput.classList.add('is-invalid');
            hasInvalidInput = true;
        } else {
            lastNameInput.classList.remove('is-invalid');
        }

        if (!emailInput.value) {
            emailInput.classList.add('is-invalid');
            hasInvalidInput = true;
        } else {
            emailInput.classList.remove('is-invalid');
        }

        if (!termsInput.checked) {
            termsInput.classList.add('is-invalid');
            hasInvalidInput = true;
        } else {
            termsInput.classList.remove('is-invalid');
        }

        if (hasInvalidInput) {
            return;
        }

        ev.target.innerHTML = `
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
        `;

        ev.target.setAttribute('disabled', 'disabled');

        // Simulate fetch request and response delay
        setTimeout(() => {
            registerModal.hide();

            const alert = document.createElement('div');

            alert.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show', 'm-0', 'vw-register-alert');
            alert.setAttribute('role', 'alert');
            alert.innerHTML = `
                <strong>Thank you!</strong> An agent will contact you shortly.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

            document.documentElement.append(alert);

            ev.target.innerHTML = 'Register';
            ev.target.removeAttribute('disabled');

            firstNameInput.value = '';
            lastNameInput.value = '';
            emailInput.value = '';
            termsInput.checked = false;
        }, 2000)
    })
})

