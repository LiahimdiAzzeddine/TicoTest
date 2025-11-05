import React from 'react';
import PropTypes from 'prop-types';

const BigTitle = ({
  children,
  color = '#0a548d',
  center = false,
  size = 'default',
  maxWidth = 'max-w-6xl',
  className = '',
}) => {
  const alignmentClasses = center ? 'text-center mx-auto' : 'text-left';

  const sizeClasses = {
    sm: 'text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl',
    default: 'text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  }[size];

  return (
    <h2
      className={`
        ${alignmentClasses}
        ${sizeClasses}
        ${maxWidth}
        leading-tight sm:leading-tight md:leading-tight font-semibold ClashDisplayBold
        text-balance break-words

        ${className}
      `}
      style={{ color }}
    >
      <div className="leading-tight sm:leading-tight md:leading-tight">
        {children}
      </div>
    </h2>
  );
};

BigTitle.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  center: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'default', 'lg']),
  maxWidth: PropTypes.string,
  className: PropTypes.string,
};

export default BigTitle;
