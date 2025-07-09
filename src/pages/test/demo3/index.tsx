import { View } from '@tarojs/components'
// import { Sortable } from 'react-sortablejs';

// import { SortableContainer } from 'react-sortable-hoc';
import { useEffect, useRef, useState } from 'react';
// import Sortable from 'sortablejs';

import './index.scss'
import SortableView from './SortableView';
import SortableViewV2 from './SortableViewV2';
import PagePicker from './ActionSheet';
// import { Sortable } from 'react-sortablejs';



// const XXView = () => {
//   const [items, setItems] = useState([
//     { id: 1, text: 'Item 1' },
//     { id: 2, text: 'Item 2' },
//     { id: 3, text: 'Item 3' }
//   ]);
//   const listRef = useRef(null);
//   const sortableInstance = useRef(null);

//   useEffect(() => {
//     if (sortableInstance.current) return; // 防止重复初始化
//     sortableInstance.current = new Sortable(listRef.current, {
//       onEnd: (event) => {
//         const { oldIndex, newIndex } = event;
//         setItems(prevItems => arrayMove(prevItems, oldIndex, newIndex)); // 使用自定义的arrayMove函数来更新数组顺序，类似于react-sortablejs的arrayMove方法。
//       }
//     });
//   }, []); // 注意依赖项，确保只在组件挂载时初始化一次。

//   return (
//     <ul ref={listRef}>
//       {items.map((item) => (
//         <li key={item.id}>{item.text}</li>
//       ))}
//     </ul>
//   );
// };

// // 一个简单的arrayMove函数实现，用于交换数组中的元素位置。
// function arrayMove(arr, fromIndex, toIndex) {
//   let element = arr[fromIndex]; // 获取要移动的元素。
//   arr.splice(fromIndex, 1); // 从原位置删除元素。
//   arr.splice(toIndex, 0, element); // 在新位置插入元素。
//   return arr; // 返回更新后的数组。
// }

// interface DragItem {
//     id: string
//     desc: string
// }


// const SortableList = SortableContainer(({ items }) => {
//   return (
//     <ul>
//       {items.map((item, index) => (
//         <li key={item.id}>{item.text}</li>
//       ))}
//     </ul>
//   );
// });

// const SortAbleListView = () => {
//   const [items, setItems] = useState([
//     { id: 1, text: 'Item 1' },
//     { id: 2, text: 'Item 2' },
//     { id: 3, text: 'Item 3' }
//   ]);

//   const onSortEnd = ({ oldIndex, newIndex }) => {
//     setItems(arrayMove(items, oldIndex, newIndex));
//   };

//   return (
//     <SortableList items={items} onSortEnd={onSortEnd} />
//   );
// };


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
        event.dataTransfer.setData("text/plain", sourceElementId);
        draggingElement = event.target;
    }

    function getIndex(node) {
        return Array.from(node.parentElement.children).indexOf(node);
    }

    function dragover_handler(event) {
        event.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        // var sourceElementId = event.dataTransfer.getData("text/plain");
        // console.log('dragover_handler->sourceElementId = ' + sourceElementId)
        // event.currentTarget.insertBefore(document.getElementById(sourceElementId), 1);

        //每次都要新计算，因为有可能已经换位了
        draggingElementOrder = getIndex(draggingElement);
        const node = event.target;
        if (node !== draggingElement && !animating) {
            draggingElementPosition = draggingElement.getBoundingClientRect();
            const order = getIndex(node);
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
              id={item.id}
              key={item.id}
            >{item.desc}</li>
        )
    }

    var draging: Element;
    function ulDragStart(event) {
        //console.log("start");
        //firefox设置了setData后元素才能拖动！！！！
        //event.target出发事件的元素
        event.dataTransfer.setData("text/plain", event.target.innerText); //不能使用text，firefox会打开新tab
        //event.dataTransfer.setData("self", event.target);
        draging = event.target;
    }

    function ulDragOver(event) {
        //console.log("over");
        event.preventDefault(); //阻止默认行为 
        var target = event.target;
        console.log("nodeName->" + target.nodeName);
        if (target.nodeName === "LI") {
            if (target !== draging && null !== draging) {
                //getBoundingClientRect()用于获取某个元素相对于视窗的位置集合
                var targetRect = target.getBoundingClientRect();
                var dragingRect = draging.getBoundingClientRect();
                if (target) {
                    if (target.animated) {
                        return;
                    }
                }
                if (_index(draging) < _index(target)) {
                    //nextSibling 属性可返回某个元素之后紧跟的节点（处于同一树层级中）。
                    target.parentNode.insertBefore(draging, target.nextSibling);
                } else {
                    target.parentNode.insertBefore(draging, target);
                }
                _animate(dragingRect, draging);
                _animate(targetRect, target);
            }
        }
    }

    //获取元素在父元素中的index
    function _index(el) {
        var index = 0;

        if (!el || !el.parentNode) {
            return -1;
        }
        //previousElementSibling属性返回指定元素的前一个兄弟元素（相同节点树层中的前一个元素节点）。
        while (el && (el = el.previousElementSibling)) {
            //console.log(el);
            index++;
        }

        return index;
    }
    function _animate(prevRect, target) {
        var ms = 300;

        if (ms) {
            var currentRect = target.getBoundingClientRect();
           //nodeType 属性返回以数字值返回指定节点的节点类型。1=元素节点  2=属性节点
            if (prevRect.nodeType === 1) {
                prevRect = prevRect.getBoundingClientRect();
            }
            _css(target, 'transition', 'none');
            _css(target, 'transform', 'translate3d(' +
                (prevRect.left - currentRect.left) + 'px,' +
                (prevRect.top - currentRect.top) + 'px,0)'
            );

            // target.offsetWidth; // 触发重绘
            //放在timeout里面也可以
            // setTimeout(function() {
            //     _css(target, 'transition', 'all ' + ms + 'ms');
            //     _css(target, 'transform', 'translate3d(0,0,0)');
            // }, 0);
            _css(target, 'transition', 'all ' + ms + 'ms');
            _css(target, 'transform', 'translate3d(0,0,0)');

            clearTimeout(target.animated);
            target.animated = setTimeout(function() {
                _css(target, 'transition', '');
                _css(target, 'transform', '');
                target.animated = false;
            }, ms);
        }
    }
    //给元素添加style
    function _css(el, prop, val) {
        var style = el && el.style;

        if (style) {
            if (val === void 0) {
                //使用DefaultView属性可以指定打开窗体时所用的视图
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    val = document.defaultView.getComputedStyle(el, '');
                } else if (el.currentStyle) {
                    val = el.currentStyle;
                }

                return prop === void 0 ? val : val[prop];
            } else {
                if (!(prop in style)) {
                    prop = '-webkit-' + prop;
                }

                style[prop] = val + (typeof val === 'string' ? '' : 'px');
            }
        }
    }
    function ListView() {
        return <View>
            <ul className='container'
              onDragStart={ulDragStart}
              onDragOver={ulDragOver}
            >{listItems}</ul>
        </View>
    }

    const listItems = initItems.map((item) => ItemView(item))

    return (
        <View>
            {/* <ListView /> */}
            {/* <SortableViewV2 /> */}
            {/* <XXView /> */}
            <PagePicker />
            
        </View>

    )
}