import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import DropdownView from '../widget/dropdown/DropdonwView';

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
// 银行选项数据
const bankOptions = [
  { label: '中国银行', value: 'bank1' },
  { label: '农业银行', value: 'bank2' },
  { label: '广州银行', value: 'bank3' },
  { label: '华夏银行', value: 'bank4' },
  { label: '工商银行', value: 'bank5' },
  { label: '建设银行', value: 'bank6' },
  { label: '招商银行', value: 'bank7' }
];

// 省份选项数据
const provinceOptions = [
  { label: '广东省', value: 'gd' },
  { label: '江苏省', value: 'js' },
  { label: '浙江省', value: 'zj' },
  { label: '北京市', value: 'bj' },
  { label: '上海市', value: 'sh' }
];

// 选择变化处理函数
const handleBankChange = (value: string, label: string) => {
  console.log('选择了银行:', value, label);
};

useLoad(() => {
  console.log('Page loaded.')
})

return (
  <View className='index-page'>
    <Text className='page-title'>下拉选择框组件示例</Text>

    <View className='demo-section'>
      <Text className='demo-label'>银行选择 (默认样式):</Text>
      <DropdownView
        options={bankOptions}
        defaultValue='bank3'
        placeholder='请选择银行'
        onChange={handleBankChange}
      />
    </View>

    <View className='demo-section'>
      <Text className='demo-label'>省份选择 (自定义颜色):</Text>
      <DropdownView
        options={provinceOptions}
        placeholder='请选择省份'
        activeColor='#f5222d'
        maxHeight='30vh'
      />
    </View>
  </View>
  )
}
