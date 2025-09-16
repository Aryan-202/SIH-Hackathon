from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    user_msg = req.message

    # Replace this with real AI logic later
    if "hotel" in user_msg.lower():
        reply = "I can suggest some hotels near your location."
    else:
        reply = f"You said: {user_msg}. I'm your Tourist Assistant!"
    
    return {"reply": reply}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
