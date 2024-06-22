import { createContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";

type StreamResponse = {
  message: string;
  addMessage: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
};

export const ChatCotext = createContext({
  addMessage: () => {},
  message: "",
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  isLoading: false,
});

interface ChatProviderProps {
  fileId: string;
  children: React.ReactNode;
}

export const ChatProvider = ({ fileId, children }: ChatProviderProps) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch("/api/message/", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      return response.body;
    },
  });

  const addMessage = () => {
    sendMessage({ message });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <ChatCotext.Provider
      value={{
        message,
        addMessage,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatCotext.Provider>
  );
};
