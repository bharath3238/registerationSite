const popup = document.getElementsByClassName("dropmenu")[0];
const options = document.querySelectorAll(".option");
const branchInp = document.getElementById("branch");

const openpop = () => {
    popup.style.display = "block";
}
const closepop = () => {
    popup.style.display = "none";
}

options.forEach((option) => option.addEventListener("click", (e) => {
    document.getElementById("role").value = e.target.textContent;
    if(e.target.textContent === "Principle"){
        branchInp.value = "All Branches";
    }else{
        branchInp.value = "";
    }
    closepop();
}))

const apiUri = "https://creators637.herokuapp.com/";

const checkMainDetails = () => {
    const username = document.getElementById("musername").value;
    const password = document.getElementById("mpassword").value;
    if (username != "" && password != ""){

        fetch(apiUri + "staff/check", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then((resp) => {
            if(resp.status == 200){
                resp.json().then((data) => {
                    showMessage(data.msg)
                    console.log(data.token)
                    localStorage.setItem("token", data.token);
                    window.location = "/public/register.html"
                });
            }
        }).catch((error) => null)
    }else{
        showMessage("Cannot use Empty values")
    }
}

const registerDetails = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const phone = document.getElementById("phone").value;
    const branch = document.getElementById("branch").value;
    const inst = document.getElementById("inst").value;

    if(username != "" && password != "" && email != "" && role != "" && phone != "" && branch != "" && inst != ""){
        fetch(apiUri + "staff/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'token' : localStorage.getItem("token")
            },
            body: JSON.stringify({username, password, email, role, phone, branch, institute:inst})
        }).then((resp) => {
            resp.json().then((data) => {
                showMessage(data.msg)
            });
        }).catch((error) => null)
    }else{
        showMessage("Cannot use Empty values")
    }

}

const showMessage = (msg) => {
    const notification = document.getElementsByClassName("notification")[0];
    notification.style.display = "block";
    notification.getElementsByClassName("ntext")[0].textContent = msg
}

//gptpendurthi637
//GptPend637@gOvt#
