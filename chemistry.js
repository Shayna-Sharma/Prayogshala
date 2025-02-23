const API_KEY = "AIzaSyDfkbAAwKp9PGxjgLvtZX82klXyWRjfybQ"; // Replace with a valid API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;

document.addEventListener("DOMContentLoaded", fetchElements);

// Fetch AI-generated elements
async function fetchElements() {
    const prompt = "Provide a list of all chemical elements with their symbols, formatted as: Element (Symbol).";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: { maxOutputTokens: 300 }
            })
        });

        const data = await response.json();
        console.log("API Response:", JSON.stringify(data, null, 2));

        if (!data?.candidates?.length) {
            console.error("No valid response from API.");
            updateDropdowns([]);
            return;
        }

        const responseText = extractResponseText(data);
        const elements = parseElements(responseText);

        if (elements.length > 0) {
            updateDropdowns(elements);
        } else {
            console.error("No elements found in AI response.");
        }
    } catch (error) {
        console.error("Error fetching elements:", error);
    }
}

// Extract response text
function extractResponseText(data) {
    try {
        return data.candidates[0]?.content?.parts?.[0]?.text || "";
    } catch (error) {
        console.error("Error extracting response text:", error);
        return "";
    }
}

// Parse AI response into element list
function parseElements(responseText) {
    const lines = responseText.split("\n");
    const elements = [];

    lines.forEach(line => {
        const match = line.match(/^(.+?)\s*\(([^)]+)\)$/);
        if (match) {
            elements.push({ name: match[1].trim(), symbol: match[2].trim() });
        }
    });

    console.log("Parsed Elements:", elements);
    return elements;
}

// Populate dropdowns dynamically
function updateDropdowns(elements) {
    populateDropdown("reactant1", elements);
    populateDropdown("reactant2", elements);
}

// Helper function to populate dropdowns
function populateDropdown(id, elements) {
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = `<option value="">Select an element</option>`; // Default option

    elements.forEach((el) => {
        const option = document.createElement("option");
        option.value = el.symbol;
        option.textContent = `${el.name} (${el.symbol})`;
        select.appendChild(option);
    });
}

// Fetch AI-generated reaction
async function findReaction() {
    const reactant1 = document.getElementById("reactant1").value;
    const reactant2 = document.getElementById("reactant2").value;
    const outputElement = document.getElementById("output");

    if (!reactant1 || !reactant2) {
        outputElement.innerText = "Please select two reactants.";
        return;
    }

    outputElement.innerText = "Predicting reaction...";

    const prompt = `Analyze the reaction between ${reactant1} and ${reactant2}.
    - Write the balanced chemical equation.
    - Describe how they react.
    - If no reaction, explain why.
    - Provide additional chemistry insights.`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: { maxOutputTokens: 500 }
            })
        });

        const data = await response.json();
        console.log("Reaction API Response:", JSON.stringify(data, null, 2));

        if (!data?.candidates?.length) {
            outputElement.innerText = "Error: Could not generate a response.";
            return;
        }

        outputElement.innerText = extractResponseText(data);
    } catch (error) {
        console.error("Error fetching reaction:", error);
        outputElement.innerText = "An error occurred while predicting the reaction.";
    }
}
