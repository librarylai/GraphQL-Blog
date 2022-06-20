import gql from 'graphql-tag'

export const ALL_NOTIFICATIONS_QUERY = gql`
  query fetchNotifications {
    user {
      # 排序過後
      sortNotifications @client {
        id
        content {
          title
          subTitle
          createTime
          isRead
        }
      }
      # 原始資料
      notifications {
        id
        content {
          title
          subTitle
          createTime
          isRead
        }
      }
    }
  }
`

export const ALL_NOTIFICATIONS_TITLE_QUERY = gql`
  query fetchNotificationsTitle {
    user {
      notifications {
        id
        content {
          title
        }
      }
    }
  }
`

export const ALL_NOTIFICATIONS_SUBTITLE_QUERY = gql`
  query fetchNotificationsSubTitle {
    user {
      notifications {
        id
        content {
          subTitle
        }
      }
    }
  }
`

export const UPDATE_NOTIFICATION = gql`
  mutation updateNotification($id: ID) {
    updateNotification(notificationId: $id) {
      status
    }
  }
`
