import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  ReactNode,
} from 'react'
import { View, ScrollView, Text, ITouchEvent } from '@tarojs/components' // 正确类型：ITouchEvent
import Taro from '@tarojs/taro'
import styles from './PullRefreshView.module.scss'

export interface PullRefreshViewRef {
  onRefreshComplete: () => void
  onLoadComplete: (noMore?: boolean) => void
  onLoadError: () => void
}

export interface PullRefreshViewProps {
  height?: number
  enableLoadMore?: boolean
  hasMore?: boolean
  onRefresh: () => void
  onLoadMore: () => void
  children?: ReactNode
}

const REFRESH_HEIGHT = 64

const PullRefreshView = forwardRef<PullRefreshViewRef, PullRefreshViewProps>((props, ref) => {
  const {
    height = 0,
    enableLoadMore = true,
    hasMore = false,
    onRefresh,
    onLoadMore,
    children,
  } = props

  const scrollRef = useRef<any>(null)
  const startYRef = useRef(0)
  const isRefreshingRef = useRef(false)

  const [scrollTop, setScrollTop] = useState(0)
  const [pullDy, setPullDy] = useState(0)
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'noMore' | 'error'>('idle')
  const [refreshText, setRefreshText] = useState('')

  useEffect(() => {
    const sys = Taro.getSystemInfoSync()
    const h = height || sys.windowHeight - 88
    if (scrollRef.current) {
      scrollRef.current.style.height = `${h}px`
    }
  }, [height])

  useImperativeHandle(ref, () => ({
    onRefreshComplete: () => {
      setRefreshText('√刷新成功')
      setTimeout(() => {
        setPullDy(0)
        isRefreshingRef.current = false
        setRefreshText('')
      }, 900)
    },
    onLoadComplete: (noMore = false) => {
      setLoadStatus(noMore ? 'noMore' : 'idle')
    },
    onLoadError: () => {
      setLoadStatus('error')
    },
  }))

  // Taro 官方正确触摸事件类型，无警告
  const onTouchStart = (e: ITouchEvent) => {
    if (scrollTop !== 0 || isRefreshingRef.current) return
    startYRef.current = e.touches[0].clientY
  }

  const onTouchMove = (e: ITouchEvent) => {
    if (scrollTop !== 0 || isRefreshingRef.current) return

    const dy = e.touches[0].clientY - startYRef.current
    if (dy <= 0) return

    const pull = Math.min(dy, 120)
    setPullDy(pull)

    if (pull >= REFRESH_HEIGHT) {
      setRefreshText('↑ 释放刷新')
    } else {
      setRefreshText('↓ 下拉刷新')
    }
  }

  const onTouchEnd = () => {
    if (scrollTop !== 0 || isRefreshingRef.current) return

    if (pullDy >= REFRESH_HEIGHT) {
      isRefreshingRef.current = true
      setPullDy(REFRESH_HEIGHT)
      setRefreshText('正在刷新...')
      onRefresh?.()
      setLoadStatus('idle') // ✅ 【修复bug】下拉刷新重置底部加载状态，隐藏“没有更多了”
    } else {
      setPullDy(0)
      setRefreshText('')
    }
  }

  const onScroll = (e: any) => {
    setScrollTop(e.detail.scrollTop)
  }

  const onScrollToLower = () => {
    if (!hasMore || loadStatus === 'loading') return
    setLoadStatus('loading')
    onLoadMore?.()
  }

  const animStyle = {
    transform: `translateY(${pullDy}px)`,
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  }

  return (
    <View className={styles.pullRefreshView}>
      <ScrollView
        ref={scrollRef}
        scrollY
        className={styles.refreshScroll}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onScroll={onScroll}
        onScrollToLower={onScrollToLower}
        enhanced
        showScrollbar={false}
        bounces
      >
        <View className={styles.refreshHeader} style={animStyle}>
          {/* 🔥 只保留箭头，文字里不再带箭头，彻底解决双箭头 */}
          {!isRefreshingRef.current && (
            <Text className={styles.arrow}>
              {refreshText === '↑ 释放刷新' ? '↑' : refreshText === '↓ 下拉Refresh' ? '↓' : ''}
            </Text>
          )}

          {/* 刷新动画：仅刷新中显示 */}
          {isRefreshingRef.current && refreshText === '正在刷新...' && <View className={styles.spin} />}

          {/* 文字：纯文字，不带箭头 */}
          <Text className={styles.refreshText}>
            {refreshText === '↑ 释放刷新' ? '释放刷新' : 
             refreshText === '↓ 下拉刷新' ? '下拉刷新' : 
             refreshText}
          </Text>
        </View>

        <View className={styles.contentWrap} style={animStyle}>
          {children}
        </View>

        {enableLoadMore && (
          <View className={styles.loadMoreFooter}>
            {loadStatus === 'loading' && (
              <View className={styles.loadRow}>
                <View className={styles.spin} />
                <Text>加载中...</Text>
              </View>
            )}
            {loadStatus === 'noMore' && '📌 没有更多了'}
            {loadStatus === 'error' && (
              <View onClick={() => {
                setLoadStatus('loading')
                onLoadMore?.()
              }}
              >❌ 加载失败，点击重试</View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  )
})

export default PullRefreshView