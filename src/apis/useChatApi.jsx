import { useAuth } from "../context/AuthContext";
import { useHttp } from "../hooks/useHttp";


export const useChatApi = () => {
    const { getReq, postReq, putReq, loading } = useHttp();
    const { token } = useAuth();

    /**
     * Generate AI response with text or image input
     * Supports DYNAMIC filters - any filter fields based on page configuration
     * @param {Object} params - Request parameters
     * @param {string} params.content - The text content or prompt
     * @param {string} params.type - Type of input: "text" or "vision"
     * @param {string} [params.toolName] - Optional tool name (e.g., "Blog Generator", "Code Generator")
     * @param {string} [params.conversationId] - Optional conversation ID (empty string for first message)
     * @param {File} [params.image] - Optional image file for vision requests
     * @param {Object} [params.filters] - Optional DYNAMIC filters object - can contain ANY fields
     * @returns {Promise<Object>} API response with conversationId and message
     * 
     * @example
     * // Code Generator filters
     * filters: { complexity: "Intermediate", language: "Java", subject_areas: "Physics" }
     * 
     * @example
     * // Blog Generator filters
     * filters: { tone: "Professional", length: "Long", style: "Technical" }
     * 
     * @example
     * // Image Generator filters
     * filters: { style: "Realistic", resolution: "4K", mood: "Dark" }
     */
    const generateResponse = async ({
    content,
    type = "text",
    toolName = "",
    conversationId = "",
    filters = null
    }) => {
    try {
        const payload = {
        content,
        type,
        toolName,
        conversationId
        };

        if (filters && typeof filters === "object") {
        payload.filters = Object.fromEntries(
            Object.entries(filters).filter(
            ([_, v]) => v !== null && v !== undefined && v !== ""
            )
        );
        }

        return await postReq(
        "api/chat/generate-response",
        token,
        payload
        );
    } catch (error) {
        console.error("Text response error:", error);
        return { success: false };
    }
    };



    /**
     * Get conversation by ID with all messages
     * @param {string} conversationId - The conversation ID
     * @returns {Promise<Object>} Conversation data with messages
     */
    const getConversation = async (conversationId) => {
        if (!conversationId) {
            return { 
                success: false, 
                message: "Conversation ID is required" 
            };
        }

        try {
            return await getReq(
                `api/chat/conversations/${conversationId}`,
                token
            );
        } catch (error) {
            console.error("Error fetching conversation:", error);
            return { 
                success: false, 
                message: "Failed to fetch conversation" 
            };
        }
    };

    /**
     * Edit a specific message in a conversation
     * @param {Object} params - Edit parameters
     * @param {string} params.messageId - The message ID to edit
     * @param {string} params.newContent - The new content for the message
     * @returns {Promise<Object>} Updated message data
     */
    const editMessage = async ({ messageId, newContent }) => {
        if (!messageId || !newContent) {
            return { 
                success: false, 
                message: "Message ID and new content are required" 
            };
        }

        try {
            return await putReq(
                "api/chat/edit-message",
                token,
                { messageId, newContent }
            );
        } catch (error) {
            console.error("Error editing message:", error);
            return { 
                success: false, 
                message: "Failed to edit message" 
            };
        }
    };

    /**
     * Get all conversations for the current user
     * @returns {Promise<Object>} List of all conversations
     */
    const getAllConversations = async () => {
        try {
            return await getReq(
                "api/conversations/get-all-conversations",
                token
            );
        } catch (error) {
            console.error("Error fetching conversations:", error);
            return { 
                success: false, 
                message: "Failed to fetch conversations" 
            };
        }
    };

    /**
     * Send a text message
     * @param {string} content - The message content
     * @param {string} conversationId - Conversation ID (empty string for new conversation)
     * @param {string} toolName - Optional tool name
     * @param {Object} filters - Optional filters
     * @returns {Promise<Object>} API response
     */
    const sendTextMessage = async (content, conversationId = "", toolName = "", filters = null) => {
        return await generateResponse({
            content,
            type: "text",
            conversationId,
            toolName,
            filters
        });
    };

    /**
     * Send an image with optional text prompt
     * @param {File} image - The image file
     * @param {string} content - The text prompt/question about the image
     * @param {string} conversationId - Conversation ID (empty string for new conversation)
     * @param {string} toolName - Optional tool name
     * @returns {Promise<Object>} API response
     */
    const sendImageMessage = async (image, content, conversationId = "", toolName = "") => {
        return await generateResponse({
            content,
            type: "vision",
            conversationId,
            image,
            toolName
        });
    };

    /**
     * Start a new conversation with a tool
     * @param {string} toolName - Name of the tool to use
     * @param {string} content - Initial message content
     * @param {Object} filters - Optional filters
     * @returns {Promise<Object>} API response with new conversation
     */
    const startToolConversation = async (toolName, content, filters = null) => {
        return await generateResponse({
            content,
            type: "text",
            toolName,
            conversationId: "",
            filters
        });
    };

    return {
        generateResponse,
        getConversation,
        editMessage,
        getAllConversations,
        sendTextMessage,
        sendImageMessage,
        startToolConversation,
        loading
    };
};

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Example 1: Basic Import in ChatScreen.jsx
import { useChatApi } from '../api/chatApi';

