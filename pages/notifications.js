import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { ALL_NOTIFICATIONS_QUERY, UPDATE_NOTIFICATION } from '../graphql/gql/notifications'
import { useQuery, useMutation } from '@apollo/client'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'

const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const InfiniteWrapper = styled.div`
  width: 100%;
  height: 500px;
  overflow: auto;
  border: solid 1px #999;
  box-shadow: 1px 1px 5px #222;
`
const Font = styled.span`
  font-size: 24px;
  color: blue;
`
const CardStyled = styled(Card)`
  position: relative;
  cursor: pointer;
  ${({ isRead }) =>
    !isRead &&
    css`
      &:before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        right: 15px;
        top: 15px;
      }
    `}
`

const LoadingWrapper = styled.div`
  margin-top: 60px;
  font-size: 38px;
  font-weight: bold;
  color: #74738554;
`

function Notifications(props) {
  const { data: notificationsData, loading: notificationsDataLoading, fetchMore } = useQuery(ALL_NOTIFICATIONS_QUERY)
  const [updateMutation] = useMutation(UPDATE_NOTIFICATION)
  const originNotifications = notificationsData?.user?.notifications
  const sortedNotifications = notificationsData?.user?.sortNotifications
  const fetchData = () => {
    if (fetchMore) {
      fetchMore({ query: ALL_NOTIFICATIONS_QUERY })
    }
  }
  const handleUpdateNotification = (item) => {
    updateMutation({
      variables: {
        notificationId: item.id,
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify(item), //`${item.__typename}:${item.id}`,
          fields: {
            content: (existing) => {
              return {
                // 原本 content 內容
                ...existing,
                // 將 content 裡的 isRead 改成 true
                isRead: true,
              }
            },
          },
        })
      },
    })
  }
  // render 原始排序
  const renderOriginalView = () => {
    return (
      <InfiniteWrapper id='scrollableDiv'>
        <InfiniteScroll dataLength={originNotifications?.length ?? 0} next={fetchData} hasMore={true} scrollableTarget='scrollableDiv'>
          <Grid container>
            {originNotifications?.map((item) => {
              return (
                <Grid item key={item.id}>
                  <CardStyled
                    onClick={() => handleUpdateNotification(item)}
                    isRead={item?.content?.isRead}
                    sx={{ width: '350px', height: '250px' }}
                  >
                    <CardContent>
                      <Typography variant='h5' component='p'>
                        通知：{item?.content?.title}
                      </Typography>
                      <Typography variant='h6' component='p'>
                        副標題：{item?.content?.subTitle}
                      </Typography>
                      <Typography variant='h6' component='p'>
                        發文日期：{moment(Number(item?.content?.createTime)).format('YYYY/MM/DD')}
                      </Typography>
                    </CardContent>
                  </CardStyled>
                </Grid>
              )
            })}
          </Grid>
        </InfiniteScroll>
      </InfiniteWrapper>
    )
  }
  // render 排序過後資料
  const renderSortedView = () => {
    return (
      <InfiniteWrapper id='scrollableSort'>
        <InfiniteScroll dataLength={sortedNotifications?.length ?? 0} next={fetchData} hasMore={true} scrollableTarget='scrollableSort'>
          <Grid container>
            {sortedNotifications?.map((item) => {
              return (
                <Grid item key={item.id}>
                  <CardStyled
                    onClick={() => handleUpdateNotification(item)}
                    isRead={item?.content?.isRead}
                    sx={{ width: '350px', height: '250px' }}
                  >
                    <CardContent>
                      <Typography variant='h5' component='p'>
                        通知：{item?.content?.title}
                      </Typography>
                      <Typography variant='h6' component='p'>
                        副標題：{item?.content?.subTitle}
                      </Typography>
                      <Typography variant='h6' component='p'>
                        發文日期：{moment(Number(item?.content?.createTime)).format('YYYY/MM/DD')}
                      </Typography>
                    </CardContent>
                  </CardStyled>
                </Grid>
              )
            })}
          </Grid>
        </InfiniteScroll>
      </InfiniteWrapper>
    )
  }
  const renderView = () => {
    if (notificationsDataLoading) {
      return <LoadingWrapper>Loading......</LoadingWrapper>
    }
    return (
      <>
        <Grid item xs={6}>
          <Font>尚未排序</Font>
          {renderOriginalView()}
        </Grid>
        <Grid item xs={6}>
          <Font>排序過後</Font>
          {renderSortedView()}
        </Grid>
      </>
    )
  }
  return (
    <NotificationsContainer>
      <Typography variant='h4' component='div'>
        通知頁面
      </Typography>
      <Grid container spacing={2} justifyContent={'center'}>
        {renderView()}
      </Grid>
    </NotificationsContainer>
  )
}

export default Notifications
