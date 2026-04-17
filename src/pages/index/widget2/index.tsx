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
        const data = Array.from({ length: 20 }, (_, i) => `第${pageNum}页 - 第${i + 1}条数据`)
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

  // 👇 【新增】Item 整体点击事件（点击列表项触发）
  const handleItemClick = (item, index) => {
    Taro.showToast({
      title: `点击了列表项 ${index + 1}`,
      icon: 'none'
    })
  }

  // 👇 【原有】按钮点击事件（点击按钮触发）
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
      <View className={styles.tableHeader}>
        <Text className={styles.headerText}>列表数据表头</Text>
      </View>

      <View className={styles.listContent}>
        <PullRefreshView
          height='calc(100vh - 88px)'
          ref={pullRef}
          hasMore={hasMore}
          onRefresh={onRefresh}
          onLoadMore={onLoadMore}
          enableLoadMore
        >
          {list.map((item, idx) => (
            // 👇 给 Item 添加点击事件
            <View key={idx} className={styles.listItem} onClick={() => handleItemClick(item, idx)}>
              <Text className={styles.itemText}>{item}</Text>
              
              {/* 👇 按钮点击加 stopPropagation 防止触发 Item 点击 */}
              <Button 
                className={styles.itemBtn} 
                onClick={(e) => {
                  e.stopPropagation() // 关键：阻止事件冒泡
                  handleBtnClick(item, idx)
                }}
              >
                操作
              </Button>
            </View>
          ))}
        </PullRefreshView>
      </View>
    </View>
  )
}