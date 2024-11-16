document.getElementById("signInButton").addEventListener("click", handleOnClick);

async function handleOnClick() {
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    await fetchSignIn(email, password);
}

async function fetchSignIn(email, password) {
    await fetch(`https://localhost:7044/api/User/login?email=${email}&password=${password}`, {
        method: "GET",
        headers: {
            "Accept": "Application/json",
            "Content-Type": "Application/json"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch(e => {
        console.log(e);
    })
}

