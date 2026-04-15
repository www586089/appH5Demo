import { View, ScrollView } from '@tarojs/components';
import { useRef, useState } from 'react';
import './index.scss';

interface ScrollLoadProps {
  onRefresh: () => Promise<void>;
  onLoadMore: () => Promise<void>;
  refreshing: boolean;
  loading: boolean;
  finished: boolean;
  loadError?: boolean;
  onRetryLoad?: () => void;
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
    loadError = false,
    onRetryLoad,
    height = '100vh',
    children,
  } = props;

  const scrollRef = useRef<any>(null);
  const startY = useRef(0);
  const isPulling = useRef(false);

  const [pullDown, setPullDown] = useState(0);
  const [status, setStatus] = useState('normal');
  const [lastRefreshTime, setLastRefreshTime] = useState('');

  const REFRESH_LIMIT = 70;

  const formatTime = (date: Date) => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const onTouchStart = (e: any) => {
    if (refreshing || loading) return;
    if (scrollRef.current?.scrollTop > 0) return;
    startY.current = e.touches[0].pageY;
    isPulling.current = true;
  };

  const onTouchMove = (e: any) => {
    if (!isPulling.current || refreshing || loading) return;
    if (scrollRef.current?.scrollTop > 0) return;

    const dy = e.touches[0].pageY - startY.current;
    if (dy <= 0) {
      setPullDown(0);
      setStatus('normal');
      return;
    }

    const pull = Math.min(dy, REFRESH_LIMIT * 1.6);
    setPullDown(pull);
    setStatus(pull < REFRESH_LIMIT ? 'pull' : 'loosen');
  };

  const onTouchEnd = async () => {
    if (!isPulling.current) return;
    isPulling.current = false;

    if (pullDown >= REFRESH_LIMIT && !refreshing) {
      setStatus('refreshing');
      setPullDown(REFRESH_LIMIT);
      try {
        await onRefresh();
        setStatus('success');
        await new Promise(r => setTimeout(r, 800));
        setLastRefreshTime(formatTime(new Date()));
      } finally {
        setPullDown(0);
        setStatus('normal');
      }
    } else {
      setPullDown(0);
      setStatus('normal');
    }
  };

  const getTip = () => {
    if (status === 'pull') return '下拉刷新';
    if (status === 'loosen') return '释放刷新';
    if (status === 'refreshing') return '正在刷新';
    if (status === 'success') return '刷新成功';
    return '';
  };

  const handleRetry = () => {
    if (loading) return;
    onRetryLoad?.();
  };

  return (
    <View className="pull-scroll-box">
      <View className="refresh-header" style={{ height: `${pullDown}px` }}>
        <View className="refresh-wrapper">
          <View className="refresh-row">
            {status === 'refreshing' && <View className="loading-spin" />}
            <View className={`tip-text ${status === 'success' ? 'success' : ''}`}>
              {getTip()}
            </View>
            {lastRefreshTime && status !== 'refreshing' && (
              <View className="time-text">上次刷新：{lastRefreshTime}</View>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        className="scroll-view"
        style={{ height }}
        scrollY
        enhanced
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onScrollToLower={() => {
          if (!loading && !finished && !refreshing && !loadError) {
            onLoadMore();
          }
        }}
      >
        {children}

        <View className="load-more-container">
          {loading && (
            <View className="load-row">
              <View className="loading-spin" />
              <View className="load-text">加载中...</View>
            </View>
          )}

          {finished && !loading && !loadError && (
            <View className="load-text">—— 已加载完毕 ——</View>
          )}

          {loadError && !loading && (
            <View className="load-error" onClick={handleRetry}>
              加载失败，点击重试
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}