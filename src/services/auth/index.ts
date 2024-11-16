import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import useUserStore from "@/store/userStore";
import { storage } from "@/storage/storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import LogsHelper from "@/utils/logHelper";

export const useRegister = () => {
  const handleSignUp = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    const { email, password, name } = values;

    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      router.replace("/(completeprofile)/");
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-signup"],
    mutationFn: handleSignUp,
    onSuccess: () => {},
  });
};
export const useGoogleLogin = () => {
  const handleGoogleLogin = async (token: string) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: token,
    });
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      LogsHelper("first", data?.user?.user_metadata?.isProfileCompleted);
      if (data?.user?.user_metadata?.isProfileCompleted) {
        router.replace("/(dashboard)");
      } else {
        router.replace("/(completeprofile)/");
      }
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-google-login"],
    mutationFn: handleGoogleLogin,
  });
};

export const useLogin = () => {
  const handleSignUp = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      LogsHelper("first", data?.user?.user_metadata?.isProfileCompleted);
      if (data?.user?.user_metadata?.isProfileCompleted) {
        router.replace("/(dashboard)");
      } else {
        router.replace("/(completeprofile)/");
      }
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-signup"],
    mutationFn: handleSignUp,
  });
};
export const useUpdateUser = () => {
  const { setUser } = useUserStore();
  const handleUpdate = async () => {
    const { data: userUpdate, error } = await supabase.auth.updateUser({
      data: { isProfileCompleted: true },
    });
    if (error) {
      throw new Error(error.message);
    }
    if (userUpdate) {
      // router.replace("/(dashboard)");
      setUser(userUpdate);
    }
    return userUpdate;
  };
  return useMutation({
    mutationKey: ["handle-update"],
    mutationFn: handleUpdate,
  });
};
export const useForgotPassword = () => {
  const resetPassword = async (values: { email: string }) => {
    const { email } = values;

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (data) {
      }
      if (error) {
        console.log("error", error);
        throw new Error(error.message);
      }
      return { message: "If the email exists, a reset link has been sent." };
    } catch (err: any) {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  };

  return useMutation({
    mutationKey: ["handle-forgot-password"],
    mutationFn: resetPassword,
  });
};
export const useRetryOtp = () => {
  const handleRetry = async (values: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(values);
      if (data) {
      }
      if (error) {
        throw new Error(error.message);
      }
      return { message: "If the email exists, a reset link has been sent." };
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
  return useMutation({
    mutationKey: ["handle-retry-otp"],
    mutationFn: handleRetry,
  });
};
export const useVarifyOtp = () => {
  const handleOpt = async (values: { otp: string; email: string }) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: values?.email,
      token: values?.otp,
      type: "recovery",
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return useMutation({
    mutationKey: ["handle-varify-otp"],
    mutationFn: handleOpt,
  });
};
export const useResetPassword = () => {
  const handleResetPassword = async (values: { password: string }) => {
    const { password } = values;
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return useMutation({
    mutationKey: ["handle-reset-password"],
    mutationFn: handleResetPassword,
  });
};

export const useCompleteProfile = () => {
  const handleCompleteProfile = async (values: any) => {
    const { data, error } = await supabase.from("user_table").insert(values);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-complete-profile"],
    mutationFn: handleCompleteProfile,
  });
};

export const useCurrentUserInfo = () => {
  const { user } = useUserStore();

  const handleCurrentUserInfo = async () => {
    if (!user?.user?.id) return [];

    const { data, error } = await supabase
      .from("user_table")
      .select("*")
      .eq("id", user?.user?.id);

    if (error) {
      console.log("error log", error);
      throw new Error(error.message);
    }
    return data;
  };

  return useQuery({
    queryKey: ["handle-current-user-info", user?.user?.id],
    queryFn: handleCurrentUserInfo,
    enabled: !!user?.user?.id, // Only run the query if user ID is available
  });
};

export const useGetAllUsers = () => {
  const handleGetAllUsers = async () => {
    const { data, error } = await supabase.from("user_table").select("*");

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery({
    queryKey: ["handle-get-all-users"],
    queryFn: handleGetAllUsers,
  });
};

export const useGetAllUsersWithoutBlockedPassLikedReport = () => {
  const { user } = useUserStore();
  // const { data: currentUserData } = useCurrentUserInfo();
  const latlonString = storage.getString("@latlonString");
  const latlon = latlonString ? JSON.parse(latlonString) : null;
  const userId = user?.user?.id;
  const handleGetAllUsers = async () => {
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });
    if (token) {
      const { data, error } = await supabase.rpc("update_fcm_and_get_others", {
        user_id: userId, // Pass your ID here user_id:
        new_fcm_token: token?.data, // Pass your new FCM token here
        new_lat: latlon.latitude,
        new_lon: latlon.longitude,
        // my_gender: currentUserData[0]?.gender,
      });

      if (error) {
        console.log("error log", error);
        throw new Error(error.message);
      }

      // LogsHelper("user==>", data);
      return data;
    }
  };
  return useQuery({
    queryKey: ["handle-get-all-users"],
    queryFn: handleGetAllUsers,
  });
};

