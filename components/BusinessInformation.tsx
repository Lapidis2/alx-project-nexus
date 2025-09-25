import React, { ChangeEvent, FormEvent } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { UserDataType } from "./pages/UserPage";
interface BusinessInformationTabProps {
  label?: string;
  tabName?: string;
  user?: UserDataType;
}

const BusinessInformationTab: React.FC<BusinessInformationTabProps> = ({
  label

}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`${e.target.id}: ${e.target.value}`);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form
      className="pt-5 lg:px-2 md:pl-5 flex flex-col w-full md:w-[520px]"
      onSubmit={handleFormSubmit}
    >
      <fieldset className="flex flex-col md:flex-row flex-wrap gap-y-4 md:gap-x-4 w-full border-none p-0">
        <legend className="sr-only">{label || "Business Information"}</legend>

        <CustomInput
          label="Business Name"
          inputId="businessname"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="text"
          placeholder="Enter Business Name"
          handleChange={handleInputChange}
        />
        <CustomInput
          label="Stripe Account Id"
          inputId="stripeaccid"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="number"
          placeholder="Enter Your Stripe Acc Id"
          handleChange={handleInputChange}
        />
        <CustomInput
          label="Street"
          inputId="streetaddress"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="text"
          placeholder="Street Address"
          handleChange={handleInputChange}
        />
        <CustomInput
          label="TIN"
          inputId="tinnumber"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="text"
          placeholder="TIN Number"
          handleChange={handleInputChange}
        />
        <CustomInput
          label="District"
          inputId="districtaddress"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="text"
          placeholder="District"
          handleChange={handleInputChange}
        />
      </fieldset>

      <div className="flex flex-row self-end gap-x-2 mt-4">
        <CustomButton
          buttonStyles="transition-colors duration-500 hover:bg-border hover:text-white text-black rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base"
          title="Discard"
          handleClick={(e) => {
            e.preventDefault();
            console.log("Discard clicked");
          }}
        />
        <CustomButton
          buttonStyles="bg-primary text-white rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base"
          title="Save Changes"
          handleClick={(e) => {
            e.preventDefault();
            console.log("Save clicked");
          }}
        />
      </div>
    </form>
  );
};

export default BusinessInformationTab;
