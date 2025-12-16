from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from db import engine, Base, get_db
from app.models import Recipe

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,                    # Списък с разрешените домейни
    allow_credentials=True,                   # Разрешаване на бисквитки/авторизационни хедъри
    allow_methods=["*"],                      # Разрешаване на всички HTTP методи (GET, POST, PUT, DELETE и т.н.)
    allow_headers=["*"],                      # Разрешаване на всички хедъри
)

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.post("/recipes")
async def create_recipe(
    title: str,
    ingredients: str,
    instructions: str,
    db: AsyncSession = Depends(get_db),
):
    r = Recipe(
        title=title,
        ingredients=ingredients,
        instructions=instructions,
    )
    db.add(r)
    await db.commit()
    await db.refresh(r)

    return {
        "id": r.id,
        "title": r.title,
        "ingredients": r.ingredients,
        "instructions": r.instructions,
    }


@app.get("/recipes")
async def list_recipes(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Recipe).order_by(Recipe.id))
    return [{"id": r.id, "title": r.title} for r in res.scalars().all()]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload = True)