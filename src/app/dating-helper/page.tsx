"use client";

import { useState } from "react";

// 预设场景数据
const scenarios = [
  {
    id: "first-meet",
    name: "初次见面",
    situations: [
      "对方迟到了",
      "突然沉默尴尬",
      "对方一直看手机",
      "不知道聊什么话题",
      "对方表现紧张害羞",
      "约会进行顺利"
    ]
  },
  {
    id: "dining",
    name: "共进晚餐",
    situations: [
      "对方问你觉得ta怎么样",
      "对方说自己胖了",
      "对方挑食",
      "AA还是请客",
      "对方没吃多少",
      "对方夸奖你"
    ]
  },
  {
    id: "conflict",
    name: "分歧处理",
    situations: [
      "对方和你意见不同",
      "对方说了让你不舒服的话",
      "价值观有差异",
      "对未来规划不一致",
      "对方临时取消计划",
      "对方说自己很忙"
    ]
  },
  {
    id: "daily",
    name: "日常相处",
    situations: [
      "对方心情不好",
      "想表达关心",
      "想要独处空间",
      "处理误会",
      "对方分享困扰",
      "对方分享兴趣爱好"
    ]
  }
];

// 回复模板
const responseTemplates: { [key: string]: string[] } = {
  // 初次见面场景
  "对方迟到了": [
    "没关系，我也没有等太久，等你是一件愉快的事。",
    "我理解，有时候事情难以预料。希望你路上没遇到麻烦。",
    "等待的时间让见面更有期待感了，你平时工作一定很忙吧？",
    "这家店我很喜欢，正好多看看环境，你路上还顺利吗？"
  ],
  "突然沉默尴尬": [
    "刚才看到你笑的样子让我想起一个有趣的经历...",
    "这家店的环境很不错，你平时喜欢去哪些地方？",
    "有时候能够安静地待在一起也是很舒服的，不过我很好奇你平时的兴趣爱好",
    "我发现我们好像有些共同话题，比如..."
  ],
  "对方一直看手机": [
    "看你好像在处理重要的事情，需要我给你一点时间吗？",
    "如果有什么急事需要处理，我们可以改天再约，你的事情更重要",
    "你平时工作很忙吗？我很好奇你的工作内容",
    "要不要先处理完手头的事情？我们可以慢慢聊"
  ],
  "不知道聊什么话题": [
    "我注意到你的穿搭很有品味，平时喜欢怎么搭配衣服呢？",
    "最近有看什么有趣的电影或剧集吗？我最近在追...",
    "你周末一般喜欢做些什么？有什么推荐的好去处吗？",
    "我很好奇你是做什么工作的？听起来一定很有趣"
  ],
  "对方表现紧张害羞": [
    "别紧张，我也有点小紧张呢。我们可以慢慢聊，不急。",
    "我知道第一次见面可能会有点不自然，没关系，我们可以轻松一点，彼此了解。",
    "你害羞的样子很可爱，我们慢慢来，聊些轻松的话题吧。",
    "其实我也有点紧张，这说明我们都很在意这次见面，慢慢来就好。"
  ],
  "约会进行顺利": [
    "今天真的很开心，和你在一起很自然，时间过得好快。希望以后能有更多这样的时光。",
    "和你在一起真的很放松，期待下一次可以继续聊下去。",
    "感觉我们很聊得来，不知不觉就过了这么久，真希望时间能过得慢一点。",
    "今天和你相处很愉快，发现我们有很多共同话题，真期待下次见面。"
  ],

  // 共进晚餐场景
  "对方问你觉得ta怎么样": [
    "我觉得你是一个很有趣的人，特别是刚才聊天的时候，能感受到你的思维很活跃",
    "和你相处很舒服，感觉我们有很多共同话题可以聊",
    "你给我的印象很好，特别是你说话时的那种真诚",
    "我觉得你很特别，不论是谈吐还是见解都很有深度"
  ],
  "对方说自己胖了": [
    "在我眼里你的样子刚刚好，重要的是健康和开心",
    "你现在的样子很好看，不过如果你想健身的话，我知道几个不错的健身房",
    "每个人都有自己独特的魅力，你的气质就很吸引人",
    "比起外表，我更欣赏你的内在，比如你的幽默感和见解"
  ],
  "对方挑食": [
    "每个人的口味都不同，这很正常。下次我们可以去你喜欢的餐厅",
    "要不要看看其他菜品？我可以推荐几个我觉得不错的",
    "你平时最喜欢吃什么？下次我们可以专门去吃你喜欢的",
    "这说明你对食物很有自己的见解，我很好奇你的美食地图"
  ],
  "AA还是请客": [
    "今天让我来吧，很高兴能和你共进晚餐",
    "要不我们AA吧，这样以后约会也更自在一些",
    "这顿我请你，下次换你请我，这样我们就有见面的理由了",
    "看你心情，我都可以，重要的是和你度过愉快的时光"
  ],

  // 分歧处理场景
  "对方和你意见不同": [
    "你说得很有道理，让我从一个新的角度看待这个问题",
    "这个观点很有意思，我们可以多交流一下各自的想法",
    "不同的观点可以让我们互相学习和成长，你愿意和我分享更多吗？",
    "很高兴你愿意和我分享不同的观点，这让我学到了很多"
  ],
  "对方说了让你不舒服的话": [
    "我能理解你可能不是这个意思，但这句话确实让我有点困扰，我们可以聊聊吗？",
    "也许是我理解有误，你能具体解释一下你的想法吗？",
    "我们都希望彼此更好，有什么想法可以直接说出来",
    "让我们坦诚地交流一下，这样才能更好地理解对方"
  ],
  "价值观有差异": [
    "虽然我们在这点上看法不同，但正是这些差异让我们能互相学习",
    "每个人的成长环境不同，产生不同的想法很正常，重要的是互相理解",
    "很感谢你愿意和我分享你的想法，这让我对这个问题有了新的认识",
    "或许我们可以找到一个平衡点，毕竟理解和包容也是很重要的"
  ],
  "对未来规划不一致": [
    "每个人都有自己的人生规划，重要的是找到能互相理解和支持的方式",
    "我们可以一起探讨看看，也许能找到一个双方都满意的方案",
    "很高兴你愿意和我分享你的规划，让我们一起想想怎么协调",
    "这确实需要好好考虑，但我相信只要我们愿意沟通，总能找到解决方案"
  ],

  // 日常相处场景
  "对方心情不好": [
    "我在这里听你说，有什么想分享的吗？",
    "要不要一起去散散步？散心的时候我也喜欢这样做",
    "不知道能为你做些什么，但我希望能陪在你身边",
    "如果需要我，随时都可以找我聊聊"
  ],
  "想表达关心": [
    "最近工作很忙吧？记得照顾好自己，我很关心你",
    "天气变化大，记得适时增减衣物，保重身体",
    "我给你推荐个不错的美食地方吧，你最近一定累了",
    "有什么需要帮忙的尽管说，我很乐意为你做些什么"
  ],
  "想要独处空间": [
    "我理解你需要一些自己的时间，等你想聊的时候随时找我",
    "每个人都需要独处的时候，好好休息，我在这里等你",
    "不用有压力，我会给你足够的空间，你随时可以联系我",
    "独处也是很重要的，等你准备好了我们再聊"
  ],
  "处理误会": [
    "可能是我的表达不够清楚，让我重新说明一��我的想法",
    "谢谢你愿意和我沟通这件事，让我们一起把误会说开",
    "我很在意我们的关系，希望能把这个误会解开",
    "每个人的理解角度不同，我们坐下来好好聊聊吧"
  ],

  // 新增场景回复
  "对方临时取消计划": [
    "我明白的，生活中总会有一些突发状况。我们可以重新安排时间，期待下一次见面。",
    "没问题的，你的时间也很宝贵，我们改天再约吧。",
    "希望你处理事情顺利，等你有空我们再约时间。",
    "这些事情确实难以预料，你先忙你的，我们可以改天再见。"
  ],
  "对方说自己很忙": [
    "我理解，工作忙碌确实会让人感到压力，希望你能适时放松一点。什么时候你有空，我们再找时间见面。",
    "我知道你最近很忙，自己也要注意休息哦。期待我们能有更多的时间在一起。",
    "工作固然重要，但也要照顾好自己。如果需要帮忙，随时告诉我。",
    "忙是现代人的常态，但别忘了适当放松。等你闲下来，我们再好好聚聚。"
  ],
  "对方夸奖你": [
    "谢谢夸奖，听到这样的话总是让人心情更好。你也真的是越来越有魅力了。",
    "谢谢，你的眼光真不错！今天也很喜欢你的穿搭。",
    "被你这么一说，我都有点不好意思了。不过你今天也很迷人。",
    "你的夸奖让我很开心，不过我觉得你更值得被夸赞。"
  ],
  "对方分享困扰": [
    "我很感谢你能跟我分享这些，遇到困难时能倾诉也是一种释放。我会尊重你的感受，随时愿意倾听。",
    "听起来你经历了不少挑战，真希望你能早日走出困境。如果你需要任何支持，我会在这里。",
    "能和我分享这些，说明你很信任我，我一定会好好保护这份信任。",
    "每个人都会遇到困难，重要的是有人陪你一起面对。我很荣幸能成为那个人。"
  ],
  "对方分享兴趣爱好": [
    "听起来很有趣，你的兴趣爱好也挺特别的。要是有机会，我很愿意一起体验看看。",
    "这真的是你的一大爱好吗？我很喜欢了解不同的兴趣，或许以后可以一起尝试！",
    "通过你的描述，我也对这个产生了兴趣。下次可以带我一起参与吗？",
    "你说这些的时候眼睛都在发光，看得出来你真的很热爱这个。"
  ],
  "对方没吃多少": [
    "如果这道菜不合口味，你尽管告诉我。我们可以试试别的，毕竟吃得开心最重要。",
    "没关系，咱们可以点些你喜欢的，千万别勉强自己。",
    "你有什么特别想吃的吗？下次我们换个地方。",
    "看你胃口不是很好，要不要换些清淡的？你的感受最重要。"
  ]
};

