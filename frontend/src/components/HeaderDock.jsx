import Dock from "./Dock/Dock.jsx";

export default function HeaderDock({ items }) {
  return (
    <div className="header-dock">
      <Dock
        items={items}
        className="header-dock-panel"
        panelHeight={80}
        baseItemSize={58}
        magnification={70}
        distance={160}
        dockHeight={180}
        staticHeight
      />
    </div>
  );
}
