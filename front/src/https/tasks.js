import {
  fetchApi,
  fetchFormData,
  requestMethods,
} from '../shared/utils/fetchFunctions';
const endpoints = {
  getAllTasks: '/tasks/',
  createTask: '/tasks',
  tasksTypes: '/tasks/types',
  sendTaskToOtherUser: '/tasks/send/',
  shareTaskToOtherUser: '/tasks/share/',
  kickOutInvitedUSer: 'tasks/kickOut/',
};

export async function getTask() {
  const response = await fetchApi(`${endpoints.getAllTasks}`, {
    method: requestMethods.get,
  });
  if (response.status === 'ok') {
    return response.data;
  }
  // console.log(response);
}

export async function newTask(task, color, type, timeLimit) {
  console.log(timeLimit);
  const response = await fetchApi(`${endpoints.createTask}`, {
    method: requestMethods.post,
    body: { task, color, type, timeLimit },
  });
  if (response.status === 'ok') {
    return response.data;
  }
  console.log(response);
}

export async function getTasksTypes() {
  const response = await fetchApi(`${endpoints.tasksTypes}`, {
    method: requestMethods.get,
  });
  if (response.status === 'ok') {
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
  if (response.status === 'ok') {
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
  if (response.status === 'ok') {
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
  if (response.status === 'ok') {
    return response.data;
  }
  console.log(response);
}
export async function editTask({
  task,
  checked,
  timeLimit,
  color,
  type,
  taskId,
}) {
  const body = {};
  if (task) {
    body.task = task;
  }
  if (checked) {
    body.checked = checked;
  }
  if (timeLimit) {
    body.timeLimit = timeLimit;
  }
  if (color) {
    body.color = color;
  }
  if (type) {
    body.type = type;
  }

  const response = await fetchApi(`${endpoints.getAllTasks}${taskId}`, {
    method: requestMethods.put,
    body,
  });
  if (response.status === 'ok') {
    return response.data;
  }
}
