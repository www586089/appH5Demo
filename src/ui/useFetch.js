// useFetch.js
import {  } from '@tarojs/taro';
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // 依赖项：url 变化时重新请求

  return { data, loading, error };
}

// 使用自定义 Hook
function UserList() {
  const { data, loading, error } = useFetch('https://api.example.com/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <ul>
      {data && data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}


export default UserList;