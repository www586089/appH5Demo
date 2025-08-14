import { Button, Text, View } from '@tarojs/components'
import styles from './test.module.scss'

export default function Test() {
  return (
    <View className={styles['page']}>
        <Button className={styles['button']}>
            按钮
        </Button>
        <Button className={styles['red-button']}>
            红色按钮
        </Button>

        <View className={styles['navbar']}>
            <View className={styles['nav-item']}>热门</View>
            <View className={styles['nav-item']}>首页</View>
            <View className={styles['nav-item']}>关于</View>
            <View className={styles['nav-item']}>联系</View>
        </View>

        <Text className={styles['text']}>
            文本
        </Text>
        <Text className={styles['primary-text']}>
            文本2
        </Text>
        <Text className={styles['element']}>
            文本3
        </Text>
        <Text className={styles['element-width']}>
            文本4
        </Text>



    </View>
  )
}