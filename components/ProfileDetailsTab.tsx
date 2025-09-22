import React, { useState } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { UserDataType } from "@/pages/user";

type ProfileDetailsTabProps = {
  user: UserDataType;
  setUser: (user: UserDataType) => void;
  label:string,
  token?: string;
  tabName:string
};

const ProfileDetailsTab: React.FC<ProfileDetailsTabProps> = ({
  user,
  setUser,
}) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [profileImage, setProfileImage] = useState<string>(user.profile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setProfileImage(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let uploadedProfile = profileImage;

   
      if (selectedFile) {
  
        uploadedProfile = profileImage; 
      }

      const updatedUser: UserDataType = {
        ...user,
        email,
        name,
        profile: uploadedProfile,
      };
      setUser(updatedUser);

      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error(error);
      alert("Failed to update profile: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="profile-details-title">
      <header>
        <h2
          id="profile-details-title"
          className="text-lg md:text-xl font-bold font-outfit mb-4"
        >
          Profile Details
        </h2>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-4 lg:max-w-fit lg:px-2 md:px-5 pt-5"
      >
        {/* Profile Image */}
        <fieldset className="flex flex-col lg:flex-row items-center gap-y-4 md:gap-x-5 border-none">
          <legend className="sr-only">Profile Image</legend>
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            <Image
              src={profileImage}
              alt="User profile image"
              fill
              className="rounded-full object-cover border-4 border-primary"
              sizes="96px"
            />
          </div>
          <CustomInput
            handleChange={handleProfileChange}
            accept=".jpg,.png"
            label="Upload Picture"
            labelStyles="inline-flex items-center px-2 md:px-4 py-1 bg-gray-100 rounded-md cursor-pointer text-gray-500 gap-x-3 font-outfit text-sm md:text-sm"
            inputId="upload"
            type="file"
            inputStyles="hidden"
            disable={isSubmitting}
          />
        </fieldset>

        {/* Email and Name */}
        <fieldset className="flex flex-col lg:items-end gap-y-2 w-full lg:max-w-lg border-none">
          <legend className="sr-only">User Information</legend>

          <CustomInput
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            label="Email"
            inputId="email"
            labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
            inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit text-sm md:text-base"
            type="text"
            placeholder="crafters@gmail.com"
            disable={isSubmitting}
          />

          <CustomInput
            value={name}
            handleChange={(e) => setName(e.target.value)}
            label="Name"
            inputId="name"
            labelStyles="text-sm text-gray-300 md:text-base font-outfit mb-2"
            inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit text-sm md:text-base"
            type="text"
            placeholder="Crafters"
            disable={isSubmitting}
          />

          <div className="flex flex-row gap-x-2 mt-4 sm:self-end">
            <CustomButton
              buttonStyles={`transition-colors duration-500 hover:bg-border hover:text-white text-black rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base ${
                isSubmitting ? "hidden" : ""
              }`}
              title="Discard"
              buttonType="reset"
              handleClick={() => {
                setEmail(user.email);
                setName(user.name);
                setProfileImage(user.profile);
                setSelectedFile(null);
              }}
            />
            <CustomButton
              buttonStyles="bg-primary text-white rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base text-center"
              title="Save Changes"
              buttonType="submit"
              disable={isSubmitting}
              spinner={null}
            />
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default ProfileDetailsTab;
