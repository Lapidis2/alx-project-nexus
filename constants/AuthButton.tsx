import React, { FC, ReactNode } from "react";
import {ThreeDots} from "react-loader-spinner";

interface AuthButtonProps {
	type: "button" | "submit" | "reset";
	isLoading?: boolean;
	disabled?: boolean; 
	onClick?: () => void;
	children: ReactNode; 
	className?:string
}

const AuthButton: FC<AuthButtonProps> = ({ type, isLoading = false, onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-2 bg-primary flex items-center justify-center text-white rounded-[12px] font-[400] text-[20px]"
      disabled={isLoading}
    >
      {isLoading ? (
        <ThreeDots
          height={20}    
          width={60}    
          radius={9}
          color="#ffffff"
          visible={true}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;
