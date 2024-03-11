import React from "react";
import { SimpleCell } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { GroupInterface } from "../../types/Types";
import { FriendsPopover } from "./FriendsPopover"

export const GroupCard = ({ group }: { group: GroupInterface }) => {
  const groupType = () => {
    if (!group.closed) {
      return "Открытая";
    } else {
      return "Закрытая";
    }
  };
  const subs = () => {
    const count = group.members_count;
    let postfix = 'подписчиков'
    if (count % 100 > 10 && count % 100 < 15) {
        postfix = 'подписчиков';
    } else if (count % 10 === 1) {
        postfix = 'подписчик';
    } else if (count % 10 >= 2 && count % 10 <= 4) {
        postfix = 'подписчика';
    } 
    return `${count} ${postfix}`
  }
  const friendsWord = () => {
    if (group.friends !== undefined) {
      const count = group.friends.length;
      let postfix = 'друзей'
      if (count % 100 > 10 && count % 100 < 15) {
          postfix = 'друзей';
      } else if (count % 10 === 1) {
          postfix = 'друг';
      } else if (count % 10 >= 2 && count % 10 <= 4) {
          postfix = 'друга';
      }
      return <FriendsPopover friends={group.friends} friendsWord={`${count} ${postfix}`}></FriendsPopover>;
    } else {
      return '';
    }
  }
  return (
    <SimpleCell
      key={group.id}

      before={
        <div
          className="circle"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: group.avatar_color,
          }}
        ></div>
      }
      subtitle={`${groupType()} ${subs()}`}
      extraSubtitle={friendsWord()}
    >
      {group.name}
    </SimpleCell>
  );
};
