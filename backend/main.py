from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/recepies")
def recepies():
    return {
    "Caprese Salad": {
        "title": "Caprese Salad",
        "ingredients": [
            "200g Mozzarella (buffalo recommended)",
            "3-4 Tomatoes (ripe)",
            "Fresh Basil (leaves)",
            "Extra Virgin Olive Oil",
            "Balsamic Vinegar (optional)",
            "Salt",
            "Black Pepper"
        ],
        "instructions": (
            "Slice the tomatoes and mozzarella into rounds. "
            "Alternate a slice of tomato, a slice of mozzarella, and a basil leaf on a plate. "
            "Season with salt and black pepper. "
            "Finish with a generous drizzle of olive oil and a splash of balsamic vinegar, if using."
        )
    },
    "Chicken Curry with Coconut Milk": {
        "title": "Chicken Curry with Coconut Milk",
        "ingredients": [
            "500g Chicken Fillet (diced)",
            "1 Onion (chopped)",
            "2 cloves Garlic (minced)",
            "1 tbsp Curry Paste (red or yellow)",
            "400ml Coconut Milk",
            "100ml Chicken Stock",
            "1 Red Bell Pepper (sliced)",
            "Oil or Olive Oil",
            "Salt and Black Pepper"
        ],
        "instructions": (
            "Sauté the onion and garlic in a little oil until soft. "
            "Add the chicken and sear it on all sides. "
            "Stir in the curry paste and cook for 1 minute. "
            "Pour in the coconut milk and stock. Simmer for 15 minutes. "
            "Add the bell pepper and cook for another 5 minutes. Serve with rice."
        )
    },
    "Spaghetti Carbonara (Original)": {
        "title": "Spaghetti Carbonara (Original)",
        "ingredients": [
            "400g Spaghetti",
            "150g Guanciale (or Pancetta)",
            "2 Egg Yolks and 1 Whole Egg (room temperature)",
            "50g Grated Pecorino Romano cheese",
            "Black Pepper (freshly ground)",
            "Salt (use carefully because of the guanciale)"
        ],
        "instructions": (
            "Cook the spaghetti according to package directions, reserving some of the pasta water. "
            "Dice the guanciale and fry it until crispy, without oil. "
            "In a bowl, mix the eggs, Pecorino, and plenty of black pepper. "
            "Toss the spaghetti with the guanciale (off the heat!). "
            "Add the egg mixture and stir quickly, adding a little of the reserved water until a creamy sauce forms."
        )
    },
    "Overnight Oats": {
        "title": "Overnight Oats",
        "ingredients": [
            "1/2 cup Oats (rolled or quick-cooking)",
            "1 cup Milk (cow, almond, soy, etc.)",
            "1 tbsp Chia Seeds",
            "1 tbsp Honey or Maple Syrup (optional)",
            "Pinch of Cinnamon",
            "Fresh fruit and nuts for topping"
        ],
        "instructions": (
            "In a jar or bowl, combine the oats, milk, chia seeds, sweetener, and cinnamon. "
            "Stir well to mix all the ingredients. "
            "Close the jar and refrigerate for at least 6 hours or overnight. "
            "In the morning, add fresh fruit, nuts, or seeds of your choice and serve cold."
        )
    },
    "Vegetarian Cream of Pumpkin Soup": {
        "title": "Vegetarian Cream of Pumpkin Soup",
        "ingredients": [
            "1 kg Pumpkin (Butternut or Hokkaido, cubed)",
            "1 Onion (chopped)",
            "2 cloves Garlic",
            "700ml Vegetable Stock",
            "100ml Cooking Cream (optional)",
            "1 tsp Nutmeg",
            "Olive Oil",
            "Salt and Black Pepper"
        ],
        "instructions": (
            "In a large pot, heat the olive oil and sauté the onion and garlic until soft. "
            "Add the pumpkin and cook for 5 minutes. "
            "Pour in the stock until the pumpkin is covered and let it simmer until the pumpkin is tender (about 20 minutes). "
            "Blend the soup until smooth. "
            "Return to the heat, add the nutmeg, salt, pepper, and cream. Heat through without boiling."
        )
    }
}