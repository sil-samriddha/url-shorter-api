const selector = document.getElementById('theme-selector');
const root = document.querySelector(':root');
const postbtn = document.getElementById('start');
const databox = document.querySelector('.data');

window.onload = ()=>{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.style.setProperty('--background', '#380031');
        root.style.setProperty('--text', 'white');
    }
}

postbtn.addEventListener('click', function (e) {
    let longurl = document.querySelector('#long-link').value;
    let keyword = document.querySelector('#key-word').value;

    databox.innerHTML = `<img src="./loading.svg">`

    fetch('/', {
        method: "POST",
        body: JSON.stringify({
            longUrl : longurl,
            alias : keyword
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(Response => Response.json())
    .then(data =>{
        if(data.error === true){
            if(data.message.split(':')[2] === ` key_1 dup key`){
                databox.innerHTML =
                `
                <div class="short-box">
                    Keyword not available try a different one or leave it blank
                </div>
                `
            }else{
                databox.innerHTML =
                `
                <div class="short-box">
                    ${data.message.split(':')[2]}
                </div>
                `
            }
        }else{
            databox.innerHTML = 
            `
            <div class="short-box">
                <input id="short-url" type="text" value=${data.short_url}>
                <button id='copy'>Copy</button>
            </div>
            `
            document.querySelector('#key-word').value = `${data.alias}`

            const copybtn = document.querySelector('#copy');

            copybtn.addEventListener('click', function(e){
                let shorturl = document.getElementById("short-url");
                shorturl.select();
                document.execCommand("copy");
                window.getSelection().removeAllRanges();
                copybtn.innerText = "Copied";
                setTimeout(function () {
            		copybtn.innerText = "Copy";
            	},1500);
            })
        }
    })
    .catch(err => console.log(err));
})

selector.addEventListener('change', function(e){
    if(selector.value === 'default'){
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            root.style.setProperty('--background', '#380031');
            root.style.setProperty('--text', 'white');
        }
    }else if(selector.value === 'light'){
        root.style.setProperty('--background', 'white');
        root.style.setProperty('--text', 'black');
    }else{
        root.style.setProperty('--background', '#380031');
        root.style.setProperty('--text', 'white');
    }
})

