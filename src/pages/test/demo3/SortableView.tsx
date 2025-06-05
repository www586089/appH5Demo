import { FC, useState } from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import './index.scss'

interface ItemType extends ItemInterface{
    id: number;
    name: string;
}
const SortableView: FC = () => {
    const [state, setState] = useState<ItemType[]>([
        { id: 1, name: "a" },
        { id: 2, name: "b" },
        { id: 3, name: "c" },
        { id: 4, name: "d" },
        { id: 5, name: "e" },
        { id: 6, name: "f" },
        { id: 7, name: "g" },
        { id: 8, name: "h" },
    ]);

    return (
        <ReactSortable
          dragoverBubble='true'
          removeCloneOnHide='true'
          revertClone='true'
          sort='true'
          list={state}
          animation={150}
          setList={setState}
        >
            {state.map((item) => (
                <li key={item.id} draggable='true'>{item.name}</li>
            ))}
        </ReactSortable>
    );
};

export default SortableView;