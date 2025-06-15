// app/lib/sampleTexts.js

/**
 * Enhanced sample texts for different analysis types
 * With multiple variations per type
 */
export const sampleTexts = {
  pragmatic: [
    {
      text: `I'd appreciate it if you could review this proposal by Friday. We need to incorporate your feedback before submitting the final version to the client. The improvements you suggested last time were extremely helpful, so your input would be valuable again.`,
      prompt: "Analyze the pragmatic context and speech acts in this professional message."
    },
    {
      text: `Could you possibly turn down the music a bit? I have an important call in five minutes, and it might be difficult for me to hear properly. I'd really appreciate it.`,
      prompt: "Examine the politeness strategies and implicit requests in this interpersonal communication."
    },
    {
      text: `Due to circumstances beyond our control, we regret to inform you that the event scheduled for March 15th has been postponed. We understand this may cause inconvenience and sincerely apologize. A new date will be announced as soon as possible. Tickets already purchased will remain valid for the rescheduled event.`,
      prompt: "Analyze the face-saving strategies and implicatures in this announcement."
    },
    {
      text: `While I understand your position, I must respectfully disagree. The data clearly indicates a 15% increase in customer satisfaction after implementing the new system. Perhaps we're looking at different metrics? I'd be happy to walk through the analysis with you.`,
      prompt: "Examine the pragmatic strategies used to disagree while maintaining professional courtesy."
    }
  ],
  
  conversational: [
    {
      text: `John: Hi Sarah, how are you doing today?\nSarah: I'm fine, thanks. How about you?\nJohn: Pretty good. Did you have a chance to look at the report I sent?\nSarah: Yes, I did. I thought it was really comprehensive, but I had a few questions about the data sources.\nJohn: Of course. What would you like to know?`,
      prompt: "Analyze the conversation patterns and turn-taking dynamics in this dialogue."
    },
    {
      text: `Teacher: Today we'll be discussing the causes of World War I. Can anyone tell me one of the major factors?\nStudent 1: Wasn't it the assassination of Archduke Franz Ferdinand?\nTeacher: Exactly! That was the immediate trigger. What else?\nStudent 2: I think there were also tensions between European powers over colonies and resources.\nTeacher: Excellent point. These imperial rivalries created significant tensions.\nStudent 3: Weren't there also military alliances that pulled countries into the conflict?\nTeacher: Yes, that's another crucial factor. The alliance system meant that what began as a local conflict quickly escalated.`,
      prompt: "Analyze the IRF (Initiation-Response-Feedback) pattern in this classroom dialogue."
    },
    {
      text: `Customer: Hi, I'm having trouble with my internet connection. It keeps dropping every few minutes.\nAgent: I'm sorry to hear that. I'd be happy to help you resolve this issue. Can you tell me when you first noticed the problem?\nCustomer: It started yesterday evening, around 8 PM.\nAgent: Thank you for that information. Have you tried restarting your router?\nCustomer: Yes, I've done that twice, but it didn't help.\nAgent: I understand how frustrating that can be. Let me check if there are any outages in your area. Could I have your address, please?\nCustomer: Sure, it's 123 Main Street, Apartment 4B.`,
      prompt: "Examine the problem-solving discourse structure and politeness strategies in this service interaction."
    },
    {
      text: `Person A: So, what did you think of the presentation?\nPerson B: Well...\nPerson A: You didn't like it?\nPerson B: I wouldn't say that exactly. It had some interesting points.\nPerson A: But?\nPerson B: But I think it could have been more focused. There were too many tangents.\nPerson A: I see what you mean. I thought the same thing about the middle section.\nPerson B: Right! And the slides were so cluttered with text.\nPerson A: Absolutely. Less would have been more in this case.`,
      prompt: "Analyze how hedging and indirect evaluation are used in this professional critique."
    }
  ],
  
  semantic: [
    {
      text: `The quantum theory revolutionized our understanding of atomic and subatomic processes. Unlike classical physics, quantum mechanics describes a world where particles can exist in multiple states simultaneously. This wave-particle duality challenges our intuitive understanding of reality and introduces probabilistic rather than deterministic models of prediction.`,
      prompt: "Analyze the semantic networks and conceptual relationships in this scientific explanation."
    },
    {
      text: `The economic downturn cast a long shadow over the city. Small businesses folded like paper boats in a storm, while unemployment numbers soared to dizzying heights. The once-bustling downtown fell silent, its storefronts vacant eyes staring out at empty streets. Yet beneath this frozen surface, seeds of innovation were taking root, waiting for the economic thaw.`,
      prompt: "Analyze the metaphorical language and semantic fields in this economic description."
    },
    {
      text: `Sustainable architecture integrates environmental considerations with innovative design principles. These eco-conscious buildings minimize energy consumption through strategic orientation, natural lighting, and efficient insulation. Additionally, they often incorporate renewable materials, solar panels, green roofs, and rainwater harvesting systems. The goal transcends mere functionality—it aims to create structures that coexist harmoniously with nature while reducing ecological footprints.`,
      prompt: "Identify the semantic domains and lexical cohesion in this description of sustainable architecture."
    },
    {
      text: `The human memory system operates through three primary processes: encoding, storage, and retrieval. During encoding, sensory information is transformed into mental representations. Storage involves maintaining these encoded memories across short-term and long-term systems. Retrieval occurs when we access these stored memories, bringing them back into conscious awareness. Each process is essential; a breakdown in any one component can result in forgetting or memory distortion.`,
      prompt: "Analyze the semantic structure and terminology networks in this psychological explanation."
    }
  ],
  
  discourse: [
    {
      text: `In recent decades, climate change has emerged as an unprecedented threat to global ecosystems. Scientific evidence overwhelmingly indicates that human activities are the primary driver of rising global temperatures. Despite this consensus, political action remains insufficient. While some nations have implemented ambitious carbon reduction targets, others continue to prioritize short-term economic interests over long-term environmental sustainability. This disparity highlights the fundamental tension between immediate national concerns and collective global responsibility.`,
      prompt: "Analyze the discourse structure and argumentative strategies in this climate change commentary."
    },
    {
      text: `Recent research has demonstrated a significant correlation between sleep quality and cognitive performance. In a longitudinal study conducted by Reynolds et al. (2023), participants who reported consistently good sleep demonstrated superior performance on memory and attention tasks compared to those with poor sleep hygiene. These findings align with previous work by Zhang and Patel (2021), who identified specific neurological mechanisms underlying sleep-dependent memory consolidation. However, it should be noted that individual differences in circadian rhythms may moderate these effects, as suggested by Morgan's (2022) twin studies.`,
      prompt: "Examine the academic discourse features and intertextual connections in this research summary."
    },
    {
      text: `The company must prioritize digital transformation to remain competitive in today's market. By implementing cloud-based solutions, we can enhance operational efficiency while reducing IT infrastructure costs. Furthermore, data analytics capabilities will enable better decision-making across all departments. Our competitors have already embraced these technologies, and we risk falling behind if we delay action. Therefore, I propose allocating 15% of next year's budget to these initiatives.`,
      prompt: "Analyze the persuasive discourse strategies and organizational rhetoric in this business proposal."
    },
    {
      text: `While traditional approaches to education emphasized rote memorization and standardized assessment, contemporary pedagogical theories prioritize critical thinking, creativity, and personalized learning pathways. This shift reflects broader societal changes: in an era of unlimited information access, the ability to analyze, evaluate, and synthesize knowledge has become more valuable than the mere possession of facts. Nevertheless, we must acknowledge that foundational knowledge remains essential—innovation cannot occur in a vacuum of basic understanding.`,
      prompt: "Examine the contrastive discourse structure and educational terminology in this pedagogical discussion."
    }
  ],
  
  enunciation: [
    {
      text: `Peter Piper picked a peck of pickled peppers. How many pickled peppers did Peter Piper pick? If Peter Piper picked a peck of pickled peppers, where's the peck of pickled peppers Peter Piper picked?`,
      prompt: "Analyze the alliterative patterns and articulatory challenges in this tongue twister."
    },
    {
      text: `Ladies and gentlemen, distinguished guests, and honored colleagues. It is with immense pleasure that I welcome you to our annual conference on linguistic innovation. Today, we stand at the intersection of tradition and transformation, exploring how language evolves while preserving its essential communicative function.`,
      prompt: "Examine the formal pronunciation patterns and rhetorical pauses appropriate for this speech introduction."
    },
    {
      text: `The supercalifragilisticexpialidocious nature of multisyllabic terminology can perplex inexperienced orators. Particularly problematic are instances of consonant clustering, such as in "strengths" or "sixths," which require precise articulatory transitions. Furthermore, prosodic features including stress placement, intonation contours, and rhythmic patterning contribute substantially to intelligibility.`,
      prompt: "Analyze the pronunciation challenges and syllabic complexity in this deliberately difficult text."
    },
    {
      text: `How now, brown cow? Round and round the rugged rocks the ragged rascal ran. She sells seashells by the seashore. Truly rural. Red leather, yellow leather. Unique New York. Toy boat, toy boat, toy boat.`,
      prompt: "Identify the specific articulatory challenges in these elocution exercises."
    }
  ],
  
  custom: [
    {
      text: `Enter your text for analysis here. The type of text you provide will influence the results, so consider the features that are relevant to the selected analysis type.`,
      prompt: "Enter a custom prompt for analyzing your text."
    },
    {
      text: `The analysis platform provides multiple approaches to examining linguistic features. Users can select from pragmatic, semantic, conversational, or discourse analysis types. Each analytical framework highlights different aspects of language use and structure.`,
      prompt: "Create a custom analysis focused on the specialized terminology and explanatory structures in this text."
    },
    {
      text: `Technology continues to transform how we communicate and process language. Natural language processing algorithms can now identify patterns and features that reveal both explicit and implicit meanings in text. These computational approaches complement traditional linguistic analysis methods.`,
      prompt: "Develop a custom analysis framework that examines the interaction between technological and linguistic concepts in this text."
    },
    {
      text: `In effective communication, what remains unsaid can be as significant as what is explicitly stated. Context, shared knowledge, and cultural assumptions all influence how messages are interpreted. A comprehensive analysis must therefore consider both textual features and extra-linguistic factors.`,
      prompt: "Design a custom analytical approach that balances structural, semantic, and pragmatic dimensions of this text."
    }
  ]
};

/**
 * Get a random sample text for the specified analysis type
 * @param {string} analysisType - The type of analysis
 * @returns {Object} Sample text object with text and prompt properties
 */
export function getRandomSampleText(analysisType) {
  const samples = sampleTexts[analysisType] || sampleTexts.custom;
  return samples[Math.floor(Math.random() * samples.length)];
}

/**
 * Get the next sample text in rotation for the specified analysis type
 * @param {string} analysisType - The type of analysis
 * @param {string} currentText - The current text being displayed
 * @returns {Object} Sample text object with text and prompt properties
 */
export function getNextSampleText(analysisType, currentText) {
  const samples = sampleTexts[analysisType] || sampleTexts.custom;
  
  // Find the index of the current text
  const currentIndex = samples.findIndex(sample => sample.text === currentText);
  
  // Get the next sample (or the first if at the end or not found)
  const nextIndex = (currentIndex >= 0 && currentIndex < samples.length - 1) 
    ? currentIndex + 1 
    : 0;
  
  return samples[nextIndex];
}