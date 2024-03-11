import { Popover, Button, Div, Text } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { UserInterface } from "../../types/Types";

export const FriendsPopover = ({friends, friendsWord}: {friends: UserInterface[], friendsWord: string}) => {
    return (
      <Popover
        noStyling
        trigger="click"
        id="menupopup"
        role="menu"
        aria-labelledby="menubutton"
        content={({ onClose }) => (
        <Div style={{backgroundColor: 'white',
                    borderRadius: 8,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',}}>
                {friends.map((friend) => <Text>{friend.first_name} {friend.last_name}</Text>)}
        </Div>
        )}
      >
        <Button id="menubutton" aria-controls="menupopup" aria-haspopup="true" mode="link">
            {friendsWord}
        </Button>
      </Popover>
    );
  };