const getNewlyAddedTaskLists = (
  selectedTaskLists: string[],
  existingTaskLists: string[]
) => selectedTaskLists.filter((s) => !existingTaskLists.includes(s));

export default getNewlyAddedTaskLists;
