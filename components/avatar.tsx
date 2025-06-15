import React from "react";
import Avatar from "boring-avatars";

const UserAvatar = ({ name, size = 40 }: { name: string; size?: number }) => {
  return (
    <div>
      <Avatar
        name={name}
        colors={["#e60000", "#1a1a19", "#07b0e9", "#6307ed", "#20df07"]}
        variant="beam"
        size={size}
      />
    </div>
  );
};

export default UserAvatar;
