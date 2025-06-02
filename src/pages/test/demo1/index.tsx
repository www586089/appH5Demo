import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { DragEvent, useEffect, useState } from 'react'

import './index.scss'
import dragImg from "../../../media/drag.png"


interface PoteItem {
  descInfo: string
  id: string
}

const initItems: PoteItem[] = [
  { descInfo: '白日依山尽', id: '1' },
  { descInfo: '黄河入海流', id: '2' },
  { descInfo: '欲穷千里目', id: '3' },
  { descInfo: '更上一层楼', id: '4' }
]


export default function Index() {

  const [items, setItems] = useState(initItems)

  function drag_handler(ev) {
    console.log('drag_handler')
  }
  function dragstart_handler(ev) {
    console.log('dragstart_handler')
    // Add the target element's id to the data transfer object
    let sourceElementId = ev.target.id
    console.log('dragstart_handler->sourceElementId = ' + sourceElementId)
    ev.dataTransfer.setData("text/plain", sourceElementId);
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.dropEffect = "move";
  }


  function dragenter_handler(ev: DragEvent) {
    console.log('dragenter_handler')
    ev.preventDefault()
  }

  function dragover_handler(ev: DragEvent) {
    console.log('dragover_handler')
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }

  function dragleave_handler(ev) {
    console.log('dragleave_handler')
  }


  function dragend_handler(ev: DragEvent) {
    console.log('dragend_handler')
    Taro.showToast({
      title: 'Drag end'
    })
  }

  function drop_handler(ev) {
    console.log('drop_handler')
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var sourceElementId = ev.dataTransfer.getData("text/plain");
    console.log('drop_handler->sourceElementId = ' + sourceElementId)
    ev.target.appendChild(document.getElementById(sourceElementId));
  }

  useLoad(() => {
    console.log('Page loaded.')
  })

  function DropableArea() {
    return (
      <>
        <p
          id='target'
          className='target'
          onDrop={(e) => { drop_handler(e) }}
          onDragEnter={dragenter_handler}
          onDragOver={dragover_handler}
          onDragLeave={dragleave_handler}
        >
          Drop Zone
        </p>
      </>
    )
  }

  function DraggableText() {
    return (
      <>
        <p id='p1'
          onDrag={drag_handler}
          draggable='true'
          onDragStart={dragstart_handler}
          onDragEnd={dragend_handler}
          className='source'
        >This element is draggable.</p>
      </>
    )
  }

  function handleOnDragStart(ev) {
    // 添加拖拽数据
    // ev.dataTransfer.setData("text/plain", ev.target.innerText);
    // ev.dataTransfer.setData("text/html", ev.target.outerHTML);
    // ev.dataTransfer.setData("text/uri-list", ev.target.ownerDocument.location.href);
    let sourceElementId = ev.target.id
    ev.dataTransfer.setData("text/plain", sourceElementId);
    // let image = new Image()
    // image.src = dragImg
    // ev.dataTransfer.setDragImage(image, 10, 10);
    ev.dataTransfer.dropEffect = "copy";
    Taro.showToast({
      title: 'onDragStart'
    })
  }

  function handleOnDragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }

  function handleOnDragDrop(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
  }


  function ItemView(item: PoteItem) {
    return (
      <li key={item.id}
        id={item.id}
        className='item'
        draggable='true'
        onDragStart={handleOnDragStart}
        onDragOver={handleOnDragOver}
        onDrop={handleOnDragDrop}
      >{item.descInfo}</li>
    )
  }

  const listItems = items.map(item => ItemView(item))

  return (
    <View className='container'>
      <ul>{listItems}</ul>
      <DraggableText />
      <DropableArea />
    </View>
  )
}
