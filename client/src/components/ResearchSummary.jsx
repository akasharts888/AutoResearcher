import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const dummySummary = `
## 📘 Title: Ensuring Ethical Considerations in the Development and Deployment of Autonomous Agents: A Multidisciplinary Approach

As the development and deployment of **autonomous agents**, including **artificial intelligence (AI) systems**, accelerate across various sectors, it is crucial to investigate the **ethical challenges** posed by these technologies and propose strategies for addressing them.

This summary explores the **ethical implications of AI decision-making processes** and proposes a **multidisciplinary approach** to ensure **transparency**, **accountability**, and **fairness**.

### 🎯 Research Question
> *How can policymakers, ethicists, and technologists collaborate to develop effective accountability structures that balance innovation with ethical considerations in the development and deployment of autonomous agents?*

---

### ⚠️ Ethical Challenges in AI

- The use of AI in fields such as **genomics** has led to innovative breakthroughs, but also raises **ethical and privacy concerns**.
- **Biased decision-making** in AI systems has had significant negative impacts on **marginalized communities**.
- **Facial recognition systems** powered by AI have sparked controversy due to their potential to **perpetuate biases and discrimination**.
- Studies have shown that:
  - AI systems can **reinforce stereotypes** if not ethically designed.
  - AI-powered **chatbots** may propagate **harmful biases** without proper ethical safeguards.

---

### ✅ Proposed Multidisciplinary Approach

1. **Develop clear accountability mechanisms** that prioritize:
   - Transparent algorithmic decision-making.
   - Human oversight.
2. **Encourage ongoing research and public discourse** to tackle ethical challenges, including:
   - Developing universal ethical guidelines and standards for AI.
3. **Establish robust ethical frameworks** that align AI systems with:
   - Human values such as fairness, transparency, and privacy.

---

### 🧩 Supporting Research

- A range of case studies highlights how **lack of ethical foresight** can lead to real-world harm.
- Multiple studies emphasize that without proactive ethical design, AI systems may **perpetuate or amplify** social inequalities.

---

### 🧭 Conclusion

Ensuring the ethical development and deployment of autonomous agents requires a **multidisciplinary approach** focused on:

- **Transparency**
- **Accountability**
- **Fairness**

By addressing these ethical challenges, we can build a future where AI systems **benefit society** rather than **exacerbate inequalities**.

> Policymakers, ethicists, and technologists must **collaborate** to create **effective accountability structures** and **ethical guidelines** that balance **innovation** with **responsibility**.

It is essential to:

- Acknowledge the **limitations** and **biases** of AI.
- Consider the **diverse impacts** of AI development on various stakeholders and communities.

---

### 🛠️ Changes Made

- Included **detailed examples** of ethical issues and **potential mitigation strategies**.
- Enhanced the discussion of **trade-offs** between innovation and ethics.
- Defined technical terms (e.g., "autonomous agents", "AI systems") for clarity.
- Explicitly addressed **research limitations** and **community impact**.
- Strengthened the conclusion with actionable recommendations and a clear call to action.

`;

const ResearchSummary = ({ summary }) => {
  const displaySummary = summary || dummySummary;

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg mb-6 border border-[#ebdfd5]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-[#4b3f35] mb-4 text-center">Summary</h2>
      <div className="prose prose-lg max-w-none text-[#5f5244]">
        <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-2" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code className="bg-gray-800 text-yellow-300 px-1 py-0.5 rounded text-sm" {...props} />
                ) : (
                  <pre className="bg-gray-900 text-green-400 p-3 rounded-md overflow-auto text-sm mb-2">
                    <code {...props} />
                  </pre>
                ),
              strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-700 mb-2" {...props} />
              ),
            }}
        >
            {displaySummary}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default ResearchSummary;

