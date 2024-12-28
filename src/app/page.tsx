export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">智能助手</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md">首页</a>
              <a href="/design" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md">手机壳定制</a>
              <a href="/dating-helper" className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md">约会助手</a>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 功能卡片区域 */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* 手机壳定制卡片 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">手机壳定制</h3>
              <p className="text-gray-500 mb-4">
                上传你喜欢的图片，添加个性化文字，创造独一无二的手机壳。
              </p>
              <a
                href="/design"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                开始设计
              </a>
            </div>
          </div>

          {/* 约会助手卡片 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">约会助手</h3>
              <p className="text-gray-500 mb-4">
                为你提供高情商的约会回复建议，让约会更加顺利愉快。
              </p>
              <a
                href="/dating-helper"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                获取建议
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
