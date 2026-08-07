const prisma = require("../config/prisma");

const mapUserWithImage = (user) => {
  if (!user) return null;
  const profileImage =
    user.candidateProfile?.profilePicture ||
    (user.companies && user.companies.length > 0 ? user.companies[0].logo : null) ||
    null;
  return {
    id: user.id,
    name: user.name,
    profileImage,
  };
};

exports.sendMessage = async (senderId, receiverId, message) => {
  senderId = Number(senderId);
  receiverId = Number(receiverId);

  if (!message || message.trim() === "") {
    throw Object.assign(new Error("Message cannot be empty"), { status: 400 });
  }

  if (senderId === receiverId) {
    throw Object.assign(new Error("Users cannot send messages to themselves"), { status: 400 });
  }

  const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
  if (!receiver) {
    throw Object.assign(new Error("Receiver not found"), { status: 404 });
  }

  const newMessage = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      message,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          candidateProfile: { select: { profilePicture: true } },
          companies: { select: { logo: true } },
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          candidateProfile: { select: { profilePicture: true } },
          companies: { select: { logo: true } },
        },
      },
    }
  });

  return {
    ...newMessage,
    sender: mapUserWithImage(newMessage.sender),
    receiver: mapUserWithImage(newMessage.receiver)
  };
};

exports.getConversation = async (loggedInUserId, receiverId) => {
  loggedInUserId = Number(loggedInUserId);
  receiverId = Number(receiverId);

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: loggedInUserId, receiverId: receiverId },
        { senderId: receiverId, receiverId: loggedInUserId },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          candidateProfile: { select: { profilePicture: true } },
          companies: { select: { logo: true } },
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          candidateProfile: { select: { profilePicture: true } },
          companies: { select: { logo: true } },
        },
      },
    },
  });

  return messages.map((msg) => ({
    ...msg,
    sender: mapUserWithImage(msg.sender),
    receiver: mapUserWithImage(msg.receiver),
  }));
};

exports.getChatList = async (loggedInUserId) => {
  loggedInUserId = Number(loggedInUserId);

  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          candidateProfile: { select: { profilePicture: true } },
          companies: { select: { logo: true } },
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          candidateProfile: { select: { profilePicture: true } },
          companies: { select: { logo: true } },
        },
      },
    },
  });

  const chatListMap = new Map();

  messages.forEach((msg) => {
    const isSender = msg.senderId === loggedInUserId;
    const otherUser = isSender ? msg.receiver : msg.sender;
    const otherUserId = otherUser.id;

    if (!chatListMap.has(otherUserId)) {
      chatListMap.set(otherUserId, {
        user: mapUserWithImage(otherUser),
        lastMessage: msg.message,
        lastMessageTime: msg.createdAt,
        unreadCount: 0,
      });
    }

    if (!isSender && !msg.isRead) {
      chatListMap.get(otherUserId).unreadCount += 1;
    }
  });

  return Array.from(chatListMap.values());
};

exports.markMessagesAsRead = async (loggedInUserId, receiverId) => {
  loggedInUserId = Number(loggedInUserId);
  receiverId = Number(receiverId);

  const result = await prisma.message.updateMany({
    where: {
      senderId: receiverId,
      receiverId: loggedInUserId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  return result.count;
};
