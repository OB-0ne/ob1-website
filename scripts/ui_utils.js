let phoneNavbar_flag = false

function togglePhoneNavbar() {
    
    if (phoneNavbar_flag === false) {
        document.getElementById("navbar-phone-holder").style.display = "block";
        phoneNavbar_flag = true;//adjusts state variable
    } else {
        document.getElementById("navbar-phone-holder").style.display = "none";
        phoneNavbar_flag = false; //adjusts state variable
    }
}