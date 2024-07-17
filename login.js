$("#signup").click(function () {
  $("#first").fadeOut("fast", function () {
    $("#second").fadeIn("fast");
  });
});

$("#signin").click(function () {
  $("#second").fadeOut("fast", function () {
    $("#first").fadeIn("fast");
  });
});



$(function () {
  $("form[name='login']").validate({
    rules: {

      email: {
        required: true,
        email: true
      },
      password: {
        required: true,

      }
    },
    messages: {
      email: "Please enter a valid email address",

      password: {
        required: "Please enter password",

      }

    },
    submitHandler: function (form) {
      const loginData = serializeForm(form);
      axios.post('http://localhost:3000/auth/login', loginData)
        .then(response => {
          const token = response.data.token;
          const userDetails =response.data.user;
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          localStorage.setItem('token', token); // Store the token
          window.location.href = 'generate-password.html';
        })
        .catch(error => {
          alert('Error logging in: ' + error.response.data.message);
        });
    }
  });
});



$(function () {

  $("form[name='registration']").validate({
    rules: {
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      }
    },

    messages: {
      firstname: "Please enter your firstname",
      lastname: "Please enter your lastname",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      email: "Please enter a valid email address"
    },

    submitHandler: function (form) {
      const userData = serializeForm(form);
      axios.post('http://localhost:3000/auth/register', userData)
        .then(response => {
          Toastify({
            text: "Registration successful please login",
            duration: 3000,  // Optional duration in milliseconds
            gravity: "top",  // Optional toast 
            backgroundColor: "green",  // Custom background color for success
            className: "toastify-success"
          }).showToast();
          setTimeout(function() {
            location.reload(); // Reload the page after a delay
          }, 2000);
        })
        .catch(error => {
          Toastify({
            text: 'Error registering user: ' + error.response.data.message,
            duration: 3000,  // Optional duration in milliseconds
            gravity: "top",  // Optional toast position
            backgroundColor: "red",  // Custom background color for success
            className: "toastify-error",
          }).showToast();
        });
    }
  });
});



function serializeForm(form) {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
}






