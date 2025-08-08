import React from 'react';
import PropTypes from 'prop-types';

const StepTitle = ({ children, color = '#0a548d', center = false }) => {
  const alignmentClasses = center
    ? 'text-center'
    : 'text-start';

  return (
    <h2
      className={`ml-0 text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-none md:leading-tight ClashDisplayBold ${alignmentClasses}`}
      style={{ color }}
    >
      <div className="leading-none md:leading-tight">
      {children}
      </div>
    </h2>
  );
};

StepTitle.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  center: PropTypes.bool,
};

export default StepTitle;