export default function DatingHelper() {
  const [selectedScenario, setSelectedScenario] = useState("");
  const [selectedSituation, setSelectedSituation] = useState("");
  const [customSituation, setCustomSituation] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [isCustom, setIsCustom] = useState(false);

  // 生成回复建议
  const generateResponses = () => {
    const situation = isCustom ? customSituation : selectedSituation;
    
    // 如果是预设情况，直接使用模板
    if (responseTemplates[situation]) {
      setResponses(responseTemplates[situation]);
      return;
    }

    // 如果是自定义情况，生成通用的高情商回复
    const genericResponses = [
      `理解你的感受，让我们一起来看看怎么解决这个问题`,
      `谢谢你愿意和我分享这些想法，这对我来说很重要`,
      `或许我们可以换个角度来看这个情况`,
      `你的想法很有意思，能具体说说吗？`
    ];
    setResponses(genericResponses);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            约会高情商回复助手
          </h1>

          {/* 场景选择 */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              选择场景
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => {
                    setSelectedScenario(scenario.id);
                    setIsCustom(false);
                    setResponses([]);
                  }}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    selectedScenario === scenario.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {scenario.name}
                </button>
              ))}
            </div>
          </div>

          {/* 情况选择 */}
          {selectedScenario && !isCustom && (
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-4">
                选择具体情况
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenarios
                  .find((s) => s.id === selectedScenario)
                  ?.situations.map((situation) => (
                    <button
                      key={situation}
                      onClick={() => {
                        setSelectedSituation(situation);
                        generateResponses();
                      }}
                      className={`p-4 rounded-lg text-left transition-colors ${
                        selectedSituation === situation
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      {situation}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* 自定义情况 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="custom"
                checked={isCustom}
                onChange={(e) => {
                  setIsCustom(e.target.checked);
                  setResponses([]);
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="custom"
                className="ml-2 block text-lg font-medium text-gray-700"
              >
                描述自定义情况
              </label>
            </div>
            {isCustom && (
              <div>
                <textarea
                  value={customSituation}
                  onChange={(e) => setCustomSituation(e.target.value)}
                  placeholder="请描述你遇到的具体情况..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={generateResponses}
                  disabled={!customSituation.trim()}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  生成回复建议
                </button>
              </div>
            )}
          </div>

          {/* 回复建议 */}
          {responses.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                推荐回复：
              </h2>
              <div className="space-y-4">
                {responses.map((response, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <p className="text-gray-800">{response}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(response);
                      }}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      复制回复
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 