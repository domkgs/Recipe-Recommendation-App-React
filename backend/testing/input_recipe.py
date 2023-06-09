from src.classes import data_store, Ingredient, Recipe, Step

def input_ingredients(name):
    template = data_store.get_ingredient_by_name(name)
    if not template:
        exit()
    units = input("Ingredient measurement units: ")
    quantity = float(input("Ingredient amount: "))

    return Ingredient(name, quantity, units, template.get_categories(), template.get_ingredient_id())

# def ingredient_to_dict(ingredient_str):
#     ingredient_str = ingredient_str.split()
#     return {
#         'quantity': ingredient_str[0],
#         'units': ingredient_str[1],
#         'name': ' '.join(ingredient_str[2:])
#     }
#
# def step_to_dict(step_list):
#     return {
#         'instruction': step_list[0],
#         'time': step_list[1]
#     }
# title = "Easy pancakes"
# ingredients1 = ["100 g plain flour", "2 None egg", "300 ml milk", "1 tbsp sunflower oil"]
# ingredients = [ingredient_to_dict(ingredient) for ingredient in ingredients1]
#
# steps1 = [["Put 100g plain flour, 2 large eggs, 300ml milk, 1 tbsp sunflower or vegetable oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter", '5'],
#         ["Set aside for 30 mins to rest if you have time, or start cooking straight away.", '10'],
#         ["Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper.", '15'],
#         ["When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go.", '20'],
#         ["Serve with lemon wedges and caster sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months.", '25']]
# steps = [step_to_dict(step) for step in steps1]

# time = "30"
# servings = "1"
# difficulty = "1"
nutrition_facts = [61, 2, 1, 7, 1, 0, 3]
# tags = ['breakfast']

title = input("title: ")
ingredients = []
while True:
    name = input("Ingredient name: ")
    if name == "":
        break
    else:
        ingredients.append(input_ingredients(name))
steps = []
instruction = input("Instructions: ")
while True:
    if instruction == "":
        break
    else:
        step_time = float(input("Time for last instruction: "))
        steps.append(Step(instruction, step_time))
        instruction = input("Instructions: ")
time = float(input("Estimated overall cooking time: "))
servings = float(input("Number of servings: "))
difficulty = int(input("Difficulty from 1-3: "))
tags = []
tag = input("Tag: ")
while True:
    if tag == "":
        break
    else:
        tags.append(tag)
        tag = input("Tag: ")
new_recipe = Recipe(title, ingredients, steps, time, servings, difficulty,
                    nutrition_facts, tags)
data_store.add_recipe(new_recipe)
