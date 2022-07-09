import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Notifications from '../pages/notifications'
import { ALL_NOTIFICATIONS_QUERY } from '../graphql/gql/notifications'

function createNotificationData(title, subTitle, isRead, createTime) {
  return {
    content: {
      title,
      subTitle,
      isRead,
      createTime,
      __typename: 'Content',
    },
    __typename: 'Notification',
  }
}

// 用來 mock notification request and response
const mocks = [
  {
    request: {
      query: ALL_NOTIFICATIONS_QUERY,
      variables: {}, // 如果有需要帶入查詢參數，則要加入 variables
    },
    result: {
      data: {
        user: {
          notifications: [
            createNotificationData('library', '天氣真好', false, '2022/07/09'),
            createNotificationData('想買遊戲王卡', '青眼白龍勒～～', false, '2022/07/08'),
          ],
        },
      },
    },
  },
]

it('test notification page', () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <Notifications />
    </MockedProvider>
  )
  expect(container).toMatchSnapshot()
})
