import { View, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import ScrollLoad from './ScrollLoad';
import Dialog from './dialog/Dialog';
import styles from './test-page.module.scss';

// 模拟请求
const fetchData = (page: number, pageSize: number = 20) => {
  return new Promise<{ list: string[] }>((resolve) => {
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
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // 弹窗
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState('');

  const pageSize = 20;
  const maxPage = 5;

  useEffect(() => {
    refresh();
  }, []);

  // 下拉刷新
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

  // 上拉加载
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

      // 第3页第一次失败，重试成功
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

  // 点击按钮弹出对话框
  const handleItemBtn = (item: string, index: number) => {
    setCurrentItem(item);
    setDialogVisible(true);
  };

  return (
    <View className={styles['test-page']}>
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
        {/* 你的原有列表 */}
        {list.map((item, index) => (
          <View key={index} className={styles['test-page__item']}>
            <Text className={styles['test-page__text']}>{item}</Text>
            <View className={styles['item-btn']} onClick={() => handleItemBtn(item, index)}>
              操作
            </View>
          </View>
        ))}
      </ScrollLoad>

      {/* ============================== */}
      {/* 只改了两个属性名：isOpened + renderContent */}
      {/* ============================== */}
      <Dialog
        isOpened={dialogVisible}
        title={
          <View style={{ color: '#0066ff', fontWeight: 'bold' }}>操作提醒</View>
        }
        renderContent={
          <View>
            <Text>您选择了：</Text>
            <Text style={{ color: '#ff4000' }}>{currentItem}</Text>
          </View>
        }
        buttons={[
          {
            title: '取消',
            type: 'cancel',
            callback: () => {
              setDialogVisible(false);
            },
          },
          {
            title: '确定',
            type: 'confirm',
            callback: () => {
              console.log('点击确认：', currentItem);
              setDialogVisible(false);
            },
          },
        ]}
      />
    </View>
  );
}