import { View, Text } from '@tarojs/components';
import { FC, memo, ReactNode } from 'react';
import styles from './Dialog.module.scss'; // 🔥 改为 CSS Module

// 按钮类型定义
interface DialogButton {
  title: string;
  type: 'confirm' | 'cancel' | 'default';
  callback: () => void;
}

// 弹窗属性
interface DialogProps {
  isOpened: boolean;
  title?: ReactNode;
  renderContent: ReactNode;
  buttons: DialogButton[];
}

const Dialog: FC<DialogProps> = memo(({
  isOpened,
  title = '提示',
  renderContent,
  buttons
}) => {
  if (!isOpened) return null;

  const handleMaskClick = () => {
    const cancelBtn = buttons.find(b => b.type === 'cancel');
    if (cancelBtn) cancelBtn.callback();
  };

  return (
    <View className={styles.dialogMask} onClick={handleMaskClick}>
      <View className={styles.dialogContainer} onClick={(e) => e.stopPropagation()}>

        {title && (
          <View className={styles.dialogTitle}>{title}</View>
        )}

        <View className={styles.dialogContent}>
          {renderContent}
        </View>

        <View className={styles.dialogFooter}>
          {buttons.map((btn, idx) => (
            <View
              key={idx}
              className={`${styles.dialogBtn} ${styles[btn.type]}`}
              onClick={btn.callback}
            >
              <Text className={styles.dialogBtnText}>{btn.title}</Text>
            </View>
          ))}
        </View>

      </View>
    </View>
  );
});

export default Dialog;