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

    document.getElementById('vw-open-register-modal').addEventListener('click', () => {
        registerModal.toggle()
    })

    document.getElementById('vw-submit-register').addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        ev.target.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Loading...</span>
    `;

        ev.target.setAttribute('disabled', 'disabled')

        setTimeout(() => {
            registerModal.hide()

            const alert = document.createElement('div')

            alert.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show', 'm-0', 'vw-register-alert')
            alert.setAttribute('role', 'alert')
            alert.innerHTML = `
                <strong>Thank you!</strong> An agent will contact you shortly.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `

            document.documentElement.append(alert)
        }, 2000)
    })
})

