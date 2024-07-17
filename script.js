$(document).ready(function () {
    function generate() {
        let dictionary = "";
        if ($("#lowercaseCb").is(":checked")) {
            dictionary += "qwertyuiopasdfghjklzxcvbnm";
        }
        if ($("#uppercaseCb").is(":checked")) {
            dictionary += "QWERTYUIOPASDFGHJKLZXCVBNM";
        }
        if ($("#digitsCb").is(":checked")) {
            dictionary += "1234567890";
        }
        if ($("#specialsCb").is(":checked")) {
            dictionary += "!@#$%^&*()_+-={}[];<>:";
        }
        const length = $('input[type="range"]').val();

        if (length < 1 || dictionary.length === 0) {
            return;
        }

        let password = "";
        for (let i = 0; i < length; i++) {
            const pos = Math.floor(Math.random() * dictionary.length);
            password += dictionary[pos];
        }

        $('div.password input[type="text"]').val(password);
    }

    $('input[type="checkbox"], .generate').on("click", generate);

    $('input[type="range"]').on("input", function () {
        $("div.range span").text($(this).val());
        generate();
    });

    $("div.password button").on("click", function () {
        const pass = $('div.password input[type="text"]').val();
        navigator.clipboard.writeText(pass).then(() => {
            $(this).text("copied!");
            setTimeout(() => {
                $(this).text("copy");
            }, 1000);
        });
    });

    function logout() {
        localStorage.removeItem('token'); // Clear token from localStorage
        window.location.href = 'login.html'; // Redirect to login page
    }

    // Ensure the initial password is generated on page load
    generate();
});
