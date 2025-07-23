// Free AI Service Configuration
class AIService {
  constructor() {
    this.provider = import.meta.env.VITE_AI_PROVIDER || 'mock';
    this.huggingFaceApiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    this.huggingFaceModel = import.meta.env.VITE_HUGGINGFACE_MODEL || 'microsoft/DialoGPT-medium';
    this.mockMode = import.meta.env.VITE_ENABLE_MOCK_AI === 'true';
  }

  async generateContent(prompt, options = {}) {
    if (this.mockMode || this.provider === 'mock') {
      return this.generateMockContent(prompt, options);
    }

    switch (this.provider) {
      case 'huggingface':
        return this.generateWithHuggingFace(prompt, options);
      case 'local':
        return this.generateWithLocalAI(prompt, options);
      default:
        return this.generateMockContent(prompt, options);
    }
  }

  async generateWithHuggingFace(prompt, options = {}) {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${this.huggingFaceModel}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.huggingFaceApiKey}`,
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
        model: this.huggingFaceModel
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
    const prompt = `Improve the following text for academic writing: ${text}`;
    return this.generateContent(prompt, options);
  }

  async checkGrammar(text) {
    // Mock grammar check results
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
      provider: this.provider
    };
  }

  async humanizeText(text) {
    const prompt = `Rewrite the following text to sound more natural and human-like while maintaining academic quality: ${text}`;
    return this.generateContent(prompt, { temperature: 0.8 });
  }

  async factCheck(text) {
    // Mock fact checking
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
      provider: this.provider
    };
  }
}

export default new AIService();