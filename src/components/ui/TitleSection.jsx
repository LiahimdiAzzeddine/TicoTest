import React from 'react';
import PropTypes from 'prop-types';

const TitleSection = ({ children, color = '#0a548d', center = false }) => {
  const alignmentClasses = center
    ? 'text-center'
    : 'text-center md:text-start';

  return (
    <h2
      className={`ml-0 text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl leading-none md:leading-tight ClashDisplayBold ${alignmentClasses}`}
      style={{ color }}
    >
         <div className="leading-none md:leading-tight">
      {children}</div>
    </h2>
  );
};

TitleSection.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  center: PropTypes.bool,
};

export default TitleSection;
