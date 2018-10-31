document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const status = document.querySelector("#status");
    const formBtn = document.querySelector("form>button")

    const displayStatus = (res)=>{
        status.innerHTML = res.status;
        status.style.display = "block";
        formBtn.innerHTML = "Send";
        form.reset()
        setTimeout(() => {
            status.style.display = "none";
        }, 3000);
    }

    const newReq = post => {
        const options = {
            method: 'POST',
            body: JSON.stringify(post),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        return fetch(`/contact`, options)
            .then(res => res.json())
            .then(res => displayStatus(res))
            .catch(error => console.log(error));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        formBtn.innerHTML = "Sending..."
        let post = {
            name: form.elements["name"].value,
            email: form.elements["email"].value,
            message: form.elements["message"].value
        }

        newReq(post)

    })


})