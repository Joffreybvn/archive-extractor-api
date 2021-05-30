from fastapi import FastAPI
from .routers import extract

app = FastAPI(
    title="Archive Extractor API",
    description="API to extract .rar files into .zip",
    version="1.0.0",
)
app.include_router(extract)


@app.get("/")
async def root():
    return {
        "status": True,
        "message": "Archive Extractor API is online and working !"
    }
