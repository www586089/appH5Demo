import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useEffect, useState } from 'react'

import './index.scss'


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

  function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }

  window.addEventListener("DOMContentLoaded", () => {
    // Get the element by id
    const element = document.getElementById("p1");
    if (!element) {
      return
    }
    // Add the ondragstart event listener
    element.addEventListener("dragstart", dragstart_handler);
  });

  useLoad(() => {
    console.log('Page loaded.')
  })

  function DraggableText() {
    return (
      <p id='p1' draggable='true' onDragStart={handleOnDragStart}>This element is draggable.</p>
    )
  }

  function handleOnDragStart(e) {
    e.dataTransfer.setData('text/plain', 'This text may be dragged')
    Taro.showToast({
      title: 'onDragStart'
    })
  }
  function DraggableP() {
    return (
      <p
        draggable='true'
        onDragStart={handleOnDragStart}
      >
        This text <strong>may</strong> be dragged.
      </p>

    )
  }

  function ItemView(item: PoteItem) {
    return (
      <li key={item.id}
        draggable='true'
        onDragStart={handleOnDragStart}
      >{item.descInfo}</li>
    )
  }

  const listItems = items.map(item => ItemView(item))

  return (
    <View className='index'>
      <ul>{listItems}</ul>
    </View>
  )
}
