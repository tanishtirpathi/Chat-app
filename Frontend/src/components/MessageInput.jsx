import { useRef, useState } from "react";
import { useChatstore } from "../store/useChatstore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatstore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      removeImage();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 bg-[#0e0e0e] border-t border-[#1f1f1f]">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-[#333] shadow-sm transition-all duration-200"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#1f1f1f] hover:bg-[#ca0883] text-white flex items-center justify-center shadow transition-all"
              type="button"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:gap-2"
      >
        {/* Slim Input Bar */}
        <div className="flex-1 flex items-center gap-1 bg-[#181818] border border-[#292929] rounded-sm px-2 py-[3px] shadow-sm focus-within:ring-1 ring-[#ca0883] transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder:text-zinc-500 focus:outline-none text-xs sm:text-sm font-light"
            placeholder="Message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* File Input (hidden) */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Image Icon Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[#ca0883] hover:text-pink-400 transition-all"
            title="Attach image"
          >
            <Image size={16} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="p-[6px] rounded-full bg-[#ca0883] hover:bg-[#e0399d] text-white transition-all disabled:opacity-30 shadow-sm"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
