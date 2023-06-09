import { prettyDOM, render, waitFor, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Index from '@/pages/index'
import { ALL_POST_QUERY, ADD_POST_QUERY, DELETE_POST_QUERY } from '@/graphql/gql/blog'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

function createPostData(id, title, content, authorName) {
  return {
    id,
    title,
    content,
    author: {
      id,
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
      // variables : 如果輸入參數為 {} 則 result 為以下....
      variables: {},
    },
    result: {
      data: {
        allPost: [
          createPostData('1', '好想出去玩', '天氣真好', 'library'),
          createPostData('2', '好想買遊戲王卡', '青眼白龍勒～～', 'Zack'),
          createPostData('3', '好想打遊戲', '殺～～～', 'Wang'),
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

const mockAddPostData = [
  {
    request: {
      query: ADD_POST_QUERY,
      // variables 可以想像是 我們去預設當輸入參數為 多少時(variables)，則回傳值會是怎樣...
      // 例如： 當輸入參數為 {title:'測試新增文章' ,content:'測試內容' ,authorId:1} 的話，則回傳 createPostData('1', '測試新增文章', '測試測試', 'library')
      // 因此我們可以設計多個 variables 對應 result 的情況。
      variables: {
        title: '測試新增文章',
        content: '測試內容',
        authorId: 1,
      },
    },
    result: {
      data: {
        addPost: [createPostData('1', '測試新增文章', '測試內容', 'library')],
      },
    },
  },
]

const mockDeletePostData = [
  {
    request: {
      query: DELETE_POST_QUERY,
    },
    result: jest.fn(),
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

// 測試新增 mutation
it('4. Test Add new Blog Situation', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <MockedProvider mocks={mockAddPostData} addTypename={false}>
      <Index />
    </MockedProvider>
  )
  // 找到 新增文章 按鈕
  const addPostButton = await screen.queryByText('新增文章')
  /* PS. 檢測看看是否有正確找到元件 
    這邊可以用 console 搭配 prettyDOM 來檢測看看是否有正確找到 Button
    console.log('addPostButton', prettyDOM(addPostButton))
  */
  // 等待 addPostButton 被點擊後，打開 PostDialog 彈窗
  await user.click(addPostButton)
  // 找到 PostDialog 標題 input
  const postDialogTitleInput = await screen.getByLabelText('postDialog-title').querySelector('input')
  // 找到 PostDialog 內容 textbox
  const postDialogContentInput = await screen.getByLabelText('postDialog-content')
  // 找到 PostDialog 彈窗裡的『送出』按鈕
  const addPostSubmitButton = await screen.queryByText('送出')
  // 標題 填入『測試新增文章』
  await user.type(postDialogTitleInput, '測試新增文章')
  // 內容 填入『測試內容』
  await user.type(postDialogContentInput, '測試內容')
  // 等待 送出按鈕 被點擊
  await user.click(addPostSubmitButton)
  // 等待 mockProvider 非同步執行
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  // 執行 Snapshot
  expect(container).toMatchSnapshot()
})

it('5. Test delete Blog Situation', async () => {
  const { container } = render(
    <MockedProvider mocks={mockAddPostData} addTypename={false}>
      <Index />
    </MockedProvider>
  )
})
