import { useState, useRef, useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PullRefreshView, { PullRefreshViewRef } from './pull/PullRefreshView'
import styles from './index.module.scss'

export default function ListPage() {
  const pullRef = useRef<PullRefreshViewRef>(null)
  const [list, setList] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [retryCount, setRetryCount] = useState(0)

  // 模拟请求
  const fetchList = async (pageNum: number) => {
    return new Promise<string[]>((resolve, reject) => {
      setTimeout(() => {
        if (pageNum > 5) {
          resolve([])
          return
        }
        if (pageNum === 2 && retryCount < 2) {
          reject(new Error('加载失败'))
          return
        }
        // 生成4列模拟数据
        const data = Array.from({ length: 20 }, (_, i) => 
          `内容${i+1}|内容${i+1}|内容${i+1}|内容${i+1}`
        )
        resolve(data)
      }, 1000)
    })
  }

  // 下拉刷新
  const onRefresh = async () => {
    setPage(1)
    setRetryCount(0)
    setHasMore(true)
    try {
      const data = await fetchList(1)
      setList(data)
    } catch {}
    pullRef.current?.onRefreshComplete()
  }

  // 上拉加载
  const onLoadMore = async () => {
    if (!hasMore) return
    const nextPage = page + 1
    try {
      const data = await fetchList(nextPage)
      if (data.length === 0) {
        setHasMore(false)
      } else {
        setPage(nextPage)
        setList(prev => [...prev, ...data])
        setRetryCount(0)
      }
      pullRef.current?.onLoadComplete(data.length === 0)
    } catch (err) {
      setRetryCount(prev => prev + 1)
      pullRef.current?.onLoadError()
    }
  }

  // Item 整体点击事件
  const handleItemClick = (item, index) => {
    Taro.showToast({
      title: `点击了列表项 ${index + 1}`,
      icon: 'none'
    })
  }

  // 按钮点击事件
  const handleBtnClick = (item, index) => {
    Taro.showToast({
      title: `点击了操作按钮 ${index + 1}`,
      icon: 'none'
    })
  }

  useEffect(() => {
    onRefresh()
  }, [])

  return (
    <View className={styles.pageContainer}>
      {/* 🔥 优化：4列表头 */}
      <View className={styles.tableHeader}>
        <View className={styles.headerRow}>
          <Text className={styles.headerCol}>数据项1</Text>
          <Text className={styles.headerCol}>数据项2</Text>
          <Text className={styles.headerCol}>数据项3</Text>
          <Text className={styles.headerCol}>数据项4</Text>
        </View>
      </View>

      <View className={styles.listContent}>
        <PullRefreshView
          height='calc(100vh - 72px)'
          ref={pullRef}
          hasMore={hasMore}
          onRefresh={onRefresh}
          onLoadMore={onLoadMore}
          enableLoadMore
        >
          {list.map((item, idx) => {
            // 分割为4列
            const cols = item.split('|')
            return (
              <View key={idx} className={styles.listItem} onClick={() => handleItemClick(item, idx)}>
                {/* 🔥 4列内容 */}
                <View className={styles.itemRow}>
                  <Text className={styles.itemCol}>{cols[0]}</Text>
                  <Text className={styles.itemCol}>{cols[1]}</Text>
                  <Text className={styles.itemCol}>{cols[2]}</Text>
                  <Text className={styles.itemCol}>{cols[3]}</Text>
                </View>
                
                {/* 按钮保持不变 */}
                <Button 
                  className={styles.itemBtn} 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBtnClick(item, idx)
                  }}
                >
                  操作
                </Button>
              </View>
            )
          })}
        </PullRefreshView>
      </View>
    </View>
  )
}