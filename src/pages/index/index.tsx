import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {

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
      <p id='p1' draggable='true'>This element is draggable.</p>
    )
  }
  return (
    <Text>Hello World!!!</Text>
  )
}
