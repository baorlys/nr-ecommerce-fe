'use client'

import type React from 'react'
import { cn } from '../../utils/cn'

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface TabsNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
    e.preventDefault() // Prevent default form submission
    onTabChange(tabId)
  }

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button" // Explicitly set type to button to prevent form submission
            onClick={(e) => handleTabClick(e, tab.id)}
            className={cn(
              'flex items-center border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap',
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default TabsNavigation
