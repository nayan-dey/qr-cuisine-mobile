import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "~/utils/supabase";

const countryCode = process.env.EXPO_PUBLIC_COUNTRY_CODE;

export const useRegister = () => {
  const handleSignUp = async (values: {
    mobile: string;
    password: string;
    name: string;
  }) => {
    const { mobile, password, name } = values;
    console.log("values=======>", values);
    const { data, error } = await supabase.rpc("sign_up_user_mobile", {
      mobile: `${countryCode} ${mobile}`,
      password: password,
      name: name,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-signup"],
    mutationFn: handleSignUp,
    onSuccess: () => {},
  });
};

export const useLogin = () => {
  const handleSignUp = async (values: { mobile: string; password: string }) => {
    const { mobile, password } = values;
    const { data, error } = await supabase.rpc("sign_in_user_mobile", {
      mobile: `${countryCode} ${mobile}`,
      user_password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-signup"],
    mutationFn: handleSignUp,
  });
};

export const useForgotPassword = () => {
  const handleForgotPassword = async (values: { phone: string }) => {
    console.log("values=======>", values);
    const response = await fetch(
      "https://qrcfrontend.netlify.app/api/user/sent-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: values, // Send only the `mobile` parameter
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send OTP");
    }

    return response.json(); // Return the server response
  };

  return useMutation({
    mutationKey: ["handle-forgot-password"],
    mutationFn: handleForgotPassword,
  });
};
export const useVarifyOtp = () => {
  const handleVarifyOtp = async (values: { mobile: string; otp: string }) => {
    console.log("values=======>", values);
    const response = await fetch(
      "https://qrcfrontend.netlify.app/api/user/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: values.mobile, // Send only the `mobile` parameter
          otp: Number(values.otp),
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message[0]);
    }

    return response.json(); // Return the server response
  };

  return useMutation({
    mutationKey: ["handle-forgot-password"],
    mutationFn: handleVarifyOtp,
  });
};

export const useResetPassword = () => {
  const navigation = useNavigation();
  const handleResetPassword = async (values: {
    mobile: string;
    password: string;
  }) => {
    const { mobile, password } = values;
    const { data, error } = await supabase
      .from("verified_users") // Replace with your actual table name
      .update({ password }) // Update password
      .eq("mobile", mobile);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-forgot-password"],
    mutationFn: handleResetPassword,
    onSuccess: () => {
      navigation.replace("Login");
    },
  });
};

// const { data, error } = await supabase
//   .from("varified_user")
//   .select("mobile,id,password")
//   .eq("mobilenumber")
//   .update({ pass: "dksnfnsfsdf" });
