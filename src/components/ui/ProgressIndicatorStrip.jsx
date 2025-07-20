import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ProgressIndicatorStrip = ({
  currentStep = 1,
  steps = [
    { id: 1, title: 'Assignment Details', description: 'Basic information and requirements', completed: true },
    { id: 2, title: 'Content Preferences', description: 'Style, tone, and formatting options', completed: true },
    { id: 3, title: 'Research Sources', description: 'Reference materials and citations', completed: false },
    { id: 4, title: 'AI Configuration', description: 'Processing parameters and quality settings', completed: false },
    { id: 5, title: 'Review & Submit', description: 'Final verification before processing', completed: false }
  ],
  onStepClick,
  allowBackNavigation = true,
  showDescriptions = true
}) => {
  const getStepStatus = (step) => {
    if (step.completed) return 'completed';
    if (step.id === currentStep) return 'current';
    if (step.id < currentStep) return 'completed';
    return 'upcoming';
  };

  const getStepIcon = (step) => {
    const status = getStepStatus(step);
    switch (status) {
      case 'completed':
        return 'Check';
      case 'current':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const getStepStyles = (step) => {
    const status = getStepStatus(step);
    switch (status) {
      case 'completed':
        return {
          container: 'text-success',
          icon: 'bg-success text-success-foreground',
          connector: 'bg-success'
        };
      case 'current':
        return {
          container: 'text-primary',
          icon: 'bg-primary text-primary-foreground ring-4 ring-primary/20',
          connector: 'bg-border'
        };
      default:
        return {
          container: 'text-text-secondary',
          icon: 'bg-muted text-muted-foreground border-2 border-border',
          connector: 'bg-border'
        };
    }
  };

  const handleStepClick = (step) => {
    if (allowBackNavigation && (step.completed || step.id <= currentStep)) {
      onStepClick?.(step);
    }
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="px-6 py-4">
        {/* Desktop Horizontal Layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const styles = getStepStyles(step);
              const isClickable = allowBackNavigation && (step.completed || step.id <= currentStep);
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  {/* Step Circle and Content */}
                  <div 
                    className={`flex items-center space-x-3 ${isClickable ? 'cursor-pointer' : ''}`}
                    onClick={() => handleStepClick(step)}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-academic
                      ${styles.icon}
                    `}>
                      {getStepStatus(step) === 'completed' ? (
                        <Icon name={getStepIcon(step)} size={16} />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    
                    <div className={`${styles.container}`}>
                      <h3 className="text-sm font-medium font-heading">
                        {step.title}
                      </h3>
                      {showDescriptions && (
                        <p className="text-xs opacity-75 mt-0.5">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className={`h-0.5 ${styles.connector} transition-academic`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Layout */}
        <div className="md:hidden">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const styles = getStepStyles(step);
              const isClickable = allowBackNavigation && (step.completed || step.id <= currentStep);
              
              return (
                <div key={step.id} className="flex items-start space-x-3">
                  {/* Step Circle */}
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-academic flex-shrink-0
                    ${styles.icon} ${isClickable ? 'cursor-pointer' : ''}
                  `}
                    onClick={() => handleStepClick(step)}
                  >
                    {getStepStatus(step) === 'completed' ? (
                      <Icon name={getStepIcon(step)} size={12} />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className={`flex-1 ${styles.container}`}>
                    <h3 className="text-sm font-medium font-heading">
                      {step.title}
                    </h3>
                    {showDescriptions && (
                      <p className="text-xs opacity-75 mt-1">
                        {step.description}
                      </p>
                    )}
                  </div>

                  {/* Current Step Indicator */}
                  {getStepStatus(step) === 'current' && (
                    <div className="flex items-center space-x-1 text-xs text-primary">
                      <Icon name="ArrowRight" size={12} />
                      <span>Current</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Actions */}
        {onStepClick && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              iconPosition="left"
              onClick={() => {
                const prevStep = steps.find(s => s.id === currentStep - 1);
                if (prevStep && allowBackNavigation) {
                  onStepClick(prevStep);
                }
              }}
              disabled={currentStep <= 1 || !allowBackNavigation}
            >
              Previous
            </Button>

            <div className="text-xs text-text-secondary">
              Step {currentStep} of {steps.length}
            </div>

            <Button
              variant="default"
              size="sm"
              iconName="ChevronRight"
              iconPosition="right"
              onClick={() => {
                const nextStep = steps.find(s => s.id === currentStep + 1);
                if (nextStep) {
                  onStepClick(nextStep);
                }
              }}
              disabled={currentStep >= steps.length}
            >
              {currentStep >= steps.length ? 'Complete' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicatorStrip;