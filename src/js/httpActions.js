const webTaskLocation = 'https://wt-3f493189a06b54beca136c03c8837d85-0.run.webtask.io/test8';

// Set initial state for the user to mutate
var state = {
    message: '',
    recipient: '',
    warningText: null
};

function addWarning() {
    if (!state.message) {
        return 'please provide a message';
    }
    if (!state.recipient) {
        return 'please provide a valid email address';
    }
    return null
}

function sendMessage(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(
        "POST",
        webTaskLocation
    );

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            cb(xhr.responseText)
        }
    };

    xhr.send(JSON.stringify(state));

}

// https://developer.chrome.com/extensions/contentSecurityPolicy#JSExecution
document.addEventListener('DOMContentLoaded', function() {
    var form = document.masterForm;
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        state = {
            recipient: this.elements['0'].value,
            message: this.elements['1'].value
        };

        state.warningText = addWarning();

        if (state.warningText) {
            document.querySelector('#prompt').innerText = state.warningText;
        } else {
            sendMessage(function(result) {
                console.log('result', result)
            })
            document.querySelector('#prompt').innerText = 'Email Sent!';
        }
        document.querySelector('#prompt').style.display = 'block';

    }, false);
    setInterval(() => console.log(state), 100)
});