export const useLikeUser = () => {
  const handleLikeUser = async (values: {
    liked_id: string;
    liker_id: string;
  }) => {
    const { liked_id, liker_id } = values;
    console.log("first", liker_id);
    console.log("second", liked_id);

    const { data, error } = await supabase.rpc("handle_like_user", {
      p_liker_id: liker_id, // Corrected here
      p_liked_id: liked_id, // Corrected here
    });

    if (error) {
      console.log("first", error);
      throw new Error(error.message);
    }

    return data;
  };

  return useMutation({
    mutationKey: ["handle-like-user"],
    mutationFn: handleLikeUser,
  });
};

export const usePassUser = () => {
  const handlePassUser = async (values: {
    pass: string;
    passed_by: string;
  }) => {
    const { data, error } = await supabase.from("pass").insert(values);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-dislike-user"],
    mutationFn: handlePassUser,
  });
};

export const useBlockUser = () => {
  const handleBlockUser = async (values: {
    blocked: string;
    blocked_by: string;
  }) => {
    const { data, error } = await supabase.from("blocked").insert(values);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-block-user"],
    mutationFn: handleBlockUser,
  });
};

export const useReportUser = () => {
  const handleReportUser = async (values: {
    report: string;
    report_by: string;
    reason: string;
    message: string;
  }) => {
    const { data, error } = await supabase.from("report").insert(values);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-report-user"],
    mutationFn: handleReportUser,
  });
};

export const useMessageList = (values) => {
  const { user } = useUserStore();
  const { id } = values;
  const handleMessageList = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("from_user", user?.user?.id)
      .eq("to_user", id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    const formattedMessages = data.map((message) => ({
      _id: message.id,
      text: message.message,
      createdAt: message.created_at,
      user: {
        _id: message.from_user,
        name: message.from_user_name,
        avatar: message.from_user_avatar,
      },
    }));
    const hasUserSentMessage = data.some(
      (msg) => msg.from_user === user?.user?.id
    );
    return {
      finalMessage: formattedMessages,
      hasSent: hasUserSentMessage,
    };
  };
  return useQuery({
    queryKey: ["handle-message-list"],
    queryFn: handleMessageList,
  });
};
export const useUnvarifiedMessage = (values) => {
  const { user } = useUserStore();
  const { id } = values;
  const handleMessageList = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("from_user", id)
      .eq("to_user", user?.user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    const formattedMessages = data.map((message) => ({
      _id: message.id,
      text: message.message,
      createdAt: message.created_at,
      user: {
        _id: message.from_user,
        name: message.from_user_name,
        avatar: message.from_user_avatar,
      },
    }));
    const hasUserSentMessage = data.some(
      (msg) => msg.from_user === user?.user?.id
    );
    return {
      finalMessage: formattedMessages,
      hasSent: hasUserSentMessage,
    };
  };
  return useQuery({
    queryKey: ["handle-message-list"],
    queryFn: handleMessageList,
  });
};

export const useSentMessage = () => {
  const handleSentMessage = async (newMessage) => {
    const { data, error } = await supabase
      .from("messages")
      .insert([newMessage]);

    if (error) {
      console.log("error", error);
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-sent-message"],
    mutationFn: handleSentMessage,
  });
};

export const useLikedYouUsers = () => {
  const { user } = useUserStore();

  const handleLikedYou = async () => {
    // Step 1: Fetch all 'likes' where the liked_id is the current user
    const { data: likesData, error: likesError } = await supabase.rpc(
      "get_users_who_liked",
      {
        user_id: user?.user?.id,
      }
    );
    if (likesError) {
      throw new Error(likesError.message);
    }
    return likesData;
  };

  return useQuery({
    queryKey: ["handle-liked-you", user?.user?.id],
    queryFn: handleLikedYou,
    enabled: !!user?.user?.id, // Only run the query if the user is logged in
  });
};

