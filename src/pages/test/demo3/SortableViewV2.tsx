import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { useState } from 'react';
import { move } from '@dnd-kit/helpers';

function Sortable({ id, index }) {
    const { ref } = useSortable({ id, index });

    return (
        <li ref={ref} className='item'>{id}</li>
    );
}

function SortableViewV2() {
    const [items, setItems] = useState(['白日依山尽', '黄河入海流', '欲穷千里目', '更上一层楼']);

    return (
        <DragDropProvider
          onDragEnd={(event) => {
              setItems((newItems) => {
                newItems = move(newItems, event)
                newItems.forEach((item, index) => {
                    console.log(item, index) 
                })
                return newItems;
            });
          }}
        >
            <ul >
                {items.map((id, index) => (
                    <Sortable key={id} id={id} index={index} />
                ))}
            </ul>
        </DragDropProvider>
    );
}
export default SortableViewV2;
