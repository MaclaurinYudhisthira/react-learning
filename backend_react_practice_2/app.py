from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


tasks = [
    {"text": "Task 1", "id": 0, "day": "5 Fab 2024", "reminder": True},
    {"text": "Task 2", "id": 1, "day": "5 Fab 2024", "reminder": True},
    {"text": "Task 3", "id": 2, "day": "5 Fab 2024", "reminder": False},
]


class Task(BaseModel):
    text: str
    day: str
    reminder: bool

    
class UpdateTask(BaseModel):
    id:int
    text: str = None
    day: str = None
    reminder: bool = None

@app.get("/")
def home():
    return {"message": "Service is running"}


@app.get("/tasks")
def get_tasks():
    return tasks


@app.get("/tasks/{task_id}")
def get_task(task_id: int):
    return [task for task in tasks if task.get("id") == task_id][0]


@app.post("/tasks")
def add_task(task: Task):
    global tasks
    task = task.dict()
    task["id"] = len(tasks)
    tasks.append(task)
    return task

@app.put("/tasks")
def update_task(updateTask: UpdateTask):
    global tasks
    updateTask = updateTask.dict(exclude_none=True)
    
    for idx, task in enumerate(tasks):
        if task.get("id") == updateTask.get("id"):
            for key, value in updateTask.items():
                tasks[idx][key]=value
            return task
    
    return {}


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [task for task in tasks if task.get("id") != task_id]
    return True


if __name__ == "__main__":
    uvicorn.run(app=app)
