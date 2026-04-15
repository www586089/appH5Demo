import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import ScrollLoad from './ScrollLoad';

export default function TestPage() {
  const [list, setList] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  // 配置：每次20条，总共加载5次 = 100条
  const PAGE_SIZE = 20;
  const TOTAL_COUNT = 100;

  // 模拟接口请求
  const fetchData = (page: number) => {
    return new Promise<number[]>((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * PAGE_SIZE;
        const data = Array.from({ length: PAGE_SIZE }, (_, i) => start + i + 1);
        resolve(data);
      }, 1000);
    });
  };

  // 初始化
  useEffect(() => {
    loadRefresh();
  }, []);

  // 刷新：重置为第1页
  const loadRefresh = async () => {
    const data = await fetchData(1);
    setList(data);
    setFinished(data.length >= TOTAL_COUNT);
  };

  // 下拉刷新
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  // 上拉加载更多
  const onLoadMore = async () => {
    if (loading || finished) return;

    setLoading(true);
    try {
      const currentPage = Math.floor(list.length / PAGE_SIZE) + 1;
      const nextData = await fetchData(currentPage);

      const newList = [...list, ...nextData];
      setList(newList);

      // 判断是否加载完成（总共100条）
      if (newList.length >= TOTAL_COUNT) {
        setFinished(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ width: '100%', height: '100vh', background: '#f5f7fa' }}>
      <ScrollLoad
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        refreshing={refreshing}
        loading={loading}
        finished={finished}
        height="100vh"
      >
        {/* 列表容器 */}
        <View style={{ padding: '12rpx 24rpx', boxSizing: 'border-box' }}>
          {list.map((item) => (
            <View
              key={item}
              style={{
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 32rpx',
                background: '#fff',
                borderRadius: '16rpx',
                marginBottom: '12rpx',
                boxShadow: '0 2rpx 8rpx rgba(0,0,0,0.05)',
                fontSize: '28rpx',
                color: '#333',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.background = '#f7f8fa';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.background = '#fff';
              }}
            >
              列表数据 {item}
            </View>
          ))}
        </View>
      </ScrollLoad>
    </View>
  );
}