const API_KEY = "AIzaSyDfkbAAwKp9PGxjgLvtZX82klXyWRjfybQ"; // 🔴 Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;

document.addEventListener("DOMContentLoaded", fetchExperiments);

async function fetchExperiments() {
    const prompt = "List 10 biology experiments suitable for students, separated by new lines.";
    const experimentDropdown = document.getElementById("experiment");

    try {
        experimentDropdown.innerHTML = `<option>Loading experiments...</option>`; // Show loading text

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: { maxOutputTokens: 200 }
            })
        });

        const data = await response.json();
        console.log("API Response:", data); // Debugging

        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            const experimentsText = data.candidates[0].content.parts[0].text;
            console.log("Extracted Experiments:", experimentsText);
            
            const experiments = experimentsText.split("\n").map(e => e.replace(/[*-]/g, "").trim()).filter(e => e);
            
            experimentDropdown.innerHTML = ""; // Clear existing options

            experiments.forEach(exp => {
                const option = document.createElement("option");
                option.value = exp;
                option.textContent = exp;
                experimentDropdown.appendChild(option);
            });
        } else {
            experimentDropdown.innerHTML = `<option value="">Failed to load experiments</option>`;
        }
    } catch (error) {
        console.error("Error fetching experiments:", error);
        experimentDropdown.innerHTML = `<option value="">Error loading experiments</option>`;
    }
}

async function showExperimentResult() {
    const experiment = document.getElementById("experiment").value;
    const days = document.getElementById("days").value;
    const outputElement = document.getElementById("output");

    if (!experiment || !days) {
        outputElement.innerHTML = "<b>Please select an experiment and enter the number of days.</b>";
        return;
    }

    outputElement.innerHTML = "⏳ Generating experiment details..."; // Show loading text

    const prompt = `You are a biology lab expert. Provide a **step-by-step guide** and expected results for the experiment: "${experiment}" over ${days} days. Format it as follows:
    **1) Steps to do the experiment**
    **2) Observations for each day up to ${days} days**
    **3) Virtual representation of results in words**
    **4) Reason for doing this experiment**`;

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
        console.log("Experiment Result API Response:", data); // Debugging

        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            const experimentResult = data.candidates[0].content.parts[0].text;
            outputElement.innerHTML = `<pre>${experimentResult}</pre>`;
        } else {
            outputElement.innerHTML = "<b>Error: Could not fetch experiment details.</b>";
        }
    } catch (error) {
        console.error("Error fetching experiment details:", error);
        outputElement.innerHTML = "<b>Failed to load experiment details. Please try again.</b>";
    }
}