export const useLikedUsers = () => {
  const { user } = useUserStore();
  const handleLikedUsers = async () => {
    const { data, error } = await supabase.rpc("get_user_you_liked", {
      user_id: user?.user?.id,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery({
    queryKey: ["handle-liked-users"],
    queryFn: handleLikedUsers,
  });
};

export const useFavourites = () => {
  const { user } = useUserStore();
  const handleFavourites = async () => {
    const { data, error } = await supabase.rpc("get_user_you_favourite", {
      user_id: user?.user?.id,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery({
    queryKey: ["handle-favourites"],
    queryFn: handleFavourites,
  });
};

export const useMatch = () => {
  const { user } = useUserStore();

  const handleMatch = async ({ userId }) => {
    const { data, error } = await supabase.rpc("handle_match", {
      user_id: user?.user?.id,
      other_user_id: userId,
    });

    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

    return data[0];
  };

  return useMutation({
    mutationKey: ["handle-match"],
    mutationFn: handleMatch,
  });
};

export const useUnfavorite = () => {
  const { user } = useUserStore();
  const handleUnfavourite = async ({ userId }) => {
    const { data, error } = await supabase
      .from("favourite")
      .delete()
      .eq("favourite_by", user?.user?.id)
      .eq("favourite", userId); // ID of the user to remove from favourites

    if (error) {
      console.log("first", error);
      throw new Error(error.message);
    }

    return data;
  };

  return useMutation({
    mutationKey: ["handle-unfavourite"],
    mutationFn: handleUnfavourite,
  });
};

export const useDislike = () => {
  const { user } = useUserStore();
  const handleDislike = async ({ userId }) => {
    const { data, error } = await supabase.rpc("handle_dislike", {
      user_id: userId,
      user_data_id: user?.user?.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return useMutation({
    mutationKey: ["handle-dislike"],
    mutationFn: handleDislike,
  });
};

export const useMessageUserList = () => {
  const { user } = useUserStore();
  const handleMessageList = async () => {
    const { data, error } = await supabase.rpc("fetch_message_user_list", {
      user_id: user?.user?.id,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return useQuery({
    queryKey: ["handle-message-user-list"],
    queryFn: handleMessageList,
  });
};

export const useChatList = ({ match_id }) => {
  const handleChatList = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("match_id", match_id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    } else {
      const formattedMessages = data.map((message) => ({
        _id: message.id,
        text: message.message,
        createdAt: message.created_at,
        user: {
          _id: message.from_user,
          name: message.from_user_name,
          avatar: message.from_user_avatar,
        },
      }));
      return formattedMessages;
    }
  };
  return useQuery({
    queryKey: ["handle-chat-list"],
    queryFn: handleChatList,
  });
};

export const useUnverifiedList = () => {
  const { user } = useUserStore();
  const handleUnverifiedList = async () => {
    const { data, error } = await supabase.rpc("fetch_unverified_list", {
      user_id: user?.user?.id,
    });

    if (error) {
      console.error("Error fetching unverified list: ", error);
      return;
    }
    console.log("unvarifued", data);
    return data;
  };

  return useQuery({
    queryKey: ["handle-unverified-list"],
    queryFn: handleUnverifiedList,
  });
};
export const useRequestedList = () => {
  const { user } = useUserStore();
  const handleUnverifiedList = async () => {
    const { data, error } = await supabase.rpc("fetch_request_list", {
      user_id: user?.user?.id,
    });

    if (error) {
      console.error("Error fetching unverified list: ", error);
      return;
    }
    console.log("request", data);
    return data;
  };

  return useQuery({
    queryKey: ["handle-requested-list"],
    queryFn: handleUnverifiedList,
  });
};

export const useBlockFromUnvalidatedList = () => {
  const { user } = useUserStore();
  const handleBlockUnvalidatedList = async ({ otherUserId }) => {
    const { data, error } = await supabase.rpc("block_user", {
      myid: user?.user?.id,
      otherid: otherUserId,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-block-unvalidated-list"],
    mutationFn: handleBlockUnvalidatedList,
  });
};

export const useUpdateAdditionalDetailsMutation = () => {
  const { user } = useUserStore();
  const handleUpdateAdditionalDetails = async (additionalDetails) => {
    console.log("first", additionalDetails);
    const { error, data } = await supabase
      .from("user_table")
      .update({
        marriagestatus: additionalDetails?.marriagestatus,
        living: additionalDetails?.living,
        education: additionalDetails?.education,
        drink: additionalDetails?.drink,
        dress: additionalDetails?.dress,
        chewkhat: additionalDetails?.chewkhat,
      })
      .eq("id", user?.user?.id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-update-additional-details"],
    mutationFn: handleUpdateAdditionalDetails,
  });
};

export const useUpdatePersonalDetails = () => {
  const { user } = useUserStore();
  const handleUpdateAdditionalDetails = async (personalDetails) => {
    console.log("first", personalDetails);
    const { error, data } = await supabase
      .from("user_table")
      .update({
        smoking: personalDetails?.smoking,
        religion: personalDetails?.religion,
        languages: personalDetails?.languages,
        prayer: personalDetails?.prayer,
      })
      .eq("id", user?.user?.id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useMutation({
    mutationKey: ["handle-update-personal-details"],
    mutationFn: handleUpdateAdditionalDetails,
  });
};
