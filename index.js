// Muitas coisas deixarão de funcionar devidamente se você mudar a ordem de precedência
function playToPause(event) {
    const button = document.getElementById("play-pause").firstChild;
    const buttonChecking = function() {
        return button.innerHTML == "play_arrow"
    }

    const target = event.currentTarget.classList;
    const watch = document.getElementById("watch").childNodes
    const saveDate = `${watch[0].innerHTML} ${watch[1].innerHTML}`.trim().split(' ').reverse()
    const start = Date.now();

    if (buttonChecking()) {
        timer = setInterval(function() {
            const date = new Date(Date.UTC(0, 0, 0, saveDate[3] || 0, saveDate[2] || 0, saveDate[1] || 0, Date.now() + parseInt(`${saveDate[0]}0`) - start))
    
            const h = date.getUTCHours()
            const m = date.getUTCMinutes()
            const s = date.getUTCSeconds()
            const mm = (date.getUTCMilliseconds()).toString().split("")
            mm.pop()

            const arr = [mm.toString().replace(',', '')]

            s != 0 ? arr.unshift(s) : "";
            m != 0 ? arr.unshift(m) : "";
            h != 0 ? arr.unshift(h) : "";

            watch[0].innerHTML = ("00" + arr.shift()).slice(-2);
            watch[1].innerHTML = `${arr.map(function(n) {
                return ("00" + n).slice(-2)
            })}`.replace(/,/gi, ' ')
    
            buttonChecking() ? clearInterval(timer) : ''
        }, 10)
    }

    if (buttonChecking()) {
        button.innerHTML = "pause";
        document.getElementById("reset").style.display = "none";
    } else {
        button.innerHTML = "play_arrow"
        document.getElementById("reset").style.display = "block"
    }

    target[2] == "active" ? target.remove("active") : target.add("active"); 
}

function reset() {
    const watch = document.getElementById("watch").childNodes
    
    watch[0].innerHTML = ""
    watch[1].innerHTML = ""
}