import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

const Navbar = ({ onToggleDetails, showDetails }) => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-blue-700">Conference Expense Planner</div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            {['#venue', '#addons', '#meals'].map((section) => (
              <a
                key={section}
                href={section}
                onClick={(e) => handleNavClick(e, section)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {section.substring(1).charAt(0).toUpperCase() + section.substring(2)}
              </a>
            ))}
          </div>
          <Button 
            onClick={onToggleDetails}
            variant="primary"
            className="ml-4"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onToggleDetails: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired,
};

export default Navbar;
