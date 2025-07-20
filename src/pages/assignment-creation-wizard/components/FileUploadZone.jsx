import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFileUpload, onTextInput, uploadedFiles = [], isUploading = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [inputMode, setInputMode] = useState('file'); // 'file' or 'text'

  const supportedFormats = [
    { ext: 'PDF', icon: 'FileText', color: 'text-red-500' },
    { ext: 'DOCX', icon: 'FileText', color: 'text-blue-500' },
    { ext: 'TXT', icon: 'File', color: 'text-gray-500' }
  ];

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      return ['pdf', 'docx', 'txt'].includes(extension);
    });
    
    if (validFiles.length > 0) {
      onFileUpload(validFiles);
    }
  }, [onFileUpload]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onTextInput(textInput);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return { icon: 'FileText', color: 'text-red-500' };
      case 'docx':
        return { icon: 'FileText', color: 'text-blue-500' };
      case 'txt':
        return { icon: 'File', color: 'text-gray-500' };
      default:
        return { icon: 'File', color: 'text-gray-500' };
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      {/* Mode Toggle */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-muted rounded-lg p-1 flex">
          <button
            onClick={() => setInputMode('file')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-academic ${
              inputMode === 'file' ?'bg-primary text-primary-foreground shadow-academic' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Upload" size={16} className="mr-2" />
            Upload File
          </button>
          <button
            onClick={() => setInputMode('text')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-academic ${
              inputMode === 'text' ?'bg-primary text-primary-foreground shadow-academic' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Type" size={16} className="mr-2" />
            Type Text
          </button>
        </div>
      </div>

      {inputMode === 'file' ? (
        <div>
          {/* File Upload Zone */}
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-academic
              ${dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }
              ${isUploading ? 'pointer-events-none opacity-50' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Upload" size={32} color="var(--color-primary)" />
              </div>
              
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  {isUploading ? 'Uploading...' : 'Drop your assignment files here'}
                </h3>
                <p className="text-text-secondary mb-4">
                  or click to browse your computer
                </p>
                
                <Button
                  variant="outline"
                  iconName="FolderOpen"
                  iconPosition="left"
                  disabled={isUploading}
                >
                  Choose Files
                </Button>
              </div>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="mt-4 flex items-center justify-center space-x-6">
            <span className="text-sm text-text-secondary">Supported formats:</span>
            {supportedFormats.map((format) => (
              <div key={format.ext} className="flex items-center space-x-1">
                <Icon name={format.icon} size={16} className={format.color} />
                <span className="text-sm text-text-secondary">{format.ext}</span>
              </div>
            ))}
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-medium text-text-primary">Uploaded Files:</h4>
              {uploadedFiles.map((file, index) => {
                const fileIcon = getFileIcon(file.name);
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Icon name={fileIcon.icon} size={20} className={fileIcon.color} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {formatFileSize(file.size)} • Uploaded {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-xs text-success">Ready</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Text Input Zone */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Assignment Requirements
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste your assignment requirements here...\n\nExample:\n- Write a 1500-word research paper on machine learning\n- Due date: July 25, 2025\n- Include at least 5 academic sources\n- APA citation format required"
                className="w-full h-64 p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-academic"
                disabled={isUploading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                {textInput.length} characters
              </span>
              <Button
                variant="default"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={handleTextSubmit}
                disabled={!textInput.trim() || isUploading}
              >
                Analyze Text
              </Button>
            </div>
          </div>

          {/* Rich Text Formatting Toolbar */}
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Info" size={14} />
              <span>
                Tip: Include specific details like word count, deadline, subject, and formatting requirements for better AI analysis
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;