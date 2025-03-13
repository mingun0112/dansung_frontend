'use client'
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("default");

  // 파일 업로드 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("파일을 선택해주세요.");
      setMessageType("error"); // 에러 메시지 설정
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "courses.xlsx";
        link.click();
        setMessage("파일이 다운로드되었습니다.");
        setMessageType("success"); // 성공 메시지 설정
      } else {
        setMessage("파일 업로드 실패");
        setMessageType("error"); // 실패 메시지 설정
      }
    } catch (error) {
      setMessage("서버에 연결할 수 없습니다.");
      setMessageType("error"); // 실패 메시지 설정
    }
  };

  // 메시지 스타일 설정
  type MessageType = "success" | "error" | "info" | "default";
  const getMessageStyle = (type: MessageType) => {
    switch (type) {
      case "success":
        return { backgroundColor: "#34D399", textColor: "#ffffff", icon: "✔️" };
      case "error":
        return { backgroundColor: "#F87171", textColor: "#ffffff", icon: "❌" };
      case "info":
        return { backgroundColor: "#3B82F6", textColor: "#ffffff", icon: "ℹ️" };
      default:
        return { backgroundColor: "#F3F4F6", textColor: "#000000", icon: "⚠️" };
    }
  };

  const messageStyle = getMessageStyle(messageType);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-[100px] font-bold text-center w-full">권준영의 사이트</h1>

        <div className="items-center w-[500px]">
          {!file && (<div>
            <label htmlFor="file" className="block text-sm text-gray-500 dark:text-gray-300">File</label>

            <label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>

              <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">자가진단시뮬레이션 이수교과목 or 성적증명서</h2>

              <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">Upload or darg & drop your PDF. </p>

              <input id="dropzone-file" accept=".pdf"
                onChange={handleFileChange} type="file" className="hidden" />
            </label>
          </div>)}
          {file && (
            <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex items-center justify-center w-12 bg-blue-500">
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                </svg>
              </div>

              <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                  <span className="font-semibold text-blue-500 dark:text-blue-400">Info</span>
                  <p className="text-sm text-gray-600 dark:text-gray-200">{file?.name}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleFileUpload}
            className="flex items-center my-8 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>

            <span className="mx-1">Upload</span>
          </button>

          {/* 에러 또는 성공 메시지 표시 */}
          {message && (
            <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800" style={{ backgroundColor: messageStyle.backgroundColor }}>
              <div className="flex items-center justify-center w-12" style={{ backgroundColor: messageType === "success" ? "#34D399" : "#F87171" }}>
                <span className="text-white">{messageStyle.icon}</span>
              </div>

              <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                  <span className="font-semibold" style={{ color: messageType === "success" ? "#34D399" : "#F87171" }}>
                    {messageType === "success" ? "Success" : messageType === "error" ? "Error" : "Info"}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-200">{message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
