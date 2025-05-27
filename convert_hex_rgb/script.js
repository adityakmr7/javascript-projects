// Your hex to RGB conversion function (with fixes)
function convertHexToRGB(hexColor) {
    // 1. Remove the '#' if it exists
    hexColor = hexColor.replace(/^#/, "")

    // 2. Convert 3-digit shorthand to 6-digit full form
    // Example: 'f53' becomes 'ff5533'
    if (hexColor.length === 3) {
        hexColor = hexColor
            .split("")
            .map((char) => char + char)
            .join("")
    }

    // 3. Convert the hex string to a number
    const bigint = Number.parseInt(hexColor, 16)

    // 4. Extract the red, green and blue using bitwise operators
    const r = (bigint >> 16) & 255 // extract red (first 8 bits)
    const g = (bigint >> 8) & 255 // extract green (middle 8 bits)
    const b = bigint & 255 // extract blue (last 8 bits)

    // return the RGB values as an object
    return { r, g, b }
}

// Example colors
const exampleColors = [
    { name: "Blue", hex: "#3b82f6" },
    { name: "Red", hex: "#ef4444" },
    { name: "Green", hex: "#22c55e" },
    { name: "Purple", hex: "#a855f7" },
    { name: "Orange", hex: "#f97316" },
    { name: "Pink", hex: "#ec4899" },
]

// DOM elements
const hexInput = document.getElementById("hex-input")
const errorMessage = document.getElementById("error-message")
const resultsSection = document.getElementById("results-section")
const colorPreview = document.getElementById("color-preview")
const hexDisplay = document.getElementById("hex-display")
const redValue = document.getElementById("red-value")
const greenValue = document.getElementById("green-value")
const blueValue = document.getElementById("blue-value")
const rgbString = document.getElementById("rgb-string")
const copyBtn = document.getElementById("copy-btn")
const examplesGrid = document.getElementById("examples-grid")
const toast = document.getElementById("toast")

// Validate hex color format
function isValidHex(hex) {
    const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    return hexRegex.test(hex)
}

// Update the display with converted values
function updateDisplay(hex, rgb) {
    // Ensure hex has # prefix for display
    const displayHex = hex.startsWith("#") ? hex : "#" + hex

    // Update color preview
    colorPreview.style.backgroundColor = displayHex
    hexDisplay.textContent = displayHex

    // Update RGB values
    redValue.textContent = rgb.r
    greenValue.textContent = rgb.g
    blueValue.textContent = rgb.b

    // Update RGB string
    const rgbText = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    rgbString.textContent = rgbText
}

// Show error state
function showError() {
    hexInput.classList.add("error")
    errorMessage.classList.remove("hidden")
    resultsSection.style.display = "none"
}

// Hide error state
function hideError() {
    hexInput.classList.remove("error")
    errorMessage.classList.add("hidden")
    resultsSection.style.display = "grid"
}

// Convert and update display
function convertColor() {
    const inputValue = hexInput.value.trim()

    if (!inputValue) {
        showError()
        return
    }

    if (isValidHex(inputValue)) {
        try {
            const rgb = convertHexToRGB(inputValue)
            updateDisplay(inputValue, rgb)
            hideError()
        } catch (error) {
            showError()
        }
    } else {
        showError()
    }
}

// Copy RGB value to clipboard
function copyToClipboard() {
    const textToCopy = rgbString.textContent
    navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
            showToast()
        })
        .catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement("textarea")
            textArea.value = textToCopy
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand("copy")
            document.body.removeChild(textArea)
            showToast()
        })
}

// Show toast notification
function showToast() {
    toast.classList.add("show")
    setTimeout(() => {
        toast.classList.remove("show")
    }, 2000)
}

// Create example color elements
function createExamples() {
    examplesGrid.innerHTML = ""

    exampleColors.forEach((color) => {
        const exampleElement = document.createElement("div")
        exampleElement.className = "example-color"
        exampleElement.innerHTML = `
            <div class="example-preview" style="background-color: ${color.hex}"></div>
            <div class="example-name">${color.name}</div>
            <div class="example-hex">${color.hex}</div>
        `

        exampleElement.addEventListener("click", () => {
            hexInput.value = color.hex
            convertColor()
        })

        examplesGrid.appendChild(exampleElement)
    })
}

// Event listeners
hexInput.addEventListener("input", convertColor)
copyBtn.addEventListener("click", copyToClipboard)

// Initialize the app
function init() {
    createExamples()
    convertColor() // Convert the default value
}

// Start the application
init()
