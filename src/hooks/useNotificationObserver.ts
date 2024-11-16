import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import LogsHelper from "@/utils/logHelper";

export default function useNotificationObserver() {
  const [isRedirectingFromNotification, setRedirecting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const notificationParams = notification.request.content.data?.params;
      const notificationUrl = notification.request.content.data?.pathname;
      // LogsHelper("log", notification.request.content.data);
      if (notificationUrl) {
        setRedirecting(true); // Indicate that a notification redirect is in progress
        router.push({
          pathname: notificationUrl,
          params: notificationParams,
        });
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return { isRedirectingFromNotification };
}
