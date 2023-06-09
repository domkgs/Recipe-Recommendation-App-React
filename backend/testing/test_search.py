import sys
sys.path.append("/tmp_amd/kamen/export/kamen/4/z5208543/cs3900/project/capstone-project-3900-f10a-jaids/backend/src")
from classes import data_store, Recipe
from search import search 


# Successful 1 Ingredient Test, with no tags
def succ_test_1():
    results = search("tomato", "", "")
    #assert(results == ['Mushroom Soup', 'Boiled Eggs with Tomato'])
    print(results) 

#Successful 1 Ingredient Test, with 1 tag
def succ_test_2():
    results = search("tomato", "lunch", "")
    #assert(results == ["Mushroom Soup"])
    print(results) 

#Successful 1 Ingredient Test, with 1 tag
def succ_test_3():
    results = search("bread", "vegan", "")
    #assert(results == ['Buttered Toast'])
    print(results) 

#Successful 1 Ingredient Test, with 1 tag
def succ_test_4():
    results = search("tomato", "vegan", "diff")
    #assert(results == ['Buttered Toast'])
    print(results) 

def succ_test_5():
    results = search("tomato", "vegan", "time")
    #assert(results == ['Buttered Toast'])
    print(results) 

def succ_test_6():
    results = search("tomato", "vegan", "steps")
    #assert(results == ['Buttered Toast'])
    print(results) 

#Failed 1 Ingredient Test, with 1 tag (no 'chicken' ingredient in recipes)
def fail_test_1():
    results = search("tomato, chicken", "lunch", "")
    #assert(results == "Could not find any recipes matching ingredient set")
    print(results) 

#Failed 4 Ingredient Test, with no tags (no 'bacon' or 'toy' ingredient in recipes)
def fail_test_2():
    results = search("cheese tomato bacon toy", "", "")
    #assert(results == "Could not find any recipes matching ingredient set")
    print(results) 

#Failed 1 Ingredient Test, with 1 tags (no recipe with 'dinner' tag)
def fail_test_3():
    results = search("tomato", "dinner", "")
    #assert(results == "Could not find any recipes matching ingredient set")
    print(results) 

if __name__ == "__main__":
    succ_test_1()
    succ_test_2()
    succ_test_3()
    succ_test_4()
    succ_test_5()
    succ_test_6()
    fail_test_1()
    fail_test_2()
    fail_test_2()

#def fail_test_3():
#    f = open("recipe.txt")
#    recipes = f.readlines()

#    for recipe in recipes:
#        tok_recipe = recipe.split("||")
#        #skeleton title || time || difficulty || 1 cup mushroom _ 2 gram || 1.5 cut apple _ shave || 1 _ 2 _ 3 _ 4 || lunch _ vegetarian _ vegan
#        new_recipe = Recipe(tok_recipe[0],tok_recipe[1],tok_recipe[2],tok_recipe[3],tok_recipe[4],tok_recipe[5],tok_recipe[6])
#        data_store.add_recipe(new_recipe)

#    results = search("1")
#    print(results) 