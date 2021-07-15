$(document).ready(function () {
    //
    // TODO: Get the form field elements.
    var nameTextBox = $('#Name');
    var emailTextBox = $('#Email');
    var phoneTextBox = $('#Phone');
    var subjectTextBox = $('#Subject');
    var messageTextArea = $('#Message');
    //
    // TODO: Get all the field validation elements.
    var nameError = $('#name-validation');
    var emailError = $('#email-validation');
    var phoneError = $('#phone-validation');
    var subjectError = $('#subject-validation');
    var messageError = $('#message-validation');
    //
    // TODO: Declare the validation enforcement variable,
    var isValid = false;
    //
    // TODO: Process the form and send a request to the server once validated.
    $("#contact-form").on("submit", function (e) {
        e.preventDefault();
        // TODO: Call the external service.
        var url = "/contact";
        var formData = (window.FormData) ? new FormData(this) : null;
        var fData = (formData !== null) ? formData : $form.serialize();
        //
        $('#submit-btn').attr("disabled", true);
        // TODO: Show the AJAX loader.
        $('#loading').fadeIn();
        //
        // TODO: Ensure that both response messages are hidden.
        $('#success-alert').hide();
        $('#error-alert').hide();
        //
        // TODO: Validate the form.
        validateContactForm();
        //
        // TODO: Send the request to the appropriate URL.
        if (isValid == true) {
            $.ajax({
                type: "POST",
                url: url,
                data: fData,
                processData: false,
                contentType: false,
                success: function (data) {
                    $('#loading').fadeOut();
                    if (data.msg != "Your message has successfully been sent to MSDC Inc (Pty) Ltd.") {
                        $('#success-alert').removeClass("alert-success");
                        $('#success-alert').addClass("alert-danger");
                    }
                    $('#success-alert').html("<p>" + data.msg + "</p>");
                    $('#success-alert').fadeIn();
                    // TODO: Only clear the form when validation has been passed.
                    if (data.msg == "Your message has successfully been sent to MSDC Inc (Pty) Ltd.") {
                        $('#success-alert').removeClass("alert-danger");
                        $('#success-alert').addClass("alert-success");
                        nameTextBox.val("");
                        nameTextBox.removeClass('used', "normal");
                        emailTextBox.val("");
                        emailTextBox.removeClass('used', "normal");
                        subjectTextBox.val("");
                        subjectTextBox.removeClass('used', "normal");
                        phoneTextBox.val("");
                        phoneTextBox.removeClass('used', "normal");
                        messageTextArea.val("");
                        messageTextArea.removeClass('used', "normal");
                    }
                    $('#submit-btn').attr("disabled", false);
                },
                error: function () {
                    $('#error-alert').html("<p>There was an error processing your request.</p>");
                    $('#error-alert').fadeIn();
                    $('#loading').fadeOut();
                }
            });
        }
        $('#loading').fadeOut();
        $('#submit-btn').attr("disabled", false);
    });
    //
    // Validates the name.
    function validateName() {
        try {
            if (/.{2}/.test(nameTextBox.val()) == false) {
                throw "Please enter your name.";
            }
            else if (/([\D])/.test(nameTextBox.val()) == false) {
                throw "A name must contain letters only.";
            } else {
                isValid = true;
                nameError.text("");
                nameError.hide();
            }
        } catch (msg) {
            isValid = false;
            nameError.text(msg);
            nameTextBox.focus();
            nameTextBox.select();
            nameError.show();
        }
    }
    //
    // Validates the email address.
    function validateEmail() {
        var emailSyntax = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
        try {
            if (/.{7}/.test(emailTextBox.val()) == false) {
                throw "The email must contain 7 characters or more.";
            } else if (emailSyntax.test(emailTextBox.val()) == false) {
                throw "Please enter a valid email address.";
            } else {
                isValid = true;
                emailError.text("");
                emailError.hide();
            }
        } catch (msg) {
            isValid = false;
            emailError.text(msg);
            emailTextBox.focus();
            emailTextBox.select();
            emailError.show();
        }
    }
    //
    // Validates the phone number.
    function validatePhone() {
        try {
            if (/.{10}/.test(phoneTextBox.val()) == false) {
                throw "The phone number must contain at least 10 digits.";
            }
            else if (/([\d])/.test(phoneTextBox.val()) == false) {
                throw "The phone number must contain digits only.";
            } else {
                isValid = true;
                phoneError.text("");
                phoneError.hide();
            }
        } catch (msg) {
            isValid = false;
            phoneError.text(msg);
            phoneTextBox.focus();
            phoneTextBox.select();
            phoneError.show();
        }
    }
    //
    // Validates the subject.
    function validateSubject() {
        try {
            if (/.{10}/.test(subjectTextBox.val()) == false) {
                throw "The subject must contain at least 10 characters.";
            } else if (/([\D])/.test(subjectTextBox.val()) == false) {
                throw "The subject must contain letters only.";
            } else {
                isValid = true;
                subjectError.text("");
                subjectError.hide();
            }
        } catch (msg) {
            isValid = false;
            subjectError.text(msg);
            subjectTextBox.focus();
            subjectTextBox.select();
            subjectError.show();
        }
    }
    //
    // Validates the message.
    function validateMessage() {
        isValid = false;
        try {
            if (/.{20}/.test(messageTextArea.val()) == false) {
                throw "The message must at least contain 20 characters.";
            } else {
                isValid = true;
                messageError.text("");
                messageError.hide();
            }
        } catch (msg) {
            isValid = false;
            messageError.text(msg);
            messageTextArea.focus();
            messageTextArea.select();
            messageError.show();
        }
    }
    //
    // Triggers all validation functions.
    function validateContactForm() {
        validateName();
        validateEmail();
        validatePhone();
        validateSubject();
        validateMessage();
    }
});
