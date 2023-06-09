from testing.wrappers import create_recipe, get_recipe_details, search_recipes,

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
#
# time = "30"
# servings = "1"
# difficulty = "1"
# nutrition_facts = [61, 2, 1, 7, 1, 0, 3]
# tags = ['breakfast']

# create_recipe(title, ingredients, steps, time, servings, difficulty,
#                nutrition_facts, tags)

# print(search_recipes(['golden wax beans', 'mint', 'lobster tail', 'butter', 'garlic', 'white wine', 'parsley', 'chive', 'olive oil', 'extra virgin olive oil'], []))
