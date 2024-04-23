/*********************
    
    Project 4
    Name: Brenton Wilson 0231906
    Date: 2024-02-28
    Description: Project 4 Design to Development

**********************/

function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();
        
		return false;
	}

	return true;
}

function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear form?')) {
		// Ensure all error fields are hidden
		hideErrors();

		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

// Function checks for null values or whitespace 
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}
    
	// Valid entry
	return true;
}



function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("co_formError");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}


function formHasErrors() {

    let errorFlag = false;
    let requiredFields = ["name", "phone", "email", "message"];
	for(let i = 0; i < requiredFields.length; i++) {
		let textField = document.getElementById(requiredFields[i]);

		if(!formFieldHasInput(textField)) {
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if(!errorFlag){
				textField.focus();
				textField.select();
			}
			errorFlag = true;
		}
	}

    /*
	Regex ^ and $ is th beginning and end of the input. 
	The .+ will accept one or more characters before the '@'
	.+ after the @ will accept one or more characters before the period literal '\.'
	[a-z]+ will match and letter one or more times.
	*/
	let email = document.getElementById("email")
	if(!email.value.match(/^.+@.+\.[a-z]+$/i)) {
		document.getElementById("emailformat_error").style.display = "block";
		errorFlag = true;
	}

    let phoneNumber = document.getElementById("phone")
	if(!phoneNumber.value.match(/^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/)) {
		document.getElementById("phoneformat_error").style.display = "block";
		errorFlag = true;
	}
    return errorFlag;

}

function load() {
    hideErrors();

    // Add event listener for the form submit
	document.getElementById("co_form").addEventListener("submit", validate);
	document.getElementById("co_form").addEventListener("reset", resetForm);
}



document.addEventListener("DOMContentLoaded", load);