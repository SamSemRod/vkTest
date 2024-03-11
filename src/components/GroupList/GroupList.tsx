import { GroupCard } from "../GroupCard/GroupCard";
import { Group, Header } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { mockGroups } from "../../groups";
import { GroupInterface, FilterInterface } from "../../types/Types";
import { useState, useMemo, useEffect } from "react";
import { useColors } from "./ColorsContext";
import { useFilter } from "../FilterBar/FilterContext";

async function fetchGroups() {
    try {
        const response = mockGroups;
        // uncomment if you want to take data from the response
        //const result = await response.json();
        //if (!response.ok) throw new Error('Network response was not ok.'); 
        const result = await response // should be response.json
        if (result.result !== 1 || !result.data) throw new Error('Invalid data.');
        return result.data; 
    } catch (error) {
        console.error('Fetching groups failed:', error);
        return null;
    }
}

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

export function GroupList () {
    const [ groups, setGroups ] = useState<GroupInterface[]>([]);
    const { setColors } = useColors();
    const { filters } = useFilter();
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchGroups().then((fetchedGroups) => {
                if (fetchedGroups) {
                    const colors = new Set(
                        fetchedGroups
                            .filter((group) => group.avatar_color !== undefined)
                            .map((group) => group.avatar_color!)
                    );
                    setColors(Array.from(colors));
                    setGroups(filterGroups(fetchedGroups, filters));
                } else {
                    setGroups([]);
                }
            });
        }, 1000)
        return () => clearTimeout(timer);
    }, [filters, setColors]);

    const memoizedUserCards = useMemo(() => {
        return groups.map((group) => <GroupCard group={group} />);
      }, [groups]);
    
    return (
        <Group header={<Header mode="secondary">Группы</Header>}>
            {memoizedUserCards}
        </Group>
    )
}