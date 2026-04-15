import { View, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import ScrollLoad from './ScrollLoad';
import './test-page.scss';

// 模拟请求
const fetchData = (page: number, pageSize: number = 20) => {
  return new Promise<{ list: string[] }>((resolve, reject) => {
    setTimeout(() => {
      const list = Array.from({ length: pageSize }).map((_, i) => {
        return `第 ${page} 页 - 数据 ${i + 1}`;
      });
      resolve({ list });
    }, 1000);
  });
};

export default function TestPage() {
  const [list, setList] = useState<string[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  const pageSize = 20;
  const maxPage = 5;

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    setLoadError(false);
    setPageNum(1);
    setRetryCount(0);

    try {
      const res = await fetchData(1, pageSize);
      setList(res.list);
      setFinished(false);
    } catch (err) {
      console.log('刷新失败');
    } finally {
      setRefreshing(false);
    }
  };

  const loadMore = async () => {
    if (loading || finished || refreshing) return;

    setLoadError(false);
    setLoading(true);

    try {
      const nextPage = pageNum + 1;
      if (nextPage > maxPage) {
        setFinished(true);
        return;
      }

      // 核心逻辑：第3页第一次失败，重试成功
      if (nextPage === 3 && retryCount === 0) {
        setRetryCount(1);
        throw new Error('加载失败');
      }

      const res = await fetchData(nextPage, pageSize);
      setList([...list, ...res.list]);
      setPageNum(nextPage);
      setRetryCount(0);
    } catch (err) {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='test-page'>
      <ScrollLoad
        height={'100vh'}
        onRefresh={refresh}
        onLoadMore={loadMore}
        refreshing={refreshing}
        loading={loading}
        finished={finished}
        loadError={loadError}
        onRetryLoad={loadMore}
      >
        {list.map((item, index) => (
          <View key={index} className='test-page__item'>
            <Text>{item}</Text>
          </View>
        ))}
      </ScrollLoad>
    </View>
  );
}