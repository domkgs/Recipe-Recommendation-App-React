from testing.wrappers import register_user, login, logout, forgot_password, \
    reset_password, add_favourite_recipe, remove_favourite_recipe, get_favourite_recipes, \
    get_user_profile, set_tag_line, set_description

# id, token = register_user("jeffrey.le00@gmail.com", "banana1234", "banana1234", "Jeffrey", "Le")
# print(id)
# print(token)
# details = login("jeffrey.le00@gmail.com", "banana12345")
# print(details)
email = "jeffrey.le00@gmail.com"
password = "banana"
confirm_password = "banana"
reset_code = "XZG3UZBIQJVTV45B9VMOABZGHT011UZPI8FPLR1TCMHU0P46PO"

# forgot_password(email)

# print(reset_password(email, reset_code, password, confirm_password))
# print(get_favourite_recipes(1))
#
# add_favourite_recipe(1, 1)
# print(get_favourite_recipes(1))
# remove_favourite_recipe(1, 1)
# print(get_favourite_recipes(1))
print(get_user_profile(1))
set_description(1, "test")
print(get_user_profile(1))
