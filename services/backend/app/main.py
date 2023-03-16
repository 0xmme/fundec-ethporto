import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.campaigns import router as campaigns
from app.db import Base, engine

log = logging.getLogger("uvicorn")

def create_application() -> FastAPI:

    application = FastAPI(
        title="FundEC WEB2 API",
        version="0.1.0",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
    )

    application.include_router(campaigns.router, prefix="/api/campaigns", tags=["Campaigns"])

    origins = ["http://localhost:2000","*"]
    
    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "HEAD", "OPTIONS", "DELETE", "PUT"],
        allow_headers=[
            "Access-Control-Allow-Headers",
            "Set-Cookie",
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Origin",
            "X-Requested-With",
        ],
    )

    return application


app = create_application()


@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)
    log.info("Starting up...")


@app.on_event("shutdown")
async def shutdown_event():
    log.info("Shutting down...")
