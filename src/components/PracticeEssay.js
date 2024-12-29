import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import { ClockIcon } from "@heroicons/react/24/solid";

const PracticeEssay = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [essay, setEssay] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(40 * 60);
  const [testCompleted, setTestCompleted] = useState(false);
  const [isGraded, setIsGraded] = useState(false);
  const [gradingResult, setGradingResult] = useState("");

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    if (timeRemaining > 0 && prompt && !testCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && prompt && !testCompleted) {
      setTestCompleted(true);
    }
  }, [timeRemaining, prompt, testCompleted]);

  const fetchPrompt = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Generate an ACT essay prompt with three perspectives. Here is a sample prompt for reference:
        
                                Intelligent Machines
        
                                Many of the goods and services we depend on daily are now supplied by intelligent, automated machines rather than human beings. Robots build cars and other goods on assembly lines, where once there were human workers. Many of our phone conversations are now conducted not with people but with sophisticated technologies. We can now buy goods at a variety of stores without the help of a human cashier. Automation is generally seen as a sign of progress, but what is lost when we replace humans with machines? Given the accelerating variety and prevalence of intelligent machines, it is worth examining the implications and meaning of their presence in our lives.
        
                                Read and carefully consider these perspectives. Each suggests a particular way of thinking about the increasing presence of intelligent machines.
        
                                Perspective One: What we lose with the replacement of people by machines is some part of our own humanity. Even our mundane daily encounters no longer require from us basic courtesy, respect, and tolerance for other people.
                                Perspective Two: Machines are good at low-skill, repetitive jobs, and at high-speed, extremely precise jobs. In both cases they work better than humans. This efficiency leads to a more prosperous and progressive world for everyone.
                                Perspective Three: Intelligent machines challenge our long-standing ideas about what humans are or can be. This is good because it pushes both humans and machines toward new, unimagined possibilities.
        
                                Extracurricular Activities and Codes of Conduct
        
                                For many students, extracurricular activities are a meaningful part of the high school experience. These activities allow students to develop their skills in areas such as sports, music, and drama while building relationships with peers and gaining experience performing or competing. But at many schools, students who participate in extracurricular activities are subject to special codes of conduct. These codes often establish high standards for academic performance and behavior, and students must meet the standards to stay eligible for their activities. Should students who participate in extracurricular activities be subject to special codes of conduct? Read and carefully consider these perspectives. Each suggests a particular way of thinking about the question above.
        
                                Perspective One: All school rules and standards must apply equally to every student. It is unfair to hold students who play sports or music to higher standards than students who do not.
                                Perspective Two: Participation in school activities is a privilege, not a right. It is fair to ask students to earn this privilege by studying hard and behaving themselves.
                                Perspective Three: School programs should be open to all students. Not all students can meet high standards, which means not all students can participate in extracurricular activities.
        
                                Essay Task: Write a unified, coherent essay in which you address the question of whether students who participate in extracurricular activities should be subject to special codes of conduct. In your essay, be sure to:
                                • clearly state your own perspective and analyze the relationship between your perspective and at least one other perspective
                                • develop and support your ideas with reasoning and examples
                                • organize your ideas clearly and logically
                                • communicate your ideas effectively in standard written English
                                Your perspective may be in full agreement with any of those given, in pa</main>rtial agreement, or completely different.
        
                                Here is a table organizing the rubric into categories for clarity:
        
                                | **Score** | **Ideas and Analysis**                                                                                                            | **Development and Support**                                                                                                      | **Organization**                                                                                                      | **Language Use**                                                                                                                                 |
                                |-----------|------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
                                | **6**     | The writer generates an argument that critically engages with multiple perspectives. Thesis reflects nuance and precision. Insightful context, examining implications, complexities, tensions, or values.                                            | Development of ideas and support deepen insight. Skillful reasoning and illustration effectively convey argument significance. Qualifications and complications bolster analysis.          | Skillful organizational strategy. Unified by a controlling idea. Logical progression enhances argument. Transitions strengthen relationships. | Skillful and precise word choice. Varied, clear sentence structures. Strategic and effective stylistic and register choices. Minor errors do not impede understanding. |
                                | **5**     | The writer generates an argument that productively engages with multiple perspectives. Thesis reflects precision. Thoughtful context addresses implications, complexities, or values.                                                          | Development deepens understanding. Purposeful reasoning and illustration convey argument significance. Qualifications enrich ideas.                      | Productive organizational strategy. Unified by a controlling idea. Logical sequencing contributes to effectiveness. Consistent transitions clarify relationships. | Precise word choice. Clear, varied sentence structures. Purposeful and productive stylistic choices. Minor errors do not impede understanding. |
                                | **4**     | The writer generates an argument engaging with multiple perspectives. Thesis reflects clarity. Relevant context recognizes implications, complexities, or values.                                    </div>                                     | Development clarifies meaning and purpose. Clear reasoning and illustration adequately convey argument significance. Qualifications extend analysis.       | Clear organizational strategy. Logical grouping and sequencing of ideas. Transitions clarify relationships.                                   | Adequate, sometimes precise word choice. Clear sentence structures with some variety. Appropriate stylistic choices. Errors rarely impede understanding. |
                                | **3**     | The writer generates an argument responding to multiple perspectives. Thesis reflects some clarity. Limited or tangential context. Simplistic or unclear analysis.                                                                            | Development mostly relevant but overly general or simplistic. Reasoning and illustration clarify argument but may be repetitious or imprecise.             | Basic organizational structure. Ideas largely grouped logically. Transitions sometimes clarify relationships.                                 | General, occasionally imprecise word choice. Usually clear sentence structures, little variety. Stylistic choices not always appropriate. Errors do not generally impede understanding. |
                                | **2**     | Weak response to multiple perspectives. Thesis lacks clarity or is only somewhat evident. Analysis incomplete or restates issue/perspectives.                                                                                               | Weak, confused, or disjointed development. Reasoning and illustration inadequate, illogical, or circular.                                                    | Rudimentary organizational structure. Grouping of ideas inconsistent or unclear. Poor transitions.                                              | Inconsistent, unclear word choice. Rudimentary and imprecise. Sometimes unclear sentence structures. Distracting errors may impede understanding. |
                                | **1**     | Fails to generate an intelligible argument. Intentions difficult to discern. Analysis unclear or irrelevant.                                                                                              | Ideas lack development, and claims lack support. Reasoning </main>and illustration unclear, incoherent, or absent.                                                  | No organizational structure. Ideas not grouped. Transitional devices fail to connect ideas.                                                    | Imprecise, difficult-to-comprehend word choice. Often unclear sentence structures. Errors pervasive and often impede understanding.              



                                YOU MUST MAKE 3 PERSPECTIVES OR THE USER CANNOT DO THE ESSAY. Also, don't make responses in your point of view. Refrain from saying "I", "I'm", "I am", etc.`,
          },
        ],
        max_tokens: 600,
      });

      if (response && response.choices && response.choices.length > 0) {
        setPrompt(response.choices[0].message.content.trim());
      } else {
        setError("Failed to fetch prompt. Please try again.");
      }
    } catch (err) {
      setError("Failed to make prompt. Please try again.");
      console.error("Error fetching prompt:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEssayChange = (e) => {
    setEssay(e.target.value);
  };

  const submitEssay = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an ACT essay grader. 
            ---

            **Writing Rubric**  

            | **Score** | **Ideas and Analysis**                                                                                                       | **Development and Support**                                                                                                      | **Organization**                                                                                                     | **Language Use**                                                                                                                                       |
            |-----------|-----------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
            | **6**     | The writer generates an argument that critically engages with multiple perspectives. The thesis reflects nuance and precision, offering insightful context by examining implications, complexities, tensions, or values. Relevance to the prompt is impeccable.                       | Development of ideas and support deepen insight. Skillful reasoning and illustration effectively convey argument significance. Qualifications and complications bolster analysis. Examples and evidence are highly relevant and enhance the argument.                      | Skillful organizational strategy. Unified by a controlling idea. Logical progression enhances argument. Transitions strengthen relationships. No unnecessary digressions. | Skillful and precise word choice. Varied, clear sentence structures. Strategic and effective stylistic and register choices. Minor errors do not impede understanding.                 |
            | **5**     | The writer generates an argument that productively engages with multiple perspectives. The thesis reflects precision, providing thoughtful context that addresses implications, complexities, or values. Ideas are consistently relevant to the topic.                        | Development deepens understanding. Purposeful reasoning and illustration convey argument significance. Qualifications enrich ideas. Examples and evidence are mostly relevant and strengthen the argument.                                       | Productive organizational strategy. Unified by a controlling idea. Logical sequencing contributes to effectiveness. Consistent transitions clarify relationships. Minimal distractions or irrelevant points. | Precise word choice. Clear, varied sentence structures. Purposeful and productive stylistic choices. Minor errors do not impede understanding.                                     |
            | **4**     | The writer generates an argument engaging with multiple perspectives. The thesis reflects clarity, supported by relevant context recognizing implications, complexities, or values. Occasional lapses in relevance or detail may appear.                         | Development clarifies meaning and purpose. Clear reasoning and illustration adequately convey argument significance. Qualifications extend analysis. Examples and evidence are appropriate but sometimes lack depth.                              | Clear organizational strategy. Logical grouping and sequencing of ideas. Transitions clarify relationships. Some minor points might be underdeveloped or misplaced.                     | Adequate, sometimes precise word choice. Clear sentence structures with some variety. Appropriate stylistic choices. Errors rarely impede understanding.                           |
            | **3**     | The writer generates an argument responding to multiple perspectives. The thesis reflects some clarity but may be overly simplistic. Context is limited, tangential, or vague. Relevance is inconsistent.                                                             | Development mostly relevant but overly general or simplistic. Reasoning and illustration clarify the argument but may be repetitious or imprecise. Examples may lack variety or depth.                                                    | Basic organizational structure. Ideas largely grouped logically. Transitions sometimes clarify relationships but may be abrupt. Irrelevant points or digressions may detract from clarity. | General, occasionally imprecise word choice. Usually clear sentence structures, with little variety. Stylistic choices not always appropriate. Errors do not generally impede understanding. |
            | **2**     | Weak response to multiple perspectives. The thesis lacks clarity or is only somewhat evident. Analysis is incomplete, repetitive, or largely restates the issue/perspectives. Relevance is weak or poorly maintained.                                                     | Weak, confused, or disjointed development. Reasoning and illustration are inadequate, illogical, or circular. Examples and evidence are minimal or irrelevant.                                                  | Rudimentary organizational structure. Grouping of ideas is inconsistent or unclear. Poor transitions. Disorganization diminishes the clarity of the argument.                            | Inconsistent, unclear word choice. Rudimentary and imprecise style. Sometimes unclear sentence structures. Distracting errors may impede understanding.                           |
            | **1**     | Fails to generate an intelligible argument. Intentions are difficult to discern. Analysis is unclear, irrelevant, or non-existent. The response is off-topic or lacks focus.                                                                                     | Ideas lack development, and claims lack support. Reasoning and illustration are unclear, incoherent, or absent. Examples and evidence are missing or nonsensical.                                            | No organizational structure. Ideas are not grouped. Transitional devices fail to connect ideas. Lack of organization hampers the ability to follow the argument.                        | Imprecise, difficult-to-comprehend word choice. Often unclear sentence structures. Errors are pervasive and frequently impede understanding.                                       |

            ---

            ### Additional Common-Sense Evaluation Criteria:
            1. **Relevance to Prompt:** Ensure that all arguments, examples, and ideas directly respond to the prompt or task.
            2. **Clarity of Argument:** The central claim (thesis) should be immediately identifiable and maintained throughout the piece.
            3. **Logical Reasoning:** Arguments must be logical and avoid fallacies. Support should be clear and coherent.
            4. **Depth of Analysis:** The essay should go beyond surface-level analysis to address deeper implications, contexts, or perspectives.
            5. **Engagement with the Audience:** Writing should be engaging and maintain the reader's interest through a compelling and well-structured narrative.
            6. **Appropriate Tone and Style:** Tone and style should suit the intended audience and purpose, whether formal or informal.
            7. **Balanced Approach:** Acknowledge counterarguments or alternative perspectives to strengthen credibility.
            8. **Error Impact:** While minor errors are acceptable, pervasive mistakes in grammar, spelling, or logic reduce overall effectiveness.

            Avoid using special formatting like bold words, tables, italics, etc. in your response. If you need to divide sections, use dashed lines like '--------'

            The ACT Writing Test is scored on a scale of 2 (lowest score) to 12 (highest score). 
`,
          },
          {
            role: "user",
            content: `Essay Prompt:
${prompt}

Student's Essay:
${essay}`,
          },
        ],
        max_tokens: 600,
      });

      if (response && response.choices && response.choices.length > 0) {
        const grading = response.choices[0].message.content.trim();
        setGradingResult(grading);
        setIsGraded(true);
      } else {
        setError("Failed to grade essay. Please try again.");
      }
    } catch (err) {
      setError("Failed to grade essay. Please try again.");
      console.error("Error grading essay:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isGraded) {
    return (
      <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
        <div className="max-w-6xl w-full px-6 py-8 rounded-2xl shadow-xl flex gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="text-emerald-500">Your Essay</span>
            </h2>
            <div className="p-4 rounded-lg mb-4 bg-neutral-800">
              <pre className="text-gray-300 whitespace-pre-line font-['Poppins']">
                {essay}
              </pre>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="text-emerald-500">Grading Result</span>
            </h2>
            <div className="p-4 rounded-lg mb-4 bg-neutral-800">
              <pre className="text-gray-300 whitespace-pre-line font-['Poppins']">
                {gradingResult}
              </pre>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (testCompleted && !isGraded) {
    return (
      <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
        <div className="max-w-2xl w-full px-6 py-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-emerald-500">Time's Up!</span>
          </h2>
          <textarea
            value={essay}
            onChange={handleEssayChange}
            className="w-full h-64 p-4 bg-neutral-800 text-white rounded-lg mb-4"
            placeholder="Write your essay here..."
            disabled
          />
          <button
            onClick={submitEssay}
            className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
            disabled={loading}
          >
            {loading ? "Submitting Essay..." : "Submit Essay for Grading"}
          </button>
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-900 min-h-screen text-white flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 py-2 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-1">
          <span className="text-emerald-500">Practice ACT Essay</span>
        </h2>
        <p className="text-center text-gray-300 mb-6">
          You will have 40 minutes to complete your essay. Good luck!
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {!prompt ? (
          <button
            onClick={fetchPrompt}
            className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
            disabled={loading}
          >
            {loading ? "Fetching Prompt..." : "Get Essay Prompt"}
          </button>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-xl">
                  {Math.floor(timeRemaining / 60)}:
                  {String(timeRemaining % 60).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="mt-6 bg-neutral-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Essay Prompt:</h3>
              <p className="text-gray-300 whitespace-pre-line">{prompt}</p>
            </div>
            <textarea
              value={essay}
              onChange={handleEssayChange}
              className="w-full h-64 p-4 bg-neutral-800 text-white rounded-lg mt-4"
              placeholder="Write your essay here..."
            />
            <button
              onClick={() => setTestCompleted(true)}
              className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition mt-4"
            >
              Finish Essay
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default PracticeEssay;
