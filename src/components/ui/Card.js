import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`shadow-lg rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-bold">{children}</h3>
);
