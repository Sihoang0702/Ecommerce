import React from "react";
import avatarDefault from "../../assets/avatar.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { renderStartNumber } from "utils/heplers";
dayjs.extend(relativeTime);
const Comment = ({
  avatar = avatarDefault,
  name = "anonymous",
  content,
  updatedAt = "0",
  star,
}) => {
  return (
    <div className="flex text-sm bg-gray-100 rounded mb-4">
      <div className="p-4 flex-none">
        <img src={avatar} alt="avatar-user" className="w-20 h-20 object-cover rounded-full" />
      </div>
      <div className="flex flex-col flex-auto justify-center gap-y-2">
        <h3>{name}</h3>
        <span className="flex">{renderStartNumber(star)}</span>
        <div>
          <span>{content}</span>
        </div>
      </div>
      <div className="p-4 ">
        <span className="italic text-xs font-semibold">
          {dayjs(updatedAt || "0")?.fromNow(true)}
        </span>
      </div>
    </div>
  );
};

export default Comment;
