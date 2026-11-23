
import React from 'react';

import PropTypes from 'prop-types';

const SimpleLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <main className="flex-1 w-full min-w-0">
        {children}
      </main>
    </div>
  );
};

SimpleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SimpleLayout;
