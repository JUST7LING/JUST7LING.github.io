import { useState } from 'react';
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

  const [purpose, setPurpose] = useState('email');
  const [length, setLength] = useState('sentence');
  const [rantMode, setRantMode] = useState(false);

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const prompt = `
    다음 가이드라인을 참고하여, 조건 값에 맞게 주어진 내용을 쿠션어로 바꿔줘.

    [가이드라인]
    조건에는 '용도', '길이', '인사 포함 여부',

    [조건]
    - 용도: ${purpose}
    - 길이: ${length}
    - 넋두리 모드: ${rantMode ? '활성화' : '비활성화'}
    - 이름: ${name}
    - 부서: ${dept}
    - 직급: ${position}

    [규칙]
    - 과격한 표현은 부드럽게 수정
    - 필요하면 문장 구조 재작성
    - 3가지 버전 출력

    문장:
    ${input}
    `;

  const actionTest = () => {
    setResult(prompt);
  };

  const handleConvert = async () => {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_API_KEY`,
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        input: prompt,
      }),
    });

    const data = await res.json();
    setResult(data.output[0].content[0].text);
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
        </div>

        {/* 용도 & 길이 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* 용도 */}
          <div className="!bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4 !border !border-purple-100">
            <h2 className="font-semibold text-lg !text-gray-800">용도</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setPurpose('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg !border-2 transition ${
                  purpose === 'email'
                    ? '!border-purple-500 !bg-purple-50 !text-purple-700'
                    : '!border-gray-200 !bg-white !text-gray-600 hover:!border-purple-300'
                }`}
              >
                <Mail className="w-5 h-5" />
                이메일
              </button>
              <button
                onClick={() => setPurpose('messenger')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg !border-2 transition ${
                  purpose === 'messenger'
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
                { value: 'sentence', label: '문장만' },
                { value: 'full', label: '처음부터 끝까지' },
                { value: 'greeting', label: '인삿말 포함' },
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
          onClick={actionTest}
          disabled={!input.trim()}
          className="w-full !bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          쿠션어 생성하기
        </button>

        {/* 결과 */}
        {result && (
          <div className="!bg-gradient-to-br !from-purple-50 !to-pink-50 rounded-2xl shadow-sm p-4 sm:p-6 space-y-3 !border-2 !border-purple-200">
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
