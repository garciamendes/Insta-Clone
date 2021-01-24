// React
import React, { useState, useEffect, useCallback } from 'react'

// React Native
import { View, FlatList } from 'react-native'

// Local
import {
  Post,
  Header,
  Avatar,
  Name,
  Description,
  Loading
} from './style'
import LazyImage from '../../components/LazyImage'

export default function Feed() {
  const [feed, setFeed] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [viewable, setViewable] = useState([])
  
  async function loadPage(pageNumber = page, shoulRefresh = false) {
    if(total && pageNumber > total) return

    setLoading(true)

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
    );

    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count')
  
    setTotal(Math.floor(totalItems / 5));
    setFeed(shoulRefresh ? data : [...feed, ...data])
    setPage(pageNumber + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadPage()
  }, [])

  async function refreshList() {
    setRefreshing(true)
  
    await loadPage(1, true)

    setRefreshing(false)
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map( ({ item }) => item.id))
  }, [])

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={(post) => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableChanged}
        ListFooterComponent={loading && <Loading />}
        renderItem={({item}) => (
          <Post>
            <Header>
              <Avatar source={{uri: item.author.avatar}} />
              <Name>{item.author.name}</Name>
            </Header>

            <LazyImage shouldLoad={viewable.includes(item.id)} smallSource={{ uri: item.small }} source={{uri: item.image}} />

            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
}