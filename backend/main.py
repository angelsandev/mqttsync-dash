from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"status": "MQTTSYNC-DASH Backend está operativo"}

