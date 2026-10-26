(() => {
    'use strict';

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      });
    });
  })();



  document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.tk-faq__item');
    
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        faqItems.forEach(other => { 
          if (other !== item) other.classList.remove('is-open'); 
        });
        
       
        item.classList.toggle('is-open');
      });
    });
  });
