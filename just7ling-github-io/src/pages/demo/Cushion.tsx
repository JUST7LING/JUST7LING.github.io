import { useState, useEffect, useRef } from 'react';
import { Mail } from '../../assets/cushion/Mail';
import { MessageSquare } from '../../assets/cushion/MessageSquare';
import { User } from '../../assets/cushion/User';
import { Building2 } from '../../assets/cushion/Building2';
import { Badge } from '../../assets/cushion/Badge';
import { Sparkles } from '../../assets/cushion/Sparkles';
import { Copy } from '../../assets/cushion/Copy';
import { Check } from '../../assets/cushion/Check';

export const Cushion = () => {
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [position, setPosition] = useState('');
  const [userKey, setUserKey] = useState('');

  const [purpose, setPurpose] = useState('이메일');
  const [length, setLength] = useState('제시된 문장만');
  const [rantMode, setRantMode] = useState(false);
  const [greetMode, setGreetMode] = useState(false);

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const prompt = `
    다음 가이드라인을 참고하여, 주어진 [문장]을 쿠션어로 바꿔줘.

    [가이드라인]
    기본적인 말투는 직장에서 사용할 수 있는 공적이고 예의바른 말투여야 해.
    금융권 도메인에 맞는 단어를 사용하도록 노력하면 좋겠어.
    ${purpose} 전송에 쓰일 내용이고, 쿠션어로 바꾼 내용을 ${length} 작성해서 리턴해.
    ${
      length === '처음부터 끝까지'
        ? `전달될 내용을 ${length} 작성해야 하니, 첫 인사와 끝 인사를 포함해 줘.
       본문의 첫 내용에는 \"안녕하세요, ${dept} ${name} ${position}입니다.\"를 포함하고, 마지막 내용에는 \"감사합니다!\"와 같은 끝인사가 작성되어야 해.`
        : ''
    }
    ${length === '처음부터 끝까지' && purpose === '이메일' ? `그리고 \"${name} 드림\"과 같은 이메일에 사용되는 마지막 인사를 포함해야 해.` : ''}
    ${rantMode ? '[문장]의 중심 내용을 파악하되, 업무 의사소통에 사용될 수 있도록 과격한 표현은 부드럽게 수정하고, 관계 없는 표현을 삭제해서 깔끔하고 부드러운 내용으로 구성해야 해.' : ''}
    ${
      greetMode
        ? `또한, 상대에게 친근함을 주는 소통 내용이 되도록 현재 시각(${currentTime})을 고려해 알맞은 안부 인사를 추가해 줘. e.g. 오전 11시 ~ 11시 30분 사이인 경우, '식사 맛있게 하세요'와 같은 인사가 나오거나,
    금요일 오후 5시 ~ 6시 사이인 경우 '즐거운 주말 보내세요~'와 같은 인사 추가`
        : ''
    }

    문장:
    ${input}
    `;

  useEffect(() => {
    if (result) {
      resultRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [result]);

  const action = () => {
    setCurrentTime(new Date());
    handleConvert();
  };

  const handleConvert = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-5-mini',
          input: prompt,
        }),
      });

      const data = await res.json();

      const text = data.output?.find((item: any) => item.type === 'message')
        ?.content?.[0]?.text;

      setResult(text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="break-keep w-full min-h-screen !bg-gradient-to-br !from-indigo-50 !via-purple-50 !to-pink-50 flex justify-center"
      style={{ colorScheme: 'light' }}
    >
      <div className="w-full max-w-4xl p-4 sm:p-6 py-8 sm:py-12 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 !text-purple-500" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              쿠션어 생성기
            </h1>
          </div>
          <p className="!text-gray-600 text-sm sm:text-base px-4">
            직설적인 표현을 부드럽고 공손한 문장으로 바꿔드립니다
          </p>
        </div>

        {/* 기본 정보 */}
        <div className="!bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4 !border !border-purple-100">
          <h2 className="font-semibold text-lg !text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5 !text-purple-500" />
            기본 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 !text-gray-400" />
              <input
                className="w-full !bg-white !text-gray-900 !border !border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition placeholder:!text-gray-400"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 !text-gray-400" />
              <input
                className="w-full !bg-white !text-gray-900 !border !border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition placeholder:!text-gray-400"
                placeholder="부서"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              />
            </div>
            <div className="relative">
              <Badge className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 !text-gray-400" />
              <input
                className="w-full !bg-white !text-gray-900 !border !border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition placeholder:!text-gray-400"
                placeholder="직급"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>
          <div className="relative">
            <Badge className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 !text-gray-400" />
            <input
              className="w-full !bg-white !text-gray-900 !border !border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition placeholder:!text-gray-400"
              placeholder="GPT API Key를 입력해 주세요."
              value={userKey}
              onChange={(e) => setUserKey(e.target.value)}
            />
          </div>
        </div>

        {/* 용도 & 길이 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* 용도 */}
          <div className="!bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4 !border !border-purple-100">
            <h2 className="font-semibold text-lg !text-gray-800">용도</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setPurpose('이메일')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg !border-2 transition ${
                  purpose === '이메일'
                    ? '!border-purple-500 !bg-purple-50 !text-purple-700'
                    : '!border-gray-200 !bg-white !text-gray-600 hover:!border-purple-300'
                }`}
              >
                <Mail className="w-5 h-5" />
                이메일
              </button>
              <button
                onClick={() => setPurpose('메신저')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg !border-2 transition ${
                  purpose === '메신저'
                    ? '!border-purple-500 !bg-purple-50 !text-purple-700'
                    : '!border-gray-200 !bg-white !text-gray-600 hover:!border-purple-300'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                메신저
              </button>
            </div>
          </div>

          {/* 길이 */}
          <div className="!bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4 !border !border-purple-100">
            <h2 className="font-semibold text-lg !text-gray-800">길이</h2>
            <div className="space-y-2">
              {[
                { value: '제시된 문장만', label: '문장만' },
                { value: '처음부터 끝까지', label: '처음부터 끝까지' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLength(option.value)}
                  className={`w-full py-2.5 px-4 rounded-lg !border-2 transition text-left ${
                    length === option.value
                      ? '!border-purple-500 !bg-purple-50 !text-purple-700'
                      : '!border-gray-200 !bg-white !text-gray-600 hover:!border-purple-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 인삿말 포함 여부 */}
        <div className="!bg-white rounded-2xl shadow-sm p-6 !border !border-purple-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={greetMode}
                onChange={(e) => setGreetMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 !bg-gray-200 rounded-full peer peer-checked:!bg-purple-500 transition"></div>
              <div className="absolute left-1 top-1 w-4 h-4 !bg-white rounded-full transition peer-checked:translate-x-5"></div>
            </div>
            <div>
              <span className="font-semibold !text-gray-800">
                안부 인사 포함하기
              </span>
              <p className="text-sm !text-gray-500">
                작성될 쿠션어 내용에 간단한 안부 인사를 포함해요. (호출 시점에
                따라 다른 인삿말이 나와요.)
              </p>
            </div>
          </label>
        </div>

        {/* 넋두리 모드 */}
        <div className="!bg-white rounded-2xl shadow-sm p-6 !border !border-purple-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={rantMode}
                onChange={(e) => setRantMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 !bg-gray-200 rounded-full peer peer-checked:!bg-purple-500 transition"></div>
              <div className="absolute left-1 top-1 w-4 h-4 !bg-white rounded-full transition peer-checked:translate-x-5"></div>
            </div>
            <div>
              <span className="font-semibold !text-gray-800">넋두리 모드</span>
              <p className="text-sm !text-gray-500">
                화풀이를 감지하고 더욱 부드럽게 변환합니다
              </p>
            </div>
          </label>
        </div>

        {/* 입력 */}
        <div className="!bg-white rounded-2xl shadow-sm p-6 space-y-3 !border !border-purple-100">
          <h2 className="font-semibold text-lg !text-gray-800">하고 싶은 말</h2>
          <textarea
            className="w-full !bg-white !text-gray-900 !border !border-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition resize-none placeholder:!text-gray-400"
            rows={6}
            placeholder="직설적으로 표현하고 싶은 내용을 입력하세요...&#10;예) 아니 내가 그렇게 하지 말라고 했잖아요 왜 말을 안 들음"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* 생성 버튼 */}
        <button
          onClick={action}
          disabled={!input.trim() || isLoading}
          className="w-full !bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              쿠션어 생성하기
            </>
          )}
        </button>

        {/* 결과 */}
        {result && (
          <div
            ref={resultRef}
            className="!bg-gradient-to-br !from-purple-50 !to-pink-50 rounded-2xl shadow-sm p-4 sm:p-6 space-y-3 !border-2 !border-purple-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg !text-gray-800">
                생성된 쿠션어
              </h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 !bg-white rounded-lg !border !border-purple-200 hover:!bg-purple-50 transition text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 !text-green-500" />
                    <span className="!text-green-600">복사됨!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 !text-purple-600" />
                    <span className="!text-purple-600">복사</span>
                  </>
                )}
              </button>
            </div>
            <div className="!bg-white rounded-lg p-5 whitespace-pre-wrap !text-gray-700 leading-relaxed !border !border-purple-100">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
