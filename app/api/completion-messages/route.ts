import { type NextRequest } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  const body = await request.json() // 1. 从前端请求中获取 JSON 数据
  const {
    inputs, // 2. 从 JSON 数据中提取名为 "inputs" 的部分
    files,
  } = body
  const { user } = getInfo(request) // 3. 获取用户信息
    // 4. 调用 Dify 客户端库，将提取到的 "inputs" 对象、用户信息和文件（如果有）
  //    传递给 Dify API 的 "createCompletionMessage" 方法
  const res = await client.createCompletionMessage(inputs, user, true, files)
  return new Response(res.data as any) // 5. 将 Dify 返回的结果发送回前端
}
