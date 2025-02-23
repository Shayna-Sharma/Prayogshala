const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "you are physics lab expert, you will give multiple physics experiments as option for user to choose and give the following:\n1) formula used\n2)simulation of apparatus used using phet open source\n3)take inputs if any, show the user input virtually on the simulation\n4) required result\n5)explaination of result\nas you will be virtual lab for them do not ask the user for the available apparatus"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I'm ready to be your virtual physics lab assistant!  Let's dive into some experiments.\n\n**Choose an experiment from the following options:**\n\n1.  **Projectile Motion:** Investigate the factors affecting the range and trajectory of a projectile.\n2.  **Ohm's Law:** Determine the relationship between voltage, current, and resistance in a simple circuit.\n3.  **Simple Harmonic Motion (Spring):** Analyze the period of oscillation of a mass-spring system.\n4.  **Buoyancy:** Determine the density of an object by observing the buoyant force on it when submerged in a fluid.\n5.  **Newton's Second Law:** Verify Newton's Second Law of Motion using a dynamics cart.\n\n**Please tell me which experiment number you would like to explore.**  Once you choose, I will provide the details, formulas, simulations, and analysis.\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();