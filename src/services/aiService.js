// OpenRouter AI Service Configuration
class AIService {
  constructor() {
    this.provider = import.meta.env.VITE_AI_PROVIDER || 'mock';
    this.openRouterApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    this.openRouterModel = import.meta.env.VITE_OPENROUTER_MODEL || 'anthropic/claude-3-haiku';
    this.openRouterApiUrl = import.meta.env.VITE_OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions';
    this.mockMode = import.meta.env.VITE_ENABLE_MOCK_AI === 'true';
  }

  async generateContent(prompt, options = {}) {
    if (this.mockMode || this.provider === 'mock') {
      return this.generateMockContent(prompt, options);
    }

    switch (this.provider) {
      case 'openrouter':
        return this.generateWithOpenRouter(prompt, options);
      case 'huggingface':
        return this.generateWithHuggingFace(prompt, options);
      case 'local':
        return this.generateWithLocalAI(prompt, options);
      default:
        return this.generateMockContent(prompt, options);
    }
  }

  async generateWithOpenRouter(prompt, options = {}) {
    try {
      const response = await fetch(this.openRouterApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AssignmentAI Pro'
        },
        body: JSON.stringify({
          model: this.openRouterModel,
          messages: [
            {
              role: 'system',
              content: 'You are an expert academic writing assistant. Provide high-quality, well-researched content that is original and follows academic standards.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: options.maxTokens || 2000,
          temperature: options.temperature || 0.7,
          top_p: options.topP || 0.9
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      return {
        content: result.choices?.[0]?.message?.content || 'Generated content would appear here.',
        provider: 'openrouter',
        model: this.openRouterModel,
        usage: result.usage
      };
    } catch (error) {
      console.warn('OpenRouter API failed, falling back to mock:', error);
      return this.generateMockContent(prompt, options);
    }
  }

  async generateWithHuggingFace(prompt, options = {}) {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_length: options.maxLength || 500,
              temperature: options.temperature || 0.7,
              do_sample: true,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const result = await response.json();
      return {
        content: result[0]?.generated_text || 'Generated content would appear here.',
        provider: 'huggingface',
        model: 'microsoft/DialoGPT-medium'
      };
    } catch (error) {
      console.warn('Hugging Face API failed, falling back to mock:', error);
      return this.generateMockContent(prompt, options);
    }
  }

  async generateWithLocalAI(prompt, options = {}) {
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: prompt,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Local AI error: ${response.status}`);
      }

      const result = await response.json();
      return {
        content: result.response || 'Generated content would appear here.',
        provider: 'local',
        model: 'llama2'
      };
    } catch (error) {
      console.warn('Local AI failed, falling back to mock:', error);
      return this.generateMockContent(prompt, options);
    }
  }

  generateMockContent(prompt, options = {}) {
    // Mock responses for different types of content
    const mockResponses = {
      introduction: `Artificial Intelligence (AI) has emerged as one of the most transformative technologies of the 21st century, fundamentally reshaping how we approach problem-solving across diverse domains. Machine learning, a subset of AI, has particularly gained prominence due to its ability to enable systems to learn and improve from experience without being explicitly programmed for every scenario.

The evolution of machine learning algorithms has been remarkable, progressing from simple linear regression models to sophisticated deep learning architectures that can process vast amounts of unstructured data. This progression has opened new possibilities in fields ranging from healthcare and finance to autonomous systems and natural language processing.`,

      methodology: `This research employs a mixed-methods approach combining quantitative analysis with qualitative insights. The methodology consists of three primary phases: data collection, analysis, and validation.

Data Collection: Primary data was gathered through structured surveys and interviews with domain experts. Secondary data was sourced from peer-reviewed academic publications and industry reports spanning the last five years.

Analysis Framework: The collected data underwent statistical analysis using established frameworks, with particular attention to identifying patterns and correlations that support the research hypotheses.`,

      conclusion: `The findings of this research demonstrate significant implications for both theoretical understanding and practical applications in the field. The evidence strongly supports the proposed hypotheses and contributes valuable insights to the existing body of knowledge.

Future research directions should focus on expanding the scope of investigation to include emerging technologies and their long-term societal impacts. Additionally, longitudinal studies would provide deeper insights into the evolving nature of these phenomena.`,

      default: `This section provides comprehensive analysis and discussion of the key concepts relevant to the research topic. The content demonstrates thorough understanding of the subject matter while maintaining academic rigor and scholarly tone throughout the presentation.

Key findings indicate significant relationships between the variables under investigation, with implications for both theoretical frameworks and practical applications in the field.`
    };

    // Determine content type based on prompt
    let contentType = 'default';
    if (prompt.toLowerCase().includes('introduction')) contentType = 'introduction';
    if (prompt.toLowerCase().includes('methodology')) contentType = 'methodology';
    if (prompt.toLowerCase().includes('conclusion')) contentType = 'conclusion';

    return {
      content: mockResponses[contentType],
      provider: 'mock',
      model: 'mock-ai-v1'
    };
  }

  async improveText(text, options = {}) {
    const prompt = `Improve the following text for academic writing while maintaining the original meaning and making it sound more natural and human-like: ${text}`;
    return this.generateContent(prompt, options);
  }

  async checkGrammar(text) {
    const prompt = `Check the following text for grammar, style, and clarity issues. Provide specific suggestions for improvement: ${text}`;
    const result = await this.generateContent(prompt);
    
    // Parse the result to extract grammar issues (simplified)
    return {
      issues: [
        {
          type: 'grammar',
          message: 'Consider using active voice',
          suggestion: 'Replace passive constructions with active voice',
          position: { start: 0, end: 10 }
        }
      ],
      score: 92,
      provider: this.provider,
      suggestions: result.content
    };
  }

  async humanizeText(text) {
    const prompt = `Rewrite the following text to sound more natural and human-like while maintaining academic quality and avoiding AI detection. Make it flow better and use more varied sentence structures: ${text}`;
    return this.generateContent(prompt, { temperature: 0.8 });
  }

  async factCheck(text) {
    const prompt = `Fact-check the following text and identify any claims that need verification or additional sources: ${text}`;
    const result = await this.generateContent(prompt);
    
    // Mock fact checking structure
    return {
      claims: [
        {
          text: 'Sample claim from the text',
          verified: true,
          confidence: 0.85,
          sources: ['Academic Source 1', 'Academic Source 2']
        }
      ],
      overallScore: 88,
      provider: this.provider,
      analysis: result.content
    };
  }

  async generateSection(sectionType, context = '', options = {}) {
    const prompts = {
      introduction: `Write an engaging academic introduction for a research paper about: ${context}. Include background information, problem statement, and thesis.`,
      literature_review: `Write a comprehensive literature review section about: ${context}. Include recent studies, theoretical frameworks, and research gaps.`,
      methodology: `Write a detailed methodology section for research about: ${context}. Include research design, data collection methods, and analysis procedures.`,
      results: `Write a results section presenting findings for research about: ${context}. Include data analysis and key findings.`,
      discussion: `Write a discussion section analyzing the implications of research about: ${context}. Include interpretation of results and limitations.`,
      conclusion: `Write a strong conclusion for a research paper about: ${context}. Summarize key findings and suggest future research directions.`
    };

    const prompt = prompts[sectionType] || `Write academic content about: ${context}`;
    return this.generateContent(prompt, options);
  }
}

export default new AIService();