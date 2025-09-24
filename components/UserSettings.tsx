import React, {
	ReactNode,
	useState,
	useCallback,
	Children,
	isValidElement,
  } from "react";
  
  interface TabProps {
	label?: string;
	tabName?: string;
	children: ReactNode;
  }
  
  interface SettingsProps {
	children: React.ReactNode; // allow any ReactNode
	className?: string;
  }
  
  interface TabButtonProps {
	isActive: boolean;
	onClick: () => void;
	children: ReactNode;
  }
  
  const UserSettings: React.FC<SettingsProps> = ({ children, className }) => {
	// filter out non-ReactElement children
	const tabs = Children.toArray(children).filter((child) =>
	  isValidElement<TabProps>(child)
	) as React.ReactElement<TabProps>[];
  
	const [activeTab, setActiveTab] = useState(tabs[0]?.props.label);
  
	// ✅ Option 1 fix: add `setActiveTab` in dependency array
	const handleActiveTab = useCallback(
	  (label: string | undefined) => {
		if (label) setActiveTab(label);
	  },
	  [setActiveTab]
	);
  
	return (
	  <section className={className}>
		<nav className="flex flex-row">
		  {tabs.map((child) => (
			<TabButton
			  key={child.props.label}
			  isActive={activeTab === child.props.label}
			  onClick={() => handleActiveTab(child.props.label)}
			>
			  {child.props.tabName}
			</TabButton>
		  ))}
		</nav>
		{tabs.find((child) => child.props.label === activeTab) || null}
	  </section>
	);
  };
  
  const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }) => (
	<button
	  className={`py-1 px-2 text-sm md:text-lg sm:py-2 sm:px-3 font-outfit hover:bg-sky-50 transition-colors duration-500 ${
		isActive ? "border-b-2 border-third text-third" : "text-border"
	  }`}
	  onClick={onClick}
	>
	  {children}
	</button>
  );
  
  export default UserSettings;
  