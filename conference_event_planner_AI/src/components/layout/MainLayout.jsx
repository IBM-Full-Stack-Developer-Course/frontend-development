import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <main className={className}>
          {children}
        </main>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default MainLayout;
