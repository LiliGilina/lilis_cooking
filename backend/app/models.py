from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from db import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id: Mapped[int] = mapped_column(primary_key=True)

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    ingredients: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    instructions: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )
