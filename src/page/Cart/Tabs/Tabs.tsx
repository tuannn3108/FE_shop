import clsx from "clsx";
import style from "./style.module.scss";

interface Tab {
    id: number;
    name: string;
}
  
interface TabsProps {
    tabs: Tab[];
    tabSelect: number
}
const Tabs = ({ tabs,tabSelect }: TabsProps) => {

  return (
    <div className={style.tabs}>
      {tabs &&
        tabs.map((e) => (
          <div key={e.id} className={clsx(style.tabItem, {[style.tabItemActive]: e.id === tabSelect }, {[style.tabComplete]: e.id < tabSelect})}>
            <div className={clsx(style.process, {[style.processActive] : e.id < tabSelect})}>{e.id}</div>
            <div className={style.title}>{e.name}</div>
          </div>
        ))}
    </div>
  );
};

export default Tabs;