function ChatScreen() {
    const { 
        generateResponse,
        getConversation,
        getAllConversations,
        editMessage,
        loading 
    } = useChatApi();
    
    // Your component logic...
}

// Example 2: Send text message with DYNAMIC filters (Code Generator)
const handleCodeGenerator = async () => {
    const result = await generateResponse({
        content: "Create a function to calculate projectile motion",
        type: "text",
        toolName: "Code Generator",
        conversationId: currentChatId || "",
        filters: {
            complexity: "Intermediate",
            language: "Java",
            subject_areas: "Physics, Biology"
        }
    });
    
    if (result.success) {
        setCurrentChatId(result.data.conversationId);
    }
};

// Example 2b: Blog Generator with different filters
const handleBlogGenerator = async () => {
    const result = await generateResponse({
        content: "Write about AI trends in 2024",
        type: "text",
        toolName: "Blog Generator",
        conversationId: currentChatId || "",
        filters: {
            tone: "Professional",
            length: "2000 words",
            style: "Technical",
            audience: "Developers"
        }
    });
};

// Example 2c: Image Generator with different filters
const handleImageGenerator = async () => {
    const result = await generateResponse({
        content: "A futuristic city at sunset",
        type: "text",
        toolName: "Image Generator",
        conversationId: currentChatId || "",
        filters: {
            style: "Photorealistic",
            resolution: "1024x1024",
            mood: "Dramatic",
            color_palette: "Warm"
        }
    });
};

// Example 2d: Quiz Generator with different filters
const handleQuizGenerator = async () => {
    const result = await generateResponse({
        content: "Create a quiz about World War 2",
        type: "text",
        toolName: "Quiz Generator",
        conversationId: currentChatId || "",
        filters: {
            difficulty: "Hard",
            question_count: "10",
            question_type: "Multiple Choice",
            topic: "History"
        }
    });
};

// Example 3: Send image message
const handleImageUpload = async (file) => {
    const result = await sendImageMessage(
        file,
        "Tell me more about the uploaded image",
        currentChatId || "",
        "Image Analyzer"
    );
    
    if (result.success) {
        console.log("Image analyzed:", result.data);
    }
};

// Example 4: Load existing conversation
useEffect(() => {
    if (chatId) {
        const loadChat = async () => {
            const result = await getConversation(chatId);
            if (result.success) {
                setMessages(result.data.messages);
            }
        };
        loadChat();
    }
}, [chatId]);

// Example 5: Get all conversations for sidebar
const loadAllChats = async () => {
    const result = await getAllConversations();
    if (result.success) {
        setChatList(result.data.conversations);
    }
};

// Example 6: Edit a message
const handleEditMessage = async (msgId, newText) => {
    const result = await editMessage({
        messageId: msgId,
        newContent: newText
    });
    
    if (result.success) {
        console.log("Message updated:", result.data);
    }
};

// Example 7: Using helper functions
const sendQuickMessage = async () => {
    const result = await sendTextMessage(
        "Explain quantum physics",
        currentChatId || "",
        "AI Tutor",
        { complexity: "Beginner" }
    );
};

// Example 8: Start new conversation with tool
const startNewChat = async () => {
    const result = await startToolConversation(
        "Blog Generator",
        "Write about AI trends",
        { complexity: "Advanced" }
    );
    
    if (result.success) {
        setCurrentChatId(result.data.conversationId);
    }
};
*/