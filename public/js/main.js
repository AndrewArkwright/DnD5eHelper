//This function helps remove and hide the subrace options of the form depending on what race is selected.
function enableSubrace() {
    race = document.getElementById("race").value
    console.log("Here: ", race)
    if (race === "Elf") {
        document.getElementById("elfSubrace").classList.remove("sm:hidden")
        document.getElementById("elfSubrace").classList.remove("hidden")
        document.getElementById("dwarfSubrace").classList.add("sm:hidden")
        document.getElementById("dwarfSubrace").classList.add("hidden")
        document.getElementById("halflingSubrace").classList.add("sm:hidden")
        document.getElementById("halflingSubrace").classList.add("hidden")
        document.getElementById("gnomeSubrace").classList.add("sm:hidden")
        document.getElementById("gnomeSubrace").classList.add("hidden")
    }
    else if (race === "Dwarf") {
        document.getElementById("dwarfSubrace").classList.remove("sm:hidden")
        document.getElementById("dwarfSubrace").classList.remove("hidden")
        document.getElementById("elfSubrace").classList.add("sm:hidden")
        document.getElementById("elfSubrace").classList.add("hidden")
        document.getElementById("halflingSubrace").classList.add("sm:hidden")
        document.getElementById("halflingSubrace").classList.add("hidden")
        document.getElementById("gnomeSubrace").classList.add("sm:hidden")
        document.getElementById("gnomeSubrace").classList.add("hidden")
    }
    else if (race === "Halfling") {
        document.getElementById("halflingSubrace").classList.remove("sm:hidden")
        document.getElementById("halflingSubrace").classList.remove("hidden")
        document.getElementById("dwarfSubrace").classList.add("sm:hidden")
        document.getElementById("dwarfSubrace").classList.add("hidden")
        document.getElementById("elfSubrace").classList.add("sm:hidden")
        document.getElementById("elfSubrace").classList.add("hidden")
        document.getElementById("gnomeSubrace").classList.add("sm:hidden")
        document.getElementById("gnomeSubrace").classList.add("hidden")
    }
    else if (race === "Gnome") {
        document.getElementById("gnomeSubrace").classList.remove("sm:hidden")
        document.getElementById("gnomeSubrace").classList.remove("hidden")
        document.getElementById("dwarfSubrace").classList.add("sm:hidden")
        document.getElementById("dwarfSubrace").classList.add("hidden")
        document.getElementById("halflingSubrace").classList.add("sm:hidden")
        document.getElementById("halflingSubrace").classList.add("lg:hidden")
        document.getElementById("elfSubrace").classList.add("sm:hidden")
        document.getElementById("elfSubrace").classList.add("hidden")
    }
    else { //So if you switch from Elf race to something that doesn't have a subrace like Human, you want to hide them all.
        console.log("Did you just reset them all buddy?")
        document.getElementById("dwarfSubrace").classList.add("sm:hidden")
        document.getElementById("dwarfSubrace").classList.add("hidden")
        document.getElementById("halflingSubrace").classList.add("sm:hidden")
        document.getElementById("halflingSubrace").classList.add("hidden")
        document.getElementById("elfSubrace").classList.add("sm:hidden")
        document.getElementById("elfSubrace").classList.add("hidden")
        document.getElementById("gnomeSubrace").classList.add("sm:hidden")
        document.getElementById("gnomeSubrace").classList.add("hidden")
    }
}