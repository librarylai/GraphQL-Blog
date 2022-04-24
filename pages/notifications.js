import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { ALL_NOTIFICATIONS_QUERY } from '../graphql/gql/notifications'
import { useQuery } from '@apollo/client'
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
  box-shadow: 1px 1px 5px #222 ;
`
const Font = styled.span`
  font-size: 24px;
  color: blue;
`

function Notifications(props) {
  const { data: notificationsData, fetchMore } = useQuery(ALL_NOTIFICATIONS_QUERY)
  const originNotifications = notificationsData?.user?.notifications
  const sortedNotifications = notificationsData?.user?.sortNotifications
  const fetchData = () => {
    if (fetchMore) {
      fetchMore({ query: ALL_NOTIFICATIONS_QUERY })
    }
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
                  <Card sx={{ width: '350px', height: '250px' }}>
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
                  </Card>
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
        <InfiniteScroll dataLength={originNotifications?.length ?? 0} next={fetchData} hasMore={true} scrollableTarget='scrollableSort'>
          <Grid container>
            {sortedNotifications?.map((item) => {
              return (
                <Grid item key={item.id}>
                  <Card sx={{ width: '350px', height: '250px' }}>
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
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </InfiniteScroll>
      </InfiniteWrapper>
    )
  }
  return (
    <NotificationsContainer>
      <Typography variant='h4' component='div'>
        通知頁面
      </Typography>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={6}>
          <Font>尚未排序</Font>
          {renderOriginalView()}
        </Grid>
        <Grid item xs={6}>
          <Font>排序過後</Font>
          {renderSortedView()}
        </Grid>
      </Grid>
    </NotificationsContainer>
  )
}

export default Notifications
