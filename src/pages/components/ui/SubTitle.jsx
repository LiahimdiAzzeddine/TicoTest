import React from 'react';
import PropTypes from 'prop-types';

const SubTitle = ({ children, color = '#0a548d', center = false }) => {
  const alignmentClasses = center
    ? 'text-center'
    : 'text-start';

  return (
    <h2
      className={`ml-0 text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-none md:leading-tight ClashDisplayBold ${alignmentClasses}`}
      style={{ color }}
    >
      <div className="leading-none md:leading-tight">
      {children}
      </div>
    </h2>
  );
};

SubTitle.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  center: PropTypes.bool,
};

export default SubTitle;
