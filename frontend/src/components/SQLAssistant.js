// import { useState } from "react";

// function SQLAssistant() {
//     const [question, setQuestion] = useState("");
//     const [answer, setAnswer] = useState("");
//     const token = localStorage.getItem("token");

//     const handleAsk = async () => {
//         const response = await fetch("http://localhost:5000/api/ai/ask", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ question }),
//         });

//         const data = await response.json();
//         setAnswer(data.answer);
//     };

//     return (
//         <div>
//             <h2>Ask AI for SQL Help</h2>
//             <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask an SQL question" />
//             <button onClick={handleAsk}>Get Answer</button>
//             {answer && <p>AI Answer: {answer}</p>}
//         </div>
//     );
// }

// export default SQLAssistant;
