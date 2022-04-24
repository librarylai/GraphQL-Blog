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
        }
      }
      # 原始資料
      notifications {
        id
        content {
          title
          subTitle
          createTime
        }
      }
    }
  }
`

export const ALL_NOTIFICATIONS_TITLE_QUERY = gql`
  query fetchNotifications {
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
  query fetchNotifications {
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
