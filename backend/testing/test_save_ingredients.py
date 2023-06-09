from testing.wrappers import save_ingredients_set, get_certain_ingredients_set
from src.classes import data_store, User

for users in data_store.get_users_list():
    users.saved_ingredients = []
    data_store.pickle_users_list()

#print(save_ingredients_set("healthy probably", 1, ['golden wax beans', 'mint', 'lobster tail', 'butter', 'garlic', 'white wine', 'parsley', 'chive', 'olive oil', 'extra virgin olive oil']))
print(get_certain_ingredients_set("healthy probably",1))
