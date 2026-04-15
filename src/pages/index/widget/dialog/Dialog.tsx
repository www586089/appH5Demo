import { View, Text } from '@tarojs/components';
import { FC, memo, ReactNode } from 'react';
import './Dialog.scss';

// 按钮类型定义
interface DialogButton {
  title: string;        // 按钮文字
  type: 'confirm' | 'cancel' | 'default'; // 按钮样式类型
  callback: () => void;  // 点击回调
}

// 弹窗属性
interface DialogProps {
  isOpened: boolean;
  title?: ReactNode;
  renderContent: ReactNode;
  buttons: DialogButton[]; // 按钮数组（传几个显示几个）
}

const Dialog: FC<DialogProps> = memo(({
  isOpened,
  title = '提示',
  renderContent,
  buttons
}) => {
  if (!isOpened) return null;

  // 点击遮罩 = 执行最后一个cancel类型按钮（如果有）
  const handleMaskClick = () => {
    const cancelBtn = buttons.find(b => b.type === 'cancel');
    if (cancelBtn) cancelBtn.callback();
  };

  return (
    <View className="dialog-mask" onClick={handleMaskClick}>
      <View className="dialog-container" onClick={(e) => e.stopPropagation()}>

        {title && (
          <View className="dialog-title">{title}</View>
        )}

        <View className="dialog-content">
          {renderContent}
        </View>

        <View className="dialog-footer">
          {buttons.map((btn, idx) => (
            <View
              key={idx}
              className={`dialog-btn ${btn.type}`}
              onClick={btn.callback}
            >
              <Text className="dialog-btn-text">{btn.title}</Text>
            </View>
          ))}
        </View>

      </View>
    </View>
  );
});

export default Dialog;