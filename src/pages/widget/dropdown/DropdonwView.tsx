import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import './DropdownView.scss'
import type { ReactNode } from 'react'

// 定义组件Props接口
interface DropdownProps {
  /** 选择项数据 */
  options: { label: string; value: string }[];
  /** 默认选中值 */
  defaultValue?: string;
  /** 占位符文本 */
  placeholder?: string;
  /** 选中项文本颜色 */
  activeColor?: string;
  /** 下拉框最大高度 */
  maxHeight?: string;
  /** 选择变化回调 */
  onChange?: (value: string, label: string) => void;
}

export default function DropdownView({
  options,
  defaultValue = '',
  placeholder = '请选择',
  activeColor = '#1677ff',
  maxHeight = '60vh',
  onChange
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');

  // 初始化选中值
  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(option => option.value === defaultValue);
      if (defaultOption) {
        setSelectedValue(defaultValue);
        setSelectedLabel(defaultOption.label);
      }
    }
  }, [defaultValue, options]);

  const handleSelect = (option: { label: string; value: string }) => {
    setSelectedValue(option.value);
    setSelectedLabel(option.label);
    setIsOpen(false);
    onChange && onChange(option.value, option.label);
  };

  return (
    <View className='dropdown-container'>
      <View
        className='dropdown-trigger'
        onClick={() => setIsOpen(!isOpen)}
        style={{ '--active-color': activeColor }}
      >
        <Text>{selectedLabel || placeholder}</Text>
        <View className={`arrow-icon ${isOpen ? 'active' : ''}`}>
          <Text>▼</Text>
        </View>
      </View>

      {isOpen && (
        <>            
          <View 
            className='dropdown-mask'
            onClick={() => setIsOpen(false)}
          ></View>

          <View 
            className='dropdown-content'
            style={{ maxHeight }}
          >
            {options.map((option, index) => (
              <View
                key={index}
                className={`dropdown-item ${selectedValue === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <Text>{option.label}</Text>
                {selectedValue === option.value && (
                  <Text className='check-icon'>✓</Text>
                )}
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  )
}