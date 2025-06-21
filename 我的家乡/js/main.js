// Your custom JavaScript goes here
$(document).ready(function() {
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 56
            }, 800);
        }
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Navbar change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });

    // Form validation for feedback form
    $("#feedbackForm").submit(function(e) {
        e.preventDefault();
        validateFeedbackForm();
    });

    // Form validation for login form
    $("#loginForm").submit(function(e) {
        e.preventDefault();
        validateLoginForm();
    });

    // Form validation for registration form
    $("#registerForm").submit(function(e) {
        e.preventDefault();
        validateRegisterForm();
    });
});

// Validate feedback form
function validateFeedbackForm() {
    let isValid = true;
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();
    
    // Reset error messages
    $(".error-message").remove();
    $(".is-invalid").removeClass("is-invalid");
    
    // Validate name
    if (name === "") {
        $("#name").addClass("is-invalid");
        $("#name").after('<div class="error-message text-danger">请输入您的姓名</div>');
        isValid = false;
    }
    
    // Validate email
    if (email === "") {
        $("#email").addClass("is-invalid");
        $("#email").after('<div class="error-message text-danger">请输入您的邮箱</div>');
        isValid = false;
    } else if (!isValidEmail(email)) {
        $("#email").addClass("is-invalid");
        $("#email").after('<div class="error-message text-danger">请输入有效的邮箱地址</div>');
        isValid = false;
    }
    
    // Validate message
    if (message === "") {
        $("#message").addClass("is-invalid");
        $("#message").after('<div class="error-message text-danger">请输入留言内容</div>');
        isValid = false;
    }
    
    // If form is valid, submit using AJAX
    if (isValid) {
        // In a real application, this would send data to the server
        // For this demo, we'll just show a success message
        $.ajax({
            type: "POST",
            url: "submit-feedback.php", // This is just a placeholder
            data: {
                name: name,
                email: email,
                message: message
            },
            success: function(response) {
                $("#feedbackForm").html('<div class="alert alert-success">感谢您的留言！我们会尽快回复您。</div>');
            },
            error: function() {
                // Since this is a static site, we'll simulate success
                $("#feedbackForm").html('<div class="alert alert-success">感谢您的留言！我们会尽快回复您。</div>');
            }
        });
    }
}

// Validate login form
function validateLoginForm() {
    let isValid = true;
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();
    
    // Reset error messages
    $(".error-message").remove();
    $(".is-invalid").removeClass("is-invalid");
    
    // Validate username
    if (username === "") {
        $("#username").addClass("is-invalid");
        $("#username").after('<div class="error-message text-danger">请输入用户名</div>');
        isValid = false;
    }
    
    // Validate password
    if (password === "") {
        $("#password").addClass("is-invalid");
        $("#password").after('<div class="error-message text-danger">请输入密码</div>');
        isValid = false;
    }
    
    // If form is valid, submit using AJAX
    if (isValid) {
        // In a real application, this would send data to the server
        // For this demo, we'll just show a success message
        $.ajax({
            type: "POST",
            url: "login.php", // This is just a placeholder
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                $("#loginForm").html('<div class="alert alert-success">登录成功！正在跳转到首页...</div>');
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 2000);
            },
            error: function() {
                // Since this is a static site, we'll simulate success
                $("#loginForm").html('<div class="alert alert-success">登录成功！正在跳转到首页...</div>');
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 2000);
            }
        });
    }
}

// Validate registration form
function validateRegisterForm() {
    let isValid = true;
    const username = $("#reg-username").val().trim();
    const email = $("#reg-email").val().trim();
    const password = $("#reg-password").val().trim();
    const confirmPassword = $("#confirm-password").val().trim();
    
    // Reset error messages
    $(".error-message").remove();
    $(".is-invalid").removeClass("is-invalid");
    
    // Validate username
    if (username === "") {
        $("#reg-username").addClass("is-invalid");
        $("#reg-username").after('<div class="error-message text-danger">请输入用户名</div>');
        isValid = false;
    }
    
    // Validate email
    if (email === "") {
        $("#reg-email").addClass("is-invalid");
        $("#reg-email").after('<div class="error-message text-danger">请输入邮箱</div>');
        isValid = false;
    } else if (!isValidEmail(email)) {
        $("#reg-email").addClass("is-invalid");
        $("#reg-email").after('<div class="error-message text-danger">请输入有效的邮箱地址</div>');
        isValid = false;
    }
    
    // Validate password
    if (password === "") {
        $("#reg-password").addClass("is-invalid");
        $("#reg-password").after('<div class="error-message text-danger">请输入密码</div>');
        isValid = false;
    } else if (password.length < 6) {
        $("#reg-password").addClass("is-invalid");
        $("#reg-password").after('<div class="error-message text-danger">密码长度需至少6位</div>');
        isValid = false;
    }
    
    // Validate confirm password
    if (confirmPassword === "") {
        $("#confirm-password").addClass("is-invalid");
        $("#confirm-password").after('<div class="error-message text-danger">请确认密码</div>');
        isValid = false;
    } else if (password !== confirmPassword) {
        $("#confirm-password").addClass("is-invalid");
        $("#confirm-password").after('<div class="error-message text-danger">两次输入的密码不一致</div>');
        isValid = false;
    }
    
    // If form is valid, submit using AJAX
    if (isValid) {
        // In a real application, this would send data to the server
        // For this demo, we'll just show a success message
        $.ajax({
            type: "POST",
            url: "register.php", // This is just a placeholder
            data: {
                username: username,
                email: email,
                password: password
            },
            success: function(response) {
                $("#registerForm").html('<div class="alert alert-success">注册成功！请登录您的账号。</div>');
                setTimeout(function() {
                    window.location.href = "login.html";
                }, 2000);
            },
            error: function() {
                // Since this is a static site, we'll simulate success
                $("#registerForm").html('<div class="alert alert-success">注册成功！请登录您的账号。</div>');
                setTimeout(function() {
                    window.location.href = "login.html";
                }, 2000);
            }
        });
    }
}

// Helper function to validate email format
function isValidEmail(email) {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}