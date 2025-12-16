import React from "react";
import { useAuth } from "../context/AuthContext";
import { useHttp } from "../hooks/useHttp";

export const useChatApi = () => {
    const { getReq, postReq, putReq, loading } = useHttp();
    const { token } = useAuth();
    console.log({token})

    const generateResponse = async ({ 
        content, 
        type = "Blog Generator", 
        toolName = "", 
        conversationId = "",
        image = null,
        filters = null
    }) => {
        try {
            // Check if this is a vision request with an image
            if (type === "vision" && image) {
                const formData = new FormData();
                formData.append("image", image);
                formData.append("content", content);
                formData.append("type", type);
                if (toolName) formData.append("toolName", toolName);
                formData.append("conversationId", conversationId);
                
                // Add filters to FormData if present
                if (filters) {
                    if (filters.complexity) formData.append("filters[complexity]", filters.complexity);
                    if (filters.language) formData.append("filters[language]", filters.language);
                    if (filters.subject_areas) formData.append("filters[subject_areas]", filters.subject_areas);
                }

                return await postReq(
                    "api/chat/generate-response",
                    token,
                    formData,
                    true // isFormData
                );
            }

            // Regular text request with filters
            const payload = {
                content,
                type,
                toolName,
                conversationId
            };

            // Add filters only if they exist and have values
            if (filters && Object.keys(filters).length > 0) {
                // Filter out empty/null values
                const validFilters = Object.entries(filters)
                    .filter(([_, value]) => value && value.trim() !== '')
                    .reduce((acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    }, {});
                
                if (Object.keys(validFilters).length > 0) {
                    payload.filters = validFilters;
                }
            }

            return await postReq(
                "api/chat/generate-response",
                token,
                payload
            );
        } catch (error) {
            console.error("Error generating response:", error);
            return { 
                success: false, 
                message: "Failed to generate response" 
            };
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

// Example 2: Send text message with filters
const handleSendMessage = async (message) => {
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
        // Update conversationId from response
        setCurrentChatId(result.data.conversationId);
        console.log("Response:", result.data.response);
    }
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