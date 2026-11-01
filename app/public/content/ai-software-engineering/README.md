# AI + Software Engineering: Questions and Answers

**A practical learning guide to LLMs, AI application design, security, and production engineering.**

This guide progresses from foundational AI concepts to building and operating AI-enabled software. Expand each question after trying to answer it. Treat model output as a proposed result that must be validated against the application's requirements and trusted data.

## Contents

| Level | Focus |
|---|---|
| [1. LLM Fundamentals](#level-1-llm-fundamentals) | Models, tokens, context, inference, and limitations |
| [2. Prompt Engineering](#level-2-prompt-engineering) | Instructions, context, examples, and structured output |
| [3. Embeddings and Vector Databases](#level-3-embeddings-and-vector-databases) | Semantic representations and retrieval indexes |
| [4. Retrieval-Augmented Generation](#level-4-retrieval-augmented-generation-rag) | Retrieval, grounding, chunking, and citations |
| [5. AI Agents and MCP](#level-5-ai-agents-and-mcp) | Tools, agent loops, and Model Context Protocol |
| [6. AI Application Engineering](#level-6-ai-application-engineering) | Architecture, integration, workflows, and software practices |
| [7. LLM and AI Application Security](#level-7-llm-and-ai-application-security) | Prompt injection, data protection, and safe tool use |
| [8. Evaluation and Production](#level-8-evaluation-and-production) | Testing, monitoring, cost, latency, and governance |
| [Reference and Labs](#reference-and-practice-labs) | Architecture flow, checklists, and exercises |

> **Core principle:** Use an LLM where flexible language understanding or generation adds value. Keep critical authorization, business rules, and data integrity enforced by ordinary application code and trusted systems.

## Level 1: LLM Fundamentals

<details>
<summary>1. What is Artificial Intelligence?</summary>

**Answer:** Artificial Intelligence (AI) is a broad field focused on systems that perform tasks associated with capabilities such as perception, reasoning, language, and decision support. Machine learning is one approach within AI that learns patterns from data.

</details>

<details>
<summary>2. What is a Large Language Model (LLM)?</summary>

**Answer:** An LLM is a model trained on large collections of data to process and generate language-like sequences. It predicts likely next tokens based on its input and learned parameters. It can produce useful responses, but it does not guarantee factual correctness or human-like understanding.

</details>

<details>
<summary>3. What is a token?</summary>

**Answer:** A token is a unit of text or other input representation processed by a model. Tokens may be whole words, word parts, punctuation, or other symbols. Model limits and many API costs are measured in input and output tokens, not simply words.

</details>

<details>
<summary>4. What is a context window?</summary>

**Answer:** A context window is the maximum amount of input and generated content a model can consider for one request, measured in tokens. A larger window can hold more material but may increase cost and latency, and it does not ensure the model will use every detail accurately.

</details>

<details>
<summary>5. What is the difference between model training and inference?</summary>

**Answer:** Training adjusts model parameters using data and a learning objective. Inference uses the trained model to generate or classify outputs for new inputs. Calling a model API is normally inference, not training.

</details>

<details>
<summary>6. What is a transformer?</summary>

**Answer:** A transformer is a neural-network architecture that uses attention mechanisms to process relationships among input tokens. Many modern language models use transformer-based architectures, although implementations and training methods vary.

</details>

<details>
<summary>7. What does temperature control?</summary>

**Answer:** Temperature adjusts how much randomness is used when selecting generated tokens. Lower values tend to make outputs more repeatable; higher values tend to increase variation. It does not make an answer more factual, and exact behavior depends on the model provider.

</details>

<details>
<summary>8. What is a hallucination in an LLM?</summary>

**Answer:** A hallucination is an output that is fluent but unsupported, incorrect, or fabricated. Reduce its impact by grounding answers in trusted sources, asking for evidence, validating outputs, and abstaining or escalating when confidence is insufficient.

</details>

<details>
<summary>9. What is a multimodal model?</summary>

**Answer:** A multimodal model can process or produce more than one kind of data, such as text, images, audio, or video. Each modality has different preprocessing, privacy, accuracy, and evaluation considerations.

</details>

## Level 2: Prompt Engineering

<details>
<summary>10. What is prompt engineering?</summary>

**Answer:** Prompt engineering is the practice of designing and testing the instructions and context supplied to a model. It clarifies the task, constraints, source material, and expected response. It improves task fit but cannot guarantee correctness or replace application controls.

</details>

<details>
<summary>11. What makes a useful prompt?</summary>

**Answer:** A useful prompt states the task, relevant context, constraints, and desired output format. Separate trusted instructions from untrusted user or retrieved content, specify how uncertainty should be handled, and provide examples when they clarify the expected behavior.

</details>

<details>
<summary>12. What are system, developer, and user instructions?</summary>

**Answer:** Model APIs may distinguish instruction sources by role or priority. System-level instructions typically define broad behavior, developer instructions specify application behavior, and user messages contain the current request. Exact role names and precedence vary by API; none should be treated as a substitute for server-side authorization.

</details>

<details>
<summary>13. What is few-shot prompting?</summary>

**Answer:** Few-shot prompting includes a small number of input-output examples to demonstrate a desired pattern. It can help with formatting or task conventions, but examples consume context and may cause the model to copy incorrect patterns.

</details>

<details>
<summary>14. How should a prompt handle missing information?</summary>

**Answer:** Tell the model what evidence it may use and what to do when that evidence is insufficient, such as asking a clarifying question or returning an explicit “unknown” result. The application should still validate the response and enforce required fields.

</details>

<details>
<summary>15. What is structured output?</summary>

**Answer:** Structured output asks the model to return data in a defined schema, often JSON. Schema-constrained generation can make responses easier to process, but the application must parse and validate the result and check semantic rules that a schema cannot express.

</details>

<details>
<summary>16. How do you improve a prompt reliably?</summary>

**Answer:** Build representative examples, define measurable success criteria, change one meaningful factor at a time, and compare outputs across cases. Keep prompt versions with the code and test them against a fixed evaluation set rather than relying on one impressive response.

</details>

<details>
<summary>17. Why should untrusted text be clearly separated from instructions?</summary>

**Answer:** User input and retrieved documents may contain instructions that conflict with the application's intended task. Clear boundaries can reduce confusion, but the model may still follow malicious content. Enforce security decisions outside the prompt and test adversarial cases.

</details>

## Level 3: Embeddings and Vector Databases

<details>
<summary>18. What is an embedding?</summary>

**Answer:** An embedding is a numeric vector produced by a model to represent input such as text or an image. Similar inputs may have vectors that are close under a chosen distance measure. Embeddings support search and clustering; they are not guaranteed to capture every meaning or relationship.

</details>

<details>
<summary>19. What is semantic search?</summary>

**Answer:** Semantic search retrieves items based on similarity in meaning rather than only exact keyword matches. It commonly uses embeddings and vector similarity, and can be combined with keyword search to improve recall and precision.

</details>

<details>
<summary>20. What is a vector database?</summary>

**Answer:** A vector database stores vectors and supports similarity search, often alongside identifiers and metadata. Some relational and search databases also provide vector indexing. Choose based on scale, filtering needs, consistency, operations, and integration—not just the product label.

</details>

<details>
<summary>21. What is a similarity metric?</summary>

**Answer:** A similarity metric scores how close vectors are, using measures such as cosine similarity, dot product, or Euclidean distance. The embedding model and index configuration determine which metric is appropriate; scores are not universal confidence probabilities.

</details>

<details>
<summary>22. What are metadata filters in vector search?</summary>

**Answer:** Metadata filters restrict retrieval by attributes such as tenant, document type, date, or access label. Apply access control using trusted server-side identity and metadata; never rely on a user-supplied filter alone to protect another user's data.

</details>

<details>
<summary>23. What is hybrid search?</summary>

**Answer:** Hybrid search combines semantic vector retrieval with lexical or keyword retrieval. It can work better when exact identifiers, product codes, or rare terms matter alongside semantic similarity. Retrieval quality should be measured on representative queries.

</details>

<details>
<summary>24. What is an embedding model's dimension?</summary>

**Answer:** Dimension is the number of numeric values in each embedding vector. It affects storage and indexing cost, but more dimensions do not automatically mean better retrieval. Keep the embedding model and index configuration compatible when generating and querying vectors.

</details>

<details>
<summary>25. What should you consider when selecting a vector store?</summary>

**Answer:** Consider data scale, update and delete behavior, metadata filtering, access isolation, query latency, consistency, backup and recovery, operating model, and total cost. Evaluate it using the intended corpus and query workload.

</details>

## Level 4: Retrieval-Augmented Generation (RAG)

<details>
<summary>26. What is RAG?</summary>

**Answer:** Retrieval-Augmented Generation (RAG) retrieves relevant material from an external knowledge source and provides it to a generative model as context. It can make answers more grounded in current or private information without retraining the base model, but retrieval and generation can still fail.

</details>

<details>
<summary>27. What are the main stages of a RAG pipeline?</summary>

**Answer:** A typical pipeline ingests and cleans documents, splits them into chunks, creates embeddings, indexes chunks and metadata, retrieves candidates for a query, optionally reranks them, and supplies selected context to a model. The application then validates and presents the answer with appropriate source references.

</details>

<details>
<summary>28. What is chunking in RAG?</summary>

**Answer:** Chunking divides documents into smaller units for indexing and retrieval. Very small chunks may lose context; very large chunks may reduce retrieval precision and consume more context. Choose boundaries and overlap based on document structure and measured answer quality.

</details>

<details>
<summary>29. How is RAG different from fine-tuning?</summary>

**Answer:** RAG supplies selected external information at inference time and can be updated by changing the indexed corpus. Fine-tuning changes model behavior through additional training. RAG is often suited to changing factual knowledge; fine-tuning may suit consistent style or task behavior. They solve different problems and can be combined.

</details>

<details>
<summary>30. What is reranking in RAG?</summary>

**Answer:** Reranking re-scores an initial set of retrieved candidates using a model or ranking method to improve their order for a query. It can improve relevance but adds latency and cost; compare it against a measured baseline.

</details>

<details>
<summary>31. How do you evaluate retrieval quality?</summary>

**Answer:** Create representative questions with relevant source documents identified. Measure whether useful sources appear in the retrieved results, using metrics such as recall at a chosen cutoff and human review. Also test filters, access boundaries, freshness, and difficult queries.

</details>

<details>
<summary>32. Why include citations or source references in RAG answers?</summary>

**Answer:** References help users inspect the evidence behind an answer and can improve trust and reviewability. The application should verify that citations refer to retrieved material and avoid implying that a source supports claims it does not contain.

</details>

<details>
<summary>33. Does RAG eliminate hallucinations?</summary>

**Answer:** No. Retrieval may return irrelevant or incomplete content, and the model may misinterpret or ignore it. RAG should be evaluated end to end, with abstention behavior, source checks, answer validation, and escalation for high-impact decisions.

</details>

<details>
<summary>34. How should RAG handle document permissions?</summary>

**Answer:** Enforce access before or during retrieval using trusted identity and authorization data. Isolate tenant data, filter by server-controlled permissions, and test that unauthorized documents cannot influence answers or appear in citations.

</details>

## Level 5: AI Agents and MCP

<details>
<summary>35. What is an AI agent?</summary>

**Answer:** An AI agent is an application pattern where a model can select actions, use tools, observe results, and continue toward a goal. Agents can handle flexible workflows, but introduce nondeterminism, tool risks, cost, latency, and the need for bounded execution and oversight.

</details>

<details>
<summary>36. How does an agent loop work?</summary>

**Answer:** A typical loop provides the current task and state to a model, receives a proposed response or tool call, validates and executes an allowed tool, returns the result, and repeats until a stop condition is met. Limit iterations, tool permissions, time, and spend.

</details>

<details>
<summary>37. What is tool calling?</summary>

**Answer:** Tool calling lets a model propose a structured request to a function or external capability. The application—not the model—must validate arguments, authenticate the caller, authorize the action, execute it safely, and decide what result to return.

</details>

<details>
<summary>38. What is the difference between an AI agent and a fixed workflow?</summary>

**Answer:** A fixed workflow follows developer-defined steps and transitions. An agent can use model output to select among actions dynamically. Prefer a fixed workflow when the process is known and needs predictable behavior; use agent flexibility only when it adds enough value to justify its risks.

</details>

<details>
<summary>39. What is MCP?</summary>

**Answer:** The Model Context Protocol (MCP) is a protocol for connecting AI applications to external tools and context providers through a common interface. MCP standardizes parts of the integration, but applications still need to decide which servers and capabilities are trusted and authorized.

</details>

<details>
<summary>40. What are the host, client, and server roles in MCP?</summary>

**Answer:** An MCP host is the AI application coordinating the interaction. It may create MCP clients that connect to MCP servers, which expose capabilities such as tools or resources. Exact deployment and trust boundaries depend on the implementation.

</details>

<details>
<summary>41. What is the difference between an MCP tool and a resource?</summary>

**Answer:** A tool is an action the client can invoke, while a resource provides context or data for the client to read. Treat tool execution as a security-sensitive operation and apply least privilege, validation, and user approval where appropriate.

</details>

<details>
<summary>42. How should an application secure agent tools?</summary>

**Answer:** Expose only necessary tools, authenticate and authorize every operation, validate arguments, restrict reachable data and side effects, log actions safely, and require confirmation for high-impact changes. Never assume model intent is equivalent to user permission.

</details>

<details>
<summary>43. Why should an agent have limits?</summary>

**Answer:** Step, time, token, and tool-call limits prevent runaway loops, unbounded costs, and unintended action chains. Define clear stop conditions, safe failure behavior, and escalation paths for work the agent cannot complete reliably.

</details>

<details>
<summary>44. When should an AI workflow require human approval?</summary>

**Answer:** Require human review when actions are high impact, difficult to reverse, legally sensitive, or uncertain beyond an agreed threshold. Show reviewers the relevant evidence and proposed action, and record the decision without relying on the model to approve itself.

</details>

## Level 6: AI Application Engineering

<details>
<summary>45. What does it mean to build an AI feature as a software system?</summary>

**Answer:** It means treating the model as one dependency in an application: define a user need, inputs and outputs, data boundaries, failure behavior, tests, monitoring, and an owner. A prompt alone is not a complete product design.

</details>

<details>
<summary>46. What should an LLM application architecture include?</summary>

**Answer:** Common components include a client, application/API layer, authentication and authorization, model adapter, prompt or workflow management, optional retrieval and tools, output validation, observability, and data controls. Keep policy and business-critical decisions in trusted application services.

</details>

<details>
<summary>47. How should you choose a model?</summary>

**Answer:** Compare models on a representative evaluation set for task quality, latency, cost, context needs, language or modality, privacy, availability, and operational fit. Select the least complex model that meets requirements, and keep a fallback plan for outages or provider changes.

</details>

<details>
<summary>48. What is a model adapter?</summary>

**Answer:** A model adapter isolates provider-specific API details behind an application interface. It can centralize timeouts, retries, telemetry, request limits, and response normalization. Avoid hiding meaningful differences in model capabilities or safety behavior behind a false claim of interchangeability.

</details>

<details>
<summary>49. How should an application validate model output?</summary>

**Answer:** Parse structured output, validate its schema and business constraints, reject unsupported or malformed results, and handle refusals and incomplete responses. Use ordinary deterministic code for rules that must always hold.

</details>

<details>
<summary>50. How should an AI application handle a model timeout or provider outage?</summary>

**Answer:** Set request deadlines, bound retries with backoff, avoid retrying unsafe side effects, and define a fallback such as a graceful error, cached response, alternate model, or human workflow. Track provider failures separately from application errors.

</details>

<details>
<summary>51. How do you control latency and cost in an LLM application?</summary>

**Answer:** Measure input and output tokens, model latency, retrieval time, and tool calls. Reduce unnecessary context, set output limits, choose a fit-for-purpose model, cache safe reusable results, and cap agent steps. Do not cache personalized or sensitive responses without correct isolation and expiry.

</details>

<details>
<summary>52. How should teams use AI coding assistants safely?</summary>

**Answer:** Treat generated code as an untrusted draft. Review it for correctness, security, licensing and policy requirements, add tests, and run the normal build and static analysis. Do not send secrets, customer data, or proprietary source to a tool unless the organization has approved that use.

</details>

<details>
<summary>53. How do you integrate AI into an existing Java, Spring Boot, or React application?</summary>

**Answer:** Place model access behind a backend service that owns credentials, policy, rate limits, and validation. React should call the application's API rather than expose a provider key in browser code. A Java/Spring service can wrap provider calls behind a typed interface and return a stable application contract to the UI.

</details>

<details>
<summary>54. When should model output be cached?</summary>

**Answer:** Cache only when repeated requests are equivalent under the cache key and serving a prior result is acceptable. Include model and prompt versions plus relevant user or data scope in the key, set an expiry, and prevent cross-user or cross-tenant data leakage.

</details>

## Level 7: LLM and AI Application Security

<details>
<summary>55. What is prompt injection?</summary>

**Answer:** Prompt injection is an attempt to manipulate a model through input content so it ignores intended instructions or performs an unintended action. It can arrive directly from a user or indirectly through retrieved documents, web pages, or tool output.

</details>

<details>
<summary>56. What is indirect prompt injection?</summary>

**Answer:** Indirect prompt injection is malicious or conflicting instruction-like content embedded in data the application retrieves or processes. Treat retrieved documents and tool results as untrusted data, and do not let their text override application policy or grant authority.

</details>

<details>
<summary>57. Can prompt wording alone prevent prompt injection?</summary>

**Answer:** No. Clear instructions and content boundaries can help, but model behavior is probabilistic and untrusted content may still influence it. Protect systems with least-privilege tools, server-side authorization, strict output handling, and tests that assume prompts can fail.

</details>

<details>
<summary>58. How should an AI application handle sensitive data?</summary>

**Answer:** Minimize what is sent to a model, classify and redact data where appropriate, use approved providers and retention settings, protect logs, and enforce access controls before retrieval or generation. Document data flows and retention with privacy and security owners.

</details>

<details>
<summary>59. What is data leakage in an AI application?</summary>

**Answer:** Data leakage occurs when information is exposed to an unauthorized user, model provider, log, or downstream tool. Causes can include weak tenant isolation, overly broad retrieval, unsafe output rendering, secrets in prompts, or excessive observability capture.

</details>

<details>
<summary>60. How do you prevent an AI agent from exceeding user permissions?</summary>

**Answer:** Bind every tool call to the authenticated user's server-side identity and authorize each action against the specific resource. Do not give an agent a broad service credential and rely on the model to decide whether access is appropriate.

</details>

<details>
<summary>61. What is RAG data poisoning?</summary>

**Answer:** RAG data poisoning is the insertion or modification of corpus content intended to distort retrieval or generated answers. Protect ingestion with source validation, access controls, provenance, review for sensitive collections, and monitoring for unexpected content changes.

</details>

<details>
<summary>62. How should AI-generated output be treated in a web application?</summary>

**Answer:** Treat it as untrusted input. Validate it against an expected schema, encode it for its output context, avoid executing generated code or commands automatically, and apply normal authorization and review before any consequential action.

</details>

<details>
<summary>63. What is AI application security?</summary>

**Answer:** AI application security protects the full system around a model: user identity, prompts, retrieved data, tools, model APIs, outputs, logs, and deployment. Threat-model trust boundaries and failure modes, apply ordinary application security controls, and add AI-specific testing for prompt manipulation and unsafe tool use.

</details>

<details>
<summary>64. Why is hiding the system prompt not a security boundary?</summary>

**Answer:** A prompt may be exposed, inferred, or ignored, and it cannot enforce permissions by itself. Keep secrets and authorization logic out of prompts; use server-side policy checks and narrowly scoped capabilities.

</details>

<details>
<summary>65. What security risks should be considered when using MCP servers?</summary>

**Answer:** Consider server provenance, authentication, tool permissions, data returned, side effects, dependency updates, and whether untrusted content can influence tool use. Approve servers deliberately, restrict capabilities, protect credentials, and log actions with appropriate privacy controls.

</details>

## Level 8: Evaluation and Production

<details>
<summary>66. How do you evaluate an LLM feature?</summary>

**Answer:** Define task-specific success criteria and build a representative set of inputs with expected properties or reviewed answers. Evaluate quality, groundedness, refusal behavior, latency, cost, and safety. Combine automated metrics with human review for subjective or high-impact tasks.

</details>

<details>
<summary>67. What is an AI evaluation dataset?</summary>

**Answer:** It is a versioned collection of representative inputs and expected outcomes or scoring guidance used to compare system changes. Include ordinary cases, edge cases, failures, and adversarial examples, while protecting sensitive data and preventing test leakage into production prompts.

</details>

<details>
<summary>68. How do you evaluate a RAG system separately from its language model?</summary>

**Answer:** Evaluate retrieval relevance and coverage independently from answer quality, then test the complete pipeline. A poor answer may result from missing sources, bad chunking, incorrect filtering, or generation behavior; separating stages makes debugging more effective.

</details>

<details>
<summary>69. What should you monitor in production?</summary>

**Answer:** Monitor availability, latency, errors, token use, cost, retrieval quality signals, tool-call outcomes, user feedback, and safety events. Avoid logging full prompts or responses by default when they may contain sensitive information.

</details>

<details>
<summary>70. Why version prompts, models, and retrieval configuration?</summary>

**Answer:** These components affect application behavior. Versioning them enables reproducible evaluations, controlled rollout, incident investigation, and rollback. Record provider/model identifiers and relevant configuration without storing secrets or unnecessary personal data.

</details>

<details>
<summary>71. How should an AI feature be rolled out?</summary>

**Answer:** Start with a bounded use case, test offline, run in a limited or shadow mode when appropriate, monitor quality and safety, and expand only when evidence supports it. Keep a rollback path and a non-AI fallback for critical workflows.

</details>

<details>
<summary>72. What is human-in-the-loop AI?</summary>

**Answer:** Human-in-the-loop design keeps a person responsible for review, correction, or approval at meaningful decision points. It is useful when errors have significant consequences, but reviewers need clear evidence, appropriate authority, and a manageable workload.

</details>

<details>
<summary>73. What is responsible AI governance?</summary>

**Answer:** Responsible AI governance defines ownership, acceptable use, data handling, evaluation, human oversight, incident processes, and ongoing review. It should be proportional to the application's impact and aligned with organizational and legal requirements.

</details>

## Reference and Practice Labs

### Typical RAG Flow

```text
Documents
   -> Parse and clean
   -> Split into chunks
   -> Create embeddings
   -> Store vectors + metadata

User question
   -> Authenticate and authorize
   -> Retrieve permitted relevant chunks
   -> Build prompt with bounded context
   -> Generate response
   -> Validate output and references
   -> Return answer with appropriate citations
```

### AI Application Design Checklist

| Area | Questions |
|---|---|
| User value | What task improves, and how will success be measured? |
| Model choice | Does the model meet quality, latency, cost, and privacy needs? |
| Data | What information leaves the application, and who may retrieve it? |
| Output | Is the response parsed, validated, and safe for its destination? |
| Tools | Are actions narrowly scoped, authorized, bounded, and auditable? |
| Security | Have prompt injection, data leakage, and tenant isolation been tested? |
| Reliability | What happens on timeout, refusal, malformed output, or provider outage? |
| Evaluation | Are prompts, models, and retrieval changes tested against representative cases? |
| Operations | Can the feature be monitored, rolled back, and supported by an owner? |

### Practice Labs

| Lab | Exercise |
|---|---|
| Prompt evaluation | Create a small set of representative prompts and compare prompt versions against explicit success criteria. |
| Embedding search | Index public or synthetic documents, run semantic and keyword searches, and compare retrieved results. |
| RAG prototype | Build a local Q&A flow over non-sensitive documents; return source references and test missing-answer behavior. |
| AI security review | Threat-model a sample AI feature for direct/indirect prompt injection, data access, and tool side effects. |
| Structured output | Request schema-constrained data, validate it in application code, and test malformed or incomplete results. |
| Cost and latency | Record tokens, latency, retrieval time, and tool calls for a fixed evaluation set; identify a measured optimization. |
| Coding assistant review | Use an approved coding assistant on a small task, then review the patch, tests, security implications, and generated dependencies. |

### Final Reminder

An AI feature is software with a probabilistic component. Keep data access, authorization, business invariants, and consequential actions under explicit application control. Measure the complete experience, not only whether the model returns fluent text.
