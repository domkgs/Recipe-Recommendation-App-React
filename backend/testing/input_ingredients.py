from src.classes import data_store, Ingredient

def input_ingredients():
    name = input("Please enter the name of the ingredient: ")
    categories = []
    category = input("Please input ingredient category: ")
    while True:
        if category == "":
            break
        else:
            categories.append(category)
            category = input("Please input ingredient category: ")
    return Ingredient(name, categories=categories)

while True:
    data_store.add_ingredient(input_ingredients())
