import { useState, useRef, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import PullRefreshView, { PullRefreshViewRef } from './pull/PullRefreshView'
import styles from './index.module.scss'

export default function ListPage() {
  const pullRef = useRef<PullRefreshViewRef>(null)
  const [list, setList] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)

  const fetchList = async (page: number) => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        const data = Array.from({ length: 20 }, (_, i) => {
          return `第 ${page} 页 - 第 ${i + 1} 条数据`
        })
        resolve(data)
      }, 1000)
    })
  }

  const onRefresh = async () => {
    const data = await fetchList(1)
    setList(data)
    pullRef.current?.onRefreshComplete()
  }

  const onLoadMore = async () => {
    const currentPage = Math.floor(list.length / 20) + 1
    const nextPage = currentPage + 1

    if (nextPage > 5) {
      setHasMore(false)
      pullRef.current?.onLoadComplete(true)
      return
    }

    const data = await fetchList(nextPage)
    setList([...list, ...data])
    pullRef.current?.onLoadComplete()
  }

  useEffect(() => {
    const initLoad = async () => {
      const data = await fetchList(1)
      setList(data)
    }
    initLoad()
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