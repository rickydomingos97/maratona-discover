const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme]");
const toggle = document.querySelector(".toggle-container")

checkbox.addEventListener("click", function () {
    console.log("clicou");
})

console.log(checkbox);

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)


const initialColors = {
    background: getStyle(html, "--background"),
    headerOriginal: getStyle(html, "--header-original"),
    white: getStyle(html, "--white"),
    colorHeadings: getStyle(html, "--color-headings"),
    totalP: getStyle(html, "--total-p"),
    cardText: getStyle(html, "--card-text"),
    darkBlue: getStyle(html, "--dark-blue"),
}

const darkMode = {
    background: "#121214",
    headerOriginal: "#434343",
    white: "rgb(59, 59, 59)",
    colorHeadings: "#b7bfcf",
    totalP: "#ffffff",
    cardText: "#fff",
    darkBlue: "#969cb3",
    
}

const transformeKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformeKey(key), colors[key])
    )}


checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})