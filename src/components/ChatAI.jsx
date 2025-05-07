
async function ChatAI(prompt = "") {
    const dataBody = JSON.stringify({
      model: "tinyllama:1.1b",
      stream: false,
      prompt: prompt,
    });
  
    try {
      const response = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataBody,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("AI response:", data);
        return data;
      } else {
        console.error("Fetch failed:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  
  export default ChatAI;