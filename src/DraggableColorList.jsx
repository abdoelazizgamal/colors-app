import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";
const DraggableColorList = SortableContainer(
  ({ colors, removeColor, setColors }) => {
    return (
      <div style={{ height: "100%" }}>
        {colors?.map((color, i) => (
          <DraggableColorBox
            index={i}
            key={`${color?.name} - ${i}`}
            color={color?.color}
            name={color?.name}
            removeColor={removeColor}
          />
        ))}
      </div>
    );
  }
);
export default DraggableColorList;
