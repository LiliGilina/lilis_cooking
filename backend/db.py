import os
from dotenv import load_dotenv

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

load_dotenv()  # reads .env in local dev

DATABASE_URL = os.environ["DATABASE_URL"]

engine = create_async_engine(
    DATABASE_URL,
    echo=False,          # set True to debug SQL
    pool_pre_ping=True,  # helps with stale connections
)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
