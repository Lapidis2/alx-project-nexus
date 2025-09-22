import React from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import  {UserDataType}  from "@/pages/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";

type ResetPasswordTypes = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

interface ChangePasswordTabProps {
  label?: string;
  tabName?: string;
  user: UserDataType;
}

const ChangePasswordTab: React.FC<ChangePasswordTabProps> = ({
  label,
  tabName,
  user: { userId },
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm<ResetPasswordTypes>();

  const onSubmitForm: SubmitHandler<ResetPasswordTypes> = async (formData) => {
    const toastId = toast.loading("Updating Password...");
    try {
      // Replace this URL with your backend endpoint
      const response = await fetch(`/api/users/${userId}/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      toast.dismiss(toastId);
      toast.success("Password updated successfully!");
      reset(); // Clear form after success
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <form
      className="pt-5 px-2 md:px-5 flex flex-col w-full md:w-[540px]"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div>
        <CustomInput
          register={register("password", {
            required: "Old Password Required",
          })}
          label="Old Password"
          inputId="oldpassword"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="password"
          placeholder="Enter Old Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <CustomInput
          register={register("newPassword", {
            required: "New Password Required",
            minLength: { value: 8, message: "Minimum 8 characters" },
          })}
          label="New Password"
          inputId="newpassword"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="password"
          placeholder="Enter New Password"
          disable={isSubmitting}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
        )}

        <CustomInput
          register={register("confirmPassword", {
            validate: (value) =>
              value === getValues("newPassword") || "Passwords do not match",
          })}
          label="Re-Type New Password"
          inputId="retypepassword"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="password"
          placeholder="Re-Type New Password"
          disable={isSubmitting}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex flex-row gap-x-2 self-end mt-4">
        <CustomButton
          buttonStyles={`transition-colors duration-500 hover:bg-border hover:text-white text-black rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base ${
            isSubmitting && "hidden"
          }`}
          title="Discard"
          buttonType="reset"
        />
        <CustomButton
          buttonStyles="bg-primary text-white rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base"
          title="Save Changes"
          buttonType="submit"
          spinner={<RotatingLines width="30" strokeColor="white" />}
          disable={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ChangePasswordTab;
