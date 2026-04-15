import { View, ScrollView } from '@tarojs/components';
import { useRef, useState, useEffect } from 'react';
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
  const [status, setStatus] = useState<'normal' | 'pull' | 'loosen' | 'refreshing' | 'success'>('normal');
  const [lastRefreshTime, setLastRefreshTime] = useState('');

  const REFRESH_LIMIT = 70;
  const SHOW_TIP_DISTANCE = 25; // 下拉超过25px才显示文案

  // 格式化时间
  const formatTime = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${d} ${h}:${mi}:${s}`;
  };

  // 触摸开始
  const onTouchStart = (e) => {
    if (refreshing || loading) return;
    if (scrollRef.current?.scrollTop > 0) return;
    startY.current = e.touches[0].pageY;
    isPulling.current = true;
  };

  // 触摸移动（丝滑）
  const onTouchMove = (e) => {
    if (!isPulling.current || refreshing || loading) return;
    if (scrollRef.current?.scrollTop > 0) return;

    const dy = e.touches[0].pageY - startY.current;
    if (dy <= 0) {
      setPullDown(0);
      setStatus('normal');
      return;
    }

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

  // 触摸结束
  const onTouchEnd = async () => {
    if (!isPulling.current) return;
    isPulling.current = false;

    if (pullDown >= REFRESH_LIMIT && !refreshing) {
      setStatus('refreshing');
      setPullDown(REFRESH_LIMIT);
      try {
        await onRefresh();
        setStatus('success');
        setLastRefreshTime(formatTime(new Date()));
        await new Promise((r) => setTimeout(r, 200));
      } finally {
        setPullDown(0);
        setStatus('normal');
      }
    } else {
      setPullDown(0);
      setStatus('normal');
    }
  };

  // 渲染内容
  const renderRefreshContent = () => {
    if (pullDown < SHOW_TIP_DISTANCE && status !== 'refreshing' && status !== 'success') {
      return null;
    }

    if (status === 'refreshing') {
      return (
        <View className="refresh-box">
          <View className="loading-spin" />
          <View className="tip-text">正在刷新...</View>
        </View>
      );
    }
    if (status === 'success') {
      return (
        <View className="refresh-box">
          <View className="tip-text success">刷新成功</View>
        </View>
      );
    }
    if (status === 'loosen') {
      return (
        <View className="refresh-box">
          <View className="tip-text">释放立即刷新</View>
        </View>
      );
    }
    if (status === 'pull') {
      return (
        <View className="refresh-box">
          <View className="tip-text">下拉刷新</View>
        </View>
      );
    }
    return null;
  };

  return (
    <View className="pull-scroll-box">
      <View className="refresh-header" style={{ height: `${pullDown}px` }}>
        {renderRefreshContent()}
        {lastRefreshTime && status === 'normal' && pullDown === 0 && (
          <View className="last-time">最近更新: {lastRefreshTime}</View>
        )}
      </View>

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
          if (!loading && !finished && !refreshing) onLoadMore();
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