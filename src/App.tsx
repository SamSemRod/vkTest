import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { GroupList } from "./components/GroupList/GroupList";
import { FilterBar } from "./components/FilterBar/FilterBar";
import { FilterProvider } from "./components/FilterBar/FilterContext";
import { ColorsProvider } from "./components/GroupList/ColorsContext";

const App = () => {
  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
            <PanelHeader>Поиск групп</PanelHeader>
              <FilterProvider>
                <ColorsProvider>        
                  <FilterBar/>
                  <GroupList/>
                </ColorsProvider>
              </FilterProvider>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
);

export default App;
