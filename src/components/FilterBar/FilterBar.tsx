import React from "react";
import { Group, FormItem, CustomSelect, ChipsSelect } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { FilterInterface, ColorOption } from "../../types/Types";
import { useFilter } from "./FilterContext";
import { useColors } from "../GroupList/ColorsContext";

export function FilterBar() {
    const { setFilter } = useFilter();
    const { colors } = useColors();
    const colorsArr: ColorOption[] = colors.map(color => ({value: color, label: color}));
    const [selectedColors, setSelectedColors] = React.useState(() => colors.map(color => ({value: color, label: color})));
    const onChangeColor = (selectedOptions: ColorOption[]) => {
        const selectedValues: string[] = selectedOptions.map(option => option.value);
        setFilter(prev => ({
            ...prev,
            colors: selectedValues,
        }));
        setSelectedColors(selectedOptions);
    };
    const onChangeVisibility = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setFilter((prev: FilterInterface) => ({
          ...prev,
          visibility: newValue,
        }));
      };
    const onChangeFriendsIn = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setFilter((prev: FilterInterface) => ({
        ...prev,
        friendsIn: newValue,
    }));
    };
    const visibility = [
            {value: "ALL", label: "Все"},
            {value: "OPEN", label: "Открытые"},
            {value: "CLOSED", label: "Закрытые"}
        ]
    const friendsIn = [
        {value: "ALL", label: "Не важно"},
        {value: "IN", label: "Есть"},
        {value: "NOT", label: "Нет"}
    ]
    return (
        <Group>
            <FormItem top="Тип группы" htmlFor="select-id">
                <CustomSelect id="select-id" placeholder="Все" options={visibility} onChange={onChangeVisibility}/>
            </FormItem>
            <FormItem top="Цвет аватарки" htmlFor="colors">
                <ChipsSelect
                id="colors"
                value={selectedColors}
                onChange={onChangeColor}
                options={colorsArr}
                placeholder="Не выбраны"
                creatable="Добавить цвет" />
            </FormItem>
            <FormItem top="Друзья-подписчики" htmlFor="select-id">
                <CustomSelect id="select-id" placeholder="Не важно" options={friendsIn} onChange={onChangeFriendsIn}/>
            </FormItem>
        </Group>
    )
}