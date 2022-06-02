document.querySelector("button").addEventListener("click", getSpells)

async function getSpells() {
    let spellName = document.querySelector("#spellSearch").value
    spellName = spellName.toLowerCase().split(" ").join("-") //Acid Arrow = acid-arrow to search
    console.log(spellName)
    const url = `https://api.open5e.com/spells/${spellName}`
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            let html = `
            <section>
                <h2>Spell Name:${data.name}</h2>
                <h3>Description:${data.desc}</h3>
            </section>`
            document.querySelector(".spell").innerHTML = html
        })
        .catch(error => console.log(`Error:${error}`))
}

async function chooseRace() {
    let spellName = document.querySelector("#spellSearch").value
    const url = `https://api.open5e.com/race/`
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(value => {
                //create button and add descriptions of each
                //depending on button click, return the race object
            })
        })
        .catch(error => console.log(`Error:${error}`))
}

//https://donjon.bin.sh/5e/ ****************************LOOK FOR REFERENCES