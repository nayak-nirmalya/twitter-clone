import React, { useEffect } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div
        className="
                p-6
                text-center
                text-xl
                text-neutral-600
            "
      >
        No Notifications
      </div>
    );
  }

  return <div>NotificationsFeed</div>;
};

export default NotificationsFeed;
