import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationToast = ({
  notifications = [],
  onDismiss,
  onDismissAll,
  position = 'top-right',
  maxVisible = 5
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, maxVisible));
  }, [notifications, maxVisible]);

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-success/10 border-success/20 text-success',
          icon: 'CheckCircle',
          iconColor: 'var(--color-success)'
        };
      case 'warning':
        return {
          container: 'bg-warning/10 border-warning/20 text-warning',
          icon: 'AlertTriangle',
          iconColor: 'var(--color-warning)'
        };
      case 'error':
        return {
          container: 'bg-error/10 border-error/20 text-error',
          icon: 'AlertCircle',
          iconColor: 'var(--color-error)'
        };
      case 'info':
        return {
          container: 'bg-primary/10 border-primary/20 text-primary',
          icon: 'Info',
          iconColor: 'var(--color-primary)'
        };
      case 'processing':
        return {
          container: 'bg-accent/10 border-accent/20 text-accent',
          icon: 'Loader',
          iconColor: 'var(--color-accent)'
        };
      default:
        return {
          container: 'bg-muted border-border text-text-primary',
          icon: 'Bell',
          iconColor: 'var(--color-text-secondary)'
        };
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-20 left-6';
      case 'top-right':
        return 'top-20 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'bottom-right':
        return 'bottom-6 right-6';
      case 'top-center':
        return 'top-20 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-6 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-20 right-6';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleDismiss = (notificationId) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== notificationId));
    onDismiss?.(notificationId);
  };

  const handleDismissAll = () => {
    setVisibleNotifications([]);
    onDismissAll?.();
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className={`fixed z-[1200] ${getPositionClasses()}`}>
      <div className="space-y-2 w-80 max-w-sm">
        {/* Dismiss All Button */}
        {visibleNotifications.length > 1 && (
          <div className="flex justify-end mb-2">
            <Button
              variant="ghost"
              size="xs"
              iconName="X"
              onClick={handleDismissAll}
              className="text-text-secondary hover:text-text-primary"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Notification Items */}
        {visibleNotifications.map((notification) => {
          const styles = getNotificationStyles(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`
                relative p-4 rounded-lg border shadow-academic-lg backdrop-blur-sm
                animate-slide-up transition-academic
                ${styles.container}
              `}
            >
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <Icon 
                    name={styles.icon} 
                    size={16} 
                    color={styles.iconColor}
                    className={notification.type === 'processing' ? 'animate-spin' : ''}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium font-heading">
                        {notification.title}
                      </h4>
                      {notification.message && (
                        <p className="text-xs mt-1 opacity-90">
                          {notification.message}
                        </p>
                      )}
                    </div>

                    {/* Dismiss Button */}
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="X"
                      onClick={() => handleDismiss(notification.id)}
                      className="ml-2 opacity-60 hover:opacity-100"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-75">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                    
                    {/* Action Button */}
                    {notification.action && (
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={notification.action.onClick}
                        className="text-xs underline opacity-75 hover:opacity-100"
                      >
                        {notification.action.label}
                      </Button>
                    )}
                  </div>

                  {/* Progress Bar for Processing Notifications */}
                  {notification.type === 'processing' && notification.progress !== undefined && (
                    <div className="mt-2">
                      <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-current transition-all duration-300"
                          style={{ width: `${notification.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1 opacity-75">
                        <span>{notification.progressLabel || 'Processing...'}</span>
                        <span>{notification.progress}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Auto-dismiss indicator */}
              {notification.autoDismiss && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-current opacity-30">
                  <div 
                    className="h-full bg-current animate-pulse"
                    style={{
                      animation: `shrink ${notification.autoDismiss}ms linear forwards`
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Overflow Indicator */}
        {notifications.length > maxVisible && (
          <div className="text-center py-2">
            <span className="text-xs text-text-secondary">
              +{notifications.length - maxVisible} more notifications
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default NotificationToast;