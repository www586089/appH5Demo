import { useState, useRef, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import PullRefreshView, { PullRefreshViewRef } from './pull/PullRefreshView'
import styles from './index.module.scss'

export default function ListPage() {
  const pullRef = useRef<PullRefreshViewRef>(null)
  const [list, setList] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [retryCount, setRetryCount] = useState(0)

  // 模拟请求：最多 5 页，第2页前两次失败，第三次成功
  const fetchList = async (pageNum: number) => {
    return new Promise<string[]>((resolve, reject) => {
      setTimeout(() => {
        // 超过 5 页 → 返回空
        if (pageNum > 5) {
          resolve([])
          return
        }

        // 第2页：前两次失败，第三次成功
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

  // 初始化
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
          ref={pullRef}
          hasMore={hasMore}
          onRefresh={onRefresh}
          onLoadMore={onLoadMore}
          enableLoadMore
        >
          {list.map((item, idx) => (
            <View key={idx} className={styles.listItem}>{item}</View>
          ))}
        </PullRefreshView>
      </View>
    </View>
  )
}