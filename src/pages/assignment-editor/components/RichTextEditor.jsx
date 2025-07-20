import React, { useState, useRef, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const RichTextEditor = ({
  content = '',
  onChange,
  onSave,
  onAutoSave,
  wordCount = 0,
  targetWordCount = 3000,
  readOnly = false
}) => {
  const [editorContent, setEditorContent] = useState(content);
  const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const editorRef = useRef(null);

  const mockContent = `# Advanced Machine Learning Research Paper

## Introduction

Machine learning has revolutionized numerous fields, from computer vision to natural language processing. This research paper explores the latest developments in deep learning architectures and their applications in solving complex real-world problems.

The rapid advancement of artificial intelligence has created unprecedented opportunities for innovation across industries. **Recent breakthroughs** in transformer architectures, particularly the attention mechanism, have demonstrated remarkable capabilities in understanding and generating human-like text.

## Literature Review

### Theoretical Framework

The foundation of modern machine learning rests on several key principles:

1. **Statistical Learning Theory** - Provides the mathematical framework for understanding generalization
2. **Optimization Theory** - Enables efficient training of complex models
3. **Information Theory** - Guides the design of efficient representations

### Recent Studies

Recent research by *Vaswani et al. (2017)* introduced the transformer architecture, which has become the backbone of modern NLP systems. The paper "Attention Is All You Need" demonstrated that self-attention mechanisms could replace recurrent and convolutional layers entirely.

> "The Transformer model architecture has fundamentally changed how we approach sequence-to-sequence tasks in natural language processing."

## Methodology

Our research methodology combines theoretical analysis with empirical evaluation. We implement several state-of-the-art models and evaluate their performance on standardized benchmarks.

### Data Collection

The dataset consists of over 100,000 samples collected from various sources, ensuring diversity and representativeness of the target domain.

### Model Architecture

We propose a novel architecture that combines the strengths of:
- Convolutional neural networks for local feature extraction
- Recurrent neural networks for sequential modeling  
- Attention mechanisms for long-range dependencies

## Results

[This section will be populated with experimental results and analysis]

## Discussion

[Analysis and interpretation of results will be added here]

## Conclusion

[Summary and future work directions will be included]

---

*Word count: 2,847 / 3,000 target*`;

  const displayContent = editorContent || mockContent;

  useEffect(() => {
    const timer = setInterval(() => {
      if (hasUnsavedChanges) {
        onAutoSave?.(editorContent);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(timer);
  }, [editorContent, hasUnsavedChanges, onAutoSave]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setEditorContent(newContent);
    setHasUnsavedChanges(true);
    onChange?.(newContent);
  };

  const handleSave = () => {
    onSave?.(editorContent);
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  const formatText = (format) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editorContent.substring(start, end);
    
    let formattedText = selectedText;
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading1':
        formattedText = `# ${selectedText}`;
        break;
      case 'heading2':
        formattedText = `## ${selectedText}`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        break;
    }

    const newContent = editorContent.substring(0, start) + formattedText + editorContent.substring(end);
    setEditorContent(newContent);
    setHasUnsavedChanges(true);
    onChange?.(newContent);
  };

  const insertCitation = () => {
    const citation = '(Author, Year)';
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newContent = editorContent.substring(0, start) + citation + editorContent.substring(start);
    setEditorContent(newContent);
    setHasUnsavedChanges(true);
    onChange?.(newContent);
  };

  const calculateWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const currentWordCount = calculateWordCount(displayContent);
  const progressPercentage = (currentWordCount / targetWordCount) * 100;

  const formatLastSaved = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just saved';
    if (minutes < 60) return `Saved ${minutes}m ago`;
    return `Saved at ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Toolbar */}
      <div className="border-b border-border p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Save"
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className={hasUnsavedChanges ? 'text-primary' : 'text-text-secondary'}
            >
              Save
            </Button>
            
            <div className="h-4 w-px bg-border" />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Undo"
              onClick={() => {}}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Redo"
              onClick={() => {}}
            />
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-text-secondary">
              {formatLastSaved(lastSaved)}
            </span>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {currentWordCount.toLocaleString()} / {targetWordCount.toLocaleString()}
              </span>
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    progressPercentage >= 100 ? 'bg-success' : 
                    progressPercentage >= 80 ? 'bg-warning' : 'bg-primary'
                  }`}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            iconName="Bold"
            onClick={() => formatText('bold')}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Italic"
            onClick={() => formatText('italic')}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Underline"
            onClick={() => formatText('underline')}
          />
          
          <div className="h-4 w-px bg-border" />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Heading1"
            onClick={() => formatText('heading1')}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Heading2"
            onClick={() => formatText('heading2')}
          />
          
          <div className="h-4 w-px bg-border" />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="List"
            onClick={() => formatText('list')}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="ListOrdered"
            onClick={() => formatText('orderedList')}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Quote"
            onClick={() => formatText('quote')}
          />
          
          <div className="h-4 w-px bg-border" />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Link"
            onClick={() => formatText('link')}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Code"
            onClick={() => formatText('code')}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Quote"
            onClick={insertCitation}
          >
            Cite
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <textarea
          ref={editorRef}
          value={displayContent}
          onChange={handleContentChange}
          readOnly={readOnly}
          className="w-full h-full p-6 resize-none border-none outline-none bg-transparent text-text-primary font-body leading-relaxed"
          placeholder="Start writing your assignment..."
          style={{ 
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'Source Sans Pro, sans-serif'
          }}
        />
        
        {/* Floating word count indicator */}
        <div className="absolute bottom-4 right-4 bg-surface border border-border rounded-lg px-3 py-2 shadow-academic">
          <div className="text-xs text-text-secondary">
            <div className="flex items-center space-x-2">
              <span>{currentWordCount.toLocaleString()} words</span>
              <div className={`w-2 h-2 rounded-full ${
                progressPercentage >= 100 ? 'bg-success' : 
                progressPercentage >= 80 ? 'bg-warning' : 'bg-primary'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;