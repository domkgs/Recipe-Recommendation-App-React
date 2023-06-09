from testing.wrappers import create_meal_plan, get_meal_plan_details, create_own_plan, remove_meal_plan
from src.classes import data_store, User
from testing.wrappers import register_user, login, logout, forgot_password, \
    reset_password, add_favourite_recipe, remove_favourite_recipe, get_favourite_recipes, \
    get_user_profile, set_tag_line, set_description
"""
id, token = register_user("jeffrey111.le00@gmail.com", "banana1234", "banana1234", "Jeffreyy", "Lee")
print(id)
print(token)
details = login("jeffrey111.le00@gmail.com", "banana1234")
print(details)
"""
# forgot_password(email)

# print(reset_password(email, reset_code, password, confirm_password))
# print(get_favourite_recipes(1))
#
# add_favourite_recipe(1, 1)
# print(get_favourite_recipes(1))
# remove_favourite_recipe(1, 1)
# print(get_favourite_recipes(1))
"""
print(get_user_profile(5))
set_description(5, "test")
print(get_user_profile(5))
"""
for user in data_store.get_users_list():
    print(user.get_user_id())
    print(user.get_all_plan())
    for plan in user.get_all_plan():
        print(plan.get_id())

"""
user_id = 5
meal_plan_id = 1
print(remove_meal_plan(user_id,meal_plan_id))
"""
