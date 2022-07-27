document.querySelector(".spellSearch").addEventListener("click", getSpell)



async function getSpell() {
    let spellName = document.querySelector(".spellName").value
    alert(spellName)
    spellName = spellName.toLowerCase().split(" ").join("-") //Acid Arrow = acid-arrow to search
    const url = `https://api.open5e.com/spells/${spellName}`
    await fetch(url)
        .then(response => response.json())
        .then(spell => {
            console.log(spell)
            let spellInfo = [spell.name, spell.desc]

            //ejs.render("<%= spellInfo.join(", ") %>", {spellInfo: spellInfo})

            let html = `
            <section>
                <h2>Spell Name:${data.name}</h2>
                <h3>Description:${data.desc}</h3>
            </section>`
            document.querySelector(".spellDisplay").innerHTML = html
        })
        .catch(error => console.log(`Error:${error}`))
}


//https://donjon.bin.sh/5e/ ****************************LOOK FOR REFERENCES