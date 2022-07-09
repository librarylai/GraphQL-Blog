import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Index from '@/pages/index'
import { ALL_POST_QUERY } from '@/graphql/gql/blog'

function createPostData(title, content, authorName) {
  return {
    title,
    content,
    author: {
      name: authorName,
    },
    __typename: 'Post',
  }
}

// 用來 mock notification request and response
const mockBlogData = [
  {
    request: {
      query: ALL_POST_QUERY,
      variables: {}, // 如果有需要帶入查詢參數，則要加入 variables
    },
    result: {
      data: {
        viewAllPost: [
          createPostData('好想出去玩', '天氣真好', 'library'),
          createPostData('好想買遊戲王卡', '青眼白龍勒～～', 'Zack'),
          createPostData('好想打遊戲', '殺～～～', 'Wang'),
        ],
      },
    },
  },
]

const mockBlogErrorData = [
  {
    request: {
      query: ALL_POST_QUERY,
      variables: {}, // 如果有需要帶入查詢參數，則要加入 variables
    },
    error: new Error('系統發生錯誤，請再重試一次'),
  },
]
// 測試 Loading 情況
it('1. Test Blog Loading Situation', async () => {
  const { container } = render(
    <MockedProvider mocks={mockBlogData}>
      <Index />
    </MockedProvider>
  )
  expect(container).toMatchSnapshot()
})

// 測試 Error 情況
it('2. Test Blog Error Situation', async () => {
  const { container } = render(
    <MockedProvider mocks={mockBlogErrorData}>
      <Index />
    </MockedProvider>
  )
  // 因為我們在操作 GraphQL 是屬於非同步的狀態(Promise-based)，因此需要做一個 Promise 去等待操作完成
  // 這邊有額外使用 react-testing-library 的 waitFor 方法，讓整個測試必須整個 callback 完成後再進行下去(專門處理複雜情況，例如：等待資料回來後再額外進行其他判斷)。
  // 但這邊情境比較單存，因此可以直接用 await new Promise((resolve) => setTimeout(resolve, 0))
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  expect(container).toMatchSnapshot()
})

// 測試資料顯示情況
it('3. Test Blog Data Situation', async () => {
  const { container } = render(
    <MockedProvider mocks={mockBlogData}>
      <Index />
    </MockedProvider>
  )
  // 因為我們在操作 GraphQL 是屬於非同步的狀態(Promise-based)，因此需要做一個 Promise 去等待操作完成
  // 這邊有額外使用 react-testing-library 的 waitFor 方法，讓整個測試必須整個 callback 完成後再進行下去(專門處理複雜情況，例如：等待資料回來後再額外進行其他判斷)。
  // 但這邊情境比較單存，因此可以直接用 await new Promise((resolve) => setTimeout(resolve, 0))
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  expect(container).toMatchSnapshot()
})
