import Taro from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import { useState } from 'react';
 
const AmountInput = () => {
  const [amount, setAmount] = useState('');
 
  const handleInput = (e) => {
    // 只允许输入数字和小数点，且小数点后最多两位
    const value = e.detail.value;
    const regex = /^\d*\.?\d{0,2}$/; // 正则表达式，允许整数或最多两位小数的数字
    if (regex.test(value) || value === '') {
      setAmount(value);
    } else {
      // 如果输入不合法，可以选择性地阻止更新或给出提示
      Taro.showToast({ title: '请输入正确的金额', icon: 'none' });
    }
  };

  function H5Input() {
    const [value, setValue] = useState()
    return (
        <>
        </>
    )
  }
 
  return (
    <View>
      <Input
        type='digit' // 使用 digit 类型可以限制键盘显示为数字键盘，但不是完全限制输入内容
        value={amount}
        onInput={handleInput}
        maxlength={5}
        placeholder='请输入金额'
      />
      <H5Input />
    </View>
  );
};
 
export default AmountInput;