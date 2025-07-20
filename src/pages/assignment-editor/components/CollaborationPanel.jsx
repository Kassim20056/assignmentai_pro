import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CollaborationPanel = ({
  comments = [],
  collaborators = [],
  onAddComment,
  onReplyToComment,
  onInviteCollaborator,
  onResolveComment
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [activeReply, setActiveReply] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  const mockComments = [
    {
      id: '1',
      author: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a1e1e4?w=32&h=32&fit=crop&crop=face',
      content: 'This section needs more supporting evidence. Consider adding recent studies from 2024.',
      timestamp: new Date('2025-07-17T10:30:00'),
      position: { line: 45, selection: 'Recent research shows...' },
      replies: [
        {
          id: '1-1',
          author: 'You',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          content: 'Good point! I\'ll add the Chen et al. (2024) study here.',
          timestamp: new Date('2025-07-17T11:15:00')
        }
      ],
      resolved: false,
      priority: 'high'
    },
    {
      id: '2',
      author: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      content: 'The methodology section is well-structured. Great work on the experimental design!',
      timestamp: new Date('2025-07-17T09:45:00'),
      position: { line: 78, selection: 'Experimental Design' },
      replies: [],
      resolved: false,
      priority: 'low'
    },
    {
      id: '3',
      author: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a1e1e4?w=32&h=32&fit=crop&crop=face',
      content: 'Citation format needs to be consistent throughout. Please use APA 7th edition.',
      timestamp: new Date('2025-07-16T16:20:00'),
      position: { line: 123, selection: '(Smith, 2023)' },
      replies: [],
      resolved: true,
      priority: 'medium'
    }
  ];

  const mockCollaborators = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'Supervisor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a1e1e4?w=32&h=32&fit=crop&crop=face',
      status: 'online',
      permissions: 'edit'
    },
    {
      id: '2',
      name: 'Alex Chen',
      email: 'alex.chen@student.edu',
      role: 'Peer Reviewer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      status: 'offline',
      permissions: 'comment'
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@university.edu',
      role: 'Co-author',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      status: 'away',
      permissions: 'edit'
    }
  ];

  const commentsData = comments.length > 0 ? comments : mockComments;
  const collaboratorsData = collaborators.length > 0 ? collaborators : mockCollaborators;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-success';
      default:
        return 'border-l-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      case 'offline':
        return 'bg-text-secondary';
      default:
        return 'bg-text-secondary';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment?.({
        content: newComment,
        position: { selection: selectedText }
      });
      setNewComment('');
    }
  };

  const handleReply = (commentId) => {
    if (replyText.trim()) {
      onReplyToComment?.(commentId, replyText);
      setReplyText('');
      setActiveReply(null);
    }
  };

  const renderComment = (comment) => (
    <div
      key={comment.id}
      className={`
        p-3 border-l-4 ${getPriorityColor(comment.priority)} 
        ${comment.resolved ? 'bg-muted/30 opacity-75' : 'bg-surface'}
        border border-border rounded-lg
      `}
    >
      <div className="flex items-start space-x-3">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-6 h-6 rounded-full flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-text-primary">
              {comment.author}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-text-secondary">
                {formatTimestamp(comment.timestamp)}
              </span>
              {comment.resolved && (
                <Icon name="CheckCircle" size={12} className="text-success" />
              )}
            </div>
          </div>
          
          <p className="text-sm text-text-primary mb-2">
            {comment.content}
          </p>
          
          {comment.position?.selection && (
            <div className="text-xs text-text-secondary bg-muted/50 px-2 py-1 rounded mb-2">
              "{comment.position.selection}"
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="xs"
              iconName="Reply"
              onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
            >
              Reply
            </Button>
            
            {!comment.resolved && (
              <Button
                variant="ghost"
                size="xs"
                iconName="Check"
                onClick={() => onResolveComment?.(comment.id)}
                className="text-success"
              >
                Resolve
              </Button>
            )}
          </div>
          
          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-2 pl-4 border-l border-border">
              {comment.replies.map(reply => (
                <div key={reply.id} className="flex items-start space-x-2">
                  <img
                    src={reply.avatar}
                    alt={reply.author}
                    className="w-5 h-5 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium text-text-primary">
                        {reply.author}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatTimestamp(reply.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-text-primary">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Reply Input */}
          {activeReply === comment.id && (
            <div className="mt-3 space-y-2">
              <Input
                type="text"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleReply(comment.id)}
                  disabled={!replyText.trim()}
                >
                  Reply
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setActiveReply(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-surface">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
          Collaboration
        </h3>
        
        {/* Collaborators */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-secondary">
              Collaborators ({collaboratorsData.length})
            </span>
            <Button
              variant="ghost"
              size="xs"
              iconName="UserPlus"
              onClick={onInviteCollaborator}
            />
          </div>
          
          <div className="flex -space-x-1">
            {collaboratorsData.slice(0, 4).map(collaborator => (
              <div key={collaborator.id} className="relative">
                <img
                  src={collaborator.avatar}
                  alt={collaborator.name}
                  className="w-6 h-6 rounded-full border-2 border-surface"
                  title={`${collaborator.name} (${collaborator.role})`}
                />
                <div className={`
                  absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-surface
                  ${getStatusColor(collaborator.status)}
                `} />
              </div>
            ))}
            {collaboratorsData.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-surface flex items-center justify-center">
                <span className="text-xs text-text-secondary">
                  +{collaboratorsData.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Add Comment */}
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            fullWidth
          >
            Add Comment
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {commentsData
            .filter(comment => !comment.resolved)
            .map(comment => renderComment(comment))}
          
          {commentsData.filter(comment => comment.resolved).length > 0 && (
            <div className="pt-4 border-t border-border">
              <h4 className="text-xs font-medium text-text-secondary mb-3">
                Resolved Comments
              </h4>
              {commentsData
                .filter(comment => comment.resolved)
                .map(comment => renderComment(comment))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationPanel;