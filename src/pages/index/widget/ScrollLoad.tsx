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
  const [status, setStatus] = useState<'normal' | 'pull' | 'loosen' | 'refreshing' | 'success'>('normal');
  const [lastRefreshTime, setLastRefreshTime] = useState('');

  const REFRESH_LIMIT = 70;
  const SHOW_TIP_DISTANCE = 25;

  // 时间格式化
  const formatTime = (date: Date) => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // 触摸开始
  const onTouchStart = (e) => {
    if (refreshing || loading) return;
    if (scrollRef.current?.scrollTop > 0) return;
    startY.current = e.touches[0].pageY;
    isPulling.current = true;
  };

  // 触摸移动
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
        await new Promise((r) => setTimeout(r, 200));
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

  // 下拉过程中显示的内容
  const renderPullContent = () => {
    // 不到距离不显示提示文字
    if (pullDown < SHOW_TIP_DISTANCE) return null;

    if (status === 'refreshing') {
      return (
        <View className="refresh-row">
          <View className="loading-spin" />
          <View className="tip-text">正在刷新...</View>
        </View>
      );
    }

    if (status === 'success') {
      return (
        <View className="refresh-row">
          <View className="tip-text success">刷新成功</View>
        </View>
      );
    }

    return (
      <View className="refresh-row">
        <View className="tip-text">
          {status === 'loosen' ? '释放立即刷新' : '下拉刷新'}
        </View>
      </View>
    );
  };

  return (
    <View className="pull-scroll-box">
      <View className="refresh-header" style={{ height: `${pullDown}px` }}>
        {/* 下拉过程中 → 始终显示上次刷新时间 */}
        {lastRefreshTime && (
          <View className="last-time-tip">上次刷新：{lastRefreshTime}</View>
        )}

        {/* 下拉超过距离才显示：下拉刷新 / 释放刷新 */}
        {renderPullContent()}
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