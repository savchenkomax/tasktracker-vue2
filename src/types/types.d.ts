export type IList = {
  id: number;
  name: string;
};

export type ITask = {
  id: number | null;
  listId: number | null;
  name: string;
  description: string;
  firstName: string;
  lastName: string;
  priority: number | null;
  dateOfCreation: string;
  dateOfCompletion: string;
};
