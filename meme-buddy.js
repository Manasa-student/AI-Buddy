async function getMemeExplanation() {
    const topic = document.getElementById("topicInput").value;
    const outputDiv = document.getElementById("output");
  
    if (topic === "") {
      outputDiv.innerHTML = "Orey! Topic type cheyy ra babu! 😅";
      return;
    }
  
    outputDiv.innerHTML = "Loading meme explanation... 😂🔥";
  
    const apiKey = "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"; // Replace this!
  
    const prompt = `Explain the following topic in Telugu using meme-style humor and famous Telugu movie dialogues. Make it funny but clear.
  Topic: ${topic}`;
  
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 200,
          temperature: 0.8
        })
      });
  
      const data = await response.json();
  
      if (data.choices && data.choices.length > 0) {
        outputDiv.innerHTML = data.choices[0].text;
      } else {
        outputDiv.innerHTML = "😢 Sorry ra babu… AI respond cheyyaledu. API limit unda check cheyyi.";
        console.log("Full Response:", data);
      }
    } catch (error) {
      console.error("Error:", error);
      outputDiv.innerHTML = "🥲 Error vachindhi mawa... API call lo pichi ayyindi.";
    }
  }
  