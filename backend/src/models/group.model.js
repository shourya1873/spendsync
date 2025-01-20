const prisma = require('@/utils/db');

const createGroup = async (data) => {
    const groupData = await prisma.group.create({
            data:data,
        });

        const userInGroupData = await prisma.usersInGroups.create({
            data: {
                userId: data.createdBy,
                groupId: groupData.id,
            },
        });
        return groupData;
}

const getGroupsByUser = async (userId) => {
    const groups = await prisma.usersInGroups.findMany({
        where: {
            userId: {
              equals: userId,
            },
          },
          select: {
            groupId: true,
          },
        });
    const groupIds = groups
        .map((group) => group.groupId)
        .filter((id) => id !== null && id !== 'null');
    console.log(groupIds);
    
    return await prisma.group.findMany({
        where: {
            id: {
              in: groupIds,
            },
          },
          orderBy: {
            id: 'desc',
          },
        });
}

const getGroup = async (groupId) => {
    return await prisma.group.findFirst({
        where: {
            id: {
              eq: groupId,
            },
          },
        })
}

const deleteGroup = async (groupId, createdBy) => {
    await prisma.group.delete({
        where: {
            id: groupId,
            createdBy,
        }
    })
}

module.exports = {
    createGroup,
    getGroupsByUser,
    getGroup,
    deleteGroup
}