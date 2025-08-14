import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  title, 
  className = '',
  image,
  imageAlt = '',
  footer,
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {image && (
        <div className="h-40 overflow-hidden">
          <img 
            src={image} 
            alt={imageAlt} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        {title && (
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
        )}
        <div className="mb-2">
          {children}
        </div>
      </div>
      {footer && (
        <div className="bg-gray-50 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  footer: PropTypes.node,
};

export default Card;
