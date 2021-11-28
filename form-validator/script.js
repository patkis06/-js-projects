const rules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 6
  },
  email: {
    required: true,
    minLength: 6,
    maxLength: 30,
    isEmail: true
  },
  password: {
    required: true,
    minLength: 3,
    maxLength: 10
  },
  password_confirm: {
    required: true,
    equalTo: password
  }
};

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  validate();
});

document.querySelector('input').addEventListener('keyup', function (e) {
  validate();
});

function validate() {
  for (const element in rules) {
    is_done = false;
    const input = document.getElementById(element);
    const elementRules = rules[element];
    for (const elementRule in elementRules) {
      if (!is_done) {
        const ruleValue = elementRules[elementRule];
        window[elementRule](input, ruleValue);
      }
    }
  }
}

function equalTo(input, ruleValue) {
  if (ruleValue) {
    const password = ruleValue.value;
    const confirm = input.value;
    if (confirm !== password) {
      is_done = true;
      showError(input, `This field is not equal to ${getFieldName(ruleValue)}`);
    } else {
      is_done = false;
      showSuccess(input);
    }
  }
}

function isEmail(input, ruleValue) {
  if (ruleValue) {
    filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(input.value)) {
      is_done = true;
      showError(input, `${getFieldName(input)} is not valid`);
    } else {
      is_done = false;
      showSuccess(input);
    }
  }
}

function required(input, ruleValue) {
  if (ruleValue) {
    if (input.value.trim() === '') {
      is_done = true;
      showError(input, `${getFieldName(input)} is required`);
    } else {
      is_done = false;
      showSuccess(input);
    }
  }
}

function minLength(input, min) {
  const lenght = input.value.length;
  if (lenght < min) {
    is_done = true;
    showError(input, `${getFieldName(input)} must be ${min} characters long.`);
  } else {
    is_done = false;
    showSuccess(input);
  }
}

function maxLength(input, max) {
  const lenght = input.value.length;
  if (lenght > max) {
    is_done = true;
    showError(input, `${getFieldName(input)} must be less than ${max} characters.`);
  } else {
    is_done = false;
    showSuccess(input);
  }
}

const translation = {
  username: 'Username',
  email: 'Email',
  password: 'Password',
  password_confirm: 'Password Confirm'
};

function getFieldName(input) {
  return translation[input.id];
}

function showError(input, message) {
  const form_control = input.parentElement;
  const error_message = form_control.querySelector('small');
  form_control.className = 'form-control error';
  error_message.innerText = message;
}

function showSuccess(input) {
  const form_control = input.parentElement;
  form_control.className = 'form-control success';
}