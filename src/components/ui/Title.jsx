import React from 'react';
import PropTypes from 'prop-types';

const Title = ({
  children,
  color = '#0a548d',
  center = false,
  size = 'default', // "sm" | "default" | "lg"
  maxWidth = 'max-w-6xl', // contrôle de la largeur du texte
  className = '',
}) => {
  const alignmentClasses = center ? 'text-center mx-auto' : 'text-left';

  // Gère les tailles adaptatives
  const sizeClasses = {
    sm: 'text-xl md:text-2xl lg:text-3xl',
    default: 'text-2xl md:text-2xl lg:text-2xl xl:text-4xl',
    lg: 'text-3xl md:text-5xl lg:text-6xl',
  }[size];

  return (
    <h2
      className={`
        ${alignmentClasses}
        ${sizeClasses}
        ${maxWidth}
        leading-snug md:leading-tight font-semibold ClashDisplayBold
        text-balance break-words
        ${className}
      `}
      style={{ color }}
    >
      <div className="leading-snug md:leading-tight">
        {children}
      </div>
    </h2>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  center: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'default', 'lg']),
  maxWidth: PropTypes.string,
  className: PropTypes.string,
};

export default Title;
