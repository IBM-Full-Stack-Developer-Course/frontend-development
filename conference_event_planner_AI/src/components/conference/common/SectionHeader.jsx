import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ title, totalCost, children }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {totalCost !== undefined && (
          <div className="text-lg font-semibold text-blue-600">
            Total Cost: ${totalCost.toFixed(2)}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  totalCost: PropTypes.number,
  children: PropTypes.node,
};

export default SectionHeader;
