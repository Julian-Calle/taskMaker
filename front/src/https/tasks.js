import {
  fetchApi,
  fetchFormData,
  requestMethods,
} from "../shared/utils/fetchFunctions";
const endpoints = {
  getAllPacks: "/packs",
  createTask: "/tasks",
  TasksTypes: "/tasks/types",
  sendTaskToOtherUser: "/tasks/send/",
  shareTaskToOtherUser: "/tasks/share/",
  kickOutInvitedUSer: "tasks/kickOut/",
};

export async function getAllPacks() {
  const response = await fetchApi(`${endpoints.getAllPacks}`, {
    method: requestMethods.get,
  });
  if (response.status === "ok") {
    return response.data;
  }
  console.log(response);
}

export async function newTask(task, color, type, timeLimit) {
  const response = await fetchApi(`${endpoints.createTask}`, {
    method: requestMethods.post,
    body: { task, color, type, timeLimit },
  });
  if (response.status === "ok") {
    return response.data;
  }
  console.log(response);
}

export async function getTasksTypes() {
  const response = await fetchApi(`${endpoints.TasksTypes}`, {
    method: requestMethods.get,
  });
  if (response.status === "ok") {
    return response.data;
  }
  console.log(response);
}

export async function sendTask(invitedUSerId, email, name) {
  const response = await fetchApi(
    `${endpoints.sendTaskToOtherUser}${invitedUSerId}`,
    {
      method: requestMethods.post,
      body: { email, name },
    }
  );
  if (response.status === "ok") {
    return response.data;
  }
  console.log(response);
}

export async function kickOutUser(taskId, invitedUSerId) {
  const response = await fetchApi(
    `${endpoints.kickOutInvitedUSer}${taskId}/${invitedUSerId}`,
    {
      method: requestMethods.delete,
    }
  );
  if (response.status === "ok") {
    return response.data;
  }
  console.log(response);
}

export async function shareTaks(taskId, invitedUSerId) {
  const response = await fetchApi(
    `${endpoints.shareTaskToOtherUser}${taskId}/${invitedUSerId}`,
    {
      method: requestMethods.get,
    }
  );
  if (response.status === "ok") {
    return response.data;
  }
  console.log(response);
}
