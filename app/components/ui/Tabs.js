import React from 'react';

const Tabs = ({ tabs, activeTab, onChange, variant = 'default', size = 'md' }) => {
  // Style variants
  const variants = {
    default: {
      nav: 'border-b border-gray-200',
      tab: {
        active: 'border-blue-500 text-blue-600',
        inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        base: 'border-b-2 font-medium'
      }
    },
    pills: {
      nav: '',
      tab: {
        active: 'bg-blue-100 text-blue-700',
        inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
        base: 'rounded-md font-medium'
      }
    },
    minimal: {
      nav: '',
      tab: {
        active: 'text-blue-600 font-medium',
        inactive: 'text-gray-500 hover:text-gray-700',
        base: ''
      }
    }
  };

  // Size classes
  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2'
  };

  // Get selected variant
  const selectedVariant = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <div>
      <nav className={`flex space-x-4 ${selectedVariant.nav}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              ${selectedVariant.tab.base}
              ${sizeClass}
              ${activeTab === tab.id ? selectedVariant.tab.active : selectedVariant.tab.inactive}
              transition-colors duration-200
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;