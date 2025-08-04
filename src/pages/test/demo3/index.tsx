import { View } from '@tarojs/components'
import './index.scss'
import AmountInput from './AmountInput'

interface DragItem {
    id: string
    desc: string
}


export default function Index() {

    const initItems: DragItem[] = [
        {
            id: '1',
            desc: '内容1'
        },
        {
            id: '2',
            desc: '内容2'
        },
        {
            id: '3',
            desc: '内容3'
        },
        {
            id: '4',
            desc: '内容4'
        },
        {
            id: '5',
            desc: '内容5'
        },
        {
            id: '6',
            desc: '内容6'
        },
    ]

    let draggingElementOrder;
    let draggingElement;
    let draggingElementPosition;
    let animating;

    function dragstart_handler(event) {
        draggingElement = event.targeet
        let sourceElementId = event.target.id
        console.log('dragstart_handler->sourceElementId = ' + sourceElementId)
        event.dataTransfer.setData("text/plain", sourceElementId);
        draggingElement = event.target;
    }

    function dragover_handler(event) {
        event.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        // var sourceElementId = event.dataTransfer.getData("text/plain");
        // console.log('dragover_handler->sourceElementId = ' + sourceElementId)
        // event.currentTarget.insertBefore(document.getElementById(sourceElementId), 1);

        //每次都要新计算，因为有可能已经换位了
        draggingElementOrder = Array.from(draggingElement.parentElement.children).indexOf(draggingElement);
        const node = event.target;
        if (node !== draggingElement && !animating) {
            draggingElementPosition = draggingElement.getBoundingClientRect();
            const order = Array.from(node.parentElement.children).indexOf(node);
            //从大的序号移入到小的序号

            if (draggingElementOrder > order) {
                node.parentElement.insertBefore(draggingElement, node);
            }
            //从小的序号移入到大的序号
            else {
                //节点不是最后一个
                if (node.nextElementSibling) {
                    node.parentElement.insertBefore(draggingElement, node.nextElementSibling);
                }
                // 节点是最后一个了，不能再用insertBefore
                else {
                    node.parentElement.appendChild(draggingElement);
                }
            }
            const currentPosition = draggingElement.getBoundingClientRect();

            node.style.transform = `translateY(${currentPosition.y - draggingElementPosition.y}px)`;
            draggingElement.style.transform = `translateY(${-currentPosition.y + draggingElementPosition.y}px)`;
            animating = true;
            requestAnimationFrame(() => {
                draggingElement.style.transition = "transform .3s linear";
                node.style.transition = "transform .3s linear";
                node.style.transform = "translateY(0)";
                draggingElement.style.transform = "translateY(0)";
                node.addEventListener("transitionend", transitionEnd(node));
            });
        }

        function transitionEnd(node) {
            //不能用箭头函数，因为有this
            node.style.transform = null;
            node.style.transition = null;
            draggingElement.style.transform = null;
            draggingElement.style.transition = null;
            node.removeEventListener("transitionend", transitionEnd);
            animating = false;
        }

    }

    function ItemView(item) {
        return (
            <li draggable='true'
              onDragOver={dragover_handler}
              onDragStart={dragstart_handler}
              id={item.id}
              key={item.id}
            >{item.desc}</li>
        )
    }

    function ListView() {
        return <View>
            <ul>{listItems}</ul>
        </View>
    }

    const listItems = initItems.map((item) => ItemView(item))

    return (
        <>
        <ListView />
        <AmountInput />
        </>
    )
}