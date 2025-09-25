import React from "react";
import CustomButton from "./CustomButton";
import { UserDataType } from "@/components/pages/UserPage";
import Image from "next/image";
interface UserInformationProps {
  user: UserDataType;
}

const UserInformation: React.FC<UserInformationProps> = ({
  user: { profile, name,phone, role, email, isTwoFactorEnabled },
}) => {
  return (
    <section className="py-5">
  <h1 className="font-outfit font-semibold lg:text-xl mb-6">Profile Information</h1>

  <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

    <div className="relative w-28 h-28 flex-shrink-0">
      <Image
        src={profile}
        alt={`${name} profile`}
        fill
        className="rounded-full object-cover border-4 border-primary"
      />
    </div>

    
    <div className="flex-1 flex flex-col gap-2 lg:gap-4">
      <h2 className="font-outfit font-semibold text-lg lg:text-xl">{name}</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-2">
        <div className="flex flex-col">
          <p className="font-outfit text-sm md:text-base text-gray-400">Role</p>
          <p className="font-outfit text-sm md:text-base">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-outfit text-sm md:text-base text-gray-400">Email</p>
          <p className="font-outfit text-sm md:text-base">{email}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-outfit text-sm md:text-base text-gray-400">Phone</p>
          <p className="font-outfit text-sm md:text-base">{phone}</p>
        </div>
      </div>
    </div>

   
	{role === "buyer" && (
       <CustomButton
        title='Be a Vendor'
        buttonStyles='bg-primary font-regular text-sm lg:text-base px-2 py-1 h-fit w-fit font-outfit  lg:px-4 lg:py-2 text-white'
        handleClick={() => console.log("Modal")}
       />
      )}
      {isTwoFactorEnabled || (
       <CustomButton
        title='Enable 2FA'
        buttonStyles='bg-secondary font-regular text-sm lg:text-base px-2 py-1 h-fit w-fit font-outfit  lg:px-4 lg:py-2 text-white rounded'
        handleClick={() => console.log("Two factor")}
       />
      )}
  </div>



  
</section>

  );
};

export default UserInformation;
