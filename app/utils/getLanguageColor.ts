export const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    HTML: "bg-orange-500",
    CSS: "bg-blue-300",
    Java: "bg-red-500",
    "C#": "bg-green-600",
    Python: "bg-blue-400",
    Go: "bg-cyan-500",
    Kotlin: "bg-purple-500",
    PHP: "bg-indigo-500",
  };
  return colors[lang] || "bg-gray-400";
};
