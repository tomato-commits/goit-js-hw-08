import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
let formData = {};
let serializedSavedFormData;
    
try {
    const savedFormData = localStorage.getItem("feedback-form-state");
    serializedSavedFormData = savedFormData === null ? undefined : JSON.parse(savedFormData);
} catch (error) {
    console.error("Get state error: ", error.message);
}

if (serializedSavedFormData) {
    const { email, message } = serializedSavedFormData;

    emailInput.value = email || '';
    messageInput.value = message || '';
    formData = serializedSavedFormData;
}

const onInput = (data) => {
    const name = data.target.name;

    if (name === 'email' || name === 'message') {
        formData = {
            ...formData,
            ...{ [name]: data.target.value },
        };

        localStorage.setItem("feedback-form-state", JSON.stringify(formData));
    }
};

form.addEventListener('input', throttle(onInput, 500));

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(formData);
    localStorage.removeItem("feedback-form-state");
    formData = {};
    emailInput.value = '';
    messageInput.value = '';
});