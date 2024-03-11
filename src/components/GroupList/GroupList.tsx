import { GroupCard } from "../GroupCard/GroupCard";
import { Group, Header } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { mockGroups } from "../../groups";
import { GroupInterface, UserInterface, FilterInterface } from "../../types/Types";
import { useState, useMemo, useEffect } from "react";
import { useColors } from "./ColorsContext";
import { useFilter } from "../FilterBar/FilterContext";



export function GroupList () {
    const [ groups, setGroups ] = useState<GroupInterface[]>([]);
    const { setColors } = useColors();
    const { filters } = useFilter();
    useEffect(() => {
        const timer = setTimeout(() => {
            setGroups(mockGroups);
            const colors = new Set(
                mockGroups
                  .filter((group): group is { "id": number,
                  "name": string,
                  "closed": boolean,
                  "avatar_color": string,
                  "members_count": number,
                  "friends"?: UserInterface[] } => group.avatar_color !== undefined)
                  .map(group => group.avatar_color)
              );
            const colorsArr = Array.from(colors);
            setColors(colorsArr);
        }, 1000);

        return () => clearTimeout(timer);
    }, [setColors]);
    useEffect(() => {
        console.log(filters);
        function filterGroups(groups: GroupInterface[], filters: FilterInterface): GroupInterface[] {
            return groups.filter(group => {
                const visibilityMatch = filters.visibility === "ALL" || filters.visibility === undefined ||
                                        (filters.visibility === "OPEN" && !group.closed) || 
                                        (filters.visibility === "CLOSED" && group.closed);

                const colorMatch = !filters.colors.length || filters.colors.includes(group.avatar_color || "");

                const friendsInMatch = filters.friendsIn === "ALL" || 
                                       (filters.friendsIn === "IN" && group.friends && group.friends.length > 0) || 
                                       (filters.friendsIn === "NOT" && (!group.friends || group.friends.length === 0));

                return visibilityMatch && colorMatch && friendsInMatch;
            });
        }

        setGroups(filterGroups(mockGroups, filters));
    }, [filters]);
    const memoizedUserCards = useMemo(() => {
        return groups.map((group) => <GroupCard group={group} />);
      }, [groups]);
    
    return (
        <Group header={<Header mode="secondary">Группы</Header>}>
            {memoizedUserCards}
        </Group>
    )
}