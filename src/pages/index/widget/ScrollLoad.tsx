import { View, ScrollView } from '@tarojs/components';
import { useRef, useState } from 'react';
import './index.scss';

interface ScrollLoadProps {
  onRefresh: () => Promise<void>;
  onLoadMore: () => Promise<void>;
  refreshing: boolean;
  loading: boolean;
  finished: boolean;
  height?: string;
  children?: React.ReactNode;
}

export default function ScrollLoad(props: ScrollLoadProps) {
  const {
    onRefresh,
    onLoadMore,
    refreshing,
    loading,
    finished,
    height = '100vh',
    children,
  } = props;

  const scrollRef = useRef<any>(null);
  const startY = useRef(0);
  const isPulling = useRef(false);

  const [pullDown, setPullDown] = useState(0);
  const [status, setStatus] = useState<'normal' | 'pull' | 'loosen' | 'loading'>('normal');

  const REFRESH_LIMIT = 70;

  // 触摸开始
  const onTouchStart = (e) => {
    if (refreshing || loading) return;
    if (scrollRef.current?.scrollTop > 0) return;

    startY.current = e.touches[0].pageY;
    isPulling.current = true;
  };

  // 触摸移动（丝滑核心）
  const onTouchMove = (e) => {
    if (!isPulling.current || refreshing || loading) return;
    if (scrollRef.current?.scrollTop > 0) return;

    const dy = e.touches[0].pageY - startY.current;
    if (dy <= 0) {
      setPullDown(0);
      setStatus('normal');
      return;
    }

    // 超丝滑阻尼系数
    const d = Math.pow(dy, 0.92);
    const maxPull = REFRESH_LIMIT * 1.6;
    const pull = Math.min(d, maxPull);

    setPullDown(pull);

    if (pull < REFRESH_LIMIT) {
      setStatus('pull');
    } else {
      setStatus('loosen');
    }
  };

  // 触摸结束（自动回弹）
  const onTouchEnd = async () => {
    if (!isPulling.current) return;
    isPulling.current = false;

    if (pullDown >= REFRESH_LIMIT && !refreshing) {
      setStatus('loading');
      setPullDown(REFRESH_LIMIT);
      try {
        await onRefresh();
      } finally {
        setPullDown(0);
        setStatus('normal');
      }
    } else {
      // 平滑回弹
      setPullDown(0);
      setStatus('normal');
    }
  };

  const getTip = () => {
    if (status === 'pull') return '下拉刷新';
    if (status === 'loosen') return '释放立即刷新';
    if (status === 'loading') return '正在刷新...';
    return '';
  };

  return (
    <View className="pull-scroll-box">
      {/* 下拉刷新区域 */}
      <View className="refresh-header" style={{ height: `${pullDown}px` }}>
        <View className="refresh-tip">{getTip()}</View>
      </View>

      {/* 丝滑滚动容器 */}
      <ScrollView
        ref={scrollRef}
        className="scroll-view"
        style={{ height }}
        scrollY
        enhanced
        bounces={false}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onScrollToLower={() => {
          if (!loading && !finished && !refreshing) {
            onLoadMore();
          }
        }}
      >
        {children}

        <View className="load-more">
          {loading && <View>加载中...</View>}
          {finished && !loading && <View>—— 已加载完毕 ——</View>}
        </View>
      </ScrollView>
    </View>
  );
}