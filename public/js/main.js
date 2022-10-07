function enableSubrace() {
    race = document.getElementById("race").value
    console.log("Here: ", race)
    if (race === "Elf") {
        document.getElementById("elfSubrace").classList.remove("hidden")
        document.getElementById("dwarfSubrace").classList.add("hidden")
        document.getElementById("halflingSubrace").classList.add("hidden")
        document.getElementById("gnomeSubrace").classList.add("hidden")
    }
    else if (race === "Dwarf") {
        document.getElementById("dwarfSubrace").classList.remove("hidden")
        document.getElementById("elfSubrace").classList.add("hidden")
        document.getElementById("halflingSubrace").classList.add("hidden")
        document.getElementById("gnomeSubrace").classList.add("hidden")
    }
    else if (race === "Halfling") {
        document.getElementById("halflingSubrace").classList.remove("hidden")
        document.getElementById("dwarfSubrace").classList.add("hidden")
        document.getElementById("elfSubrace").classList.add("hidden")
        document.getElementById("gnomeSubrace").classList.add("hidden")
    }
    else if (race === "Gnome") {
        document.getElementById("gnomeSubrace").classList.remove("hidden")
        document.getElementById("dwarfSubrace").classList.add("hidden")
        document.getElementById("halflingSubrace").classList.add("hidden")
        document.getElementById("elfSubrace").classList.add("hidden")
    }
    else {
        document.getElementById("dwarfSubrace").classList.add("hidden")
        document.getElementById("halflingSubrace").classList.add("hidden")
        document.getElementById("elfSubrace").classList.add("hidden")
        document.getElementById("gnomeSubrace").classList.add("hidden")
    }
}