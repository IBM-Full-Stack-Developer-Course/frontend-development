// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './features/conference/store';
import ConferenceEvent from './ConferenceEvent';
import AboutUs from './AboutUs';

function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = () => {
    setShowVenue(true);
    // Smooth scroll to the conference event section
    setTimeout(() => {
      document.getElementById('conference-event')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen">
        {!showVenue && (
          <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-4">Conference Expense Planner</h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">Plan your next major event with us!</p>
              <button 
                onClick={handleGetStarted}
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Get Started
              </button>
            </div>
          </header>
        )}

        <div className={`transition-all duration-500 ${showVenue ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <div id="conference-event" className="pt-8">
            <ConferenceEvent />
          </div>
        </div>

        {!showVenue && (
          <div className="py-16 bg-gray-50">
            <AboutUs />
          </div>
        )}
      </div>
    </Provider>
  );
}

export default App;
