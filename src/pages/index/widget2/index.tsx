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

  const fetchList = async (pageNum: number) => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        if (pageNum > 5) {
          resolve([])
          return
        }
        const data = Array.from({ length: 20 }, (_, i) => {
          const pageText = `第${pageNum}页`
          const indexText = `第${i+1}项`
          return `${pageText}|${indexText}|内容${i+1}`
        })
        resolve(data)
      }, 1000)
    })
  }

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

  const handleItemClick = (item, index) => {
    Taro.showToast({ title: `点击项 ${index + 1}`, icon: 'none' })
  }

  const handleBtnClick = (item, index) => {
    Taro.showToast({ title: `操作 ${index + 1}`, icon: 'none' })
  }

  useEffect(() => {
    onRefresh()
  }, [])

  return (
    <View className={styles.pageContainer}>
      {/* 表头 完全原样 未做任何修改 */}
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
            const cols = item.split('|')
            return (
              <View key={idx} className={styles.itemContainer}>
                <View className={styles.listItem} onClick={() => handleItemClick(item, idx)}>
                  <View className={styles.itemRow}>
                    <Text className={styles.itemCol}>{cols[0]}</Text>
                    <Text className={styles.itemCol}>{cols[1]}</Text>
                    <View className={styles.space8}></View>
                    <Text className={styles.itemCol}>{cols[2]}</Text>
                    <Text className={styles.itemCol}></Text>
                  </View>
                </View>

                <View className={styles.btnWrapper} onClick={(e) => e.stopPropagation()}>
                  <Button className={styles.itemBtn} onClick={() => handleBtnClick(item, idx)}>
                    操作
                  </Button>
                </View>
              </View>
            )
          })}
        </PullRefreshView>
      </View>
    </View>
  )
}